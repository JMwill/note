# 创建一个Python

首先要建立一个`setup.py`文件

```python
from distutils.core import setup

setup(
    name = 'module name',
    version = '0.0.0',
    py_modules = ['module_one'],
    author = 'your name',
    author_email = 'your email',
    url = 'your site',
    description = 'module description',
)
```

创建完成`setup.py`文件后, 通过: `python3 setup.py sdist`来构建一个发布文件, 可以通过`sudo python3 setup.py install`来进行安装. 之后就可以通过`import 模块名`或者`from module_name import function`来对模块进行引用.

可以在[PyPI][1]网站上注册一个帐号, 并把已经写好的模块提交到这个网站上. 在注册完后需要在命令行来进行一些操作: `python3 setup.py register`, 这个操作用于验证你在PyPI上的注册并保存登录信息到相应的地方. 然后通过`python3 setup.py sdist upload`来上传并发布模块, 

[1]: http://pypi.python.org