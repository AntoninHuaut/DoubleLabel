from flask import Blueprint, request, jsonify
from ..data_access.insert_datas import *
from ..data_access.get_datas import get_emotion_count, get_picture, get_emotion_list_db
import datetime 
from flask_cors import cross_origin

bpapi = Blueprint('api/v1', __name__, url_prefix='/api/v1')

@bpapi.route("/")
def home():
    return "Accueil"

@bpapi.route("/get_image", methods=['GET','POST'])
@cross_origin()
def send_picture():
    if request.method == 'POST':
        #id_user = "5e3ef928-c8f7-42cb-a5f5-156651fb8715" #request.get_json['userId']
        request_datas = request.get_json()
        new_image = get_picture(request_datas['userId']) # get a picture id to return
        # Send the data to the server
        #print(new_image)
        return jsonify({"id":new_image}) #image id
    else :
        return jsonify(-1) #error


@bpapi.route("/register_answer", methods=['GET','POST'])
@cross_origin()#origin=,headers=['Access-Control-Allow-Origin',])
def register_answer():
    if request.method == 'POST':
        #Get / parse datas
        request_datas = request.get_json()
        id_user = request_datas['userId']
        id_image = request_datas['imageId']
        emotion_list = {key:value for key,value  in enumerate(request_datas['emotions'])}
        emotion_list = clear_emotion_values(emotion_list)
        feeling = request_datas['thought']
        ip_user = str(request.remote_addr)
        timestamp_ans = datetime.datetime.now().timestamp()
        feeling = feeling.replace("'"," ")

        # Register the datas in the database
        #print("Registering the datas {} {} {} {} {} {}".format(id_user, id_image, emotion_list, feeling, ip_user, timestamp_ans))
        register_answer_db(id_user, ip_user, feeling, timestamp_ans, id_image, emotion_list)
        return jsonify()
    else :
        print("GET METHODE RECIEVED")
        return jsonify()


@bpapi.route("/get_survey_datas", methods=['GET']) #Return the list of all the survey datas per image
def get_survey_datas():
    result = get_emotion_count()
    return jsonify(result)

@bpapi.route("/get_emotion_list", methods=['GET'])
def get_emotion_list():
    result = get_emotion_list_db()
    return jsonify(result)

def clear_emotion_values(emotion_list):
    for key, value in emotion_list.items():
        if "(" in value:
            emotion_list[key] = " ".join(value.split("(")[0].split(" ")).lower().strip()

    return jsonify(emotion_list)