#!/bin/bash
export FLASK_APP=double_label_back
export FLASK_ENV=production
export FLASK_DEBUG=off
export CORS_URL=https://doublelabel.netlify.app
pip install -r requirements.txt
python init_db.py
python -m flask run