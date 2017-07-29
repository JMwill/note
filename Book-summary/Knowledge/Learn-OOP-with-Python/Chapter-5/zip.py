#!/usr/bin/env python
# -*- coding: utf-8 -*-

'''实现在ZIP文件中查找和替换的程序, 需要用对象来代表ZIP文件和每个独立文本

确保下面3个步骤能够按顺序发生:
1. 解压缩文件
2. 执行查找和替换工作
3. 压缩新文件

类需要实现为初始化时以一个.zip文件名和查找, 替换字符串作为参数.'''
import sys
import os
import shutil
import zipfile

class ZipReplace:
    def __init__(self, filename, search_string, replace_string):
        self.filename = filename
        self.search_string = search_string
        self.replace_string = replace_string
        self.temp_directory = 'unzipped-{}'.format(filename)

    def _full_filename(self, filename):
        return os.path.join(self.temp_directory, filename)
