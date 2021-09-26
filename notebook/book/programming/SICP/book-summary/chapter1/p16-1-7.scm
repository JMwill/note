(load "sqrt.scm")

(define (good-enough? new-guess old-guess)
  (> 0.0001
     (/ (abs (- new-guess old-guess))
        old-guess)))

(sqrt 9)
