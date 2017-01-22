var zepto = {}; // 直接设置为一个对象用来装载方法
/**
 * zepto.matches函数
 */
zepto.matches = function(element, selector) {
    /**
     * 常见的nodeType
     * var div = document.createElement('div'); =======================> 1
     * var src = document.createAttribute('src'); =====================> 2
     * var txt = document.createTextNode('txt'); ======================> 3
     * var comment = document.createComment('This is a comment'); =====> 8
     * document =======================================================> 9
     * var doctype = document.doctype; ================================> 10
     * var domFrag = document.createDocumentFragment(); ===============> 11
     */
    // 没有选择器, 或者没有元素, 或者元素不是一个dom元素
    if (!selector || !element || element.nodeType !== 1) return false;

    // 查看是否能够匹配传入的css选择规则的方法
    var matchesSelector = element.matches || element.webkitMatchesSelector ||
                          element.mozMatchesSelector || element.oMatchesSelector ||
                          element.matchesSelector;
    
    if (matchesSelector) return matchesSelector.call(element, selector);

    // 对不支持matches功能的浏览器做回退实现
    // 这里的tempParent = document.createElement('div');
    var match, parent = element.parentNode, temp = !parent;
    if (temp) (parent = tempParent).appendChild(element);
    match = ~zepto.qsa(parent, selector).indexOf(element);
    // 如果使用了temp则删除tempParent内新增的子元素
    temp && tempParent.removeChild(element);
    return match;
}

// css选择器, 使用querySelectorAll来实现, 并对某些特殊情况作优化
zepto.qsa = function() {
    var found,
        maybeID = selector[0] == '#',
        maybeClass = !maybeID && selector[0] == '.',
        nameOnly = maybeID || maybeClass ? selector.slice(1) : selector, // 这里是检查是否是ID或者Class, 然后进行截取, 也就是(maybeID || maybeClass) ? selector.slice(1) : selector;
        // simpleSelectorRE = /^[\w-]*$/, 是否是一个或多个字符加-开始与结尾
        isSimple = simpleSelectorRE.test(nameOnly);
    return (element.getElementById && isSimple && maybeID) ? // Safari DocumentFragment没有getElementById的方法
        ( (found = element.getElementById(nameOnly)) ? [found] : []) :
        (element.nodeType !== 1 && element.nodeType !== 9 && element.nodeType !== 11) ? [] : // 判断查询的element是否是一个dom元素或者document对象或者documentFragment对象
        slice.call(
            isSimple && !maybeID && element.getElementsByClassName ? // DocumentFragment没有getElementsByClass/TagName的方法
                maybeClass ? element.getElementsByClassName(nameOnly) : // 如果是简单查询, 它应该是className
                element.getElementsByTagName(selector) : // 或者是tag
                element.querySelectorAll(selector) // 或者不是简单查询, 就使用querySelectorAll
        )
}

/**
 * 一般方法的实现
 */
function type(obj) {
    // class2type就是一个空对象, 预先缓存好需要的类型字符串映射
    // toString方法就是Object原型上的toStrin方法
    return obj == null ? String(obj) : // 如果是null则返回"null"
        class2type[toString.call(obj)] || 'object'; // 否则查看class2type对象映射里是否有需要的类型, 最后如果没有就返回"object"
}

function isFunction(val) { return type(val) == 'function'; }
function isWindow(obj)   { return obj != null && obj == obj.window } // window对象包含它自己, 也就是window.window == window
/**
 * 每个元素都是Node对象构建的, 而Node对象原型里可以查找到每种node实例的类型, 因此有下面的用法 node.nodeType == node.DOCUMENT_NODE
 */
function isDocument(obj) { return obj != null && obj.nodeType == obj.DOCUMENT_NODE; }
function isObject(obj)   { return type(obj) == 'object'; }
function isPlainObject(obj) {
    // Object.getPrototypeOf方法得出对象是Object直接生成的对象
    return isObject(obj) && !isWindow(obj) && Object.getPrototypeOf(obj) == Object.prototype;
}

function likeArray(obj) {
    var length = !!obj && 'length' in obj && obj.length,
        type = $.type(obj); // 也就是type方法
    
    return 'function' != type && !isWindow(obj) && (
        'array' == type || length === 0 ||
            (typeof length == 'number' && length > 0 && (length - 1) in obj)
    )
}

// 将null以及undefined的项给剔除掉
function compact(array) { return filter.call(array, function(item) { return item != null; }) }
function flatten(array) { return array.length > 0 ? $.fn.concat.apply([], array) : array; }

// 简单对中划线的字符进行驼峰式转化
function camelize(str)  { return str.replace(/-+(.)?/g, function(match, chr) { return chr ? chr.toUpperCase() : ''}) }

// 使用中划线连接
function dasherize(str) {
    return str.replace(/::/g, '/') // 伪类
            .replace(/([A-Z]+)([A-Z][a-z])/g, '$1_$2') // 将大小写链接的词转化为下划线连接
            .replace(/([a-z\d])([A-Z])/g, '$1_$2') // 将数字与大写字符相连的转化为下划线连接
            .replace(/_/g, '-')
            .toLowerCase()
}

function unip(array) { return filter.call(array, function(item, idx) {return array.indexOf(item) == idx; }) }
function classRE(name) {
    return name in classCache ?
        classCache[name] : (classCache[name] = new RegExp('(^|\\s)' + name + '(\\s|$)')) // (^|\s)className(\s|$) 匹配在用空格隔开的class字符串中的class名或者最前或最后的class名
}

function maybeAddPx(name, value) {
    // 是否可以添加单位
    // cssNumber = { 'column-count': 1, 'columns': 1, 'font-weight': 1, 'line-height': 1,'opacity': 1, 'z-index': 1, 'zoom': 1 }
    return (typeof value == "number" && !cssNumber[dasherize(name)]) ? value + 'px' : value
}

// 获取元素的默认显示类型样式
function defaultDisplay(nodeName) {
    // elementDisplay = {} 缓存对象
    var element, display
    if (!elementDisplay[nodeType]) {
        element = document.createElement(nodeName);
        document.body.appendChild(element);
        display = getComputedStyle(element, '').getPropertyValue('display');
        element.parentNode.removeChild(element);
        display == 'none' && (display = 'block');
        elementDisplay[nodeName] = display
    }
    return elementDisplay[nodeName];
}

function children(element) {
    return 'children' in element ?
        slice.call(element.children) :
        $.map(element.childNodes, function(node) { if (node.nodeType == 1) { return node; } })
}

function Z(dom, selector) {
    var i, len = dom ? dom.length : 0;
    for (i = 0; i < len; i++) { this[i] = dom[i]; }
    this.length = len;
    this.selector = selector || '';
}