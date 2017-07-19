Q1: python中的nonlocal有什么作用

nonlocal跟global一样是用于声明一个变量属于的作用域，global声明了一个变量属于全局作用域，而nonlocal则是声明变量不属于本地作用域的变量，声明后可以使用外层作用域的同名变量。nonlocal无法在模块层次上使用，模块最外层的函数内也无法使用，对全局变量无效，声明全局变量也无效

nonlocal属于python3新增的特性，可以通过字典等来模拟相同的效果

Q2: 如何查看Python的资源的引用地址

id(obj)、id('string')

Q3: 如何在子类重写父类方法的时候避免子类调用默认方法时用到被重写的方法而导致错误

```
class MainClass:
    def __init__(self):
        self.list = []
        self.__need_fun(prop)

    def need_fun(self, prop):
        for i in prop:
            self.list.append(i)

    # 将方法重命名为内部方法，可以避免被子类无意中重写而导致的错误
    __need_fun = need_fun

class ChildClass(MainClass):
    def need_fun(self, data):
        print(data)
        self.list = data
```

Q4: 如何自定义一个迭代类

通过添加`__iter__`以及`__next__`方法，iter方法用于返回具有next方法的对象，如果类里已经自定义了next方法，直接返回self，next方法需要在无返回值的时候抛出StopIteration用于终止迭代

于是你可以创造一个无限迭代器：

```
class ForEver:
    def __init__(self):
        self.index = 0
    
    def __iter__(self):
        return self

    def __next__(self):
        # 可以不加raise，这里只是表明用这个方法结束迭代
        if self.index == -1:
            raise StopIteration
        self.index += 1
        return self.index
```

配合上next方法，就像一个生成器了。
