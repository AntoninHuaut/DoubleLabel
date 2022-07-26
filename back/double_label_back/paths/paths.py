from flask import Blueprint, request, redirect, jsonify
from ..data_access.inser_datas import *

bpapi = Blueprint('api/v1', __name__, url_prefix='/api/v1')

@bpapi.route("/")
def home():
    return "Accueil"

@bpapi.route("/create_id", methods=['GET','POST'])
def create_id():
    # Get the data from the request
    # Record datas in db
    code_user = "5I9DEXH2"
    ip_user = "127.0.0.1"
    insert_user_db(code_user, ip_user)
    return "send_picture"

@bpapi.route("/get_picture", methods=['GET']) #potentiellement inutile
def send_picture():
    # Send the data to the server
    return "send_picture"

@bpapi.route("/register_answer", methods=['POST'])
def register_answer():
    # Get the data from the request
    return "register_answer"