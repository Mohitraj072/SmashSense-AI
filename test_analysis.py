import io
import json
import pytest
from unittest.mock import MagicMock, patch

# Import Flask application from firestore_matches module
import firestore_matches
from firestore_matches import app


@pytest.fixture
def client():
    """
    Flask test client fixture with TESTING mode enabled.
    """
    app.config['TESTING'] = True
    with app.test_client() as client:
        yield client


@pytest.fixture(autouse=True)
def mock_firebase_setup():
    """
    Setup and teardown fixture for mocking Firebase Admin Auth, Firestore, and Storage.
    """
    with patch('firestore_matches.auth') as mock_auth, \
         patch('firestore_matches.db') as mock_db, \
         patch('firestore_matches.storage') as mock_storage:

        # Default mock auth behavior for valid bearer tokens
        mock_auth.verify_id_token.return_value = {'uid': 'test_user_123', 'user_id': 'test_user_123'}

        # Mock Firebase Storage bucket & blob
        mock_bucket = MagicMock()
        mock_blob = MagicMock()
        mock_blob.public_url = "https://storage.googleapis.com/test-bucket/videos/test_user_123/fake_match.mp4"
        mock_bucket.blob.return_value = mock_blob
        mock_storage.bucket.return_value = mock_bucket

        yield {
            'auth': mock_auth,
            'db': mock_db,
            'storage': mock_storage
        }


# Helper function to generate Authorization header
def auth_headers(token="valid_test_token"):
    return {
        'Authorization': f'Bearer {token}'
    }


# Scenario 1: Test /analyze route with a fake video file and mocked Gemini API
def test_analyze_route_success(client, mock_firebase_setup):
    """
    Test POST /analyze route with dummy MP4 bytes object and mocked Gemini API response.
    """
    fake_video_data = io.BytesIO(b"\x00\x00\x00\x18ftypmp42\x00\x00\x00\x00mp41isom")

    fake_doc_ref = MagicMock()
    fake_doc_ref.id = "mock_match_doc_id_999"
    mock_firebase_setup['db'].collection.return_value.document.return_value = fake_doc_ref

    with patch('firestore_matches.analyze_video_with_gemini') as mock_analyze:
        mock_analyze.return_value = {
            "summary": "Mocked Gemini Analysis: Excellent footwork and strong smash execution.",
            "player_weaknesses": ["Delayed backhand clear recovery"],
            "improvement_areas": ["Cross-court net hairpin placement"],
            "recommended_exercises": [{"exercise": "Shadow Footwork", "sets": "3", "reps": "15"}],
            "overall_rating": {"score": 8.5, "reasoning": "Strong match control."}
        }

        data = {
            'video': (fake_video_data, 'match_clip.mp4'),
            'opponent_name': 'Kento Momota',
            'result': 'Loss',
            'points': '19-21, 20-22',
            'match_date': '2026-08-01'
        }

        response = client.post(
            '/analyze',
            data=data,
            headers=auth_headers(),
            content_type='multipart/form-data'
        )

        assert response.status_code == 201
        json_data = response.get_json()
        assert json_data['status'] == 'success'
        assert 'match' in json_data
        assert json_data['match']['opponent_name'] == 'Kento Momota'
        assert json_data['match']['id'] == 'mock_match_doc_id_999'
        assert json_data['match']['ai_analysis']['overall_rating']['score'] == 8.5


# Scenario 2: Test /matches route returns correct JSON structure
def test_get_matches_route_structure(client, mock_firebase_setup):
    """
    Test GET /matches route returning list of matches in correct JSON format.
    """
    mock_doc1 = MagicMock()
    mock_doc1.id = "match_101"
    mock_doc1.to_dict.return_value = {
        'user_id': 'test_user_123',
        'opponent_name': 'Viktor Axelsen',
        'match_date': '2026-07-20',
        'result': 'Loss',
        'points_scored': '18-21, 16-21'
    }

    mock_doc2 = MagicMock()
    mock_doc2.id = "match_102"
    mock_doc2.to_dict.return_value = {
        'user_id': 'test_user_123',
        'opponent_name': 'Shi Yuqi',
        'match_date': '2026-08-02',
        'result': 'Win',
        'points_scored': '21-19, 21-17'
    }

    mock_firebase_setup['db'].collection.return_value.where.return_value.stream.return_value = [mock_doc1, mock_doc2]

    response = client.get('/matches', headers=auth_headers())

    assert response.status_code == 200
    json_data = response.get_json()
    assert json_data['status'] == 'success'
    assert json_data['user_id'] == 'test_user_123'
    assert json_data['count'] == 2
    assert isinstance(json_data['matches'], list)
    assert len(json_data['matches']) == 2
    assert json_data['matches'][0]['opponent_name'] == 'Shi Yuqi'  # Sorted newest first


