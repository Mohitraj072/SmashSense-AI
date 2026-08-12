# 🏸 ShuttleAI - AI-Powered Badminton Performance Analytics

> **ShuttleAI** is an advanced, multimodal AI platform designed for badminton players, coaches, and academies. By combining computer vision video processing powered by **Google Gemini 2.5/3.6 Flash** with real-time tactical scouting and Firestore cloud analytics, ShuttleAI transforms raw match video clips into actionable Olympic-grade coaching feedback in seconds.

---

## ✨ Features

- 🎥 **Async AI Video Analysis**: Upload match clips (`.mp4`, `.mov`, `.avi`, `.mkv`) up to 500MB for asynchronous Gemini background processing without server timeouts.
- 🎯 **Opponent Scouting Reports**: Automatically aggregate historic match telemetry against specific opponents to extract top 3 weaknesses, style patterns, and customized gameplans.
- 📈 **Longitudinal Progress Tracking**: Track performance score trajectories (out of 10), resolved technique flaws, and persistent footwork vulnerabilities over time.
- 🏋️ **Personalized 7-Day Training Plans**: Generate customized weekly training regimens featuring targeted footwork drills, physical conditioning exercises, sets, and reps based on recent match mistakes.
- 📱 **PWA & Mobile Ready**: Offline-first, responsive Progressive Web App with local caching, instant status polling, and intuitive touch controls for court-side use.
- 🛡️ **Comprehensive Error Handling & Auth**: Built-in validation for video size limits, file formats, Firebase ID token verification, Gemini API auto-retries, and standardized JSON error responses.

---

## 🛠️ Tech Stack

| Layer | Technology | Description |
| :--- | :--- | :--- |
| **Frontend** | HTML5, Tailwind CSS, JavaScript (ES6+), Chart.js | Responsive Single Page Application (SPA) with PWA support & custom styling |
| **Backend Framework** | Python 3.10+, Flask, Gunicorn | RESTful API server with asynchronous request handling and error decorators |
| **AI & Multimodal Processing** | Google Gemini 2.5 / 3.6 Flash (`google-genai`) | Multimodal video vision analysis, technique evaluation, & tactical inference |
| **Database** | Firebase Firestore | Cloud NoSQL database for match records, user analytics, and background jobs |
| **Cloud Storage** | Firebase Cloud Storage | Bucket storage for match video clips with public/signed access URLs |
| **Task Queue & Async Jobs** | Python Threading / Celery & Redis | Non-blocking background worker queue with real-time `/status/<job_id>` polling |
| **Authentication** | Firebase Admin Auth | Secure Bearer ID token verification decorator for protected API endpoints |
| **Deployment & Hosting** | Render.com / Google Cloud Run | Production container deployment with Gunicorn multi-threading |

---

## 📸 Screenshots

<p align="center">
  <img src="https://via.placeholder.com/800x450/0f172a/38bdf8?text=ShuttleAI+Match+Upload+%26+Async+Processing" alt="ShuttleAI Match Upload" width="48%" />
  <img src="https://via.placeholder.com/800x450/0f172a/34d399?text=AI+Tactical+Breakdown+%26+Scores" alt="AI Analysis Results" width="48%" />
</p>

<p align="center">
  <img src="https://via.placeholder.com/800x450/0f172a/f59e0b?text=Opponent+Scouting+Dossier" alt="Opponent Scouting Report" width="48%" />
  <img src="https://via.placeholder.com/800x450/0f172a/a855f7?text=Personalized+7-Day+Training+Plan" alt="7-Day Training Plan" width="48%" />
</p>

---

## 🚀 Getting Started

### Prerequisites

Ensure you have the following installed and configured before running locally:

- **Python**: Version 3.10 or higher
- **Firebase Account**: A Firebase project with **Firestore Database**, **Firebase Storage**, and **Authentication** enabled.
- **Google Gemini API Key**: Obtain a key from [Google AI Studio](https://aistudio.google.com/).
- **Redis Server** *(Optional)*: Required if running Celery for background workers.

---

### Installation & Setup

1. **Clone the Repository**
   ```bash
   git clone https://github.com/your-username/shuttle-ai.git
   cd shuttle-ai
   ```

2. **Create and Activate a Virtual Environment**
   ```bash
   python3 -m venv venv
   source venv/bin/activate    # On Windows: venv\Scripts\activate
   ```

3. **Install Dependencies**
   ```bash
   pip install -r requirements.txt
   ```

4. **Set Up Environment Variables**
   Create a `.env` file in the project root directory using `.env.example` as a template:
   ```bash
   cp .env.example .env
   ```

5. **Run the Application**
   ```bash
   python firestore_matches.py
   ```
   The backend API will be live at `http://localhost:3000` (or `http://localhost:5000`).

---

## 🔐 Environment Variables

| Variable | Required | Description | Example Value |
| :--- | :---: | :--- | :--- |
| `GEMINI_API_KEY` | **Yes** | API key for Google Gemini AI models | `AIzaSyB...` |
| `FIREBASE_PROJECT_ID` | **Yes** | Your Firebase Cloud Project ID | `shuttle-ai-app` |
| `FIREBASE_PRIVATE_KEY` | **Yes** | Service account RSA private key formatted string | `"-----BEGIN PRIVATE KEY-----\n..."` |
| `FIREBASE_CLIENT_EMAIL` | **Yes** | Service account client email address | `firebase-adminsdk@project.iam.gserviceaccount.com` |
| `FIREBASE_STORAGE_BUCKET` | **Yes** | Firebase Storage bucket URI for video uploads | `shuttle-ai-app.appspot.com` |
| `REDIS_URL` | *No* | Redis connection URL for Celery async worker queue | `redis://localhost:6379/0` |
| `PORT` | *No* | Application port (defaults to `3000` or `5000`) | `3000` |

---

## 📡 API Endpoints

| Endpoint | Method | Description | Auth Required |
| :--- | :---: | :--- | :---: |
| `/analyze` | `POST` | Uploads match video clip and queues asynchronous Gemini AI analysis | **Yes** |
| `/status/<job_id>` | `GET` | Retrieves real-time processing status (`processing`, `completed`, `failed`) and results | No |
| `/matches` | `GET` | Retrieves list of all historical analyzed matches for authenticated user | **Yes** |
| `/opponent_report` | `GET` | Generates tactical scouting dossier against specific opponent (`?name=Name`) | **Yes** |
| `/progress` | `GET` | Calculates overall performance score timeline and technique progress | **Yes** |
| `/training_plan` | `GET` | Synthesizes a 7-day personalized workout and drill schedule | **Yes** |

---

## 🔮 Future Enhancements

- 🏀 **Multi-Sport Support**: Extending computer vision models to Tennis, Squash, Table Tennis, and Pickleball.
- 📋 **Coach Dashboard & Team Management**: Multi-player roster view allowing coaches to assign training regimens and track entire squads.
- ⚡ **Real-Time On-Court Coaching**: Edge device integration for real-time camera feed shot detection and haptic wristband alerts during practice sessions.

---

## 📄 License

Distributed under the MIT License. See `LICENSE` for more information.
