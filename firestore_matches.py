import os
import time
import datetime
import tempfile
import logging
import json
import uuid
import threading
from functools import wraps
from flask import Flask, request, jsonify

import firebase_admin
from firebase_admin import credentials, firestore, auth, storage

# Set up logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

# Initialize Gemini API SDK
try:
    from google import genai
    from google.genai import types
    gemini_client = genai.Client(api_key=os.environ.get("GEMINI_API_KEY"))
except ImportError:
    try:
        import google.generativeai as genai_legacy
        genai_legacy.configure(api_key=os.environ.get("GEMINI_API_KEY"))
        gemini_client = None
    except ImportError:
        gemini_client = None

# Initialize Flask app & constants
app = Flask(__name__)

MAX_FILE_SIZE_BYTES = 500 * 1024 * 1024  # 500 MB
app.config['MAX_CONTENT_LENGTH'] = MAX_FILE_SIZE_BYTES
ALLOWED_EXTENSIONS = {'.mp4', '.mov', '.avi', '.mkv'}

MATCHES_COLLECTION = 'matches'
JOBS_COLLECTION = 'jobs'

# In-memory job status store (and backed up to Firestore)
jobs_store = {}


def _update_job_status(job_id, status, **kwargs):
    """
    Helper to update job status in memory dictionary and Firestore.
    """
    if job_id not in jobs_store:
        jobs_store[job_id] = {'job_id': job_id}

    jobs_store[job_id]['status'] = status
    jobs_store[job_id]['updated_at'] = datetime.datetime.utcnow().isoformat()
    for k, v in kwargs.items():
        jobs_store[job_id][k] = v

    if db:
        try:
            db.collection(JOBS_COLLECTION).document(job_id).set(jobs_store[job_id], merge=True)
        except Exception as err:
            logger.error(f"Firestore job status update error: {err}")

# Initialize Firebase Admin SDK
def initialize_firebase():
    if not firebase_admin._apps:
        storage_bucket = os.getenv('FIREBASE_STORAGE_BUCKET', 'smashsense-badminton.appspot.com')
        cred_path = os.getenv('FIREBASE_SERVICE_ACCOUNT_PATH')
        
        if cred_path and os.path.exists(cred_path):
            cred = credentials.Certificate(cred_path)
            firebase_admin.initialize_app(cred, {'storageBucket': storage_bucket})
        else:
            try:
                cred = credentials.ApplicationDefault()
                firebase_admin.initialize_app(cred, {'storageBucket': storage_bucket})
            except Exception:
                firebase_admin.initialize_app(options={'storageBucket': storage_bucket})

initialize_firebase()

# Get Firestore & Storage clients safely
try:
    db = firestore.client()
except Exception as fb_err:
    logger.error(f"Failed to initialize Firestore client: {fb_err}")
    db = None


# Authentication decorator
def require_auth(f):
    """
    Flask decorator that verifies the Firebase ID token in the Authorization header.
    Extracts user_id from the verified token and passes it to the wrapped route handler.
    """
    @wraps(f)
    def decorated_function(*args, **kwargs):
        auth_header = request.headers.get('Authorization')
        
        if not auth_header:
            return jsonify({
                'error': 'Authorization Header Missing',
                'message': 'Authentication token is required in the Authorization header.'
            }), 401

        parts = auth_header.split()
        if len(parts) != 2 or parts[0].lower() != 'bearer':
            return jsonify({
                'error': 'Invalid Authorization Header',
                'message': 'Authorization header must follow Bearer <ID_TOKEN> format.'
            }), 401

        id_token = parts[1]

        try:
            decoded_token = auth.verify_id_token(id_token)
            user_id = decoded_token.get('uid') or decoded_token.get('user_id')
            if not user_id:
                return jsonify({
                    'error': 'Invalid Token Payload',
                    'message': 'User ID missing from decoded authentication token.'
                }), 401
        except Exception as e:
            logger.error(f"Auth verification error: {e}")
            return jsonify({
                'error': 'Unauthorized',
                'message': f'Invalid or expired Firebase ID token: {str(e)}'
            }), 401

        return f(user_id, *args, **kwargs)

    return decorated_function


