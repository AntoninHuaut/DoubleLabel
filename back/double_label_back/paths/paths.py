from flask import Blueprint, request, jsonify, render_template
from ..data_access.insert_datas import *
from ..data_access.get_datas import get_emotion_count, get_picture, get_emotion_list_db, get_total_score_per_emotion, get_emotion_count_pondere, get_total_score_per_picture
import datetime
from flask_cors import cross_origin

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


@bpapi.route("/register_answer", methods=['GET', 'POST'])
@cross_origin()  # origin=,headers=['Access-Control-Allow-Origin',])
def register_answer():
    if request.method == 'POST':
        # Get / parse datas
        request_datas = request.get_json()
        id_user = request_datas['userId']
        id_image = request_datas['imageId']
        emotion_list = {key: value for key,
                        value in enumerate(request_datas['emotions'])}
        feeling = request_datas['thought']
        ip_user = str(request.access_route[-1])
        timestamp_ans = datetime.datetime.now().timestamp()
        feeling = feeling.replace("'", " ")

        # Register the datas in the database
        register_answer_db(id_user, ip_user, feeling,
                           timestamp_ans, id_image, emotion_list)
        return jsonify()
    else:
        print("GET METHODE RECIEVED")
        return jsonify()


# Return the list of all the survey datas per image
@bpapi.route("/get_survey_datas", methods=['GET'])
@cross_origin()
def get_survey_datas():
    result = get_emotion_count()
    return jsonify(result)

@bpapi.route("/get_survey_datas_grouped", methods=['GET'])
@cross_origin()
def get_survey_datas_test_2():
    result = get_emotion_count_pondere()
    total = get_total_score_per_emotion(result)
    return jsonify(total)

@bpapi.route("/get_emotion_list", methods=['GET'])
@cross_origin()
def get_emotion_list():
    result = get_emotion_list_db()
    return jsonify(result)
