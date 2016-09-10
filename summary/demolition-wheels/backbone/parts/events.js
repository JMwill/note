(function() {
    var _isType = function(type) {
        if (typeof type != 'string') {return;}
        return function(obj) {
            return (
                Object
                .prototype
                .toString
                .call(obj)
                .slice(8, -1)
                .toUpperCase() === type.toUpperCase()
            );
        }
    }

    var _isObject = _isType('object');
    var _isFunction = _isType('function');

    var _extend = function(target) {
        if (_isFunction(Object.assign)) {
            return Object
                .assign
                .apply(null, [target].concat([].slice.call(arguments, 1)));
        }
        if (target == null) {
            throw new TypeError('Cannot convert undefined or null to object');
        }
        target = Object(target);
        var source;
        for (var i = 1; i < arguments.length; i++) {
            source = arguments[i];
            if (source != null) {
                for (var key in source) {
                    if (Object.prototype.hasOwnProperty.call(source, key)) {
                        target[key] = source[key];
                    }
                }
            }
        }
        return target;
    };

    var _has = function(obj, key) {
        return obj != null && hasOwnProperty.call(obj, key);
    };

    var _keys = function(obj) {
        if (!_isObject(obj)) {return [];}
        if (_.isFunction(Object.keys)) {
            return Object.keys(obj);
        }
        var keys = [];
        for (var key in obj) {
            if (_has(obj, key)) {
                keys.push(key);
            }
        }
        return keys;
    }

    /**
     * 事件对象
     * 作用：能够提供任何对象自定义事件的能力
     * 基础方法：绑定：on、解绑：off、触发事件：trigger
     * var object = {};
     * _.extend(object, Events);
     * object.on('expend', function() { alert('expended'); });
     * object.trigger('expend');
     */
    var Events = {};

    // split event strings
    var eventSplitter = /\s+/;

    // 迭代事件，包括标准事件形式‘event， callback’，以及期望的空格分割的事件
    // ‘"blur change", callback’和类似jQuery的事件映射{event: callback};

    var eventsApi = function(iteratee, events, name, callback, opts) {
        var i = 0,
            names;
        // 事件映射
        if (name && typeof name === 'object') {
            // void 0 等同 undefined，void操作符的作用是能向期望一个表达式的值
            // 是undefined的地方插入会产生副作用的表达式
            if (
                callback !== void 0 &&
                'context' in opts &&
                opts.context === void 0
            ) {
                opts.context = callback;
            }
            // Object.keys方法原为 _.keys()
            for (names = _keys(name); i < names.length; i++) {
                events = eventsApi(iteratee, events, names[i], name[names[i]], opts);
            }
        } else if (name && eventSplitter.test(name)) {
            // 为每一个事件绑定函数
            for (names = name.split(eventSplitter); i < names.length; i++) {
                events = iteratee(events, names[i], callback, opts);
            }
        } else {
            events = iteratee(events, name, callback, opts);
        }
        return events;
    }

    // 为回调函数绑定事件，输入all会为回调函数绑定所有的事件
    Events.on = function(name, callback, context) {
        return internalOn(this, name, callback, context);
    }

    // 守护公有API的‘listening’参数
    var internalOn = function (obj, name, callback, context, listening) {
        obj._events = eventsApi(onApi, obj._events || {}, name, callback, {
            context: context,
            ctx: obj,
            listening: listening
        });

        if (listening) {
            var listeners = obj._listeners || (obj._listeners = {});
            listeners[listening.id] = listening;
        }

        return obj;
    }

    // 控制反转版本的‘on’函数。告诉*this*对象去监听其他对象的事件，追踪监听了什么，
    // 为方便以后解绑
    Events.listenTo = function (obj, name, callback) {
        if (!obj) { return this; }
        // 找出正在监听的对象或新建一个记录监听对象的对象
        var id = obj._listenId || (obj._listenId = _.uniqueId('l'));
        var listeningTo = this._listeningTo || (this._listeningTo = {});
        var listening = listeningTo[id];

        // 如果对象还没有正在监听其他绑定在‘obj’上的事件
        // 建立必要的引用去追踪正在监听的回调函数
        if (!listening) {
            var thisId = this._listenId || (this._listenId = _.uniqueId('l'));
            listening = listeningTo[id] = {
                obj: obj,
                objId: id,
                id: thisId,
                listeningTo: listeningTo,
                count: 0
            }
        }

        // 绑定回调函数到对象上，并保持监听它们的行踪
        internalOn(obj, name, callback, this, listening);
        return this;
    }

    // reducing API，添加回调函数到‘events’对象上
    var onApi = function (events, name, callback, options) {
        if (callback) {
            var handlers = events[name] || (events[name] = []);
            var context = options.context, ctx = options.ctx, listening = options.listening;
            if (listening) { listening.count++; }
            handlers.push({
                callback: callback,
                context: context,
                ctx: context || ctx,
                listening: listening
            });
        }
        return events;
    };

    // 移除一个或多个回调函数。
    // 如果‘context’是空的，移除所有关于这个函数的回调函数
    // 如果‘callback’是空的，移除所有这个事件包含的回调函数。
    // 如果‘name’是空的，移除所有事件范围内的回调函数
    Events.off = function(name, callback, context) {
        if (!this._events) { return this; }
        this._events = eventsApi(offApi, this._events, name, callback, {
            context: context,
            listeners: this._listeners
        });
        return this;
    };

    // 告诉这个对象停止监听具体的事件或者当前的每一个对象
    Events.stopListening = function (obj, name, callback) {
        var listeningTo = this._listeningTo;
        if (!listeningTo) { return this; }

        var ids = obj ? [obj._listenId] : _keys(listeningTo);

        for (var i = 0; i < ids.length; i++) {
            var listening = listeningTo[ids[i]];

            // 如果listening不存在，这个对象不是当前正在监听的对象，提前退出
            if (!listening) break;
        }
        return this;
    };

    // reducing API，从'events'对象中移除回调函数
    var offApi = function(events, name, callback, options) {
        if (!events) return;

        var i = 0, listening;
        var context = options.context, listeners = options.listeners;

        // 删除所有事件监听对象并‘drop’事件对象
        if (!name && !callback && !context) {
            var ids = _keys(listeners);
            for (; i < ids.length; i++) {
                listening = listeners[ids[i]];
                delete listeners[listening.id];
                delete listening.listeningTo[listening.objId];
            }
            return;
        }

        var names = name ? [name] : _keys(events);
        for (; i < names.length; i++) {
            name = names[i];
            var handlers = events[name];

            // 如果没有事件保存过的话就退出
            if (!handlers) break;

            // 如果还有其余的事件就替换事件，否则，清除掉
            var remaining = [];
            for (var j = 0; j < handlers.length; j++) {
                var handler = handlers[j];
                if (
                    callback && callback !== handler.callback &&
                    callback !== handler.callback._callback ||
                    context && context !== handler.context
                ) {
                    remaining.push(handler);
                } else {
                    listening = handler.listening;
                    if (listening && --listening.count === 0) {
                        delete listeners[listening.id];
                        delete listening.listeningTo[listening.objId];
                    }
                }
            }

            // 如果列表还有任何事件的话，更新尾部事件。否则，清理掉
            if (remaining.length) {
                events[name] = remaining;
            } else {
                delete events[name];
            }
        }
        return events;
    };

    // 绑定事件一个只能触发一次的事件，在第一次回调函数触发后，它的监听器会被移除
    // 如果多个事件通过空格分割发传递过来的话，处理函数会对每个事件都触发一次，而不是
    // 对所有事件的组合触发一次
    Events.once = function(name, callback, context) {
        // 将事件映射到‘{event: once}’对象上
        var events = eventsApi(onceMap, {}, name, callback, _.bind(this.off, this));
        if (typeof name === 'string' && context == null) { callback = void 0; }
        return this.on(events, callback, context);
    };

    // once的控制反转版本
    Events.listenToOnce = function(obj, name, callback) {
        // 将事件映射到‘{event: once}’对象上
        var events = eventsApi(onceMap, {}, name, callback, _.bind(this.stopListening, this, obj));
        return this.listenTo(obj, events);
    };

    // 削减‘{event: onceWrapper}’内的事件回调函数。
    // ‘offer’取消绑定‘onceWrapper’在其被调用之后
    var onceMap = function(map, name, callback, offer) {
        if (callback) {
            var once = map[name] = _.once(function() {
                offer(name, once);
                callback.apply(this, arguments);
            })
        }
        return map;
    };

    // 触发一个或多个事件，调用所有在范围内的回调函数。回调函数会得到除了事件名称外的
    // 跟‘trigger’相同的参数（除非你正在监听“all”事件，它会导致你的回调函数的第一个
    // 参数接收到的是事件的正确名称
    Events.trigger = function(name) {
        if (!this._events) return this;

        var length = Math.max(0, arguments.length - 1);
        var args = Array(length);
        for (var i = 0; i < length; i++) {
            args[i] = arguments[i + 1];
        }
        eventsApi(triggerApi, this._events, name, void 0, args);
        return this;
    };

    // 触发适当的回调函数的处理函数
    var triggerApi = function(objEvents, name, callback, args) {
        if (objEvents) {
            var events = objEvents[name];
            var allEvents = objEvents.all;
            if (events && allEvents) { allEvents = allEvents.slice(); }
            if (events) { triggerEvents(events, args); }
            if (allEvents) { triggerEvents(allEvents, [name].concat(args)); }
        }
        return objEvents;
    };

    // 一个很难相信的为触发事件且经过优化的内部调度函数。
    // 尝试去保持一般情况下的速度（大多数内部的Backbone事件具有3个参数）
    var triggerEvents = function (events, args) {
        var ev, i = -1, l = events.length, a1 = args[0], a2 = args[1], a3 = args[2];
        switch (args.length) {
            case 0: while (++i < l) (ev = events[i]).callback.call(ev.ctx); return;
            case 1: while (++i < l) (ev = events[i]).callback.call(ev.ctx, a1); return;
            case 2: while (++i < l) (ev = events[i]).callback.call(ev.ctx, a1, a2); return;
            case 3: while (++i < l) (ev = events[i]).callback.call(ev.ctx, a1, a2, a3); return;
            default: while (++i < l) (ev = events[i]).callback.apply(ev.ctx, args); return;
        }
    };

    // 取别名，向后兼容
    Events.bind     = Events.on;
    Events.unbind   = Events.off;
})();
