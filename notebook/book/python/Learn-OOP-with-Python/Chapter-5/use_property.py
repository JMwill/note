#!/usr/bin/env python
# -*- coding: utf-8 -*-
'''Java 中会提倡不要直接访问属性, 因此需要一些 get 与 set 方法
但是在 Python 中, 可以对这种类型的行为与数据分离的方式做一些特有
的处理, 这样能够避免由于访问属性的方式的改变而导致使用者的代码崩溃
'''

class Color:
    def __init__(self, rgb_value, name):
        self._rgb_value = rgb_value
        self._name = name

    def set_name(self, name):
        self._name = name

    def get_name(self):
        return self._name


'''之所以会这么做, 是因为有可能会在设置值或获取值时执行一些额外的
校验或者操作, 这个时候可以在对应的方法内实现对应的逻辑'''
class Color:
    def __init__(self, rgb_value, name):
        self._rgb_value = rgb_value
        self._name = name

    def set_name(self, name):
        if not name:
            raise Exception('Invalid Name')
        self._name = name

    def get_name(self):
        return self._name


'''实际上, Python 提供名为 property 的方法来对属性的设置与取值
进行额外的限制'''
class Color:
    def __init__(self, rgb_value, name):
        self._rgb_value = rgb_value
        self._name = name

    # def _set_name(self, name):
    #     if not name:
    #         raise Exception('Invalid Name')
    #     self._name = name

    # def _get_name(self):
    #     return self._name

    # def _del_name(self):
    #     print('The name deleted')
    #     del self._name

    # name = property(_get_name, _set_name, _del_name, 'Descripe name property')


    # 使用装饰器来设置, 但是装饰器无法设置描述, 只能用
    # getter里面的描述
    @property # 定义了一个getter
    def name(self):
        'Descripe name property'
        return self._name

    @name.setter
    def name(self, name):
        self._name = name

    @name.deleter
    def name(self):
        del self._name


c = Color('#fff', 'white')
del c.name
c.name = ''
print(c.name)
