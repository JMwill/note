(load "1-3-1-sum.scm")
(load "odd-even.scm")
(define (cube x) (* x x x))

(define (integral-simpson2 f a b n)
  (define h (/ (- b a) n))
  (define (add-2h x) (+ x h h))
  (* (+ (f a)
        (* 2 (sum f a       add-2h b))
        (* 4 (sum f (+ a h) add-2h b))
        (f b))
     (/ h 3)))

(integral-simpson2 cube 0 1.0 1000)
