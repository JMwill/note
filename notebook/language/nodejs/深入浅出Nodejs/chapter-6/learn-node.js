/**
 * 测试Buffer的toString方法
 */
var charLen = 3;
var encode = 'utf-8';
var buf = new Buffer('这是测试字符串', encode);

function reduceChar(buffer, charLen, encoding) {
	encoding = encoding || 'utf-8';
	charLen = charLen || 1;
	for (var i = 0, l = buf.length / charLen; i < l; i++) {
		console.log(
			buf.toString(encode, charLen * i, buf.length)
		);
	}
}

reduceChar(buf, 3);

var buf = new Buffer('又一个测试字符串', encode);

reduceChar(buf, 3);



var bufOne = new Buffer('test string one!');
var bufTwo = new Buffer('test string two!');

var emptyBuf = new Buffer(bufOne.length + bufTwo.length);

var initPos = 0;
bufOne.copy(emptyBuf, initPos);
console.log(emptyBuf.toString());

initPos = bufOne.length;
bufTwo.copy(emptyBuf, initPos);
console.log(emptyBuf.toString());
