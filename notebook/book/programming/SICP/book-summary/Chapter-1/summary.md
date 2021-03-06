# 第一章 构造抽象过程

抽象的产生：多个**简单认识**组合成一个**复合认识**。两个不管复杂与否的认识通过**对照**得出相互之间的关系的认识。将认识从与实际中同在的所有其他认识**隔离**开。

简单地说，抽象就是通过**组合、对照、隔离**后得到的结果。

强有力的语言要提供三种机制：

- 基本表达形式，用于表示语言所关心的**最简单的个体**
- 组合的方法，从较简单的东西出发通过它们来构造出复合的元素。
- 抽象的方法，可以为复合对象命名，并将它们当作单元去操作。

而在程序设计中需要处理两类要素：过程和数据，其中过程是希望去操作的“东西”，而过程则是有关操作这些数据的规则的描述。

也就是 基本数据 + 基本过程 + （组合 && 抽象）数据与过程的方法 = 强有力的语言

对概念、函数等的描述与实现计算机过程的一个重要的差异在于：过程需要的是**切实可行的**，前者基本是描述某事物的特征，而后者则需要描述事情如何做。这是**说明性**的知识与**行动性**的知识之间的差异。

学习程序设计中的要素只相当于了解规则，但是编写出好的程序还需要对计算过程中各个动作的进行情况进行规划，使用各种有用的设计模式，以得到所需要的各种表现行为。

通过代换模型得到计算过程，如果过程中的操作推迟执行且形成一条链条，整个操作的轨迹通过链条保存，并最终通过归约计算得到最后的结果，这种先展开，后收缩的过程称为**线性递归过程**。而计算过程中没有任何展开与收缩，所有需要的信息都包含在变量中，则这样的过程称为**迭代计算过程**。一般的迭代计算过程就是状态可以用固定数目的**状态变量**描述的计算过程；且同时存在一套固定的规则描述计算过程在从一个状态更新到下一个状态时变量的更新方式，以及一个（可能的）结束检查。

上面的迭代计算过程可以理解为：固定数量的参数，一般是变量改变后的值，内部的规则则是计算出变量下一个值的规则。以及结束的标志。

## 用高阶函数做抽象

在作用上，过程是一类抽象，描述对数据的复合操作。而复合过程则是为了作为一种将若干操作的模式抽象出来的机制，使所描述的计算不再依赖于所涉及的特定数值。

```lisp
线性递归过程
(define (factorial n)
  (if (= n 1)
      1
      (* n (factorial (- n 1)))))

线性迭代过程
(define (factorial n)
  (fact-iter 1 1 n))

(define (fact-iter product counter max-count)
  (if (> counter max-count)
      product
      (fact-iter (* counter product)
    	       (+ counter 1)
 	       max-count)))
```

# 第二章 构造数据抽象

