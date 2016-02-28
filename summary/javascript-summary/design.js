// 单体模式
// 通过缓存this的方式实现单体模式
function Universe(name, age) {
	if (Universe.instance) {
		return Universe.instance;
	} else {
		if (this instanceof Universe) {
			Universe.instance = this;
		} else {
			return new Universe(name, age);
		}

		this.name = name;
		this.age = age;

		this.setName = function (name) {
			this.name = name;
		};
		this.setAge = function (age) {
			this.age = age;
		}
	}
}


// var unit1 = Universe('will', 23);
// var unit2 = Universe('test', 22);
// unit2.setName('test');


// console.log(unit1.name);
// console.log(unit1.age);
// console.log(unit2.name);
// console.log(unit2.age);



// 采用立即执行函数来进行单体的创建
var Universe;
(function () {
	var storage;

	Universe = function (name, age) {
		if (!(this instanceof Universe))
			return new Universe(name, age);
		if (storage) {
			return storage
		}

		storage = this;

		this.name = name;
		this.age = age;

		this.getName = function () {
			return name;
		};

		this.setName = function (name) {
			this.name = name;
		}
	};
}());


// var unit1 = Universe('will', 23);
// var unit2 = Universe('test', 22);

// console.log(unit1.name);
// console.log(unit1.age);
// unit2.setName('test');
// console.log(unit1.name);
// console.log(unit1.age);
// console.log(unit2.name);
// console.log(unit2.age);

// 工厂模式
function Maker() {};

Maker.factory = {};
Maker.createProduct = function(type) {
	if (typeof Maker.factory[type] !== 'function') {
		throw new Error('no this type modal!');
	}

	if (Maker.factory[type].prototype.constructor !== Maker) {
		Maker.factory[type].prototype = new Maker();
	}

	return new Maker.factory[type](arguments[1]);
};

Maker.factory.bike = function (name) {
	console.log('you got a bike, name: ' + name);
	this.name = name;
};

Maker.factory.ship = function (name) {
	console.log('you got a ship, name: ' + name + ' with white color!');

	this.color = 'white';
};

Maker.factory.car = function (name) {
	console.log('you got a car, name: ' + name + ' power is 21000');
	this.power = 21000;
};


var newBike = Maker.createProduct('bike', 'Mount');
var newShip = Maker.createProduct('ship', 'Fish');
var newCar = Maker.createProduct('car', 'BMW');

try {
	var newAirplain = Maker.createProduct('airplain');
} catch (e) {
	console.log(e.message);
}

// console.log(newBike.name);
// console.log(newShip.color);
// console.log(newCar.power);
// console.log(newAirplain ? 'have new Airplain' : 'no airplain');


// 迭代器模式就是返回具有获取下一个对象/数据的next方法的对象



// 装饰器模式
function Decorator() {
}

Decorator.prototype.test = function() {
	return 'I am test!';
}

Decorator.decList = {};

Decorator.decList.testOne = {
	'test': function() {
		return this.uber.test() + ' after test one';
	}
};

Decorator.decList.testTwo = {

	'test': function() {
		return this.uber.test() + ' after test two';
	}
};

Decorator.decList.testThree = {
	'test': function() {
		return this.uber.test() + ' after test three';
	}
};


Decorator.prototype.decorate = function(type) {
	var F = function() {},
		override = this.constructor.decList[type];

	F.prototype = this;

	var newObj = new F();
	newObj.uber = F.prototype;
	for (var i in override) {
		if (override.hasOwnProperty(i)) {
			newObj[i] = override[i];
		}
	}

	return newObj;
}

// var dec = new Decorator();
// dec = dec.decorate('testOne');
// dec = dec.decorate('testTwo');
// dec = dec.decorate('testThree');
// dec = dec.decorate('testOne');
// console.log(dec.test());


// 数组实现装饰器
function Decorator(data) {
	this.decList = [];
	this.data = data || 'Use for test';
}

Decorator.prototype.test = function() {
	return 'I am test!';
}

Decorator.decList = {};
Decorator.decList.testOne = function (data){
	return data + ' after test one';
};

Decorator.decList.testTwo = function (data) {
	return data + ' after test two';
};

Decorator.decList.testThree = function (data) {
	return data + ' after test three';
};


Decorator.prototype.decorate = function(type) {
	this.decList.push(type);
};

Decorator.prototype.test = function() {
	var data = this.data;
	this.decList.forEach(function(elem) {
		data = Decorator.decList[elem](data);
	});
	return data;
}

// var dec = new Decorator();
// dec.decorate('testOne');
// dec.decorate('testTwo');
// dec.decorate('testThree');

// console.log(dec.test());


// 策略模式，按照自己的理解进行实现

var validator = (function () {
	function getType(value) {
		return Object.prototype.toString.call(value);
	}

	function F() {};

	F.config = {};
	F.message = [];
	F.method = {
		isNonEmpty: function (value) {
			if (!(typeof value !== 'object' && value !== '')) {
				return 'error :' + value + ' check is un validate';
			}
		},
		isNumber: function (value) {
			if (getType(value) !== '[object Number]') {
				return 'error :' + value + ' value is not number';
			}
		},
		isArray: function (value) {
			if (getType(value) !== '[object Array]') {
				return 'error :' + value + ' value is not array';
			}
		}
	};

	F.validate = function (data) {
		var message, fun;
		for (var i in F.config) {
			fun = F.method[F.config[i]];

			message = fun(data[i]);
			if (message) {
				F.message.push(message);
				message = undefined;
			}
		}
	};

	F.hasError = function () {
		return Boolean(F.message.length);
	}

	return F;
}());


// var data = {
// 	firstTest: [],
// 	secondTest: 10,
// 	thirdTest: ''
// };

// validator.config = {
// 	'firstTest': 'isNonEmpty',
// 	'secondTest': 'isNumber',
// 	'thirdTest': 'isArray'
// };

// validator.validate(data);
// if (validator.hasError()) {
// 	console.log(validator.message.join('\n'));
// }


// 外观模式，其实也就是将一些方法封装在一起，当需要时可以
// 进行调用，同时当方法需要升级时，不需要修改到调用的文件，
// 只需要在原有的方法上进行添加修改即可，如：
event = {
	stop: function (e) {
		e.preventDefault();
	}
}

// 现在stop方法需要升级，因此，所有调用stop方法的部分都不用
// 修改，只需要修改sotp方法的实现即可, 外观模式是合并了多个
// 方法调用的便利方法
event = {
	stop: function (e) {
		e.preventDefault();
		e.stopPropagation();
	}
}



// 代理模式

var proxy = {
	delay: 500,
	word: [],
	timeout: undefined,
	speak: function () {
		if (!proxy.timeout) {
			var that = this;
			proxy.timeout = setTimeout(function () {
				console.log(that.name + ': ' + proxy.word);
				proxy.word = [];
				proxy.timeout = undefined;
			}, proxy.delay);
		}
		proxy.word.push(this.word[this.wordCount++ % 3][Math.floor(Math.random() * 3)]);
	}
};
var Speaker = function (name) {
	this.wordCount = 0;
	this.name = name;
	this.word = [
		['apple', 'orange', 'pinapple'],
		['eat', 'fly', 'run'],
		['the mountain', 'the river', 'the shit']
	];
	this.speak = proxy.speak;
}

var will = new Speaker('JMwill');

window.onkeypress = function (e) {
	if (e.which === 111) {
		will.speak();
	}
}

