// 示例一般计算年终奖金的代码，等级为S的4倍奖金，A为3倍，B为2倍
// 示例缺乏弹性，违反封闭-开放原则，有修改需要深入内部实现
var calculateBonus = function (performance, salary) {
    if (performance === 'S') { return salary * 4; }
    if (performance === 'A') { return salary * 3; }
    if (performance === 'B') { return salary * 2; }
};

// 使用组合函数重构代码
// 提取了算法部分，可复用，但改善甚少，系统变化时缺乏弹性
var performanceS = function (salary) { return salary * 4; };
var performanceA = function (salary) { return salary * 3; };
var performanceB = function (salary) { return salary * 2; };

var calculateBonus = function (performance, salary) {
    if (performance === 'S') { return performanceS(salary); }
    if (performance === 'A') { return performanceA(salary); }
    if (performance === 'B') { return performanceB(salary); }
}

// 类式策略组合模式
var performanceS = function () {};
performanceS.prototype.calculate = function (salary) {
    return salary * 4;
};
var performanceA = function () {};
performanceA.prototype.calculate = function (salary) {
    return salary * 3;
};
var performanceB = function () {};
performanceB.prototype.calculate = function (salary) {
    return salary * 2;
};

var Bonus = function () {
    this.salary = null;
    this.strategy = null;
}

Bonus.prototype.setSalary = function (salary) {
    this.salary = salary;
}
Bonus.prototype.setStrategy = function (strategy) {
    this.strategy = strategy;
}
Bonus.prototype.getBonus = function () {
    return this.strategy.calculate(this.salary);
}

var bonus = new Bonus();
bonus.setSalary(4000);
bonus.setStrategy(new performanceS());

console.log(bonus.getBonus());

bonus.setStrategy(new performanceB());
console.log(bonus.getBonus());

// JavaScript式的策略模式
var strategies = {
    'S': function (salary) {
        return salary * 4;
    },
    'A': function (salary) {
        return salary * 3;
    },
    'B': function (salary) {
        return salary * 2;
    }
};

var calculateBonus = function (salary, strategy) {
    return strategies[strategy](salary);
}

console.log(calculateBonus(4000, 'S'));
