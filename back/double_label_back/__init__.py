from flask import Flask
from flask import g

def create_app(debug=False):

	app = Flask(__name__)
	app.debug = debug
	app.config['appKeyKLike'] = 'azkljdsfoiu'
	#app.config['PORT'] = 80

	from .paths import paths
	app.register_blueprint(paths.bpapi)
	
	return app