(load "average.scm")
(load "abs.scm")
(load "new-if.scm")
(load "square.scm")

(define (improve guess x)
  (average guess (/ x guess)))

(define (good-enough? guess x)
  (< (abs (- (square guess) x)) 0.001))

(define (sqrt-iter guess x)
  ;; (new-if (good-enough? guess x)
  (if (good-enough? guess x)
      guess
      (sqrt-iter (improve guess x)
                 x)))
(define (sqrt x)
  (sqrt-iter 1.0 x))

;; 如果使用 new-if 这里将会无限执行
(sqrt-iter 9)
