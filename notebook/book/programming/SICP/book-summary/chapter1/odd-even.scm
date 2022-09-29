;; remainder 是基本过程，求余数
(define (even? n)
  (= (remainder n 2) 0))

(define (odd? n)
  (= (remainder n 2) 1))
