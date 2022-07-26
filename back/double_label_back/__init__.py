from flask import Flask
from flask import g
from .data_access.init_db import *
from dotenv import load_dotenv

load_dotenv('.env')

def create_app(debug=False):
	init_db_script()
	app = Flask(__name__)
	app.debug = debug
	from .paths import paths
	app.register_blueprint(paths.bpapi)

	return app