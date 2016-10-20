#!/usr/bin/env python3
# -*- coding: utf-8 -*-

from gevent import monkey
monkey.patch_socket()

import requests
import random
import gevent
import json
from datetime import datetime
import shutil
import hashlib
import os
import time
import mysql.connector
import signal
from requests.exceptions import RequestException
from gevent.event import Event


class Downloader(object):
    def __init__(self):
        with open('./_config.json', 'r') as f:
            self._config = json.load(f)

        self.GET_DOWNLOAD_URL = (
            "SELECT img_md5, img_url FROM meizi_spider "
            "WHERE downloaded = FALSE LIMIT 0 , 30"
        )

        self.UPDATE_IMG_ITEM = (
            "UPDATE meizi_spider "
            "SET downloaded=%(downloaded)s "
            "WHERE img_md5=%(img_md5)s"
        )

        self.evt = Event()

        self.img_download_pool = []

        try:
            with open(self._config['proxy_path'], 'r') as f:
                self.proxies_list = f.readlines()
        except Exception as e:
            self.log('load proxy list with Error: {}'.format(e))

    def log(self, msg):
        time_str = '-'.join(str(datetime.now()).split(' ')).split('.')[0]
        line_limit = 2000
        try:
            with open('./download.log', 'r+') as f:
                lines = f.readlines()
                f.seek(0)
                if len(lines) > line_limit:
                    lines = lines[len(lines) - line_limit:]
                lines.append('{}-{}\n'.format(time_str, msg))
                f.writelines(lines)
        except FileNotFoundError as e:
            with open('./download.log', 'w') as f:
                f.write('{}-{}\n'.format(time_str, msg))

    def download_img(self, url, sign):
        gevent.sleep(self.wait_random_time())
        try:
            res = requests.get(url,
                               headers=self._config['headers'],
                               timeout=self._config['timeout'],
                               proxies=self.proxies_list,
                               stream=True)
            if res.status_code == 200:
                self.save_img(res, sign)
        except Exception as e:
            self.log('Picture Could Download: {}-with Error: {}'.format(url, e))
            self.update_state(sign)

    def save_img(self, res, sign):
        hash_obj = hashlib.md5()
        hash_obj.update(res.content)
        code = hash_obj.hexdigest()
        extend_type = res.headers['content-type'].split('/')[-1]
        save_path = os.path.abspath(
            '{}/{}.{}'.format(self._config['save_img_path'], code, extend_type))

        with open(save_path, 'wb') as f:
            # res.raw.decode_content = True
            # shutil.copyfileobj(res.raw, f)
            for chunk in res:
                f.write(chunk)

            self.update_state(sign)

    def get_db_items(self):
        try:
            cnt = mysql.connector.connect(
                **self._config['dbconfig']
            )
            cursor = cnt.cursor()
            cursor.execute(self.GET_DOWNLOAD_URL)
            row = cursor.fetchall()
            cursor.close()
            cnt.close()
            return row
        except Exception as err:
            self.log('Get Image Db Error: {}'.format(err))
            return []

    def download(self):
        db_items = self.get_db_items()
        if len(db_items) == 0:
            self.log('All Images Downloaded')
            return
        for item in db_items:
            urls = item[1].split(';')
            sign = item[0]
            for url in urls:
                self.img_download_pool.append(gevent.spawn(
                    self.download_img, url.strip(), sign
                ))
        gevent.joinall(self.img_download_pool)

    def update_state(self, sign):
        try:
            cnt = mysql.connector.connect(
                **self._config['dbconfig']
            )
            update_obj = {'img_md5': sign, 'downloaded': True}
            cursor = cnt.cursor()
            cursor.execute(
                self.UPDATE_IMG_ITEM,
                update_obj
            )
            cnt.commit()
            cursor.close()
            cnt.close()
        except mysql.connector.Error as err:
            self.log('Update img item err {0}'.format(err))

    def wait_random_time(self):
        return random.randint(1, self._config['wait_time'])


if __name__ == '__main__':
    downloader = Downloader()
    gevent.signal(signal.SIGQUIT, gevent.kill)
    while True:
        status = [spawn.ready() for spawn in downloader.img_download_pool]
        if all(status):
            downloader.img_download_pool = []
            downloader.download()
        time.sleep(downloader._config['wait_time'])
