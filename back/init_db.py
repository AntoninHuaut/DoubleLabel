import sqlite3

with open('./database/double_label_db.db','w', encoding = 'utf-8') as f:
    create_db = f


connection = sqlite3.connect('./database/double_label_db.db')


with open('./database/script_db.sql') as f:
    connection.executescript(f.read())

cur = connection.cursor()

connection.commit()
connection.close()
