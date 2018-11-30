// // // // // // 备忘模式
// // // // // var fun = function (param) {
// // // // // 	var f = arguments.callee,
// // // // // 		result;
// // // // // 	if (!f.cache[param]) {
// // // // // 		result = {};
// // // // // 		for (var i = 1; i < parseInt(param); i++) {
// // // // // 			result[i] = i + '' + i;
// // // // // 		}
// // // // // 		f.cache[param] = result;
// // // // // 	}
// // // // // 	return f.cache[param];
// // // // // }
// // // // // fun.cache = {};

// // // // // console.time('one');
// // // // // var a = fun(1000000);
// // // // // console.timeEnd('one');

// // // // // console.time('two');
// // // // // var b = fun(1000000);
// // // // // console.timeEnd('two');

// // // // var alian = {
// // // // 	sayHi: function (who) {
// // // // 		return "Hello " + (who ? ", " + who : '') + "!";
// // // // 	}
// // // // }

// // // // console.log(alian.sayHi('world'));
// // // // console.log(alian.sayHi.call(alian, 'will'));

// // // // 函数柯里化
// // // function toCurry(fn) {
// // // 	var slice = Array.prototype.slice,
// // // 		saveArg = slice.call(arguments, 1),
// // // 		that = this;
// // // 	return function () {
// // // 		var funArg = slice.call(arguments);
// // // 		return fn.apply(that, saveArg.concat(funArg));
// // // 	}
// // // }

// // // function add() {
// // // 	arguments = Array.prototype.slice.apply(arguments);
// // // 	return arguments.reduce(function (x, y) {
// // // 		return x + y;
// // // 	})
// // // }

// // // var curryAdd = toCurry(add, 1, 2, 3);
// // // curryAdd = toCurry(curryAdd, 4, 5, 6, 7)
// // // console.log(curryAdd(8));


// // // 通用命名空间函数
// // var MYAPP = {};
// // function namespace(str, par) {
// // 	var parts = str.split('.'),
// // 		parent;

// // 	if (typeof par === 'object') {
// // 		namespace.parent = par;
// // 	} else if (!namespace.parent) {
// // 		throw new Error('first time need a global module obj');
// // 	}
// // 	parent = namespace.parent;
// // 	parts = parts[0] === parent ? parts.slice(1) : parts;

// // 	parts.forEach(function (elem) {
// // 		parent[elem] = parent[elem] || {};
// // 		parent = parent[elem];
// // 	});
// // 	return parent;
// // }

// // var module2 = namespace('module1.module2', MYAPP);
// // var module3 = namespace('module1.module2.module3');
// // console.log(module2 === MYAPP.module1.module2);
// // console.log(module3 === MYAPP.module1.module2.module3);
// // console.log(module2 === MYAPP.module1.module2);

// // 揭示模块模式
// // use namespace to generate a namespace
// // namespace('utils.Array', MYAPP);

// // use for test
// var MYAPP = {
// 	utils: {
// 		array: {},
// 		lang: 'China'
// 	}
// };

// MYAPP.utils.array= (function () {
// 	// add dependence
// 	var lang = MYAPP.utils.lang,

// 	// create private value;
// 		arrStr = '[object Array]',
// 		toString = Object.prototype.toString;

// 	// private function
// 	function isArray(obj) {
// 		return toString.call(obj) === arrStr;
// 	}

// 	function indexOf(haystack, needle) {
// 		if (isArray(haystack)) {
// 			for (var i = 0, j = haystack.length; i < j; i++) {
// 				if (haystack[i] === needle)
// 					return i;
// 			}
// 			return -1;
// 		}
// 	}

// 	function inArray(haystack, needle) {
// 		if (indexOf(haystack, needle) != -1)
// 			return true;
// 		return false;
// 	}
// 	return {
// 		isArray: isArray,
// 		indexOf: indexOf,
// 		inArray: inArray
// 	};
// }());

// console.log(MYAPP.utils.array.isArray([]));
// console.log(MYAPP.utils.array.indexOf([1,2, 3, 4, 5, 6], 4));
// console.log(MYAPP.utils.array.inArray([1,2, 3, 4, 5, 6], 4));

// // 构造函数的模块
// MYAPP.utils.Array = (function () {
// 	// ... do things like prev, but return with another	way
// 	// private value
// 	var slice = Array.prototype.slice;
// 	var Constructor = function (o) {
// 		this.elements = slice.call(o);
// 	};

// 	Constructor.prototype = {
// 		coustructor: MYAPP.utils.Array,
// 		version: '',
// 		toArray: function (obj) {
// 			return slice.call(obj);
// 		}
// 	}
// 	return Constructor;
// }());

// var testObj = (function () {return arguments}(1,2,3,4,5,6));
// console.log(Object.prototype.toString.call(testObj));
// console.dir(testObj);
// testObj = new MYAPP.utils.Array(testObj);
// console.log(Object.prototype.toString.call(testObj));
// console.dir(testObj);

// // 沙箱模式
// var SandBox = function () {
// 	var slice = Array.prototype.slice,
// 		toType = Object.prototype.toString,
// 		isArr = function (obj) {
// 			return toType.call(obj) === '[object Array]';
// 		},
// 		args = slice.call(arguments),
// 		callback = args.pop(),

// 		modules = isArr(args[0]) ? args[0] : args;

// 	this.a = 1; // set something you want config in SandBox

// 	if (!(this instanceof SandBox)) {
// 		return new SandBox(modules, callback);
// 	}

