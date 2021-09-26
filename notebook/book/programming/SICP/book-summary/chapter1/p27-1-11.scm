;; 两者的速度差距是巨大的
;; 基本上，如果 n > 20 就能明显感觉到速度上的差异
;; 递归计算过程实现
(define (f n)
  (if (< n 3)
      n
      (+ (f (- n 1)) (* (f (- n 2)) 2) (* (f (- n 3)) 3))))

(f 30) 

;; 迭代过程计算实现
(define (f2 n)
  (cond ((= n 1) 1)
        ((= n 2) 2)
        (else (f2-iter 0 1 2 2 n))))

(define (f2-iter va vb vc counter max-counter)
  (if (= counter max-counter)
      vc
      (f2-iter vb vc (+ vc (* vb 2) (* va 3)) (+ counter 1) max-counter)))

(f2 30)