# Scenario 3: Test /opponent_report route with mocked Firestore response
def test_opponent_report_route(client, mock_firebase_setup):
    """
    Test GET /opponent_report route with query param name and mocked Firestore data.
    """
    mock_doc = MagicMock()
    mock_doc.id = "match_201"
    mock_doc.to_dict.return_value = {
        'user_id': 'test_user_123',
        'opponent_name': 'Viktor Axelsen',
        'match_date': '2026-07-15',
        'result': 'Loss',
        'ai_analysis': {
            'opponent_weaknesses': ['Vulnerable on deep flat drives to backhand hip'],
            'opponent_strategy': 'Pushes pace aggressively on high serves'
        }
    }

    mock_firebase_setup['db'].collection.return_value.where.return_value.stream.return_value = [mock_doc]

    with patch('firestore_matches.call_gemini_with_retry') as mock_gemini:
        mock_gemini.return_value = json.dumps({
            "opponent_name": "Viktor Axelsen",
            "matches_analyzed": 1,
            "top_3_weaknesses": [
                "Flat drive returns to deep forehand hip",
                "Late backhand drop recovery",
                "High serve interception timing"
            ],
            "best_strategy": "Maintain low flat drives to negate steep jump smashes.",
            "playing_style_patterns": ["Aggressive baseline smasher"]
        })

        response = client.get('/opponent_report?name=Viktor Axelsen', headers=auth_headers())

        assert response.status_code == 200
        json_data = response.get_json()
        assert json_data['status'] == 'success'
        assert 'report' in json_data
        report = json_data['report']
        assert report['opponent_name'] == 'Viktor Axelsen'
        assert 'top_3_weaknesses' in report
        assert 'best_strategy' in report


# Scenario 4: Test /progress route returns correct keys in response
def test_progress_route_keys(client, mock_firebase_setup):
    """
    Test GET /progress route returns required keys in JSON structure.
    """
    mock_doc = MagicMock()
    mock_doc.id = "match_301"
    mock_doc.to_dict.return_value = {
        'user_id': 'test_user_123',
        'match_date': '2026-06-10',
        'overall_rating': 7.8,
        'player_weaknesses': ['Shallow net lifts']
    }

    mock_firebase_setup['db'].collection.return_value.where.return_value.stream.return_value = [mock_doc]

    response = client.get('/progress', headers=auth_headers())

    assert response.status_code == 200
    json_data = response.get_json()
    assert json_data['status'] == 'success'
    assert 'timeline' in json_data
    assert 'dates' in json_data['timeline']
    assert 'ratings' in json_data['timeline']
    assert 'progress_analysis' in json_data

    analysis = json_data['progress_analysis']
    assert 'improved_areas' in analysis
    assert 'persistent_weaknesses' in analysis
    assert 'progress_summary' in analysis
    assert 'current_focus_recommendation' in analysis


# Scenario 5: Test that unauthenticated requests to all routes return 401
@pytest.mark.parametrize("method, endpoint, query_args, data_payload", [
    ("POST", "/analyze", {}, {"opponent_name": "Viktor"}),
    ("GET", "/matches", {}, None),
    ("GET", "/opponent_report", {"name": "Viktor"}, None),
    ("GET", "/progress", {}, None),
    ("GET", "/training_plan", {}, None),
])
def test_unauthenticated_requests_return_401(client, mock_firebase_setup, method, endpoint, query_args, data_payload):
    """
    Verify that calling protected routes without an Authorization header returns 401 Unauthorized.
    """
    # Configure mock auth to simulate missing or invalid token
    mock_firebase_setup['auth'].verify_id_token.side_effect = Exception("No auth token provided")

    url = endpoint
    if query_args:
        query_string = "&".join([f"{k}={v}" for k, v in query_args.items()])
        url = f"{endpoint}?{query_string}"

    if method == "POST":
        response = client.post(url, data=data_payload)
    else:
        response = client.get(url)

    assert response.status_code == 401
    json_data = response.get_json()
    assert json_data['error'] in ['Authorization Header Missing', 'Unauthorized']