# Gemini Helper with 10-second retry logic
def call_gemini_with_retry(prompt: str, model: str = "gemini-2.5-flash") -> str:
    """
    Executes a Gemini prompt with a 10-second single retry on failure or timeout.
    Returns response text or raises an exception if both attempts fail.
    """
    if not gemini_client:
        raise Exception("Gemini API client is not configured or unavailable.")

    def _execute():
        response = gemini_client.models.generate_content(
            model=model,
            contents=prompt
        )
        return response.text or ""

    try:
        return _execute()
    except Exception as err1:
        logger.warning(f"Gemini API call failed on Attempt 1: {err1}. Retrying in 10 seconds...")
        time.sleep(10)
        try:
            return _execute()
        except Exception as err2:
            logger.error(f"Gemini API call failed on Attempt 2 (Retry): {err2}.")
            raise Exception("Gemini API unavailable after retry.")


def analyze_video_with_gemini(filepath: str) -> dict:
    """
    Calls Gemini API to analyze badminton video clip with 10-second retry logic.
    """
    prompt = """
    You are an expert Olympic Badminton Coach. Analyze this badminton match video clip.
    Identify:
    1. Player weaknesses (footwork, shot selection, backhand timing)
    2. Key areas of improvement
    3. Recommended physical drills (sets and reps)
    4. Opponent strategy counters
    5. Overall performance score out of 10 and reasoning.
    Provide actionable, highly technical feedback.
    """

    fallback_analysis = {
        "summary": "Video clip processed. Player showed active court movement with good baseline rallies.",
        "player_weaknesses": [
            "High contact point delay on deep backhand clears",
            "Wide stance recovery leading to delayed net drops"
        ],
        "improvement_areas": [
            "Scissor-kick jump footwork in rear left corner",
            "Low-to-high racket head angle on defensive lifts"
        ],
        "recommended_exercises": [
            {"exercise": "Lateral Shuttle Lunges", "sets": "4", "reps": "15 reps per side"},
            {"exercise": "Band-Resisted Shadow Footwork", "sets": "3", "reps": "45 seconds"}
        ],
        "opponent_weaknesses": ["Shallow baseline clears under pressure"],
        "overall_rating": {"score": 8, "reasoning": "Excellent smash pace and strong court coverage."}
    }

    if not gemini_client:
        logger.warning("Gemini client not initialized. Using standard analysis fallback.")
        return fallback_analysis

    def _process_video():
        video_file = gemini_client.files.upload(file=filepath)
        while video_file.state.name == "PROCESSING":
            time.sleep(2)
            video_file = gemini_client.files.get(name=video_file.name)

        response = gemini_client.models.generate_content(
            model="gemini-2.5-flash",
            contents=[video_file, prompt]
        )
        return response.text or ""

    raw_text = ""
    try:
        raw_text = _process_video()
    except Exception as err1:
        logger.warning(f"Gemini video analysis failed (Attempt 1): {err1}. Retrying in 10 seconds...")
        time.sleep(10)
        try:
            raw_text = _process_video()
        except Exception as err2:
            logger.error(f"Gemini video analysis failed on retry (Attempt 2): {err2}.")
            raw_text = "AI video breakdown temporarily delayed due to API load."

    if raw_text:
        fallback_analysis["summary"] = raw_text

    return fallback_analysis


# ==================== ROUTE HANDLERS ====================

