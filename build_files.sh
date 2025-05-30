#!/bin/bash

# Install Python dependencies
pip install -r requirements.txt
pip install whitenoise dj-database-url

# Apply database migrations
python manage.py migrate

# Collect static files
python manage.py collectstatic --noinput