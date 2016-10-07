def test_search():
	a, b, c = lit('a'), lit('b'), lit('c')
	abcstars = seq(star(a), seq(star(b), star(c)))
	dotstar = star(dot)
	assert search(lit('def'), 'abcdefg') == 'def'
	assert search(seq(lit('def'), eol), 'abcdef') == 'def'
	assert search(seq(lit('def'), eol), 'abcdefg') == None
	assert search(a, 'not the start') == 'a'
	assert match(a, 'not the start') == None
	assert match(abcstars, 'aaabbbccccccccdef') == 'aaabbbcccccccc'
	assert match(abcstars, 'junk') == ''
	assert all(match(seq(abcstars, eol), s) == s
					for s in 'abc aaabbccc aaaabcccc'.split())
