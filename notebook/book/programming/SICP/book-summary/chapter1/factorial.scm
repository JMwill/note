;; 本实现是按照阶乘的定义: n! = n * (n - 1)! 来实现
;; 最终效果就是:
;; (factorial 6)
;; (* 6 (factorial 5))
;; (* 6 (* 5 (factorial 4)))
;; ...
(define (factorial n)
  (if (= n 1)
      1
      (* n (factorial (- n 1)))))

;; 这一实现是基于 n! = 1 * 2 ... * (n - 1) * n
;; 最终效果是:
;; (factorial 6)
;; (factorial 1 1 6)
;; (factorial 1 2 6)
;; (factorial 2 3 6)
;; ...
(define (factorial n)
  (fact-iter 1 1 n))

(define (fact-iter product counter max-count)
  (if (> counter max-count)
      product
      (fact-iter (* product counter)
                 (+ counter 1)
                 max-count)))
