;;; 递归跟递归过程的含义并不一样，递归指的是函数调用自身，
;;; 而递归过程指的是函数的运算过程是呈递归形式，一层叠着一层
;;;

;;; 线性递归过程的阶乘实现
;;; 这个实现占用的资源与 n 成正比
;;;
(define (factorial n)
  (if (= n 1)
      1
      (* n factorial (- n 1))))

;;; 一般情况下，迭代过程需要有固定的状态变量来记录迭代到的位置
;;; 以及一套更新状态变量到下一个状态的固定规则，以及一个（可选）
;;; 的终止测试来指定过程应该在何时终止
;;;

;;; 线性迭代过程的阶乘实现
;;; 在具有尾递归优化的情况下，这个实现占用的资源只有 1
;;;
(define (factorial n)
  (fact-iter 1 1 n))

(define (fact-iter product counter max-count)
  (if (> counter max-count)
      product
      (fact-iter (* counter product)
                 (+ counter 1)
                 max-count)))

;;; Exercise 1.10
;;;
(define (A x y)
  (cond ((= y 0) 0)
        ((= x 0) (* 2 y))
        ((= y 1) 2)
        (else (A (- x 1)
                 (A x (- y 1))))))

(A 1 10)
(A 2 4)
(A 3 3)

;;; 1.2.2
;;;
