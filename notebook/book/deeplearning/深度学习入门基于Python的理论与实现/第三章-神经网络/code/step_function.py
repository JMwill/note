#!/usr/bin/env python
# -*- coding: utf-8 -*-
import numpy as np

# MacOS
import matplotlib.pylab as plt

# 一般实现
# def step_function(x):
#   y = x > 0
#   return y.astype(np.int)

# numpy 实现的阶跃函数
def step_function(x):
  return np.array(x > 0, dtype=np.int)

x = np.arange(-5.0, 5.0, 0.1)
y = step_function(x)
plt.plot(x, y)
plt.ylim(-0.1, 1.1) # y 轴范围
plt.show()
