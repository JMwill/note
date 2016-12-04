# 不老事件

## 绑定和解绑事件处理程序

旧版IE的事件绑定函数attachEvent引用的上下文是全局上下文window, 且没有传输事件对象, 而是将事件对象信息定死在window上. 同时不提供事件捕获.

## Event对象

```javascript
// 规范化Event对象实例
function fixEvent(event) {
    function returnTrue() { return true; }
    function returnFalse() { return false; }

    if (!event || !event.stopPropagation) {
        // 对于使用attachEvent的低版本IE浏览器而言, 事件对象有可能会存储在window上
        var old = event || window.event;

        // 克隆旧的事件对象
        event = {};

        for (var prop in old) {
            event[prop] = old[prop];
        }

        // 获取产生事件的对象
        if (!event.target) {
            event.target = event.srcElement || document;
        }

        // 获取关联对象
        event.relatedTarget = event.fromElement === event.target ?
            event.toElement :
            event.fromElement;
        
        // 取消浏览器默认行为
        event.preventDefault = function() {
            event.returnValue = false;
            event.isDefaultPrevented = returnTrue;
        };

        event.isDefaultPrevented = returnFalse;

        // 停止事件冒泡
        event.stopPropagation = function() {
            event.cancelBubble = true;
            event.isPropagationStopped = returnTrue;
        };

        event.isPropagationStopped = returnFalse;


        // 停止正在冒泡的事件以及正在执行的处理程序
        event.stopImmediatePropagationStopped = returnFalse;

        // 处理鼠标位置
        if (event.clientX != null) {
            var doc = document.documentElement, body = document.body;

            event.pageX = event.clientX +
                (doc && doc.scrollLeft || body && body.scrollLeft || 0) - 
                (doc && doc.clientLeft || body && body.clientLeft || 0);
            event.pageY = event.clientY +
                (doc && doc.scrollTop || body && body.scrollTop || 0) - 
                (doc && doc.clientTop || body && body.clientTop || 0);
        }

        // 处理键盘事件
        event.which = event.charCode || event.keyCode;

        // 修复鼠标点击事件
        // 0 == left; 1 == middle; 2 == right
        if (event.button != null) {
            event.button = (event.button & 1 ? 0 :
                (event.button & 4 ? 1 :
                    (event.button & 2 ? 2 : 0)));
        }
    }

    return event;
}
```

## 处理程序的管理

不将事件处理程序绑定在元素上, 转而使用一个中间事件处理程序, 将所有的处理程序保存在一个单独的对象上, 能够最大化控制处理过程, 且:

- 规范处理程序上下文.
- 修复Event对象属性(相对IE)
- 处理垃圾回收
- 过滤触发或删除一些处理程序
- 解绑特定类型的所有事件
- 克隆事件处理程序

```html
<div title="Ninja Power!">Test</div>
<div title="Secrets">秘密</div>

<script>
    // 实现存储信息的中央对象
    (function () {
        var cache = {},
            guidCounter = 1,
            expando = 'data' + (new Date).getTime();
        this.getData = function (elem) {
            var guid = elem[expando];
            if (!guid) {
                guid = elem[expando] = guidCounter++;
                cache[guid] = {};
            }
            return cache[guid];
        };

        this.removeData = function (elem) {
            var guid = elem[expando];
            if (!guid) return;
            delete cache[guid];
            try {
                delete elem[expando];
            } catch(e) {
                if (elem.removeAttribute) {
                    elem.removeAttribute(expando);
                }
            }
        }
    })();

    var elems = document.getElementsByTagName('div');

    for (var n = 0; n < elems.length; n++) {
        getData(elems[n]).ninja = elems[n].title;
    }

    for (var n = 0; n < elems.length; n++) {
        console.assert(getData(elems[n]).ninja === elems[n].title,
            "Stored data is " + getData(elems[n]).title);
    }

    for (var n = 0; n < elems.length; n++) {
        removeData(elems[n]);
        console.assert(getData(elems[n]).ninja === undefined,
            "Stored data has been destroyed.");
    }
</script>
```

### 管理事件处理程序

```javascript
// 绑定事件处理程序并进行跟踪的函数
(function() {
    var nextGuid = 1;
    this.addEvent = function (elem, type, fn) {
        var data = getData(elem);
        if (!data.handlers) data.handlers = {};
        if (!data.handlers[type]) data.handlers[type] = [];

        if (!fn.guid) fn.guid = nextGuid++;

        data.handlers[type].push(fn);

        if (!data.dispatcher) {
            data.disabled = false;
            data.dispatcher = function (event) {
                if (data.disabled) return;
                event = fixEvent(event);

                var handlers = data.handlers[event.type];

                if (handlers) {
                    for (var n = 0; n < handlers.length; n++) {
                        handlers[n].call(elem, event);
                    }
                }
            };
        }

        if (data.handlers[type].length === 1) {
            if (document.addEventListener) {
                elem.addEventListener(type, data.dispatcher, false);
            } else if (document.attachEvent) {
                elem.attachEvent('on' + type, data.dispatcher);
            }
        }
    };
})();
```

