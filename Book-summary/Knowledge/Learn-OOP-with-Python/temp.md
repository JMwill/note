property 是另一种抽象对象, 而方法则是可以改变这些抽象对象状态的动作, 但是对象本质上仍是是具体的 property 和定义好的行为两者的集合

### 移除重复代码

DRY 最终归结于可读性和可维护性上,

例子上, 通过提升原始的 ZipReplace 类, 将其变成一个能够处理通用 ZIP 文件的超类.

```py
import os
import shutil
import zipfile

class ZipProcessor (object):
	def __init__(self, zipname):
		self.zipname = zipname
		self.temp_directory = 'unzipped-{}'.format(zipname[:-4])
	
	def _full_filename(self, filename):
		return os.path.join(self.temp_directory, filename)
	
	def process_zip(self):
		self.unzip_files()
		self.process_files()
		self.zip_files()
		
	def unzip_files(self):
		os.mkdir(self.temp_directory)
		zip = zipfile.ZipFile(self.zipname)
		try:
			zip.extractall(self.temp_directory)
		finally:
			zip.close()
		
	def zip_files(self):
		file = zipfile.ZipFile(self.zipname, 'w')
		for filename in os.listdir(self.temp_directory):
			file.write(self._full_filename(filename), filename)
		shutil.rmtree(self.temp_directory)
```
	
```py
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
```
