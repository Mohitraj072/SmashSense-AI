# 🏸 SmashSense.AI

> AI-powered badminton performance analysis platform built with Google Gemini 1.5 Pro

SmashSense.AI analyzes your badminton match videos using artificial intelligence 
to identify weaknesses, track progress, scout opponents, and generate 
personalized training plans — like having a professional coach available 24/7.

---

## ✨ Features

- 🎥 **Video Analysis** — Upload match videos for instant AI-powered coaching feedback
- 📊 **Performance Dashboard** — Track your AI rating, win rate, and weakness index
- 🏹 **Opponent Scouting** — AI identifies opponent patterns across multiple matches
- 📈 **Progress Tracking** — See how your weaknesses improve over time
- 🏋️ **Training Plans** — Personalized 7-day training plans based on your matches
- 📱 **PWA Support** — Install on your phone like a native app

---

## 🛠️ Tech Stack

| Layer | Technology |
|-------|-----------|
| Frontend | HTML, CSS, JavaScript |
| Backend | Python, Flask |
| AI Engine | Google Gemini 1.5 Pro |
| Database | Firebase Firestore |
| Storage | Firebase Cloud Storage |
| Auth | Firebase Authentication |
| Hosting | Render |

---

## 🚀 Getting Started

### Prerequisites
- Python 3.10+
- Google AI Studio account (free Gemini API key)
- Firebase account (free tier)

### Installation

```bash
# Clone the repository
git clone https://github.com/Mohitraj072/SmashSense-AI.git
cd SmashSense-AI

# Install dependencies
pip install -r requirements.txt

# Set up environment variables
cp .env.example .env
# Edit .env and add your API keys

# Run the app
python app.py
```

---

## 🔑 Environment Variables

| Variable | Description |
|----------|-------------|
| GEMINI_API_KEY | Your Google Gemini API key from AI Studio |
| FIREBASE_PROJECT_ID | Your Firebase project ID |
| FIREBASE_PRIVATE_KEY | Firebase service account private key |
| FIREBASE_CLIENT_EMAIL | Firebase service account email |
| FIREBASE_STORAGE_BUCKET | Firebase storage bucket URL |

---

## 📸 Screenshots

### Dashboard
![Dashboard](assets/dashboard.png)

---

## 🔮 Future Enhancements

- 🎯 Real-time stroke detection using OpenCV and MediaPipe
- 👨‍🏫 Coach dashboard for managing multiple players
- 🏆 Tournament bracket integration
- 📊 Advanced biomechanics analysis
- 🌍 Multi-sport support (Tennis, Squash, Table Tennis)

---

## 👨‍💻 Author

**Mohit Raj**  
First-year B.Tech CSE (AI & ML) — Dayananda Sagar University, Bengaluru  
🏸 National-level badminton player | AI enthusiast  

[![LinkedIn](https://img.shields.io/badge/LinkedIn-Connect-blue)](https://linkedin.com/in/yourprofile)
[![GitHub](https://img.shields.io/badge/GitHub-Follow-black)](https://github.com/Mohitraj072)

---

## 📄 License

MIT License — feel free to use and build on this project.
