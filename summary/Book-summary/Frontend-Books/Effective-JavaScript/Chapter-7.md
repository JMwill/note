# 并发

## 不要阻塞I/O事件队列

## 在异步序列中使用嵌套或命名的回调函数

一般在使用异步函数的时候可以通过闭包与嵌套来实现多个异步函数的按次序调用, 但是对于过多的处理过程, 嵌套会导致回调过深, 使得代码逻辑难以理解. 因此, 这个时候就可以使用命名函数的方式来简化代码.

```javascript
// 查询数据库后进行某些操作
db.lookupAsync('url', downloadURL);

function downloadURL(url) {
    downloadAsync(url, function(text) { // 这里的回调可以通过bind方法来解决
        showContents(url, text);
    });
}

function showContents(url, content) {
    console.log('contents of ' + url + ': ' + text);
}

// version 2
function downloadURL(url) {
    downloadAsync(url, showContents.bind(null, url));
}

function showContents(url, content) {
    console.log('contents of ' + url + ': ' + text);
}
```

上面的方法提供了一些简单的解决回调嵌套的办法, 但是对于多种场景而言, 还需要进一步地对某些过程进行抽象. 并解决本质上的同步执行的弊端.