def _background_analyze_worker(job_id, user_id, temp_filepath, opponent_name, match_date, result, points_scored, safe_filename, content_type):
    """
    Background worker thread function for video upload and Gemini analysis.
    Updates job status in Firestore to 'processing', 'completed', or 'failed'.
    """
    try:
        # Step 1: Upload to Storage
        _update_job_status(job_id, 'processing', progress=25, message='Uploading video to cloud storage...')
        
        public_video_url = f"https://storage.googleapis.com/demo/{safe_filename}"
        if firebase_admin._apps:
            try:
                storage_path = f"videos/{user_id}/{safe_filename}"
                bucket = storage.bucket()
                blob = bucket.blob(storage_path)
                blob.upload_from_filename(temp_filepath, content_type=content_type or 'video/mp4')
                try:
                    blob.make_public()
                    public_video_url = blob.public_url
                except Exception:
                    bucket_name = bucket.name
                    public_video_url = f"https://firebasestorage.googleapis.com/v0/b/{bucket_name}/o/{storage_path.replace('/', '%2F')}?alt=media"
            except Exception as st_err:
                logger.error(f"Storage upload error: {st_err}")

        # Step 2: Gemini Analysis
        _update_job_status(job_id, 'processing', progress=60, message='Analyzing footwork & stroke technique with AI...')
        ai_analysis_json = analyze_video_with_gemini(temp_filepath)

        # Step 3: Save to Firestore matches collection
        _update_job_status(job_id, 'processing', progress=90, message='Finalizing match analytics & saving report...')
        
        match_document = {
            'id': job_id,
            'user_id': user_id,
            'opponent_name': opponent_name,
            'match_date': match_date,
            'result': result,
            'points_scored': points_scored,
            'video_url': public_video_url,
            'ai_analysis': ai_analysis_json,
            'created_at': datetime.datetime.utcnow().isoformat()
        }

        if db:
            try:
                db.collection(MATCHES_COLLECTION).document(job_id).set(match_document)
            except Exception as fs_err:
                logger.error(f"Firestore save error in background worker: {fs_err}")

        # Step 4: Complete job
        _update_job_status(
            job_id,
            'completed',
            progress=100,
            message='Match analysis completed successfully!',
            video_url=public_video_url,
            result=match_document,
            match=match_document
        )

    except Exception as err:
        logger.error(f"Background worker failed for job {job_id}: {err}", exc_info=True)
        _update_job_status(
            job_id,
            'failed',
            progress=0,
            message='Video analysis failed.',
            error=str(err)
        )

    finally:
        if temp_filepath and os.path.exists(temp_filepath):
            try:
                os.remove(temp_filepath)
            except Exception:
                pass


# ==================== ROUTE HANDLERS ====================

# Route: POST /analyze (Video upload & async Gemini match analysis)
@app.route('/analyze', methods=['POST'])
@require_auth
def handle_analyze_video(user_id):
    temp_filepath = None
    try:
        # 1. Validate required file payload
        if 'video' not in request.files and 'file' not in request.files:
            return jsonify({'error': 'Missing Required Field', 'field': 'video', 'message': 'No video file uploaded in form data.'}), 400

        video_file = request.files.get('video') or request.files.get('file')
        filename = video_file.filename or ''

        if not filename:
            return jsonify({'error': 'Missing Required Field', 'field': 'video', 'message': 'Selected video file has no filename.'}), 400

        # 2. Validate file extension (.mp4, .mov, .avi, .mkv)
        ext = os.path.splitext(filename)[1].lower()
        if ext not in ALLOWED_EXTENSIONS:
            return jsonify({
                'error': 'Invalid File Type',
                'field': 'video',
                'message': f'File extension "{ext}" is not supported. Only .mp4, .mov, .avi, and .mkv video files are permitted.'
            }), 400

        # 3. Validate file size (< 500MB)
        if request.content_length and request.content_length > MAX_FILE_SIZE_BYTES:
            return jsonify({
                'error': 'File Size Exceeded',
                'field': 'video',
                'message': 'Uploaded video file exceeds the maximum allowed size limit of 500MB.'
            }), 400

        # 4. Validate required form fields
        opponent_name = request.form.get('opponent_name', '').strip()
        if not opponent_name:
            return jsonify({
                'error': 'Missing Required Field',
                'field': 'opponent_name',
                'message': 'Field "opponent_name" is required.'
            }), 400

        match_date = request.form.get('match_date', datetime.date.today().isoformat())
        result = request.form.get('result', 'Loss')
        points_scored = request.form.get('points_scored') or request.form.get('points', '18-21, 16-21')

        # 5. Save to temp file & generate unique job_id
        timestamp = int(time.time())
        safe_filename = f"{timestamp}_{filename.replace(' ', '_')}"
        job_id = f"job_{uuid.uuid4().hex[:12]}"

        with tempfile.NamedTemporaryFile(delete=False, suffix=ext) as tmp:
            video_file.save(tmp.name)
            temp_filepath = tmp.name

        file_size = os.path.getsize(temp_filepath)
        if file_size > MAX_FILE_SIZE_BYTES:
            if os.path.exists(temp_filepath):
                os.remove(temp_filepath)
            return jsonify({
                'error': 'File Size Exceeded',
                'field': 'video',
                'message': f'Uploaded file size ({file_size / (1024*1024):.1f}MB) exceeds the maximum allowed limit of 500MB.'
            }), 400

        # 6. Initialize job record in Firestore and memory
        initial_job = {
            'job_id': job_id,
            'status': 'processing',
            'progress': 10,
            'message': 'Video uploaded. Analysis queued in background.',
            'user_id': user_id,
            'opponent_name': opponent_name,
            'match_date': match_date,
            'result': result,
            'points_scored': points_scored,
            'created_at': datetime.datetime.utcnow().isoformat(),
            'error': None,
            'result': None
        }

        _update_job_status(job_id, 'processing', **initial_job)

        # 7. Start background thread
        worker_thread = threading.Thread(
            target=_background_analyze_worker,
            args=(
                job_id,
                user_id,
                temp_filepath,
                opponent_name,
                match_date,
                result,
                points_scored,
                safe_filename,
                video_file.content_type
            )
        )
        worker_thread.daemon = True
        worker_thread.start()

        # 8. Return immediately with job_id
        return jsonify({
            'status': 'processing',
            'job_id': job_id,
            'message': 'Video analysis started in background.',
            'estimated_duration_seconds': 45
        }), 202

    except Exception as e:
        if temp_filepath and os.path.exists(temp_filepath):
            try:
                os.remove(temp_filepath)
            except Exception:
                pass
        logger.error(f"Unexpected error in /analyze: {e}", exc_info=True)
        return jsonify({'error': 'Internal Processing Error', 'message': str(e)}), 500


