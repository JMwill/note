// TCP client
// var net = require('net');

// var client = net.connect({port: 8124}, function () {
// 	console.log('client connected');
// 	client.write('world!\r\n');
// });

// client.on('data', function(data) {
// 	console.log(data.toString());
// 	client.end();
// });

// client.on('end', function () {
// 	console.log('client disconnected');
// });


var dgram = require('dgram');

var buf = new Buffer('深入浅出Nodejs');

var client = dgram.createSocket('udp4');

client.send(buf, 0, buf.length, 1234, 'localhost', function (err, bytes) {
	client.close();
});

