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

`except` 还可以搭配 `else` 以及 `finally` 一起使用, `else` 在异常没有触发的时候被调用到, 而 `finally` 则是像名字一样, 在任何情况下都会调用.

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
