Events.on = function(name, callback, context) {
    return internalOn(this, name, callback, context);
};

// 编写内部版的on绑定，避免方法被使用者无意中修改
var internalOn = function(obj, name, callback, context, listening) {
    // onApi 迭代绑定事件
    // listening 用于listenTo方法，进行反转控制的实现
    obj._events /* 存储事件对象 */ = eventsApi(onApi, obj._events || {} /* 如果原对象有方法则用原对象的方法 */, name, callback, {
        context: context,
        ctx: obj,
        listening: listening
    });

    if (listening) {
        var listeners = obj._listeners || (obj._listeners = {});
        listeners[listening.id] = listening;
    }

    return obj;
};

Events.listenTo = function(obj, name, callback) {
    if (!obj) return this; // 没有监听的对象，不作处理
    var id = obj._listenId || (obj._listenId = _.uniqueId('l')); // 提供事件对象一个独一无二的标识
    var listeningTo = this._listeningTo || (this._listeningTo = {}); // 存储监听对象的对象
    var listening = listeningTo[id]; // 如果之前有对某些事件进行监听，则获取那个对象

    // 这个对象还没有对obj对象的任何事件进行监听
    // 设置必要的关联来追踪listening回调函数
    if (!listening) {
        var thisId = this._listenId || (this._listenId = _.uniqueId('l'));
        listening = listeningTo[id] = {obj: obj, objId: id, id: thisId, listeningTo: listeningTo, count: 0};
    }

    internalOn(obj, name, callback, this, listening);
    return this;
};

var onApi = function(events, name, callback, options) {
    if (callback) {
        var handlers = events[name] || (events[name] = []); // 是否存在保存绑定事件的对象，没有的话新建一个
        var context = options.context, ctx = options.ctx, listening = options.listening;
        if (listening) listening.count++; // 正在监听的对象的个数增加

        // 保存必要的信息在事件被触发时遍历对象进行调用
        handlers.push({callback: callback, context: context, ctx: context || ctx, listening: listening}); 
    }

    // 没有回调函数的话，直接返回事件对象
    return events;
}