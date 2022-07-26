CREATE TABLE DL_USER(
        id_user      INTEGER NOT NULL PRIMARY KEY,
        code_user   Varchar (50) NOT NULL,
        ip_user     Varchar (50) NOT NULL
);

CREATE TABLE DL_IMAGE(
        id_image   INTEGER  NOT NULL PRIMARY KEY,
        img_path   Varchar (300) NOT NULL
);

CREATE TABLE DL_EMOTION(
        id_emotion   INTEGER  NOT NULL PRIMARY KEY,
        emotion_name Varchar (50) NOT NULL
);

CREATE TABLE DL_ANSWER(
        id_answer          INTEGER NOT NULL,
        emotion_list  Varchar (300) NOT NULL ,
        feeling Varchar (800) NOT NULL,
        id_user INTEGER,
        id_image INTEGER,
        emotion INTEGER,
    FOREIGN KEY (id_user) REFERENCES DL_USER(id_user),
    FOREIGN KEY (id_image) REFERENCES DL_IMAGE(id_image),
    FOREIGN KEY (emotion) REFERENCES DL_EMOTION(id_emotion),
    PRIMARY KEY (id_answer,id_user,id_image)
);
