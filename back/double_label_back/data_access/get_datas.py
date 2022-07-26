from .db_access import *

#TODO : fetch picture that the user never seen
def get_picture(user_code):
    cursor = get_db().cursor()
    #Pick random in result ?
    #cursor.fetchall()
    return cursor.fetchone()

#TODO Count the number of answer for each emotion and return it in a list
def get_emotion_count():
    return 1

def get_answer_id(feeling, timestamp_ans, ip_user, id_user, id_image):
    cursor = get_db().cursor()
    cursor.execute("SELECT MAX(id_answer) FROM DL_ANSWER WHERE feeling = '%s' and timestamp_ans = '%s' and ip_user = '%s' and id_user = '%s' and id_image = '%s'"%(feeling, timestamp_ans, ip_user, id_user, id_image))
    return cursor.fetchone()[0]

def get_emotion_id(emotion):
    cursor = get_db().cursor()
    cursor.execute("SELECT id_emotion FROM DL_EMOTION WHERE emotion_name = '%s'"%(emotion))
    return cursor.fetchone()[0]