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

# 通过减少调用eval次数，使用lambda实现一次编译
def compile_word(word):
	"""Compile a word of uppercase letters as numeric digits.
	E.g., compile_word('YOU') => '(1 * U + 10 * O + 100 * Y)'
	Non-uppercase words unchanged; compile_word('+') => '+'"""
	if word.isupper():
		terms = [('%s*%s' % (10 ** i, d))
				for (i, d) in enumerate(word[::-1])]
		return '(' + '+'.join(terms) + ')'
	else:
		return word

def compile_formula(formula, verbose=False):
	"""Compile formula into a function. Also return letters found, as a str,
	in same order as parms of function. For example, 'YOU == ME ** 2' returns
	(lambda Y, M, E, U, O: (U+10*O+100*Y) == (E+10*M)**2), 'YMEUO' """
	letters = ''.join(set(re.findall(r'[A-Z]', formula)))
	firstletters = set(re.findall(r'\b([A-Z])[A-Z]', formula))
	parms = ', '.join(letters)
	tokens = map(compile_word, re.split(r'([A-Z]+)', formula))
	body = ''.join(tokens)
	if firstletters:
		tests = ' and '.join(L + '!=0' for L in firstletters)
		body = '%s and (%s)' % (tests, body)
	f = 'lambda %s: %s' % (parms, body)
	if verbose: print(f)
	return eval(f), letters

def faster_solve(formula):
	"""Given a formula like 'ODD + ODD == EVEN', fill in digits to solve it.
	Input formula is a string; output is a digit-filled-in string or None.
	This version percompiles the formula; only one eval per formula."""
	f, letters = compile_formula(formula)
	for digits in itertools.permutations(set(range(10)), len(letters)):
		try:
			if f(*digits) is True:
				table = str.maketrans(letters, ''.join(map(str, digits)))
				return formula.translate(table)
		except ArithmeticError:
			pass


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
		print('%6.4f sec: %s ' % timedcall(faster_solve, example))
	print('%6.4f tot.' % (time.clock() - t0))

if __name__ == '__main__':
	test()
