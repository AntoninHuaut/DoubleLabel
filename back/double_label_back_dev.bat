set FLASK_APP=double_label_back
set FLASK_ENV=development
set FLASK_DEBUG=on
start .\env\Scripts\activate.bat
pip install -r requirements.txt
python -m flask run