#!/usr/bin/env python3
# -*- coding: utf-8 -*-

from gevent import monkey
monkey.patch_all()

import time
import requests
import gevent
import json
from bs4 import BeautifulSoup
import re
import random
from os.path import abspath


class ProxyGraber():
    def __init__(self, args):
        self.headers = args['headers']
        self.test_proxy_url = args['test_proxy_url']
        self.timeout = args['timeout']
        self.proxy_provide_website = args['proxy_provide_website']
        self.proxy_list_file = args['proxy_list_file']
        self.external_ip = self.get_external_ip()

    def get_external_ip(self):
        req = requests.get('http://httpbin.org/ip', headers=self.headers)
        req_json = json.loads(req.text)
        return req_json['origin']

    def run(self):
        self.clean_proxy_list_file()
        gevent.joinall(
            [
                gevent.spawn(self.run_proxy_test('http://' + proxy))
                for proxy in self.get_proxy_list()
            ]
        )

    def clean_proxy_list_file(self):
        with open(self.proxy_list_file, 'w') as proxylist:
            proxylist.write('')

    def run_proxy_test(self, proxy):
        gevent.sleep(random.randint(0, self.timeout))
        with open(self.proxy_list_file, 'a+') as proxylist:
            try:
                requests.get(
                    self.test_proxy_url,
                    proxies={'http': proxy},
                    headers=self.headers,
                    timeout=self.timeout
                )
            except Exception as e:
                print('Useless Proxy: {}'.format(proxy))
                print(e)
            else:
                print('Working Proxy: {}'.format(proxy))
                proxylist.write(proxy + '\n')

    def get_proxy_list(self):
        return sum([fun(url, self) for url, fun in self.proxy_provide_website.items()], [])

if __name__ == '__main__':
    # test_proxy_url backup:
    # http://www.thomas-bayer.com/sqlrest/
    # http://www.posttestserver.com/
    headers = ('Mozilla/5.0 (Windows NT 6.1; WOW64) Apple'
               'WebKit/537.36 (KHTML, like Gecko) Chrome/33.0.1750.154 S'
               'afari/537.36')

    def grab_cybersyndrome(url, config):
        req = requests.get(url, headers=config.headers, timeout=config.timeout)
        addrs = re.search(r'var as=(\[[^\]]+\])', req.text)
        ports = re.search(r'var ps=(\[[^\]]+\])', req.text)
        cal = re.search(r'var n=(\([^\;]+)', req.text)
        try:
            addrs = json.loads(addrs.group(1))
            ports = json.loads(ports.group(1))
            cal = cal.group(1)
            cal = cal.replace('ps', 'ports')
        except IndexError:
            pass
        else:
            n = eval(cal)
            addrs.extend(addrs[:n])
            addrs[:n] = []
            ziped_addrs = list(zip(
                addrs[::4],
                addrs[1::4],
                addrs[2::4],
                addrs[3::4]
            ))
            addrs = ['.'.join(map(str, ips)) for ips in ziped_addrs]
            addrs = [addrs[i] + ':' + str(ports[i]) for i in range(len(addrs))]
            return addrs

    def grab_cn_proxy(url, config):
        pass
        req = requests.get(
            url,
            headers=config.headers,
            timeout=config.timeout,
            proxies={'http': 'http://106.185.39.120:3128'}
        )
        print(req.text)

    proxy_graber = ProxyGraber({
        'headers': {'User-Agent': headers},
        'timeout': 5,
        'test_proxy_url': 'http://httpbin.org/ip',
        'proxy_provide_website': {
            'http://www.cybersyndrome.net/search.cgi?q=CN': grab_cybersyndrome,
            # 'http://cn-proxy.com/': grab_cn_proxy
        },
        'proxy_list_file': abspath('../../resource/working-proxy.txt')
    })

    # 定期运行
    proxy_graber.run()
