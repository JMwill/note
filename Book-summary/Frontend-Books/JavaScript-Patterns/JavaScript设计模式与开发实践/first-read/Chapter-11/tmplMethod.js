// Coffee and Tea
var Coffee = function() {};
Coffee.prototype.boilWater = function() {
    console.log('煮沸水');
};
Coffee.prototype.brewCoffeeGriends = function() {
    console.log('用沸水冲泡咖啡');
};
Coffee.prototype.pourInCup = function() {
    console.log('把咖啡倒进杯子');
};
Coffee.prototype.addSugarAndMilk = function() {
    console.log('加糖和牛奶');
};
Coffee.prototype.init = function() {
    this.boilWater();
    this.brewCoffeeGriends();
    this.pourInCup();
    this.addSugarAndMilk();
}
var coffee = new Coffee();
coffee.init();

var Tea = function() {};
Tea.prototype.boilWater = function() {
    console.log('煮沸水');
};
Tea.prototype.steepTeaBag = function() {
    console.log('用沸水浸泡茶叶');
};
Tea.prototype.pourInCup = function() {
    console.log('把茶水倒进杯子');
};
Tea.prototype.addLemon = function() {
    console.log('加柠檬');
};
Tea.prototype.init = function() {
    this.boilWater();
    this.steepTeaBag();
    this.pourInCup();
    this.addLemon();
}
var tea = new Tea();
tea.init();

// 添加模板方法模式，泛化算法结构
// 首先，分离出共同点，对泡茶以及泡咖啡的过程进行分析
// ---泡咖啡---            ---泡茶---
//   煮沸水                  煮沸水
//   用沸水冲泡咖啡           用沸水浸泡茶叶
//   把咖啡倒进杯子           把茶水倒进杯子
//   加糖和牛奶              加柠檬
//
// 不同点：
// 原料，一个是茶，一个是咖啡，抽象成饮料（beverage）
// 泡茶方式，一个是冲泡，一个是浸泡，抽象成“泡”
// 调料不同，一个是糖和牛奶，一个是柠檬，抽象成“调料”

var Beverage = function() {}
Beverage.prototype.boilWater = function() {
    console.log('煮沸水');
};
// 泡饮料
Beverage.prototype.brew = function() {};
// 倒饮料到杯子
Beverage.prototype.pourInCup = function() {};
// 加调料
Beverage.prototype.addCondiments = function() {};
// 执行过程
Beverage.prototype.init = function() {
    this.boilWater();
    this.brew();
    this.pourInCup();
    this.addCondiments();
};

var Coffee = function() {};
Coffee.prototype = new Beverage();
Coffee.prototype.brew = function() {
    console.log('用沸水冲泡咖啡');
};
Coffee.prototype.pourInCup = function() {
    console.log('把咖啡倒进杯子');
};
Coffee.prototype.addCondiments = function() {
    console.log('加糖和牛奶');
};

var coffee = new Coffee();
coffee.init();

// 茶是一样的实现过程

// Beverage.prototype.init 是模板方法，封装了子类的算法框架，指导子类一何种顺序去执行哪些方法。
// 由于JS没有任何形式的检查，无法保证子类会重写父类的“抽象方法”，因此，一旦子类没有重写方法，执行
// 算法（init）时就会出现调用父类空方法的情况，这明显不符合要求。因此可以通过
// 1. 鸭子类型的接口检查（会引入与业务逻辑无关的代码）
// 2. 在父类空方法中添加错误抛出语句，在运行时提示（得到错误信息时间点太靠后）


// 钩子方法，当需要个性化定制的时候，通过放置钩子来隔离变化是一种手段，钩子可以有一个默认的实现，
// 而要不要“挂钩”由子类自行决定
var Beverage = function() {}
Beverage.prototype.boilWater = function() {
    console.log('煮沸水');
};
// 泡饮料
Beverage.prototype.brew = function() {};
// 倒饮料到杯子
Beverage.prototype.pourInCup = function() {};
// 加调料
Beverage.prototype.addCondiments = function() {};
// 加调料的钩子
Beverage.prototype.customerWantCondiments = function() {
    return true;
};
// 执行过程
Beverage.prototype.init = function() {
    this.boilWater();
    this.brew();
    this.pourInCup();
    if (this.customerWantCondiments()) {
        this.addCondiments();
    }
};

var Coffee = function() {};
Coffee.prototype = new Beverage();
Coffee.prototype.brew = function() {
    console.log('用沸水冲泡咖啡');
};
Coffee.prototype.pourInCup = function() {
    console.log('把咖啡倒进杯子');
};
Coffee.prototype.addCondiments = function() {
    console.log('加糖和牛奶');
};
Coffee.prototype.customerWantCondiments = function() {
    return window.confirm('需要调料吗？');
}

var coffee = new Coffee();
coffee.init();


// JavaScript使用非继承方式实现模板方法模式
var Beverage = function(param) {
    var boilWater = function() {
        console.log('煮沸水');
    }
    var brew = param.brew || function() {
        throw new Error('必须传递brew方法');
    }
    var pourInCup = param.pourInCup || function() {
        throw new Error('必须传递pourInCup方法');
    }
    var addCondiments = param.addCondiments || function() {
        throw new Error('必须传递addCondiments方法');
    }

    var F = function() {};
    F.prototype.init = function() {
        boilWater();
        brew();
        pourInCup();
        addCondiments();
    }
};

var Coffee = Beverage({
    brew: function() {
        console.log('用沸水冲泡咖啡');
    },
    pourInCup: function() {
        console.log('把咖啡倒进杯子');
    },
    addCondiments: function() {
        console.log('加糖和牛奶');
    }
});
var coffee = new Coffee();
coffee.init();
