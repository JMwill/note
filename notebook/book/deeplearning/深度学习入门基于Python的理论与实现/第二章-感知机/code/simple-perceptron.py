#!/usr/bin/python
# -*- coding: utf-8 -*-
import numpy as np

# 普通的与门实现
def AND(x1, x2):
  w1, w2, theta = .5, .5, .7
  tmp = x1*w1 + x2*w2
  return 0 if tmp <= theta else 1

# 使用 NumPy 实现
def AND(x1, x2):
  x = np.array([x1, x2])
  w = np.array([.5, .5])
  b = -.7
  tmp = np.sum(w*x) + b
  return 0 if tmp <= 0 else 1

def NAND(x1, x2):
  x = np.array([x1, x2])
  w = np.array([-.5, -.5]) # 仅权重和偏置与 AND 不同
  b = .7
  tmp = np.sum(w*x) + b
  return 0 if tmp <= 0 else 1

def OR(x1, x2):
  x = np.array([x1, x2])
  w = np.array([.5, .5]) # 仅权重和偏置与 AND 不同
  b = .2
  tmp = np.sum(w*x) + b
  return 0 if tmp <= 0 else 1

# 异或门实现
def XOR(x1, x2):
  s1 = NAND(x1, x2)
  s2 = OR(x1, x2)
  y = AND(s1, s2)
  return y

if __name__ == '__main__':
  pass
