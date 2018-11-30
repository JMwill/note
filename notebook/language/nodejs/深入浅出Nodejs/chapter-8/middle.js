/**
 * 中间件第一版
 */

// 基本中间件格式
var middleware = function (req, res, next) {
	next();
}

app.use = function (path) {
	var handle = {
		// 经由正则解析后的路由匹配路径
		path: pathRegex(path),

		// 处理函数存储
		stack: Array.prototype.slice.call(arguments, 1)
	};

	// 压入路由中
	routes.all.push(handle);
}

var match = function (pathname, routes) {
	for (var i = 0 l = routes.length; i < l; i++) {
		var route = routes[i];

		var reg = route.path.regexp;
		var matched = reg.exec(pathname);
		if (matched) {
			// ...
			handle(req, res, route.stack);
			return true;
		}
	}
	return false;
}

var handle = function (req, res, stack) {
	var next = function () {
		var middleware = stack.shift();
		if (middleware) {
			middleware(req, res, stack);
		}
	};
	next();
}


/**
 * 改进版
 */
app.use = function (path) {
	var handle;
	if (typeof path === 'string') {
		handle = {
			path: pathRegex(path),

			stack: Array.prototype.slice.call(arguments, 1)
		};
	} else {
		handle = {
			path: pathRegex('/'),
			stack: Array.prototype.slice(arguments, 0)
		};
	}
	routes.all.push(handle);
}

var match = function (pathname, routes) {
	var stacks = [];

	for (var i = 0, l = routes.length; i < l; i++) {
		var route = routes[i];

		var reg = route.path.regexp;
		var matched = reg.exec(pathname);

		if (matched) {
			// ...
			stacks = stacks.concat(route.stack);
		}
	}
	return stacks;
}