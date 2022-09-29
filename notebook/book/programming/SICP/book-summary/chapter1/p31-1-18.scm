;; 使用 1.16 与 1.17 提供的基础函数实现迭代版本的乘积方法
(define (multi a b result)
  (multi-iter (a b 0)))

(define (multi-iter a b result)
  (cond ((= b 0) 0)
        ((even? b) (multi-iter (double a) (halve b) result))
        (else (multi-iter a (- b 1) (+ a result)))))
