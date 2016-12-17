# 数组和字典

## 构造轻量级的字典

由于需要避免原型链上的污染, 简便地使用for in方法. 可以通过构造一个以null为原型的对象来实现轻量级的字典:

```javascript
var x = Object.create(null);
Object.getPrototypeOf(x) === null; // true
x.hello = 'hello';
x.param = 'param';

for (var i in x) {
    console.log(i);
    // hello, param;
}
```
这样子构造出来的字典, 即使Obejct的原型链被修改, 也不会影响到它, 可以放心使用for in语法. 而不用检测

## 使用hasOwnProperty方法避免原型污染

由于对象会自带大量属性, 因此使用in操作符的时候就会出现不好的情况

```javascript
var dict = {};

console.log('toString' in dict); // true;
```

上例中, 我们并没有为对象定义toString属性, 但是由于对象自身创建的时候就带有toString方法, 而in操作符不管是什么属性, 只要能够通过原型链访问到都会显示true, 所以不可避免地会出现意外的情况. 所以当遇到这种情况时需要使用对象的hasOwnProperty方法来对属性的归属进行区分.

但是由于hasOwnProperty方法也有可能会被覆盖, 因此, 可以在程序的开始时就保存下原始的引用:

```javascript
var hasOwn = Object.prototype.hasOwnProperty;
// 或者
var hasOwn = {}.hasOwnProperty;

// 通过call或者apply调用

hasOwn.call(dict, 'name'); // ...
```

但是由于存在`__proto__`这样的特殊属性, 在某些情况下会导致自身的污染问题. 因此想要尽可能地解决这些问题需要进行一些特殊处理, 但是避免将`__proto__`作为key来用是更好的选择.

```javascript
function Dict(elements) {
    // allow an optional initial table
    this.elements = elements || {};
    this.hasSpecialProto = false;
    this.specialProto = undefined;
}

Dict.prototype.has = function(key) {
    if (key === '__proto__') {
        return this.hasSpecialProto;
    }
    // own prototype only
    return {}.hasOwnProperty.call(this.elements, key);
};

Dict.prototype.get = function(key) {
    if (key === '__proto__') {
        return this.specialProto;
    }
    // own property only
    return this.has(key)
           ? this.elements
           : undefined;
};

// 当将__proto__作为键来用时.
Dict.prototype.set = function(key, val) {
    if (key === '__proto__') {
        this.hasSpecialProto = true;
        this.specialProto = val;
    } else {
        this.elements[key] = val;
    }
};

Dict.prototype.remove = function(key) {
    if (key === '__proto__') {
        this.hasSpecialProto = false;
        this.specialProto = undefined;
    } else {
        delete this.elements[key];
    }
}
```

## 数组而不是字典来存储有序集合

- 因为各个JavaScript引擎的实现并不一样, 因此对于对象属性的枚举顺序也并不一样. 因此用for...in循环来枚举对象属性应当与顺序无关.
- 如果需要对字典中的集合进行运算, 确保操作与顺序无关
- 使用数组而不是字典来存储有序集合

## 不要在Object.prototype中增加可枚举属性

如果使用字典对象, 同时会用到for...in循环的话, 就不要在prototype中增加可枚举属性, 因为这样会导致其自身受污染, 因此当需要在prototype上添加方法时, 可以考虑将方法实现为函数, 或者使用Object.defineProperty定义一个不可枚举的对象属性, 使得for...in循环不可见.

```javascript
Object.defineProperty(Object.prototype, 'allKeys', {
    value: function() {
        var result = [];
        for (var key in this) {
            result.push(key);
        }
        return result;
    },
    writable: true,
    enumerable: false,
    configurable: true
});
```

## 避免在枚举期间修改对象

```javascript
function Member(name) {
  this.name = name;
  this.friends = [];
}

var a = new Member('Alice');
var b = new Member('Bob');
var c = new Member('Carol');
var d = new Member('Dieter');
var e = new Member('Eli');
var f = new Member('Fatima');

a.friends.push(b);
b.friends.push(c);
c.friends.push(e);
d.friends.push(b);
e.friends.push(d, f);

Member.prototype.inNetwork = function(other) {
  var visited = {};
  var workset = {};
  
  workset[this.name] = this;
  count = 0;
  for (var name in workset) {
    var member = workset[name];
    delete workset[name];
    
    if (name in visited) {
      continue;
    }
    visited[name] = member;
    if (member === other) {
      return true;
    }
    member.friends.forEach(function(friend) {
      workset[friend.name] = friend;
    });
    count++;
    console.log(count);
  }
  return false;
}

console.log(a.inNetwork(f));
```

从上面的代码可以看出, 即使修改了member对象, 但是for...in循环并没有继续遍历到增加的对象, 相当于我们在for循环的时候提前存储了length的值, 这样, 无论之后怎么为列表添加对象, 都不会影响到存储的len值, 也就不会影响到修改了.

因此想要遍历到修改的对象, 就需要使用while循环或经典的for循环来代替for...in循环

同时想要能够在不断变化的数据结构中预测枚举, 应该考虑使用一个有序的数据结构, 如数组而不是字典对象.

## 数组迭代要优先使用for循环而不是for...in循环

由于for...in循环遍历的是对象的key值, 使用for...in遍历数组会对数组的索引进行遍历, 由于key值是字符串, 因此如果进行相加操作有可能会出现意想不到的情况:

```javascript
var scores = [98, 74, 85, 77, 93, 100, 98];
var total = 0;
for (var score in scores) {
  total += score;
}
var mean = total / scores.length;
console.log(mean); // 17636.571428571428

// 因为key值以字符串的形式相拼接, 得出00123456, 除以7时进行隐式类型转换, 所以最后得到一个意外的值
```

## 优先使用迭代方法, 而不是传统的循环

由于传统的循环在界定结束条件上容易出错, 因此对于一般情况下, 使用forEach, filter, map等迭代方法优于循环, 而循环的唯一好处就是可以使用 break 或者 continue 终止循环.

## 在类数组对象上复用通用的数组方法

类数组对象:
- 具有在0到2的23次方减1的整型length属性
- length属性大于该对象的最大索引值, 索引范围比length小1, 索引是该对象中的一个key

只要具备上述的条件就可以当做类数组, 并将数组的方法用到其上来.