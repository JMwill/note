// TCP服务
// 一般的服务器实现
// var net = require('net');

// var server = net.createServer(function (socket) {
// 	socket.on('data', function (data) {
// 		socket.write('你好');
// 	});

// 	socket.on('end', function () {
// 		console.log('连接断开');
// 	});

// 	socket.write('欢迎光临《深入浅出Nodejs》示例\n');
// });

// server.listen(8124, function () {
// 	console.log('server bound');
// });


// 服务器的流式操作
// var net = require('net');

// var server = net.createServer(function (socket) {
// 	socket.write('Echo server\r\n');

// 	socket.pipe(socket);
// });

// server.listen(8124, function () {
// 	console.log('server bound');
// });


// UDP服务
var dgram = require('dgram');

var server = dgram.createSocket('udp4');

server.on('message', function (msg, remote) {
	console.log('server get: ' + msg + " from " + remote.address + ":" + remote.port);
});

server.on('listening', function () {
	var address = server.address();
	console.log("server listening " + address.address + ":" + address.port);
});


server.bind('1234');