// 职责链对象
// 沟通每个职责对象，传递消息
// 约定返回nextSuccessor为交由下一对象处理
var Chain = function(fn) {
    this.fn = fn;
    this.successor = null;
};
Chain.prototype.setNextSuccessor = function(successor) {
    console.log(successor);
    return this.successor = successor;
};
Chain.prototype.passRequest = function() {
    var ret = this.fn.apply(this, arguments);
    if (ret === 'nextSuccessor') {
        return this.successor && this.successor.passRequest.apply(this.successor, arguments);
    }
    return ret;
};

// 测试代码
var order500 = function(orderType, pay, stock) {
    if (orderType === 1 && pay === true) {
        console.log('500元定金预购，得到100优惠券');
    } else {
        return 'nextSuccessor';
    }
};
var order200 = function(orderType, pay, stock) {
    if (orderType === 2 && pay === true) {
        console.log('200元定金预购，得到50优惠券');
    } else {
        return 'nextSuccessor';
    }
};
var orderNormal = function(orderType, pay, stock) {
    if (stock > 0) {
        console.log('普通购买，无优惠券');
    } else {
        console.log('手机库存不足');
    }
};
var chain500 = new Chain(order500);
var chain200 = new Chain(order200);
var chainOrderNormal = new Chain(orderNormal);

chain500.setNextSuccessor(chain200);
chain200.setNextSuccessor(chainOrderNormal);

chain500.passRequest(1, true, 500);
chain500.passRequest(2, true, 500);
chain500.passRequest(3, true, 500);
chain500.passRequest(1, false, 0);


// 为职责链添加异步能力
Chain.prototype.next = function() {
    return this.successor && this.successor.passRequest.apply(this.successor, arguments);
};

// 测试代码
var fn1 = new Chain(function() {
    console.log(1);
    return 'nextSuccessor';
});
var fn2 = new Chain(function() {
    console.log(2);
    var self = this;
    setTimeout(function() {
        self.next();
    }, 1000);
});
var fn3 = new Chain(function() {
    console.log(3);
});

fn1.setNextSuccessor(fn2).setNextSuccessor(fn3);
fn1.passRequest();

// AOP实现职责链
Function.prototype.after = function(fn) {
    var self = this;
    return function() {
        var ret = self.apply(this, arguments);
        if (ret === 'nextSuccessor'){
            return fn.apply(this, arguments);
        }
        return ret;
    }
};
var order = order500.after(order200).after(orderNormal);
order(1, true, 500);
order(2, true, 500);
order(1, false, 500);
