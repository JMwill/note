/**
 * 进行内存展现格式化
 * @return {undefined} 纯粹输出格式化后的数据，无返回值
 */
var showMem = function () {
	var mem = process.memoryUsage();

	var format = function (bytes) {
		return (bytes / 1024 / 1024).toFixed(2) + 'MB';
	};

	console.log(
		'Process: heapTotal: ' + format(mem.heapTotal) +
		' heapUsed ' + format(mem.heapUsed) +
		' rss ' + format(mem.rss)
	);
	console.log('---------------------------------------------->');
};

/**
 * 利用分配数组来使用内存
 * @return {Array} 返回分配好的数组
 */
var useMem = function () {
	var size = 20 * 1024 * 1024;
	var arr = new Array(size);

	for (var i = 0; i < size; i++) {
		arr[i] = 0;
	}

	return arr;
}

/**
 * 创建Buffer数据，检验是否非V8引擎分配内存
 * @return {Buffer} Buffer类型数据
 */
function useOutOfStackMem() {
	var size = 200 * 1024 * 1024;
	var buffer = new Buffer(size);
	for (var i = 0; i < size; i++) {
		buffer[i] = 0;
	}
	return buffer;
}

var total = [];

/**
 * 运行内存占用测试
 */
// for (var j = 0; j < 15; j++) {
// 	showMem();
// 	// total.push(useMem());
// 	total.push(useOutOfStackMem());
// }
// showMem();


var hasOwnProperty = Object.prototype.hasOwnProperty;
var LimitableMap = function (limit) {
	this.limit = limit || 10;
	this.map = {};
	this.keys = [];
}

LimitableMap.prototype.set = function (key, val) {
	var map = this.map;
	var keys = this.keys;

	if (!hasOwnProperty.call(this, key)) {
		if (keys.length === this.limit) {
			var firstKey = keys.shift();
			delete map[firstKey];
		}
		keys.push(key)
	}
	map[key] = val;
};

LimitableMap.prototype.get = function (key) {
	return this.map[key];
};

var memoize = new LimitableMap();
for (var i = 0; i < 20; i++) {
	memoize.set('key-' + i, 'val: ' + i);
}

console.log(memoize.map);

