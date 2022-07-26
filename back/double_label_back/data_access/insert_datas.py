from .db_access import *
from .get_datas import get_answer_id, get_emotion_id
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

def register_answer_db(id_user, ip_user, feeling, timestamp_ans, id_image, emotion_list):
    cursor = get_db().cursor()
    try:
        print("INSERT INTO DL_ANSWER (id_user, ip_user, feeling, timestamp_ans, id_image) VALUES ('%s', '%s', '%s', '%s', %d)"%(id_user, ip_user, feeling, timestamp_ans, id_image))
        cursor.execute("INSERT INTO DL_ANSWER (feeling, timestamp_ans,ip_user, id_user,id_image) VALUES ('%s', '%s', '%s','%s', %d)"%(feeling, timestamp_ans, ip_user, id_user, id_image))
        get_db().commit()
        id_answer = get_answer_id(feeling, timestamp_ans, ip_user, id_user, id_image)
        print("id_answer : ", id_answer)
        for rank, emotion in emotion_list.items():
            try:
                print("Rank : ", rank, " émotion : ", emotion)
                emotion_id = get_emotion_id(emotion.lower())
                print("emotion_id : ", emotion_id)
                cursor.execute('INSERT INTO DL_EMOTION_RANK (id_answer, emotion_rank, emotion) VALUES (%d, %d, %d)'%(id_answer, rank, emotion_id))
                get_db().commit()
            except Exception as e:
                print(e)
                print("emotion insert failed")
                return -1
        return 1
    except Exception as e:
        print(e)
        print("answer insert failed")
        return -1