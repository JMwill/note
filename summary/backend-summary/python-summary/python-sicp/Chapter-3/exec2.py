def test_search():
	a, b, c = lit('a'), lit('b'), lit('c')
	abcstars = seq(star(a), seq(star(b), star(c)))
	dotstar = star(dot)
	assert search(lit('def'), 'abcdefg') == 'def'
	assert search(seq(lit('def'), eol), 'abcdef') == 'def'
	
