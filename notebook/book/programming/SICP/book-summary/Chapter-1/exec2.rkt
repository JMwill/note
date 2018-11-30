#lang racket
(define (funcf n)
  (if (>= n 3)
      (+ (funcf (- n 1))
         (* 2 (funcf (- n 2)))
         (* 3 (funcf (- n 3))))
      n))

(funcf 4)

(define (funcf2 n)
  (define (iter a b c count)
    (if (= count 0)
        a
        (iter b c (+ c (* 2 b) (* 3 a)) (- count 1))))
  (iter 0 1 2 n))

(funcf2 4)