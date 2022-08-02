from numpy import cumprod
from .db_access import *
import random
id_images = []

#TODO : fetch picture that the user never seen
def get_picture(id_user):
    global id_images

    if len(id_images) == 0:
        init_id_images()
    
    #Get images seen by the user
    cursor = get_db().cursor()
    cursor.execute("SELECT id_image FROM DL_ANSWER WHERE id_user = '%s' GROUP BY id_image"%(id_user))
    pics_showned_list = []
    for element in cursor.fetchall():
        pics_showned_list.append(element[0])

    if len(pics_showned_list) >= len(id_images):
        return -2 #All pictures have been shown
    
    available_images = [picture for picture in id_images if picture not in pics_showned_list]
    return available_images[random.randint(0, len(available_images)-1)]
    

#TODO Count the number of answer for each emotion and return it in a list
def get_emotion_count():
    cursor = get_db().cursor()
    cursor.execute("SELECT id_image, id_emotion, emotion_name, emotion_rank, count(*) as total_per_emotion FROM DL_ANSWER\
                    JOIN DL_EMOTION_RANK using (id_answer)\
                    JOIN DL_EMOTION using (id_emotion)\
                    GROUP BY emotion_name, emotion_rank,id_image;")
    
    #Gathering results
    results_list = {}
    for element in cursor.fetchall():
        if results_list.get(element['id_image'], 404) == 404: #if the image is not in the list
            results_list[element['id_image']] = {"emotion": get_real_emotion(element['id_image']), "ranks":{}, "points" :{} }
            if results_list[element['id_image']]["ranks"].get(element['emotion_name'], 404) == 404: #if the emotion is not in the list
                results_list[element['id_image']]["ranks"][element['emotion_name']] = [0,0,0,0,0,0,0,0] #initilize the list
                results_list[element['id_image']]["ranks"][element['emotion_name']][element['emotion_rank']] = element['total_per_emotion']
            else :
                results_list[element['id_image']]["ranks"][element['emotion_name']][element['emotion_rank']] = element['total_per_emotion']
        else:
            if results_list[element['id_image']]["ranks"].get(element['emotion_name'], 404) == 404:
                results_list[element['id_image']]["ranks"][element['emotion_name']] = [0,0,0,0,0,0,0,0] #initilize the list
                results_list[element['id_image']]["ranks"][element['emotion_name']][element['emotion_rank']] = element['total_per_emotion']
            else:
                results_list[element['id_image']]["ranks"][element['emotion_name']][element['emotion_rank']] = element['total_per_emotion']
    
    for key in results_list.keys():
        results_list[key]['points'] = get_emotions_total(results_list[key]['ranks'])
    return results_list

def get_answer_id(feeling, timestamp_ans, ip_user, id_user, id_image):
    cursor = get_db().cursor()
    cursor.execute("SELECT MAX(id_answer) FROM DL_ANSWER WHERE feeling = '%s' and timestamp_ans = '%s' and ip_user = '%s' and id_user = '%s' and id_image = '%s'"%(feeling, timestamp_ans, ip_user, id_user, id_image))
    return cursor.fetchone()[0]

def get_emotion_id(emotion):
    cursor = get_db().cursor()
    cursor.execute("SELECT id_emotion FROM DL_EMOTION WHERE emotion_name = '%s'"%(emotion))
    return cursor.fetchone()[0]

def get_emotion_list_db():
    cursor = get_db().cursor()
    cursor.execute("SELECT emotion_name FROM DL_EMOTION")
    emotion_list = []
    for element in cursor.fetchall():
        emotion_list.append(element[0])

    return emotion_list

def init_id_images():
    global id_images
    cursor_start = get_db().cursor()
    cursor_start.execute("SELECT id_image FROM DL_IMAGE")
    for element in cursor_start.fetchall():
        id_images.append(element[0])

def get_real_emotion(id_image):
    cursor = get_db().cursor()
    cursor.execute("SELECT emotion_name FROM DL_EMOTION where id_emotion = ( SELECT id_emotion FROM DL_IMAGE where id_image = '%d')"%(id_image))
    return cursor.fetchone()[0]

def get_emotions_total(scores):
    total_per_emotion = {}
    for element in scores.keys():
        total_per_emotion[element] = 0 
        for index, number in enumerate(scores[element]):
            total_per_emotion[element] += result_ponderation(index, int(number))    

    return total_per_emotion

def result_ponderation(rank, total_per_emotion=1):
    match rank:
        case 0:
            return 4 * total_per_emotion
        case 1:
            return 3.5 * total_per_emotion
        case 2:
            return 3 * total_per_emotion
        case 3:
            return 2.5 * total_per_emotion
        case 4:
            return 2 * total_per_emotion
        case 5:
            return 1.5 * total_per_emotion
        case 6:
            return 1 * total_per_emotion
        case 7:
            return 0.5 * total_per_emotion
    return 0

def get_user_count():
    cursor = get_db().cursor()
    cursor.execute("SELECT distinct id_user FROM DL_ANSWER")
    return {"users":len(cursor.fetchall())}

def get_picture_seen_count(id_user):
    cursor = get_db().cursor()
    cursor.execute("SELECT count(*) as total from DL_ANSWER where id_user ='%s'"%(id_user))
    return cursor.fetchone()['total']
