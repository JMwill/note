#!/usr/bin/env python3
# -*- coding: utf-8 -*-
import sys
from math import ceil, sqrt, floor

print(sys.argv)
try:
    num = int(sys.argv[1])
except Exception:
    num = 600851475143

def is_prime(num):
    if num == 2:
        return True
    for i in range(2, ceil(sqrt(num)) + 1):
        if int(num / i) * i == num:
            return False
    return True

prime_nums = []
factor_nums = []

# 方法一：
# for i in range(2, ceil(num / 2)):
    # if int(num / i) * i == num:
        # factor_nums.append(i)

# for i in factor_nums:
    # if is_prime(i):
        # prime_nums.append(i)

# 方法二：
def cal_prime():
    pri_num = 2
    while True:
        if is_prime(pri_num):
            yield pri_num
        pri_num += 1

next_prime = cal_prime()

for i in next_prime:
    while int(num / i) * i == num:
        prime_nums.append(i)
        num = int(num / i)
    if is_prime(num):
        prime_nums.append(num)
        break

print(prime_nums)

