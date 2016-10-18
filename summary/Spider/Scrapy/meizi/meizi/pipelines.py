# -*- coding: utf-8 -*-

# Define your item pipelines here
#
# Don't forget to add your pipeline to the ITEM_PIPELINES setting
# See: http://doc.scrapy.org/en/latest/topics/item-pipeline.html

import mysql.connector
import configparser
import os

import scrapy
from scrapy.pipelines.images import ImagesPipeline
from scrapy.exceptions import DropItem


class MeiziImagesPipeline(ImagesPipeline):
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

        self.GET_EXIST_ITEM = (
            "SELECT downloaded FROM meizi_spider "
            "WHERE img_md5 = %s "
        )

        self.UPDATE_IMG_ITEM = (
            "UPDATE meizi_spider "
            "SET downloaded=%(downloaded)s "
            "WHERE img_md5=%(img_md5)s"
        )

    def exist_item_images_downloaded(self, item):
        self.cursor.execute(
            self.GET_EXIST_ITEM,
            (item['img_md5'],)
        )
        row = self.cursor.fetchone()
        return row

    def update_img_item(self, item):
        try:
            tmp_dict = {
                'img_md5': item.img_md5,
                'downloaded': True,
            }
            self.cursor.execute(
                self.UPDATE_IMG_ITEM,
                tmp_dict
            )
            self.cnt.commit()
        except mysql.connector.Error as err:
            print('Update img item err {0}'.format(err))

        # close db
        self.cursor.close()
        self.cnt.close()

    def get_media_requests(self, item, info):
        if not self.exist_item_images_downloaded(item):
            for image_url in item['image_urls']:
                yield scrapy.Request(image_url)

    def item_completed(self, results, item, info):
        self.update_img_item(item)
        image_paths = [x['path'] for ok, x in results if ok]
        if not image_paths:
            raise DropItem('Item contains no images')
        item['image_paths'] = image_paths
        return item


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

        self.UPDATE_IMG_ITEM = (
            "UPDATE meizi_spider "
            "SET up_vote=%(up_vote)s, down_vote=%(down_vote)s "
            "WHERE img_md5=%(img_md5)s"
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

    def update_img_item(self, item):
        try:
            self.cursor.execute(
                self.UPDATE_IMG_ITEM,
                dict(item)
            )
            self.cnt.commit()
        except mysql.connector.Error as err:
            print('Update img item err {0}'.format(err))

    def not_existed_item(self, item):
        self.cursor.execute(
            self.CHECK_EXISTED_ITEM,
            (item['img_md5'],)
        )
        row = self.cursor.fetchone()
        return row is None

    def process_item(self, item, spider):
        if self.not_existed_item(item):
            self.insert_img_item(item)
        else:
            self.update_img_item(item)
        return item

    def close_spider(self, spider):
        self.cursor.close()
        self.cnt.close()
