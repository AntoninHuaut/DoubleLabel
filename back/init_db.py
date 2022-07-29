import sqlite3
from os.path import exists

file_exists = exists('./database/double_label_db.db')

print("FILE EXIST : ", file_exists)
if not file_exists:
    with open('./database/double_label_db.db', 'w', encoding='utf-8') as f: #creating db file
        create_db = f

    connection = sqlite3.connect('./database/double_label_db.db')

    for file in ['script_db.sql', 'insert_data.sql', 'insert_images.sql']:
        with open('./database/' + file) as f:
            connection.executescript(f.read())

    cur = connection.cursor()

    connection.commit()
    connection.close()
    print("Database created - loading")
else :
    print("Database already exists - loading")
