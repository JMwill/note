#lang racket
(define (testcond x)
    (cond ((> x 0) (+ x 1) (+ x 2))
        ((= x 0) (+ 10 2) (- 10 2))
        ((< x 0) (* x x) (* x x x))))

(testcond 10)
(testcond 0)
(testcond -4)

#| 1.2 习题解答 |#
(/
    (+ 5 4
        (- 2
            (- 3
                (+ 6
                    (/ 4 5)))))
    (* 3
        (- 6 2)
        (- 2 7)))

#| 1.3 习题解答 |#
(define (sum-of-maxmum-2 x y z)
    (cond ((and (> y x) (> z x)) (+ y z))
        ((and (> x y) (> z y)) (+ x z))
        ((and (> x z) (> y z)) (+ x y))))

(sum-of-maxmum-2 2 3 1)

#| 牛顿法求平方根 |#
(define (sqrt-iter guess x)
    (if (good-enough? guess x)
        guess
        (sqrt-iter (improve guess x)
                    x)))

(define (average x y)
    (/ (+ x y) 2))

(define (square x)
    (* x x))

(define (improve guess x)
    (average guess (/ x guess)))

(define (good-enough? guess x)
    (< (abs (- (square guess) x)) 0.001))

(define (sqrt x)
    (sqrt-iter 1.0 x))

(sqrt 9)