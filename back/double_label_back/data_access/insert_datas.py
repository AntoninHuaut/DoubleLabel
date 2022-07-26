from .db_access import *
from .get_datas import get_answer_id, get_emotion_id

def register_answer_db(id_user, ip_user, feeling, timestamp_ans, id_image, emotion_list):
    cursor = get_db().cursor()
    try:
        #Insert the answer in the database table DL_ANSWER
        cursor.execute("INSERT INTO DL_ANSWER (feeling, timestamp_ans,ip_user, id_user,id_image) VALUES ('%s', '%s', '%s','%s', %d)"%(feeling, timestamp_ans, ip_user, id_user, id_image))
        get_db().commit()
        id_answer = get_answer_id(feeling, timestamp_ans, ip_user, id_user, id_image)
        for rank, emotion in emotion_list.items():
            try:
                #Insert the emotion in the database table DL_EMOTION_RANK
                id_emotion = get_emotion_id(emotion.lower())
                cursor.execute('INSERT INTO DL_EMOTION_RANK (id_answer, emotion_rank, id_emotion) VALUES (%d, %d, %d)'%(id_answer, rank, id_emotion))
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