from .db_access import *
import random
pictures_number = 404

#TODO : fetch picture that the user never seen
def get_picture(id_user):
    global pictures_number
    cursor = get_db().cursor()
    cursor.execute("SELECT id_image FROM DL_ANSWER WHERE id_user = '%s' GROUP BY id_image"%(id_user))
    pics_showned_list = []
    for element in cursor.fetchall():
        pics_showned_list.append(element[0])

    if len(pics_showned_list) >= pictures_number:
        return -2 #All pictures have been shown
    #Pick random not in pics_showned_list ?
    
    #print(pics_showned_list)
    new_image = random.randint(0,pictures_number)
    while new_image in pics_showned_list:
        new_image = random.randint(0,pictures_number)
    return new_image

#TODO Count the number of answer for each emotion and return it in a list
def get_emotion_count():
    cursor = get_db().cursor()
    cursor.execute("SELECT id_image, id_emotion, emotion_name, emotion_rank, count(*) as total_per_emotion FROM DL_ANSWER\
                    JOIN DL_EMOTION_RANK using (id_answer)\
                    JOIN DL_EMOTION using (id_emotion)\
                    GROUP BY id_emotion, emotion_rank, id_image;")
    
    #Gathering results
    results_list = {}
    for element in cursor.fetchall():
        print('rank', element['emotion_rank'],'id_emotion', element['id_emotion'], 'emotion_name', element['emotion_name'], 'total_per_emotion', element['total_per_emotion'])
        if results_list.get(element['id_image'],404) == 404:
            results_list[element['id_image']] = [{'rank':element['emotion_rank'],'id_emotion': element['id_emotion'], 'emotion_name': element['emotion_name'], 'total_per_emotion': element['total_per_emotion']}]
        else:
            results_list[element['id_image']].append({'rank':element['emotion_rank'],'id_emotion': element['id_emotion'], 'emotion_name': element['emotion_name'], 'total_per_emotion': element['total_per_emotion']})

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