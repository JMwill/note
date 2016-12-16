// 提供事件系统的迭代api，一般的(event, callback)模式
// 以及多个事件对应一个callback的模式('event1 event2...', callback)
// 还有jQuery风格的maps模式：{event: callback}

function eventsApi(iteratee, events, name, callback, opts) {
    var i = 0, names;
    if (name && typeof name === 'object') { // jQuery风格的事件处理
        if (callback !== void 0 && 'context' in opts && opts.context === void 0) opts.context = callback; // void 0的结果是undefined
        for (names = _.keys(name); i < names.length; i++) {
            events = eventsApi(iteratee, events, names[i], name[names[i]], opts); // 拆分成单个名字递归调用进行绑定
        }
    } else if (name && eventSplitter.test(name)) { // eventSplitter就是正则表达式/\s+/ 测试是否有多个跟隔开的事件名称
        // 这里的处理跟下面的else处理，个人感觉可以直接split全部，对得到的数组进行处理，无需多一个else分隔
        // 开发者应该是考虑到多数人都是对一个名称绑定事件，所以才这样写的吧
        for (names = name.split(eventSplitter); i < names.length; i++) {
            events = iteratee(events, names[i], callback, opts);
        }
    } else {
        events = iteratee(events, name, callback, opts);
    }
    return events; // 返回事件对象
}