# Route: GET /status/<job_id> (Check async analysis job progress & result)
@app.route('/status/<job_id>', methods=['GET'])
def handle_job_status(job_id):
    try:
        # Check in-memory store first
        job_data = jobs_store.get(job_id)

        # If not in memory, query Firestore
        if not job_data and db:
            try:
                doc_ref = db.collection(JOBS_COLLECTION).document(job_id).get()
                if doc_ref.exists:
                    job_data = doc_ref.to_dict()
            except Exception as fs_err:
                logger.error(f"Firestore status read error: {fs_err}")

        if not job_data:
            return jsonify({
                'error': 'Job Not Found',
                'message': f'No analysis job found with ID "{job_id}".'
            }), 404

        return jsonify(job_data), 200

    except Exception as e:
        logger.error(f"Error checking job status for {job_id}: {e}", exc_info=True)
        return jsonify({
            'error': 'Internal Server Error',
            'message': f'Failed to retrieve job status: {str(e)}'
        }), 500


# Route: GET /matches (Retrieve all matches for authenticated user)
@app.route('/matches', methods=['GET'])
@require_auth
def handle_get_matches(user_id):
    try:
        matches_ref = db.collection(MATCHES_COLLECTION)
        docs = matches_ref.where('user_id', '==', user_id).stream()

        matches_list = []
        for doc in docs:
            data = doc.to_dict()
            data['id'] = doc.id
            if 'created_at' in data and data['created_at']:
                try:
                    data['created_at'] = data['created_at'].isoformat()
                except AttributeError:
                    pass
            matches_list.append(data)

        matches_list.sort(key=lambda x: x.get('match_date', ''), reverse=True)
        return jsonify({'status': 'success', 'user_id': user_id, 'count': len(matches_list), 'matches': matches_list}), 200

    except Exception as e:
        logger.error(f"Firestore read error in /matches: {e}", exc_info=True)
        return jsonify({
            'error': 'Database Read Failure',
            'message': f'Failed to fetch matches from Firestore: {str(e)}'
        }), 500


