import json
from requests import post
from flask import Blueprint, request, jsonify, request
from ..data_access.insert_datas import *
from ..data_access.get_datas import get_emotion_count, get_picture, get_emotion_list_db, get_user_count, get_picture_seen_count
import datetime
from flask_cors import cross_origin
import os 

bpapi = Blueprint('api/v1', __name__, url_prefix='/api/v1')


@bpapi.route("/")
def home():
    return jsonify({"status": "UP"})


@bpapi.route("/get_image", methods=['POST'])
@cross_origin()
def send_picture():
    if request.method == 'POST':
        request_datas = request.get_json()
        new_image = get_picture(request_datas['userId'])
        return jsonify({"id": new_image})  # image id
    else:
        return jsonify(-1)  # error


@bpapi.route("/register_answer", methods=['POST'])
@cross_origin()  # origin=,headers=['Access-Control-Allow-Origin',])
def register_answer():
    if request.method == 'POST':
        # Get / parse datas
        request_datas = request.get_json()
        id_user = request_datas['userId']
        ip_user = str(request.access_route[-1])
        captcha = request_datas['captcha']
        if is_human(captcha, ip_user):
            id_image = request_datas['imageId']
            emotion_list = {key: value for key,
                            value in enumerate(request_datas['emotions'])}
            feeling = request_datas['thought']
            timestamp_ans = datetime.datetime.now().timestamp()
            feeling = feeling.replace("'", " ")

            # Register the datas in the database
            register_answer_db(id_user, ip_user, feeling,
                            timestamp_ans, id_image, emotion_list)
            return jsonify()
        else : 
            response = jsonify({'status': 400, 'message': "Invalid captcha or captcha score is too low"})
            response.status_code = 400
            return response

# Return the list of all the survey datas per image
@bpapi.route("/get_survey_datas", methods=['GET'])
@cross_origin()
def get_survey_datas():
    result = get_emotion_count()
    return jsonify(result)

@bpapi.route("/user_count", methods=['GET'])
@cross_origin()
def user_count():
    result = get_user_count()
    return jsonify(result)

@bpapi.route("/get_emotion_list", methods=['GET'])
@cross_origin()
def get_emotion_list():
    result = get_emotion_list_db()
    return jsonify(result)

@bpapi.route("/get_picture_count", methods=['POST'])
@cross_origin()
def get_picture_count():
    # Get / parse datas
    request_datas = request.get_json()
    id_user = request_datas['userId']

    total_pictures_seen = get_picture_seen_count(id_user)
    return jsonify({"pictures_count": total_pictures_seen})
    
def is_human(captcha_response, ip_user):
    payload = {'response': captcha_response, 'secret': os.environ.get('RECAPTCHA_SERVER_SECRET') ,'remoteip':ip_user }
    response = post("https://www.google.com/recaptcha/api/siteverify", data=payload)
    response_text = json.loads(response.text)
    return response_text['success'] and response_text['score'] >= float(os.environ.get('MIN_RECAPTCHA_STORE'))