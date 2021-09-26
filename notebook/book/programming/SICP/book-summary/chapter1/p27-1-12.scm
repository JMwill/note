;; 可以将元素位置参数传入, 可以获知的是 (row, col) 等于 (row-1, col-1) + (row-1, col)
;; 如果 col = 0 或者 col = row 时, 则直接等于 1
(define (pascal row col)
  (cond ((> col row) 0)
        ((= col 0) 1)
        ((= row col) 1)
        ((+ (pascal (- row 1) (- col 1)) (pascal (- row 1) col)))))

(pascal 4 2)
