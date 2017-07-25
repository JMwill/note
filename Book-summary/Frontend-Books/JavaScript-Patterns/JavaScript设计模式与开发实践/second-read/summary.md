# 阅读记录

设计模式的主题总是把**不变的事情**和**变化**的事物**分离开来**. 所有的设计模式实现都遵循一条原则, 即**"找出程序中变化的地方, 并将变化封装起来**. 而分辨模式的关键是**意图**而不是**结构**. 模式只有在具体的环境下才有意义. 模式出现的场景, 以及为我们解决了什么问题是辨别模式的**关键**.

## 单例模式

在**只需要一个对象**的时候就是使用单例模式的好时候, 线程池, 全局缓存等. 单例模式的核心是**确保只有一个实例, 并提供全局访问**.

一般单例模式的精髓在于: 用一个变量来**标志**是否**创建过**对象, 有则返回创建好的对象.

```javascript
var obj;
if (!obj) { obj = ...; }
```

因此一个通用的管理单例的逻辑是:

```javascript
var getSingle = function(fn) {
    var result;
    return function() {
        return result || (result = fn.apply(this, arguments));
    }
}
```

## 策略模式

策略模式的思想: 定义一系列**算法**(也可以认为是一系列规则, 这些规则指向的**目标一致**), 将算法封装起来(定义函数?), 并使得它们可以相互替换.

JavaScript版本的策略模式:

```javascript
// 算法封装的地方, 由一个对象存储, 使得算法可通过修改索引的属性名来找到.
var strategies = {
    sOne: function(arg) {},
    sTwo: function(arg) {},
    sThree: function(arg) {},
    ...
};

var useStrategies = function(strategie, arg) {
    return strategies[strategie]
}
```

## 代理模式

代理模式是为一个对象提供一个代用品或者占位符, 以便控制对它的访问. 代理中常用的有**保护代理**, **虚拟代理**. 代理的意义在于使得对象能够符合**单一职责原则**. 避免过多地承担责任.

实现代理模式需要注意**代理**和**本体**的需要具有**一致**的**接口**. 使得代理接手请求的过程是透明的, 对使用者没有影响.

一个虚拟代理的例子:

```javascript
// 本体
var MyImg = (function() {
    var imgNode = document.createElement('img');
    document.body.appendChild(imgNode);
    return function(src) {
        imgNode.src = src;
    }
});

// 代理
var ProxyImg = (function() {
    var img = new Image;
    img.onload = function() {
        MyImg(this.src);
    }

    // 一致的接口, 都是直接调用, 或者
    // 可以定义一个接口名
    return function(src) {
        MyImg('loading.gif');
        img.src = src;
    }
});
```

## 迭代器模式

迭代器模式是指提供一种方法顺序访问一个聚合对象中的各个元素, 同时不需要暴露该对象的内部表示. 迭代器又分为**内部迭代器**和**外部迭代器**.

内部迭代器的迭代规则已经提前规定, 不能方便地进行拓展. 如`Array.prototype.forEach`中无法轻易使用`break`.

外部迭代器通过提供的方法使得迭代过程可以在外部来定义. 方便拓展. 如ES6的`Iterator`

## 发布/订阅模式(观察者模式)

定义对象间的一种一对多的依赖关系, 一个对象发生改变时, 所有依赖于它的对象都将得到通知.

```javascript
// 简单的通用实现
var event = {
    clientList: {},
    listen: function(key, fn) {
        if (!this.clientList[key]) {
            this.clientList[key] = [];
        }
        this.clientList[key].push(fn);
    },
    trigger: function() {
        var key = Array.prototype.shift.call(arguments),
            fns = this.clientList[key];
        
        if (!fns || fns.length === 0) { return false; }

        for (var i = 0, fn; fn = fns[i++];) {
            fn.apply(this, arguments);
        }
    },
    remove: function(key, fn) {
        var fns = this.clientList[key];
        if (!fns) { return false; }

        if (!fn) {
            fns && (fns.length = 0);
        } else {
            for (var i = fns.length - 1; l >= 0; l--) {
                var _fn = fns[l];
                if (_fn === fn) {
                    fns.splice(l, 1);
                }
            }
        }
    }
}
```

## 命令模式