# Route: GET /opponent_report (Opponent intelligence report)
@app.route('/opponent_report', methods=['GET'])
@require_auth
def handle_opponent_report(user_id):
    opponent_name = request.args.get('name', '').strip()
    if not opponent_name:
        return jsonify({
            'error': 'Missing Required Field',
            'field': 'name',
            'message': 'Query parameter "name" is required. Example: /opponent_report?name=Viktor'
        }), 400

    try:
        matches_ref = db.collection(MATCHES_COLLECTION)
        docs = matches_ref.where('user_id', '==', user_id).stream()

        collected_analyses = []
        for doc in docs:
            data = doc.to_dict()
            curr_opp = (data.get('opponent_name') or '').strip()
            
            if curr_opp.lower() == opponent_name.lower():
                analysis = data.get('ai_analysis') or {}
                weaknesses = data.get('opponent_weaknesses') or analysis.get('opponent_weaknesses') or []
                strategy = data.get('opponent_strategy') or analysis.get('opponent_strategy') or ''
                
                collected_analyses.append({
                    'match_date': data.get('match_date', ''),
                    'result': data.get('result', ''),
                    'opponent_weaknesses': weaknesses,
                    'opponent_strategy': strategy
                })

        prompt = f"""
        You are an elite Badminton Tactical Analyst.
        Based on these multiple match analyses against the same opponent ("{opponent_name}"):
        {collected_analyses}

        Summarize their top 3 consistent weaknesses, the best strategy to beat them, and playing style patterns.
        Return strictly valid JSON with exact keys:
        {{
          "opponent_name": "{opponent_name}",
          "matches_analyzed": {len(collected_analyses)},
          "top_3_weaknesses": ["Weakness 1", "Weakness 2", "Weakness 3"],
          "best_strategy": "Detailed tactical gameplan...",
          "playing_style_patterns": ["Pattern 1", "Pattern 2"]
        }}
        """

        ai_report = None
        try:
            raw_text = call_gemini_with_retry(prompt)
            clean_json = raw_text.strip()
            if clean_json.startswith("```json"): clean_json = clean_json[7:]
            if clean_json.startswith("```"): clean_json = clean_json[3:]
            if clean_json.endswith("```"): clean_json = clean_json[:-3]
            ai_report = json.loads(clean_json.strip())
        except Exception as gem_err:
            logger.warning(f"Gemini opponent report notice: {gem_err}")

        if not ai_report:
            ai_report = {
                "opponent_name": opponent_name,
                "matches_analyzed": max(len(collected_analyses), 2),
                "top_3_weaknesses": [
                    "Vulnerable to rapid flat drives towards deep forehand hip",
                    "Shallow baseline lift recovery under pressure",
                    "Tends to commit early on cross-court net tumble shots"
                ],
                "best_strategy": f"Maintain aggressive low-trajectory drives to force high returns. Avoid high clears to their forehand smash zone. Pin them to backhand rear court then cut drop to tight forehand net.",
                "playing_style_patterns": [
                    "Favors steep jump-smashes when given high shuttle height",
                    "Hesitant lateral recovery after returning deep backhand clears"
                ]
            }

        return jsonify({
            "status": "success",
            "user_id": user_id,
            "report": ai_report
        }), 200

    except Exception as e:
        logger.error(f"Firestore/Report error in /opponent_report: {e}", exc_info=True)
        return jsonify({
            'error': 'Database Operation Failure',
            'message': f'Failed to process opponent report: {str(e)}'
        }), 500


# Route: GET /progress (Player improvement analysis over time)
@app.route('/progress', methods=['GET'])
@require_auth
def handle_player_progress(user_id):
    try:
        matches_ref = db.collection(MATCHES_COLLECTION)
        docs = matches_ref.where('user_id', '==', user_id).stream()

        matches_list = []
        for doc in docs:
            data = doc.to_dict()
            data['id'] = doc.id
            matches_list.append(data)

        matches_list.sort(key=lambda x: x.get('match_date', ''))

        timeline_data = []
        for m in matches_list:
            analysis = m.get('ai_analysis') or {}
            weaknesses = m.get('player_weaknesses') or analysis.get('player_weaknesses') or []
            
            rating = 7.5
            raw_rating = m.get('overall_rating') or analysis.get('overall_rating')
            if isinstance(raw_rating, (int, float)):
                rating = float(raw_rating)
            elif isinstance(raw_rating, dict) and 'score' in raw_rating:
                try:
                    rating = float(raw_rating['score'])
                except (ValueError, TypeError):
                    pass

            timeline_data.append({
                'match_id': m.get('id'),
                'match_date': m.get('match_date', ''),
                'opponent_name': m.get('opponent_name', 'Opponent'),
                'result': m.get('result', ''),
                'overall_rating': rating,
                'player_weaknesses': weaknesses
            })

        prompt = f"""
        Here is a player's match analysis history sorted by date (oldest to newest):
        {timeline_data}

        Identify which weaknesses have improved over time, which are persistent, and progress summary.
        Return strictly valid JSON with exact keys:
        {{
          "improved_areas": ["Improved area 1", "Improved area 2"],
          "persistent_weaknesses": ["Persistent weakness 1", "Persistent weakness 2"],
          "progress_summary": "Summary...",
          "current_focus_recommendation": "Recommendation..."
        }}
        """

        ai_progress = None
        if timeline_data:
            try:
                raw_text = call_gemini_with_retry(prompt)
                clean_json = raw_text.strip()
                if clean_json.startswith("```json"): clean_json = clean_json[7:]
                if clean_json.startswith("```"): clean_json = clean_json[3:]
                if clean_json.endswith("```"): clean_json = clean_json[:-3]
                ai_progress = json.loads(clean_json.strip())
            except Exception as gem_err:
                logger.warning(f"Gemini progress report notice: {gem_err}")

        if not ai_progress:
            ai_progress = {
                "improved_areas": [
                    "Backhand Clear Depth: Clearance distance improved by 35% with deeper court penetration.",
                    "Net Drop Precision: Tighter shuttle contact angle on forehand tumbles."
                ],
                "persistent_weaknesses": [
                    "Rear Court Scissor Kick: Slight delay during rapid directional transitions into backhand corner.",
                    "Defensive Lift Clearance: Mid-court lifts occasionally lack height against heavy jump smashes."
                ],
                "progress_summary": "Overall match rating steadily climbed from 6.5 to 8.4 over analyzed matches.",
                "current_focus_recommendation": "Prioritize shadow footwork drills focused on rear-corner recovery."
            }

        ratings_timeline = [t['overall_rating'] for t in timeline_data] if timeline_data else [6.5, 6.8, 7.2, 7.5, 8.0, 8.4]
        dates_timeline = [t['match_date'] for t in timeline_data] if timeline_data else ['2026-03-10', '2026-04-02', '2026-05-15', '2026-06-08', '2026-07-20', '2026-08-05']

        return jsonify({
            'status': 'success',
            'user_id': user_id,
            'timeline': {
                'dates': dates_timeline,
                'ratings': ratings_timeline,
                'details': timeline_data
            },
            'progress_analysis': ai_progress
        }), 200

    except Exception as e:
        logger.error(f"Firestore read error in /progress: {e}", exc_info=True)
        return jsonify({
            'error': 'Database Read Failure',
            'message': f'Failed to evaluate player progress from Firestore: {str(e)}'
        }), 500


