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