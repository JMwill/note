# 学习记录

Python 中的错误跟异常其实是一样的, 所有的错误类都以 Exception 作为超类.

Python 中除了可以一次性对多种类型的异常做处理外, 还可以分别对不同的异常执行处理如:

```py
 def funny_division3(anumber):
    try:
        if anumber == 13:
            raise ValueError('13 is an unlucky number')
        return 100 / anumber
    except ZeroDivisionError:
        return 'Enter a number other than zero'
    except TypeError:
        return 'Enter a numerical value'
    except ValueError:
        print('No, No, not 13!')
        raise
```

可以通过直接调用使用 `raise` 来抛出所遇到的异常. 保证异常能够继续上报给有能力处理的地方.

`except` 还可以搭配 `else` 以及 `finally` 一起使用, `else` 在异常没有触发的时候被调用到, 而 `finally` 则是像名字一样, 在任何情况下都会调用. 并且还可以对异常使用 `as` 关键字起别名.

```py
import random
some_exception = [ValueError, TypeError, IndexError, None]

try:
    choice = random.choice(some_exception)
    print('raising {}'.format(choice))
    if choice:
        raise choice('An error')
except ValueError:
    print('Caught a ValueError')
except TypeError:
    print('Caught a TypeError')
except Exception as e:
    print('Caught some other error: %s' % (e.__class__.__name__))
else
    print('This code called if there is no exception')
finally:
    print('This cleanup code is always called')
```

## 异常层级

而 `Exception` 类则扩展自 `BaseException` 类, 其中大部分的异常扩展自: `Exception` 类, 除了 `SystemExist` 类以及 `KeyboardInterrupt` 类. 一个是程序退出时会触发, 不管正常与否. 另一个则是在使用 `Ctrl+C` 组合键时会触发.

使用 `except` 而没有指定异常类型时会自动捕捉所有 `BaseException` 类的子类. 如果真的想要捕捉, 最好进行显式声明: `except BaseException`.

## 定义自己的异常

异常类 `Exception` 的 `__init__` 方法被设计为接收任何参数并将其作为元组保存在 `args` 的属性里. 因此定义异常可以免于重写 `__init__` 方法.

## 异常并不例外

所有的异常情况都要使用异常, 即使是一些小的异常. 比如对超出索引范围的判定, 如果使用条件语句, 一般的做法是判定索引值是否小于或者大于列表的长度, 这样就会遗忘了 Python 中允许索引值为负数的情况, 因此又需要添加更多的判断逻辑. 而直接使用 `IndexError` 异常判定的话则方便且有效的多.

```py
def divide_with_exception(number, divisor):
    try:
        print("{} / {} = {}".format(
            number, divisor, number / divisor * 1.0))
    except ZeroDivisionError:
        print("You can't divide by zero")

def divide_with_if(number, divisor):
    if divisor == 0:
        print("You can't divide by zero")
    else:
        print("{} / {} = {}".format(
            number, divisor, number / divisor * 1.0))
```

异常常用于文件 I/O, 数学表达式, 列表索引(是否超出索引值), 字典(键值是否存在)等的使用上.
