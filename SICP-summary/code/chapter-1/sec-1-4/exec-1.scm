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
;;; cond 还可以跟 else 搭配使用
;;; 在最后加上 (else <e>)
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
10
(+ 5 4 3)
(- 9 1)
(/ 6 2)
(+ (* 2 4) (- 4 6))
(define a 3)
(define b (+ a 1))
(+ a b (* a b))
(= a b)
(if (and (> b a) (< b (* a b)))
    b
    a)
(cond ((= a 4) 6)
      ((= b 4) (+ 6 7 a))
      (else 25))
(+ 2 (if (> b a) b a))
(* (cond ((> a b) a)
	 ((< a b) b)
	 (else -1))
   (+ a 1))

;;; Exercise 1.2
;;;
(/ (+
    5
    (/ 1 2)
    (- 2 (- 3 (+ 6 (/ 1 3)))))
   (*
    (- 2 6)
    (- 2 7)))

;;; Exercise 1.3
;;;
(define (sum-of-squares-of-two-larger-num x y z)
  (cond ((and (< x y) (< x z)) (sum-of-squares z y))
	((and (< y z) (< y x)) (sum-of-squares z x))
	(else (sum-of-squares x y))))
(sum-of-squares-of-two-larger-num 1 2 3)

;;; Exercise 1.5
;;;
(define (p) (p))

(define (test x y)
  (if (= x 0)
      0
      y))

(test 0 (p))
