(define (cube-root-iter guess x)
    (if (new-good-enough? guess x)
        guess
        (cube-root-iter (improve guess x)
                   x)))

(define (improve guess x)
    (/ (+
           (/ x (square guess))
           (* 2 guess))
       3))

(define (average x y)
    (/ (+ x y) 2))

(define (good-enough? guess x)
    (< (abs (- (cube guess) x )) 0.001))

(define (square x)
    (* x x))

(define (cube x)
    (* x x x))

(define (cube-root x)
    (cube-root-iter 1.0 x))

(define (new-if predicate then-clause else-clause)
    (cond (predicate then-clause)
          (else else-clause)))

;practice-1-7
(define (new-good-enough? guess x)
    (< (abs (- (/ (cube guess) x) 1)) 0.001))

(cube-root 1000000000000000000000000000000000000000000)
(cube-root 2)
(cube-root 3)
(cube-root 4)
(cube-root 6)
(cube-root 8)
;(new-if #t (display "good") (display "bad"))
