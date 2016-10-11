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
    parser.add_argument
