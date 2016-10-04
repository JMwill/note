# -*- coding: utf-8 -*-
import itertools
import time # 计算时间用
from functools import reduce

# 核心代码
def imright(h1, h2):
	"House h1 is immediately right of h2 if h1-h2 == 1."
	return h1 - h2 == 1

def nextto(h1, h2):
	"Two houses are next to each other if they differ by 1."
	return abs(h1 - h2) == 1


# 初始版本，耗时2~3个小时
def zebra_puzzle_version_1():
	"Return a tuple (WATER ZEBRA) indicating their house numbers."
	houses = first, _, middle, _, _ = [1, 2, 3, 4, 5]
	orderings = list(itertools.permutations(houses)) #1
	return next((WATER, ZEBRA)
			for (red, green, ivory, yellow, blue) in orderings
			for (Englishman, Spaniard, Ukranian, Japanese, Norwegian) in orderings
			for (dog, snails, fox, horse, ZEBRA) in orderings
			for (coffee, tea, milk, oj, WATER) in orderings
			for (OldGold, Kools, Chesterfields, LuckyStrike, Parliaments) in orderings
			if Englishman is red
			if Spaniard is dog
			if coffee is green
			if Ukranian is tea
			if imright(green, ivory)
			if OldGold is snails
			if Kools is yellow
			if milk is middle
			if Norwegian is first
			if nextto(Chesterfields, fox)
			if nextto(Kools, horse)
			if LuckyStrike is oj
			if Japanese is Parliaments
			if nextto(Norwegian, blue)
			)


# 改善版本，通过调整退出时机，减少处理的数量
def zebra_puzzle_version_2():
	"Return a tuple (WATER ZEBRA) indicating their house numbers."
	houses = first, _, middle, _, _ = [1, 2, 3, 4, 5]
	orderings = list(itertools.permutations(houses)) #1
	return next((WATER, ZEBRA)
			for (red, green, ivory, yellow, blue) in c(orderings)
			if imright(green, ivory)
			for (Englishman, Spaniard, Ukranian, Japanese, Norwegian) in c(orderings)
			if Englishman is red
			if Norwegian is first
			if nextto(Norwegian, blue)
			for (coffee, tea, milk, oj, WATER) in c(orderings)
			if coffee is green
			if Ukranian is tea
			if milk is middle
			for (OldGold, Kools, Chesterfields, LuckyStrike, Parliaments) in c(orderings)
			if Kools is yellow
			if LuckyStrike is oj
			if Japanese is Parliaments
			for (dog, snails, fox, horse, ZEBRA) in c(orderings)
			if Spaniard is dog
			if OldGold is snails
			if nextto(Chesterfields, fox)
			if nextto(Kools, horse)
			)

# 效率测试代码
# 计时函数
def timedcall(fn, *args):
	"Call function with args; return the time in seconds and result."
	t0 = time.clock()
	result = fn(*args)
	t1 = time.clock()
	return t1 - t0, result

def timedcalls(n, fn, *args):
	"Call function n times with args; return the min, avg, and max time."
	results = [timedcall(fn, *args)[0] for _ in range(n)]
	return max(results), average(results), min(results)

def timedcalls_version_2(n, fn, *args):
	"""Call fn(*args) repeatedly: n times if n is an int, or up
	to n seconds if n is a float; return the min, average and 
	max time."""
	if isinstance(n, int):
		times = [timedcall(fn, *args)[0] for _ in range(n)]
	else:
		times = []
		while sum(times) < n:
			times.append(timedcall(fn, *args)[0])
	return min(times), average(times), max(times)

def average(numbers):
	"Return the average (arithmeticc mean) of a sequence of numbers."
	return sum(numbers) / float(len(numbers))


# 性能测试代码
# 运算次数统计
def c(sequence):
	"""Generate items in sequence; keeping counts as we go. c.starts is the
	number of sequence started; c.items is number of items generated."""
	c.starts += 1
	for item in sequence:
		c.items += 1
		yield item

def instrument_fn(fn, *args):
	c.starts, c.items = 0, 0
	result = fn(*args)
	print('%s got %s with %5d iters over %7d items' % (
		fn.__name__, result, c.starts, c.items))

if __name__ == '__main__':
	# print(timedcalls_version_2(10.0, zebra_puzzle_version_2))
	print(instrument_fn(zebra_puzzle_version_2))

