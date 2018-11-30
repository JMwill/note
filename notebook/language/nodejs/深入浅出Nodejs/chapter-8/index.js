/**
 * create node simple server
 */

var url = require('url');
var querystring = require('querystring');

function queryUrl(req, flag) {
	var val = url.parse(req.url)[flag] || null;
	console.log(val);
	return val;
}

function urlQueryParser(str) {
	var val = querystring.parse(str);
	console.dir(val);
	return val;
}

function send(res) {
	return function (msg) {
		res.write(msg + '\n');
	}
}

var requestListener = (req, res) => {
	res.writeHead(200, {'Content-Type': 'text/plain'});
	var sender = send(res);
	sender('path string is: ');
	sender(queryUrl(req, 'path'));

	sender('query string is: ');
	sender(queryUrl(req, 'query'));

	sender('query object is: ');
	sender(JSON.stringify(urlQueryParser(queryUrl(req, 'query'))));

	sender('hello! This is sending message');
	res.end('end message!');
}

var http = require('http');
http.createServer(requestListener)
	.listen(1234, 'localhost');