// 	if (!modules.length || modules [0] === '*') {
// 		modules = [];
// 		for (var i in SandBox.modules) {
// 			if (SandBox.modules.hasOwnProperty(i)) {
// 				modules.push(i);
// 			}
// 		}
// 	}

// 	for (var i = 0, l = modules.length; i < l; i++) {
// 		SandBox.modules[modules[i]](this);
// 	}

// 	callback(this);
// };

// SandBox.modules = {};
// SandBox.modules.dom = function (box) {
// 	box.getElement = function () {console.log('getElement');},
// 	box.setElement = function () {console.log('setElement');},
// 	box.delElement = function () {console.log('delElement');}
// };

// SandBox.modules.event = function (box) {
// 	box.Emitter = function () {console.log('Emitter');},
// 	box.Event = function() {console.log('Event');}
// };

// SandBox.prototype = {
// 	version: '',
// 	// ...
// };
// SandBox('event', function (box) {
// 	console.dir(box);
// });


// 类继承模式#1 默认模式
function inherit(Child, Parent) {
	Child.prototype = new Parent();
}

function Parent() {}
Parent.prototype.name = 'prototype';
function Child() {}

var child = new Child();
console.log(child.name);

inherit(Child, Parent);

var child2 = new Child();
console.log(child2.name);


// 类继承模式#2 借用构造函数模式
function Water(name) {
	this.name = name;
}

function Coffee(name) {
	Water.apply(this, arguments);
}

var nest = new Coffee('nest');
var boilWater = new Water('boil water');

// 并不是引用同一个对象，prototype不一样，不会对
// 父对象有其他影响。
console.log(boilWater.name);
console.log(nest.name);

// 借用构造函数实现多重继承
function CocoPowder(powder) {
	this.powder = powder;
}

function Coco(name) {
	Water.call(this, name);
	CocoPowder.call(this, 'coco');
}

var willCoco = new Coco('will coco');

console.log(willCoco.name);
console.log(willCoco.powder);

// 类继承模式#3 糅合#1 和 #2 两种形式的优点，不过会出现效率低下的情况，因为相同的部分被继承了两次
function Phone(name) {
	this.name = name;
}
Phone.prototype.init = function () {
	console.log('haha, An ' + this.name + ' was created');
}

function SmartPhone(name) {
	Phone.apply(this, arguments);
}

SmartPhone.prototype = new Phone();
SmartPhone.prototype.constructor = SmartPhone;

var iphone = new SmartPhone('iphone');

console.log(iphone.name);
iphone.init();

// 共享原型模式#4 仅仅是将子对象的原型对象设置为父对象的原型对象

function Flower() {};
Flower.prototype.showPerfume = function () {
	console.log('charming perfume of ' + this.name);
}

function Rose(name) {
	this.name = name;
}
Rose.prototype = Flower.prototype;

var redRose = new Rose('red rose');
redRose.showPerfume();


// 临时构造函数模式#5 
function Fun() {
	this.name =  'Fun';
}

Fun.prototype.sayName = function () {
	console.log(this.name);
}

function SubFun() {
	this.name = 'sub fun';
}
function inherit(Child, Parent) {
	var tempFun = function () {};
	tempFun.prototype = Parent.prototype;
	Child.prototype = new tempFun();
}

inherit(SubFun, Fun);

var subFun = new SubFun();
console.log(subFun.name);
subFun.sayName();
delete subFun.name;
console.log(subFun.name);
subFun.sayName();
// 这种模式能够避免继承到父类中this下的属性，而对于原型上的通用属性能够进行继承

// 在使用上述方法的时候还可以考虑存储父类
function inherit(Child, Parent) {
	var tempFun = function (){};
	tempFun.prototype = Parent.prototype;
	Child.prototype = new tempFun();

	Child.uber = Parent.prototype;
}

console.log(SubFun.uber.constructor);

// 为避免每次创建时都需要创建一个替代函数，可以使用闭包的方式优化
var inherit = (function () {
	var F = function () {};
	return function (Child, Parent) {
		F.prototype = Parent.prototype;
		Child.prototype = new F();
		Child.prototype.constructor = Child;
		Child.uber = Parent.prototype;
	};
}());

// Klass in javascript

var Klass = function (Parent, prop) {

	var Child = function () {
		if (Child.uber && Child.uber.hasOwnProperty('__constructor')) {
			Child.uber.__constructor.apply(this, arguments);
		}

		if (Child.prototype.hasOwnProperty('__constructor')) {
			Child.prototype.__constructor.apply(this, arguments);
		}
	}

	Parent = Parent || Object;

	var F = function () {};
	F.prototype = Parent.prototype;
	Child.prototype = new F();
	Child.prototype.constructor = Child;
	Child.uber = Parent.prototype;

	for (var i in prop) {
		if (prop.hasOwnProperty(i)) {
			Child.prototype[i] = prop[i];
		}
	}

	return Child;

}


var Man = function (age) {
	this.name = 'human';
	this.age = age;
}

Man.prototype.say = function () {
	console.log('I am ' + this.age + ' old');
}

var SuperMan = Klass(Man, {
	__constructor: function (power) {
		console.log('I have ' + power + ' power');
		this.power = power;
	},
	say: function () {
		console.log('I am super man!');
	}
});

var chinese = new Man(10);
var chineseSuperMan = new SuperMan(10000);

chinese.say();
chineseSuperMan.say();
