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
                    GROUP BY emotion_rank, id_image;")
    
    #Gathering results
    results_list = {}
    for element in cursor.fetchall():
        if results_list.get(element['id_image'], 404) == 404:
            results_list[element['id_image']] = {}
            if results_list[element['id_image']].get(element['emotion_name'], 404) == 404: #if the emotion is not in the list
                results_list[element['id_image']][element['emotion_name']] = [0,0,0,0,0,0,0,0]
                results_list[element['id_image']][element['emotion_name']][element['emotion_rank']] = result_ponderation(element['emotion_rank'])
            else :
                results_list[element['id_image']][element['emotion_name']][element['emotion_rank']] += result_ponderation(element['emotion_rank'])
        else:
            if results_list.get(element['emotion_name'], 404) == 404: #if the emotion is not in the list
                results_list[element['id_image']][element['emotion_name']] = [0,0,0,0,0,0,0,0]
                results_list[element['id_image']][element['emotion_name']][element['emotion_rank']] = result_ponderation(element['emotion_rank'])
            else :
                results_list[element['id_image']][element['emotion_name']][element['emotion_rank']] += result_ponderation(element['emotion_rank'])

    return results_list
"""if results_list.get(element['id_image'],404) == 404:
    results_list[element['id_image']] = [{'rank':element['emotion_rank'],'id_emotion': element['id_emotion'], 'emotion_name': element['emotion_name'], 'total_per_emotion': element['total_per_emotion']}]
    else:
         results_list[element['id_image']].append({'rank':element['emotion_rank'],'id_emotion': element['id_emotion'], 'emotion_name': element['emotion_name'], 'total_per_emotion': element['total_per_emotion']})
"""

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



def get_emotion_count_pondere():
    cursor = get_db().cursor()
    cursor.execute("SELECT id_image, id_emotion, emotion_name, emotion_rank, count(*) as total_per_emotion FROM DL_ANSWER\
                    JOIN DL_EMOTION_RANK using (id_answer)\
                    JOIN DL_EMOTION using (id_emotion)\
                    GROUP BY emotion_rank, id_image;")
    
    #Gathering results
    results_list = {}
    for element in cursor.fetchall():
        if results_list.get(element['id_image'], 404) == 404:
            results_list[element['id_image']] = {}
            if results_list[element['id_image']].get(element['emotion_name'], 404) == 404: #if the emotion is not in the list
                results_list[element['id_image']][element['emotion_name']] = [0,0,0,0,0,0,0,0]
                results_list[element['id_image']][element['emotion_name']][element['emotion_rank']] = result_ponderation(element['emotion_rank'])
            else :
                results_list[element['id_image']][element['emotion_name']][element['emotion_rank']] += result_ponderation(element['emotion_rank'])
        else:
            if results_list.get(element['emotion_name'], 404) == 404: #if the emotion is not in the list
                results_list[element['id_image']][element['emotion_name']] = [0,0,0,0,0,0,0,0]
                results_list[element['id_image']][element['emotion_name']][element['emotion_rank']] = result_ponderation(element['emotion_rank'])
            else :
                results_list[element['id_image']][element['emotion_name']][element['emotion_rank']] += result_ponderation(element['emotion_rank'])

    return results_list

def get_total_score_per_emotion(result):
    emotion_scores_per_image = {}
    for element in result.keys():
        emotion_scores_per_image[element] = get_emotions_size(result[element])
    return emotion_scores_per_image

def get_emotions_size(emotion_list):
    print(emotion_list)
    emotion_size = {}
    for emotion in emotion_list.keys():
        if(emotion_size.get(emotion, 404) == 404):
            emotion_size[emotion] = sum_scores(emotion_list[emotion])

    return emotion_size

def sum_scores(scores):
    print(scores)
    total = 0
    for element in scores:
        total += element
    print(total)
    return total


def result_ponderation(rank):
    match rank:
        case 0:
            return 11
        case 1:
            return 10
        case 2:
            return 9
        case 3:
            return 8
        case 4:
            return 7
        case 5:
            return 6
        case 6:
            return 5
        case 7:
            return 4
        case 8:
            return 3
        case 9:
            return 2
        case 10:
            return 1
    return 0