通过委托函数, 可以实现:

- 修复Event实例
- 将函数上下文设置成目标元素
- Event实例作为唯一参数传递给处理程序
- 事件处理程序永远按照其绑定顺序执行

```javascript
// 清理处理程序
function tidyUp(elem, type) {
    function isEmpty(object) {
        for (var prop in object) {
            return false;
        }
        return true;
    }
    var data = getData(elem);

    if (data.handlers[type].length === 0) {
        delete data.handlers[type];

        if (document.removeEventListener) {
            elem.removeEventListener(type, data.dispatcher, false);
        } else if (document.detachEvent) {
            elem.detachEvent('on' + type, data.dispatcher);
        }
    }

    // 将多余的空对象进行删除
    if (isEmpty(data.handlers)) {
        delete data.handlers;
        delete data.dispatcher;
    }

    if (isEmpty(data)) {
        removeData(data);
    }
}
```

```javascript
// 事件处理程序的解绑函数
// removeEvent(element) || removeEvent(element, 'click') || removeEvent(element, 'click', handler)
this.removeEvent = function(elem, type, fn) {
    var data = getData(elem);
    if (!data.handlers) return;

    var removeType = function(t) {
        data.handlers[t] = [];
        tidyUp(elem, t);
    };

    if (!type) {
        for (var t in data.handlers) removeType(t);
        return;
    }

    var handlers = data.handlers[type];
    if (!handlers) return;

    if (!fn) {
        removeType(type);
        return;
    }

    if (fn.guid) {
        for (var n = 0; n < handlers.length; n++) {
            if (handlers[n].guid === fn.guid) {
                handlers.splice(n--, 1);
            }
        }
    }

    tidyUp(elem, type);
}
```

```javascript
// 在元素上触发冒泡事件
function triggerEvent(elem, event) {
    var elemData = getData(elem),
        parent = elem.parentNode || elem.ownerDocument;
    
    if (typeof event === 'string') {
        event = { type: event, target: elem };
    }

    event = fixEvent(event);

    // 调用元素绑定的事件
    if (elemData.dispatcher) {
        elemData.dispatcher.call(elem, event);
    }

    // 事件冒泡
    if (parent && !event.isPropagationStopped()) {
        triggerEvent(parent, event);
    } else if (!parent && !event.isDefaultPrevented()) {
        var targetData = getData(event.target);
        if (event.target[event.type]) {
            // 为了执行默认行为需要禁止targetData绑定事件的触发
            targetData.disabled = true;
            event.target[event.type]();
            targetData.disabled = false;
        }
    }
}
```

## 冒泡与委托

简单地说, 委托是表示在DOM上层定义事件处理程序, 而不是在触发事件的元素本身上定义. (交给别人来做)

而冒泡事件在低版本的IE上有一些事件会没有冒泡, 因此可以使用下面的代码进行检测:

```javascript
// 检测对某些事件是否支持
function isEventSupported(eventName) {
    var element = document.createElement('div'),
        isSupported;

    eventName = 'on' + eventName;
    isSupported = (eventName in element);

    if (!isSupported) {
        element.setAttribute(eventName, 'return;');
        isSupported = typeof element[eventName] === 'function';
    }

    element = null;
    return isSupported;
}
```

## 文档就绪事件

```javascript
// 以前的跨浏览器DOM ready事件实现
(function () {
    var isReady = false,
        contentLoadedHandler;
    
    function ready() {
        if (!isReady) {
            triggerEvent(document, 'ready');
            isReady = true;
        }
    }

    if (document.readyState === 'complete') {
        ready();
    }

    if (document.addEventListener) {
        contentLoadedHandler = function() {
            document.removeEventListener(
                "DOMContentLoaded", contentLoadedHandler, false
            );
            ready();
        }

        document.addEventListener(
            "DOMContentLoaded", contentLoadedHandler, false
        )
    } else if (document.attachEvent) {
        contentLoadedHandler = function() {
            if (document.readyState === 'complete') {
                document.detachEvent(
                    'onreadystatechange', contentLoadedHandler
                );
                ready();
            }
        };

        document.attachEvent(
            'onreadystatechange', contentLoadedHandler
        );

        var toplevel = false;
        try {
            toplevel = window.frameElement == null;
        } catch (e) {}

        if (document.documentElement.doScroll && toplevel) {
            doScrollCheck();
        }
    }

    function doScrollCheck() {
        if (isReady) return;
        try {
            document.documentElement.doScroll('left');
        } catch (error) {
            setTimeout(doScrollCheck, 1);
            return;
        }
        ready();
    }
})();
```