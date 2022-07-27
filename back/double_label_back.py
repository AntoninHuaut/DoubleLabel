#!/bin/env python
from double_label_back import create_app
from flask_cors import CORS
app = create_app(debug=True)
CORS(app, resources={r"/api/v1": {"origins": "localhost:5173"}})


if __name__ == '__main__':
    from waitress import serve
    serve(app, host="0.0.0.0", port=5000)
