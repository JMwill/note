# -*- coding: utf-8 -*-
import re
import time
import itertools

def valid(f):
	"Formula f is valid if it has no numbers with leading zero, and evals true."
	try:
		return not re.search(r'\b0[0-9]', f) and eval(f) is True
	except ArithmeticError:
		return False

def fill_in(formula):
	"Generate all possible fillings-in of letters in formula with digits."
	letters = ''.join(set(re.findall(r'[A-Z]', formula)))
	for digits in itertools.permutations('1234567890', len(letters)):
		table = str.maketrans(letters, ''.join(digits))
		yield formula.translate(table)

def solve(formula):
	"""Given a formula like 'ODD + ODD == EVEN', fill in digits to solve it.
	Input formula is a string; output is a digit-filled-in string or None."""
	for f in fill_in(formula):
		if valid(f):
			return f
			# print(f) # all values

# 效率测试代码
# 计时函数
def timedcall(fn, *args):
	"Call function with args; return the time in seconds and result."
	t0 = time.clock()
	result = fn(*args)
	t1 = time.clock()
	return t1 - t0, result

examples = """TWO + TWO == FOUR
A**2 + B**2 == C**2
A**2 + BE**2 == BY**2
X / X == X
A**N + B**N == C**N and N > 1
ATOM**0.5 == A + TO + M
GLITTERS is not GOLD
ONE < TWO and FOUR < FIVE
ONE < TWO < THREE
RAMN == R**3 + RM**3 == N**3 + RX**3
sum(range(AA)) == BB
sum(range(POP)) == BOBO
ODD + ODD == EVEN
PLUTO not in set([PLANETS])""".splitlines()

def test():
	t0 = time.clock()
	for example in examples:
		print('\n', 13 * ' ', example)
		print('%6.4f sec: %s ' % timedcall(solve, example))
	print('%6.4f tot.' % (time.clock() - t0))

if __name__ == '__main__':
	test()
