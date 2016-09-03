# -*- coding: utf-8 -*-

# Define your item pipelines here
#
# Don't forget to add your pipeline to the ITEM_PIPELINES setting
# See: http://doc.scrapy.org/en/latest/topics/item-pipeline.html

import mysql.connector
import configparser
import os

class MeiziPipeline(object):
    def process_item(self, item, spider):
        return item

class MeiziMysqlStorePipeline(object):
    def __init__(self):

        self.cfg = configparser.ConfigParser()
        self.cfg.read(os.path.abspath('./meizi/db.cfg'))
        self.cnt = mysql.connector.connect(
            user=self.cfg.get('connect', 'user'),
            password=self.cfg.get('connect', 'password'),
            host=self.cfg.get('connect', 'host'),
            database=self.cfg.get('connect', 'database')
        )
        self.cursor = self.cnt.cursor()

        self.INSERT_IMG_ITEM = (
            "INSERT INTO meizi_spider "
            "(page_num, img_url, img_md5, up_vote, down_vote) "
            "VALUES (%(page_num)s, %(img_url)s, %(img_md5)s, %(up_vote)s, %(down_vote)s)"
        )

        self.CHECK_EXISTED_ITEM = (
            "SELECT * FROM meizi_spider "
            "WHERE img_md5 = %s "
        )

    def insert_img_item(self, item):
        try:
            self.cursor.execute(
                self.INSERT_IMG_ITEM,
                dict(item)
            )
            self.cnt.commit()
        except mysql.connector.Error as err:
            print('Insert img item err {0}'.format(err))

    def existed_item(self, item):
        self.cursor.execute(
            self.CHECK_EXISTED_ITEM,
            (item['img_md5'],)
        )
        row = self.cursor.fetchone()
        return row is not None

    def process_item(self, item, spider):
        if not self.existed_item(item):
            self.insert_img_item(item)
        return item

    def close_spider(self, spider):
        self.cursor.close()
        self.cnt.close()
