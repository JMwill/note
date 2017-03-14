def is_palindrome(s):
	s = str(s)
	return s == s[::-1]


def get_prlindrome(num):
	while num:
		if is_palindrome(num):
			yield num
		num -= 1

bigest_num = 999*999
next_palindrome = get_prlindrome(bigest_num)

def find_bigest_prlindrome_factor():
	for i in next_palindrome:
		for j in reversed(range(100, 1000)):
			k = i / j
			if int(k) * j == i and k < 1000:
				return i

print(find_bigest_prlindrome_factor())