命令模式中的**命令**指的是一个执行某些**特定事情**的指令. 常见场景: 向某些对象发送请求, 但并不知道请求的接收者是谁, 也不知道被请求的操作是什么, 同时希望以一种松耦合的方式设计程序, 使请求发送者和接收者消除彼此之间的耦合关系.

在命令模式中记录信息的是命令对象, 命令对象需要具有**一致的执行方法**. 命令模式的由来, 其实是回调函数的一个面向对象的替代品.

闭包实现的命令模式:

```javascript
var setCommand = function(obj, func) {
    obj.onclick = function() {
        func();
        // 当需要用到撤销等的方法的时候, 最好还是使用明确的execute命名
        // cmder.execute();
    }
}

var MenuBar = {
    refresh: function() {
        console.log('Refreshed!');
    }
};

var RefreshMenuBarCommand = function(receiver) {
    return function() {
        receiver.refresh();
    }
}

var refreshMenuBarCommand = RefreshMenuBarCommand(MenuBar);
setCommand(someBtn, refreshMenuBarCommand);
```

## 组合模式

组合模式是用小的子对象来构建更大的对象, 小的子对象本身也许是更小的对象构成的.

组合模式的一个好处是将对象组合成**树形结构**, 来表示**部分-整体**的层次结构. 另一个好处是通过对象的多态性表示, 使得用户对单个对象和组合对象的使用具有一致性. 这是它的最大的优点: **一致地**对待组合对象和基本对象.

```javascript
/******************** Folder ***********************/
var Folder = function(name) {
    this.name = name;
    this.files = [];
};

Folder.prototype.add = function(file) {
    this.files.push(file);
};

Folder.prototype.scan = function() {
    console.log('begin scan folder: ' + this.name);
    for (var i = 0, file, files = this.files; file = files[i++]; ) {
        file.scan();
    }
};

/******************** File ***********************/
var File = function(name) {
    this.name = name;
};

File.prototype.add = function() {
    throw new Error('file can not add file');
};

File.prototype.scan = function() {
    console.log('begin scan file' + this.name);
};
```

## 模板方法模式

模板方法由两部分结构组成, 一是: 抽象父类, 二是: 具体实现的子类.

抽象父类中**封装**了**子类**的**算法框架**, 包括一些**公共方法**的**实现**以及**子类**中**所有方法**的**执行顺序**.

在这里说的需要用到继承在JavaScript中其实并不一定需要, 这个模式的核心在于**封装共同的算法结构**为一个模板方法, 后续衍生出的对象都会通过这个方法来执行算法.

```javascript
var Beverage = function(param) {
    var boilWater = function() {
        console.log('boil water');
    };

    var brew = param.brew || function() {
        throw new Error('need brew method!');
    }

    var pourInCup = param.pourInCup || function() {
        throw new Error('need pourInCup method!');
    }

    var addCondiments = param.addCondiments || function() {
        throw new Error('need addCondiments method!');
    }

    var F = function() {};

    // 模板方法, 封装了具体的算法
    F.prototype.init = function() {
        boilWater();
        brew();
        pourInCup();
        addCondiments();
    };

    return F;
}

var Coffee = Beverage({
    brew: function() { console.log('use boil wather to brew coffee!'); }
    pourInCup: function() { console.log('pour coffee in cup'); }
    addCondiments: function() { console.log('add Suger and Milk'); }
});

var Tea = Beverage({...});

var coffee = new Coffee();
coffee.init();

var tea = new Tea();
tea.init();
```

## 享元模式

享元模式是一种用于性能优化的模式. 核心是: 用**共享技术**来有效支持**大量细粒度**的对象.

享元模式要求将对象属性划分为**内部状态/属性**与**外部状态/属性**.

享元模式的目标是尽量减少共享对象的数量, 这需要对状态进行进准合理的划分, 可以通过一些指引来进行划分:

- 内部状态存储于对象内部
- 内部状态可以被一些对象共享
- 内部状态独立于具体场景, 通常不会变
- 外部状态取决于具体的场景, 并根据场景而变化, 不能被共享.

享元模式一般需要一个对象工厂来避免一开始就创建对象的问题, 同时需要一个管理器来记录对象相关的外部状态, 使外部状态通过某个钩子和共享对象关联起来.

