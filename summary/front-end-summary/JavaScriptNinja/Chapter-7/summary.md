# 正则表达式

在正则表达式的使用中，反向引用不仅可以用在表达式中，还可以用在字符串中：

```javascript
var html = '<b class="hello">Hello</b><i>world!</i>';
var pattern = /<(\w+)([^>]*)>(.*?)<\/\1>/g;

var match  = pattern.exec(html);
var match2 = pattern.exec(html);
console.log(match);
console.log(match2);

// 在字符串中进行反向引用
console.log('fontFamily'.replace(/([A-Z])/g, '-$1').toLowerCase(), 'font-family'); // 当中的$1就是引用前面匹配到的F
```

String的replace方法与正则的结合：

```javascript
// 传入upper的参数应该为空或者四个以上：
/**
 * 匹配的完整文本
 * 匹配的捕获, 一个捕获对应一个参数,
 * 匹配的字符在源字符串中的索引
 * 源字符串
 */
function upper(all, letter) { return letter.toUpperCase(); }
console.log('border-bottom-width'.replace(/-(\w)/g, upper), 'borderBottomWidth');
```

通过结合String的replace函数的字符串搜索机制也就是逐次替换的特性, 能够免除使用正则对象的exec以及while来进行全局遍历: 

```javascript
// foo=1&foo=2&foo=3&blah=a&blah=b&foo=4 =====> foo=1,2,3,4&blah=a,b
function compress(source) {
    var keys = {};
    var replaceReg = /([^=&]+)=([^&]*)/g;
    source.replace(
        replaceReg,
        function(full, key, value) {
            keys[key] = (keys[key] ? keys[key] + ',' : '') + value;
            return '';
        }
    );

    var result = [];
    for (var key in keys) {
        result.push(key + '=' + keys[key]);
    }

    return result.join('&');
}

console.log(compress('foo=1&foo=2&foo=3&blah=a&blah=b&foo=4'), 'foo=1,2,3,4&blah=a,b');
```

匹配Unicode字符, 从\u0080开始可以匹配到所有需要的字符包括ASCII字符

```javascript
var test = '\u5FCD\u8005\u30EF\u30FC';

var matchAll = /[\w\u0080-\uFFFF_-]+/;

console.log(test.match(matchAll));
```