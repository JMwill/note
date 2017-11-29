;;; define 的基本用法
;;; (define (<name> <formal parameters>) <body>)
;;;
(define (square x) (* x x))

(square 21)

;;; 另一个过程
;;;
(define (sum-of-squares x y)
  (+ (square x) (square y)))

(sum-of-squares 3 4)

;;; 一般条件判断
;;; (cond (<p1> <e1>)
;;;       (<p2> <e2>)
;;;       (<pn> <en>))
;;;
(define (abs x)
  (cond ((> x 0) x)
	((= x 0) 0)
	((< x 0) (- x))))

;;; 另一种条件判断
(define (abs x)
  (if (< x 0)
      (- x)
      x))

;;; 为了方便比较，提供了常用的逻辑操作形式
;;; (and <e1> ... <en>)
;;; (or <e1> ... <en>)
;;; (not <e>)
;;;
(define (>= x y)
  (or (> x y) (= x y)))

;;; 另一种定义
(define (>= x y)
  (not (< x y)))

(>= 10 10)

;;; Exercise 1.1
