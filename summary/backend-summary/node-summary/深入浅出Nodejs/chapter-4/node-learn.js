var EventEmitter = require("events").EventEmitter;
var util = require('util');

function Promise() {
	EventEmitter.call(this);
}

util.inherits(Promise, EventEmitter);

Promise.prototype.then = 
function (
	fulfilledHandler,
	errorHandler,
	progressHandler
) {
	if (typeof fulfilledHandler === 'function') {
		this.once('success', fulfilledHandler);
	}

	if (typeof errorHandler === 'function') {
		this.once('error', errorHandler);
	}

	if (typeof progressHandler === 'function') {
		this.on('progress', progressHandler);
	}

	return this;
};

var Deffered = function () {
	this.stat = 'unfulfilled';
	this.promise = new Promise();
};

Deffered.prototype.resolve = function (obj) {
	this.stat = 'fulfilled';
	this.promise.emit('success', obj);
}

Deffered.prototype.reject = function (err) {
	this.stat = 'error';
	this.promise.emit('error', err);
}

Deffered.prototype.progress = function (data) {
	this.promise.emit('progress', data);
}

var promisify = function (obj) {
	var deffered = new Deffered();
	var result = '';
	obj.on('event1', function (msg) {
		result += msg;
		deffered.progress(msg);
	});

	obj.on('event2', function () {
		deffered.resolve(result);
	});

	obj.on('error', function (err) {
		deffered.reject(err);
	});

	return deffered.promise;
};

function Test() {
	EventEmitter.call(this);
}

util.inherits(Test, EventEmitter);
promisify(Test)
	.then(function (data) {
		console.log(data);
	}, function (err) {
		console.log(err);
	}, function (chunk) {
		console.log('Body ' + chunk);
	});