```javascript
var Upload = function (uploadType) {
    this.uploadType = uploadType;
};

Upload.prototype.delFile = function(id) {
    uploadManager.setExternalState(id, this);

    // 其他逻辑
    if (this.fileSize < 3000) {...}
    else {...}
}

// 对象工厂
var UploadFactory = (function() {
    var createdFlyWeightObjs = {};
    return {
        create: function(uploadType) {
            if (createdFlyWeightObjs[uploadType]) {
                return createdFlyWeightObjs[uploadType];
            }

            return createdFlyWeightObjs[uploadType] = new Upload(uploadType);
        }
    };
});


// 外部状态管理器
var uploadManager = (function() {
    var uploadDatabase = {};

    return {
        add: function(id , uploadType, fileName, fileSize) {
            var flyWeightObj = UploadFactory.create(uploadType);

            var dom = document.createElement('div');
            dom.innerHTML = '...';
            dom.querySelector('.delFile').onclick = ...;
            document.body.appendChild(dom);

            uploadDatabase[id] = {
                fileName: fileName,
                fileSize: fileSize,
                dom: dom
            };

            return flyWeightObj;
        },

        setExternalState: function(id, flyWeightObj) {
            var uploadData = uploadDatabase[id];
            for (var i in uploadData) {
                flyWeightObj[i] = uploadData[i];
            }
        }
    }
})();

// 正常上传, 一般调用
var id = 0;
window.startUpload = function(uploadType, files) {
    for (var i = 0, file; file = files[i++]; ) {
        var uploadObj = uploadManager.add(++id, uploadType, file.fileName, file.fileSize);
    }
}
```

## 职责链模式

职责链模式: 使多个对象都有机会处理请求, 从而避免请求的发送者和接收者之间的耦合关系, 将这些对象连成一条链, 并沿着这条链传递请求, 直到有一个对象处理为止.

但是过长的职责链会带来性能的损耗, 这是开发过程中需要避免的.

```javascript
// 异步形式的职责链
var Chain = function(fn) {
    this.fn = fn;
    this.successor = null;
};

Chain.prototype.setNextSuccessor = function(successor) {
    return this.successor = successor;
};

Chain.prototype.passRequest = function() {
    var ret = this.fn.apply(this, arguments);

    if (ret === 'nextSuccessor') {
        return this.successor && this.successor.passRequest.apply(this.successor, arguments);
    }
    return ret;
};
Chain.prototype.next = function() {
    return this.successor && this.successor.passRequest.apply(this.successor, arguments);
}

var fn1 = new Chain(function() {
    console.log(1);
    return 'nextSuccessor';
});

var fn2 = new Chain(function() {
    console.log(2);
    var self = this;
    setTimeout(function() {
        self.nest();
    }, 1000);
});

var fn3 = new Chain(function() {
    console.log(3);
});

fn1.setNextSuccessor(fn2).setNextSuccessor(fn3);
fn1.passRequest();
```

## 中介者模式

中介者模式用于解除对象与对象之间的紧耦合的关系, 通过增加一个中介者对象来让相关对象通过中介者对象来通信, 避免对象间的相互引用, 对象的改变只需要通知中介者对象. 通过中介者对象能够使得对象间耦合松散, 并可以独立改变对象间的交互. 在我看来就是将原来分散开来的交互逻辑集中到中介者身上由中介者来管理. 

中介者模式迎合**迪米特法则/最小知识原则**, 使得对象间耦合性降低, 每个对象只关注自己的功能, 尽可能少地与其他对象进行互动, 或者说, 通过中介者模式, 对象间的关系有彼此多对多变成多对一(多个对象, 每个对象只跟一个中介者对象进行通信), 不过由于对象之间的关系都转移到了中介者身上, 因此中介者本身会变得难以维护, 两者的取舍取决于是管理对象间的关系难, 还是管理中介者里面的关系难.

```javascript
function Player(name, teamColor) {
    this.name = name;
    this.teamColor = teamColor;
    this.state = 'alive';
}

Player.prototype.win = function() {
    console.log(this.name + ' won ');
};

Player.prototype.lose = function() {
    console.log(this.name + ' lost');
}

Player.prototype.die = function() {
    this.state = 'dead';

    // 与中介者通信
    playerDirector.ReceiveMessage('playerDead', this);
};

Player.prototype.remove = function() {
    playerDirector.ReceiveMessage('removePlayer', this);
};

Player.prototype.changeTeam = function() {
    playerDirector.ReceiveMessage('changeTeam', this, color);
}

// 中介者
var playerDirector = (function() {
    var player = {},
        operations = {}; // 中介者会进行的操作集合
    
    // 所有player之间的交互, 不同队伍之间的关系, 现在全部
    // 由playerDirector来进行处理.
    operations.addPlayer = function(player) {
        var teamColor = player.teamColor;
        players[teamColor] = players[teamColor] || [];
        players[teamColor].push(player);
    };

    operations.removePlayer = function() {};
    operations.changeTeam = function() {};
    operations.playerDead = function() {};

    var ReceiveMessage = function() {
        var message = Array.prototype.shift.call(arguments);
        operations[message].apply(this, arguments);
    }
    return {
        ReceiveMessage: ReceiveMessage
    };
}());
```

