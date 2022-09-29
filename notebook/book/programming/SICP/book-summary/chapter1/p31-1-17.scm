;; 简单实现
(define (* a b)
  (if (= b 0)
      0
      (+ a (* a (- b 1)))))

;; 构建对数次数的计算过程
;; 现在假定具有 double 方法以及 halve 方法
;; double 负责求整数的两倍，halve 负责将一个（偶数）除以 2
(define (fast-* a b)
  (cond ((= 0 b) 0)
        ((even? b) (double (fast-* a (halve b))))
        (else (+ a (fast-* a (- b 1))))))
