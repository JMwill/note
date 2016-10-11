#!/usr/bin/env python3
'''
Finds HTTP proxies then test them and confirms the proxy is working
through multiple IP checking sites
'''
import requests
import ast          # 抽象语法分析模块
import copy         # 复制模块，提供深复制能力
import sys
import re
import time
import os
import argparse     # 处理命令行参数
import socket
from BeautifulSoup import BeautifulSoup

def parse_args():
    parser = argparse.ArgumentParser()
    parser.add_argument('-s', '--show', help='Show this number of results. Example: "-s 5" will show the 5 fastest proxies then stop')
    parser.add_argument('-a', '--all', help='Show all proxy results including the ones that failed 1 of the 3 tests', action='store_true')
    parser.add_argument('-q', '--quiet', help='Only print the IP:port of the fastest proxies that pass all the tests', action='store_true')
    return parser.parse_args()


class FindHttpProxy():
    ''' Only gather L1 proxies which should not give out IP
    or advertise that you are using a proxy at all '''
    
    def __init__(self, args):
        self.proxy_list = []
        self.headers = {'User-Agent':'Mozilla/5.0 (Windows NT 6.1; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/33.0.1750.154 Safari/537.36'}
        self.show_num = args.show
        self.show_all = args.all
        