## 装饰者模式

装饰者模式可以给对象动态添加一些额外的职责, 而不会影响从相同类中派生的其他对象. 装饰者模式跟代理模式之间的区别是两者间的意图和设计目的.

代理模式目的: 当直接访问本体不方便或者不符合需要时, 为本体提供一个替代者. 本体定义关键功能, 代理提供或拒绝对本体的访问, 或者在访问本体前做一些额外的事情.

装饰者模式目的: 为对象动态加入行为.

代理模式强调一种关系, 这种关系可以静态表达, 也就是可以在一开始就被确定. 而装饰者模式用于一开始不能确定对象的全部功能. 代理模式一般只有一层, 而装饰者可以形成一条装饰链.

```javascript
Function.prototype.before = function(beforefn) {
    var __self = this;
    return function() {
        beforefn.apply(this, arguments);
        return __self.apply(this, arguments);
    };
};

Function.prototype.after = function(afterfn) {
    var __self = this;
    return function() {
        var ret = __self.apply(this, arguments);
        afterfn.apply(this, arguments);
        return ret;
    };
};

// 或者避免污染原型链

var before = function(fn, beforefn) {
    return function() {
        beforefn.apply(this, arguments);
        return fn.apply(this, arguments);
    };
};

var after = function(fn, afterfn) {
    return function() {
        var ret = fn.apply(this, arguments);
        afterfn.apply(this, arguments);
        return ret;
    }
};
```

## 状态模式

状态模式的关键是区分事物内部的状态, 事物内部状态的改变会带来事物行为的改变. 一般的封装都是对对象的行为进行封装, 但是在状态模式这里则是需要封装对象的状态. 状态模式的关键是把事情的每种状态都封装成单独的类, 而跟对应状态有关的行为都被封装在这个类的内部. 只需要把请求委托给当前的状态对象, 对象就会负责渲染自身的行为.

状态对象的定义: 允许一个对象在其内部状态改变时改变它的行为, 对象看起来似乎修改了它的类.

- 状态模式能够定义状态与行为之间的关系, 并封装在一个类里. 通过新增的状态类, 方便地增加新的状态和转换
- 能够避免Context无限膨胀, 状态切换的逻辑被分布在状态类中, 去掉过多条件分支
- Context中的请求动作和状态类中封装的行为可以非常容易地独立变化而互不影响.

```javascript
// javascript版本的状态机, 无需在类中创建状态对象, 使用Function.prototype.call来进行委托就好
var Light = function() {
    this.currState = FSM.off; // 设置当前状态
    this.button = null;
};

Light.prototype.init = function() {
    var button = document.createElement('button'),
        self = this;
    button.innerHTML = '已关灯';
    this.button = document.body.appendChild(button);

    this.button.onclick = function() {
        self.currState.buttonWasPressed.call(self); // 委托请求给FSM状态机
    }
};

var FSM = {
    off: {
        buttonWasPressed: function() {
            console.log('关灯');
            this.button.innerHTML = '下一次是开灯';
            this.currState = FSM.on;
        }
    },
    on: {
        buttonWasPressed: function() {
            console.log('开灯');
            this.button.innerHTML = '下一次是关灯';
            this.currState = FSM.off;
        }
    }
};

var light = new Light();
light.init();
```

## 适配器模式

适配器模式能够解决两个软件实体接口不兼容的问题.

```javascript
var googleMap = {
    show: function() {
        console.log('开始渲染谷歌地图');
    }
};

var baiduMap = {
    display: function() {
        console.log('开始渲染百度地图');
    }
};

var baiduMapAdapter = {
    show: function() {
        return baiduMap.display();
    }
};

renderMap(googleMap);
renderMap(baiduMapAdapter);
```