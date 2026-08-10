web: gunicorn firestore_matches:app --bind 0.0.0.0:$PORT --workers 2 --threads 4 --timeout 120
worker: celery -A firestore_matches.celery worker --loglevel=info
