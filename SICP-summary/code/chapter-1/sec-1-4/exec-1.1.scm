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

;;; (test 0 (p))

;;; 用牛顿法求平方根，也就是逐次逼近
;;; 因此需要：
;;; 一个判断猜测数是否足够好的函数
;;; 一个改进猜测数的函数
;;; 一个将上述两个过程不断执行直到得到足够好的结果的函数
;;;
(define (sqrt-iter guess x)
  (if (good-enough? guess x)
      guess
      (sqrt-iter (improve guess x)
		 x)))

;;; 改进函数需要一个函数来计算出下一个改进数是什么
;;;
(define (improve guess x)
  (average guess (/ x guess)))

(define (average x y)
  (/ (+ x y) 2))

;;; 定义 good-enough?
;;;
(define (good-enough? guess x)
  (< (abs (- (square guess) x)) 0.0001))

;;; 定义调用函数
;;;
(define (sqrt x)
  (sqrt-iter 1.0 x))

(sqrt 9)

;;; Exercise 1.6
;;; 使用 new-if 来创建开方的计算过程
;;; 这个 new-if 在进行一般的表达式判断时可以使用，
;;; 但是在递归表达式的判断中，如果解析器执行时采取
;;; 应用序来解析程序，因为 new-if 作为一个过程，会
;;; 被先行解析，在第一次解析时，过程能够正确解析，
;;; 而在递归的二次解析过程中需要用到的参数也是需要
;;; 解析的过程，而这个时候，new-if 过程并没有结束
;;；则本次 new-if 过程解析就会失败，而如果解析器
;;; 采用的是一般序执行解析的话，则计算过程会在需要
;;; 时再执行，那么应用程序实际上将能够正确执行。
;;; 
(define (new-if predicate then-clause else-clause)
  (cond (predicate then-clause)
	(else else-clause)))

;;; (define (sqrt-iter guess x)
;;;  (new-if (good-enough? guess x)
;;;	  guess
;;;	  (sqrt-iter (improve guess x)
;;;		     x)))


;;; (sqrt-iter 10)

;;; Exercise 1.7
;;; 对于过大或者过小的数据，good-enough? 过程并不能够
;;; 进行有效的判断，这也是因为 improve 过程得到的结果
;;; 无法提供给 good-enough? 可以判断的值，通过改进
;;; good-enough? 可以判断较大或者较小的数
;;;
(define (good_enough? guess oldguess x)
  (< (abs (- guess oldguess))
     (* guess 0.001)))

(define (sqrt-iter guess oldguess x)
  (if (good-enough? guess oldguess)
      guess
      (sqrt-iter (improve guess x) guess
		 x)))

(define (sqrt x)
  (sqrt-iter 1.0 2.0 x))

(sqrt 2)

;;; Exercise 1.8
;;;
(define (cube x)
  (* x x x))

(define (cube-iter cube-guess x)
  (if (cube-x-good-enough? cube-guess x)
      cube-guess
      (cube-iter (improve-cube cube-guess x)
		 x)))

(define (improve-cube cube-guess x)
  (/ (+ (/ x (square cube-guess))
	(* 2 cube-guess))
     3))

(define (cube-x-good-enough? cube-guess x)
  (< (abs (- (cube cube-guess) x)) 0.000000000000000001))

(define (cube-root x)
  (cube-iter 1.0 x))

(cube-root 9)

