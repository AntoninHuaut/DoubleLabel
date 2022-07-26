from .db_access import *

#TODO : fetch picture that the user never seen
def get_picture(user_code):
    cursor = get_db().cursor()
    cursor.execute("SELECT id_image FROM DL_IMAGE WHERE id_image NOT IN (SELECT id_image FROM DL_ANSWER WHERE user_code = '%s')"%user_code)
    #Pick random in result ?
    #cursor.fetchall()
    return cursor.fetchone()

#TODO Count the number of answer for each emotion
def get_emotion_count(user_code):
    return 1