from .db_access import *
"""
def insert_user_db(user_code, ip_user):
    cursor = get_db().cursor()
    try:
        cursor.execute("INSERT INTO DL_USER (code_user, ip_user) VALUES ('%s', '%s')"%(user_code, ip_user))
        get_db().commit()
        return 1
    except Exception as e:
        print(e)
        print("user insert failed")
        return -1
""" 

def record_answer(emotion_list,feeling,timestamp, user_code,id_image):
    cursor = get_db().cursor()
    #Find user_code id in DB ?
    try:#TODO 
        #cursor.execute("INSERT INTO DL_ANSWER (emotion_list,feeling,timestamp,user_code,id_image) VALUES ('%s', '%s', '%s', '%s', '%s')"%(emotion_list,feeling,timestamp,user_code,id_image))
        #get_db().commit()
        return 1
    except Exception as e:
        print(e)
        print("answer insert failed")
        return -1