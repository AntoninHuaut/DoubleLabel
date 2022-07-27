from pickle import FALSE
from flask import Blueprint, request, redirect, jsonify
from ..data_access.insert_datas import *
from ..data_access.get_datas import get_emotion_count, get_picture
import datetime 

bpapi = Blueprint('api/v1', __name__, url_prefix='/api/v1')

@bpapi.route("/")
def home():
    return "Accueil"

@bpapi.route("/get_image", methods=['GET'])
def send_picture():
    id_user = "5I9DEXH2"
    get_picture(id_user)
    # Send the data to the server
    return jsonify(15) #image id

@bpapi.route("/register_answer", methods=['GET','POST'])
def register_answer():
    if request.method == 'POST':
        id_user = request.form['userId']
        id_image = request.form['imageId']
        emotion_list = request.form['emotion'] #TODO convert in dict ?
        feeling = request.form['thought']
        print("POST METHODE REQUEST")
        ip_user = str(request.remote_addr)
        timestamp_ans = datetime.datetime.now().timestamp()
        print(timestamp_ans)
        #id_user = "5I9DEXH2"
        #feeling = "i think it's surprise because eyebrows are up"
        #id_image = 1
        #emotion_list  ={0:"irritated",1:"surprise"}

        feeling = feeling.replace("'"," ")
        # Register the datas in the database
        print("Registering the datas {} {} {} {} {} {}".format(id_user, id_image, emotion_list, feeling, ip_user, timestamp_ans))
        #result = register_answer_db(id_user, ip_user, feeling, timestamp_ans, id_image, emotion_list)
        result = True
    else :
        print("GET METHODE RECIEVED")
        result = False
        
    if result == 1:
        return 'OK'
    else:
        return 'KO'

@bpapi.route("/get_survey_datas", methods=['GET']) #Return the list of all the survey datas per image
def get_survey_datas():
    result = get_emotion_count()
    return jsonify(result)