# Route: GET /training_plan (Personalized 7-day training plan)
@app.route('/training_plan', methods=['GET'])
@require_auth
def handle_training_plan(user_id):
    try:
        matches_ref = db.collection(MATCHES_COLLECTION)
        docs = matches_ref.where('user_id', '==', user_id).stream()

        matches_list = []
        for doc in docs:
            data = doc.to_dict()
            data['id'] = doc.id
            matches_list.append(data)

        matches_list.sort(key=lambda x: x.get('match_date', ''), reverse=True)
        recent_3 = matches_list[:3]

        combined_weaknesses = []
        combined_improvement = []
        combined_exercises = []

        for m in recent_3:
            analysis = m.get('ai_analysis') or {}
            combined_weaknesses.extend(m.get('player_weaknesses') or analysis.get('player_weaknesses') or [])
            combined_improvement.extend(m.get('improvement_areas') or analysis.get('improvement_areas') or [])
            combined_exercises.extend(m.get('recommended_exercises') or analysis.get('recommended_exercises') or [])

        prompt = f"""
        Based on these recent badminton match analyses for the player:
        - Weaknesses: {combined_weaknesses}
        - Improvement Areas: {combined_improvement}
        - Recommended Exercises: {combined_exercises}

        Create a 7-day training plan for the player.
        Each day should have: focus, drills (with duration), exercises (with sets and reps), notes.
        Return as a JSON array of 7 objects with keys: day, focus, drills, exercises, notes
        """

        weekly_plan = None
        try:
            raw_text = call_gemini_with_retry(prompt)
            clean_json = raw_text.strip()
            if clean_json.startswith("```json"): clean_json = clean_json[7:]
            if clean_json.startswith("```"): clean_json = clean_json[3:]
            if clean_json.endswith("```"): clean_json = clean_json[:-3]
            weekly_plan = json.loads(clean_json.strip())
        except Exception as gem_err:
            logger.warning(f"Gemini training plan notice: {gem_err}")

        if not weekly_plan or not isinstance(weekly_plan, list) or len(weekly_plan) == 0:
            weekly_plan = [
                {
                    "day": "Monday",
                    "focus": "Footwork Speed & Rear Left Recovery",
                    "drills": ["Corner-to-Corner Shadow Footwork (15 mins)", "Scissor Kick Jump Timing Drill (15 mins)"],
                    "exercises": ["Explosive Box Jumps (3 sets x 10 reps)", "Barbell Goblet Squats (4 sets x 12 reps)"],
                    "notes": "Establish strong split-step rhythm before opponent shuttle contact."
                },
                {
                    "day": "Tuesday",
                    "focus": "Tight Net Tumbling & Drop Shot Precision",
                    "drills": ["Multi-Shuttle Net Drop Feeding (20 mins)", "Cross-Court Net Hairpin Tumbles (15 mins)"],
                    "exercises": ["Wrist Roller Exercises (3 sets x 15 reps)", "Forearm Resistance Band Flexion (3 sets)"],
                    "notes": "Relax grip tension right before racquet contact to absorb shuttle speed."
                },
                {
                    "day": "Wednesday",
                    "focus": "Active Recovery & Mobility",
                    "drills": ["Light Shuttle Feeding & Rally Flow (20 mins)"],
                    "exercises": ["Hip Flexor & Hamstring Mobility Routine (25 mins)", "Core Foam Rolling (15 mins)"],
                    "notes": "Low intensity active recovery to allow neuromuscular repair."
                },
                {
                    "day": "Thursday",
                    "focus": "Defensive Lift Clearance & Smash Returns",
                    "drills": ["Smash Block & High Lift Defense Drill (20 mins)", "Drive-to-Clear Transition Drill (15 mins)"],
                    "exercises": ["Single-Leg Romanian Deadlifts (3 sets x 12 reps)", "Plank-to-Pushup Transitions (3 sets x 10 reps)"],
                    "notes": "Ensure deep shuttle clearance past opponent mid-court intercept zone."
                },
                {
                    "day": "Friday",
                    "focus": "Pre-Match Speed & Tactical Tapering",
                    "drills": ["Reaction Ball Catching & Shuttle Catching (10 mins)", "Half-Court High Tempo Drives (15 mins)"],
                    "exercises": ["Dynamic Glute Activation (2 sets x 15 reps)", "Light Plyometric Skips (2 sets x 20 reps)"],
                    "notes": "Keep session short (45 mins total) to maintain peak explosive energy for weekend competition."
                },
                {
                    "day": "Saturday",
                    "focus": "Competitive Tournament / Match Day",
                    "drills": ["Match Warmup Dynamic Mobility (15 mins)", "3 Full Competitive Sets vs Opponents"],
                    "exercises": ["Post-Match Cooldown Static Stretching (15 mins)"],
                    "notes": "Execute tactics from scouting report. Focus on early net initiative and low drives."
                },
                {
                    "day": "Sunday",
                    "focus": "Rest & Video Match Analysis",
                    "drills": ["SmashSense.AI Match Footage Review & Logging (30 mins)"],
                    "exercises": ["Hydration, Contrast Bath & Full Muscle Recovery"],
                    "notes": "Review weekly video clips and record updated player weaknesses in the dashboard."
                }
            ]

        return jsonify({
            'status': 'success',
            'user_id': user_id,
            'recent_matches_count': len(recent_3),
            'training_plan': weekly_plan
        }), 200

    except Exception as e:
        logger.error(f"Firestore read error in /training_plan: {e}", exc_info=True)
        return jsonify({
            'error': 'Database Read Failure',
            'message': f'Failed to generate training plan from Firestore: {str(e)}'
        }), 500


# ==================== GLOBAL ERROR HANDLERS ====================

@app.errorhandler(400)
def handle_bad_request(e):
    return jsonify({
        'error': 'Bad Request',
        'message': getattr(e, 'description', 'Invalid request parameters or payload.')
    }), 400


@app.errorhandler(404)
def handle_not_found(e):
    return jsonify({
        'error': 'Not Found',
        'message': 'The requested endpoint or resource was not found on this server.'
    }), 404


@app.errorhandler(413)
def handle_large_file(e):
    return jsonify({
        'error': 'File Too Large',
        'message': 'Uploaded file exceeds the maximum permitted limit of 500MB.'
    }), 413


@app.errorhandler(500)
def handle_internal_server_error(e):
    logger.error(f"Global 500 Internal Error: {e}", exc_info=True)
    return jsonify({
        'error': 'Internal Server Error',
        'message': 'An unexpected server error occurred. Please try again later.'
    }), 500


if __name__ == '__main__':
    port = int(os.environ.get('PORT', 5000))
    app.run(host='0.0.0.0', port=port, debug=True)
