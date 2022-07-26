from flask import Blueprint, request, redirect, jsonify
from ..data_access.insert_datas import *
from ..data_access.get_datas import get_emotion_count

bpapi = Blueprint('api/v1', __name__, url_prefix='/api/v1')

@bpapi.route("/")
def home():
    return "Accueil"

@bpapi.route("/get_image", methods=['GET'])
def send_picture():
    # Send the data to the server
    return 15 #image id

@bpapi.route("/register_answer", methods=['GET','POST'])
def register_answer():
    id_user = "5I9DEXH2"
    ip_user = "127.0.0.1"
    feeling = "i think it's surprise because eyebrows are up"
    timestamp_ans = "2020-01-01 00:00:00"
    id_image = 1
    emotion_list  ={0:"surprise",1:"surprise"}

    feeling = feeling.replace("'"," ")
    # Register the datas in the database
    result = register_answer_db(id_user, ip_user, feeling, timestamp_ans, id_image, emotion_list)
    if result == 1:
        return 'OK'
    else:
        return 'KO'

@bpapi.route("/get_survey_datas", methods=['GET']) #Return the list of all the survey datas per image
def get_survey_datas():
    result = get_emotion_count()
    return jsonify(result)