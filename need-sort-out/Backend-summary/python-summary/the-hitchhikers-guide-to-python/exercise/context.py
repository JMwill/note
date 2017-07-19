# -*- coding: utf-8 -*-

# 在测试文件中导入这个上下文文件能够避免
# 在测试时还需要安装开发模块
import os
import sys

sys.path.insert(0, os.path.abspath('..'))

import sample
