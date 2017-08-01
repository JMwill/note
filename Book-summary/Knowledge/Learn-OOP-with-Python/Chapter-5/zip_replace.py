#!/usr/bin/env python
# -*- coding: utf-8 -*-

'''实现在ZIP文件中查找和替换的程序, 需要用对象来代表ZIP文件和每个独立文本

确保下面3个步骤能够按顺序发生:
1. 解压缩文件
2. 执行查找和替换工作
3. 压缩新文件

类需要实现为初始化时以一个.zip文件名和查找, 替换字符串作为参数.'''

# 使用 ZipProcessor 超类并修复旧有的 ZipReplace 类因引入父类带来的错误
from zip_processor import ZipProcessor
import sys
import os

class ZipReplace (ZipProcessor):
	def __init__(self, filename, search_string, replace_string):
		super().__init__(filename)
		self.search_string = search_string
		self.replace_string = replace_string

	def process_files(self):
		'''perform a search and replace on all files in the temporary directory'''
		for filename in os.listdir(self.temp_directory):
			with open(self._full_filename(filename)) as file:
				contents = file.read()
			contents = contents.replace(self.search_string, self.replace_string)
			with open(self._full_filename(filename), 'w') as file:
				file.write(contents)

if __name__ == '__main__':
	ZipReplace(*sys.argv[1: 4]).process_zip()
