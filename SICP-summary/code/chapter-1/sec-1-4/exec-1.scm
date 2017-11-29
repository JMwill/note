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

;;; 一般的判断方式
;;; (cond (<p1> <e1>)
;;;       (<p2> <e2>)
;;;       (<pn> <en>))
;;;
(define (abs x)
  (cond ((> x 0) x)
	((= x 0) 0)
	((< x 0) (- x))))
(abs 100)
(abs -100)
(abs 0)
