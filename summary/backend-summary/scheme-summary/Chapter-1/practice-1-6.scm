(define (sqrt-iter guess x)
    (if (new-good-enough? guess x)
        guess
        (sqrt-iter (improve guess x)
                   x)))

(define (improve guess x)
    (average guess (/ x guess)))

(define (average x y)
    (/ (+ x y) 2))

(define (good-enough? guess x)
    (< (abs (- (square guess) x )) 0.001))

(define (square x)
    (* x x))

(define (sqrt x)
    (sqrt-iter 1.0 x))

(define (new-if predicate then-clause else-clause)
    (cond (predicate then-clause)
          (else else-clause)))

;practice-1-7
(define (new-good-enough? guess x)
    (< (abs (- (/ (square guess) x) 1)) 0.000000000000001))

(sqrt 1000000000000000000000000000000000000000000)
(sqrt 2)
(sqrt 3)
(sqrt 4)
(sqrt 6)
;(new-if #t (display "good") (display "bad"))
