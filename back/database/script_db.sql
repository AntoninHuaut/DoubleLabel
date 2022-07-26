CREATE TABLE DL_EMOTION(
        id_emotion   INTEGER  NOT NULL PRIMARY KEY,
        emotion_name Varchar (50) NOT NULL
);

CREATE TABLE DL_EMOTION_RANK(
        id_answer INTEGER NOT NULL,
        emotion  INTEGER NOT NULL ,
        emotion_rank INTEGER,
        FOREIGN KEY (emotion) REFERENCES DL_EMOTION(id_emotion),
        PRIMARY KEY (id_answer,emotion,emotion_rank)
);

CREATE TABLE DL_ANSWER(
        id_answer          INTEGER NOT NULL,
        feeling Varchar (800) NOT NULL,
        timestamp_ans Varchar (50) NOT NULL,
        ip_user Varchar (50) NOT NULL,
        id_user INTEGER,
        id_image INTEGER,
    PRIMARY KEY (id_answer)
);
