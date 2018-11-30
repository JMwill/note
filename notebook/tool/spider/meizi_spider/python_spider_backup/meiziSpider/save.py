import mysql.connector
import json
from mysql.connector import errorcode

with open('./config/db.json', 'r') as dbConfig:
    dbConfig = json.load(dbConfig)

def getCnt():
    try:
        cnt = mysql.connector.connect(**dbConfig)
    except mysql.connector.Error as err:
        if err.errno == errorcode.ER_ACCESS_DENIED_ERROR:
            print('User name or password wrong!')
        elif err.errno == errorcode.ER_BAD_DB_ERROR:
            print('Database does not exist!')
        else:
            print(err)
        return None
    else:
        return cnt

def insert_new_record(cursor, vals):
    sql = (
        "INSERT INTO {table} "
        "(page_num, original_url, img_up, img_down, img_md5, downloaded) "
        "VALUES "
        "({page_num}, {original_url}, {img_up}, {img_down}, {img_md5}, {downloaded})"
    )
    cursor.exec(sql.format(**vals))

def update_record(cursor, vals):
    sql = (
        "UPDATE {table} SET "
        "(img_up={img_up}, img_down={img_down}) "
        "WHERE id={id}"
    )
    cursor.exec(sql.format(**vals))

def saveToDatabase(result):
    result = True
    if 'nextPage' not in result:
        print('without next page')
        result = False



