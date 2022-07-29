CREATE TABLE DL_EMOTION(
        id_emotion INTEGER NOT NULL,
        emotion_name VARCHAR (50) NOT NULL,
        PRIMARY KEY (id_emotion)
);

CREATE TABLE DL_EMOTION_RANK(
        id_answer INTEGER NOT NULL,
        id_emotion INTEGER NOT NULL,
        emotion_rank INTEGER,
        PRIMARY KEY (id_answer, id_emotion, emotion_rank),
        FOREIGN KEY (id_emotion) REFERENCES DL_EMOTION(id_emotion)
);

CREATE TABLE DL_IMAGE(
        id_image INTEGER NOT NULL,
        id_emotion INTEGER NOT NULL,
        PRIMARY KEY (id_image),
        FOREIGN KEY (id_emotion) REFERENCES DL_EMOTION(id_emotion)
);

CREATE TABLE DL_ANSWER(
        id_answer INTEGER NOT NULL,
        feeling TEXT NOT NULL,
        timestamp_ans TIMESTAMP,
        ip_user VARCHAR (50) NOT NULL,
        id_user VARCHAR (50) NOT NULL,
        id_image INTEGER,
        PRIMARY KEY (id_answer)
);