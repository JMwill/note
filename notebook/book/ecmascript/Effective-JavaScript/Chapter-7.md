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

## 对异步循环使用递归

有时候需要对数组或其他可迭代数据进行顺序的异步调用操作, 这个时候一般的迭代方法无法使用, 可以通过将操作实现为异步递归函数来完成需求. **且由于递归是异步的, 因此前一个栈帧在任何递归调用将新的栈帧推入之前都会从调用栈中弹出**. 不用担心会耗尽栈空间.

```javascript
// 一个实现的例子
function downloadOneAsync(urls, onsuccess, onfailure) {
    var n = urls.length;

    function tryNextUrl(i) {
        if (i >= n) {
            onfailure('all downloads failed');
            return;
        }
        downloadAsync(urls[i], onsuccess, function() {
            tryNextUrl(i + 1);
        });
    }

    tryNextUrl(0);
}
```

- 使用递归函数在事件循环的单独轮次中执行迭代
- 在事件循环的单独轮次中执行递归并不会导致调用栈溢出

## 不要在计算时堵塞事件队列

- 避免在主事件队列中执行代价高昂的算法
- 在支持Worker API的平台上, 可以用其来运行需要长时间计算的程序
- 在Worker API不可用或使用起来代价较高的环境中, 考虑将计算程序分解到事件循环的多个轮次中

## 使用计数器来执行并行操作

```javascript
function downloadAllAsync(urls, onsuccess, onerror) {
    var pending = urls.length;
    var result = [];

    if (pending === 0) {
        setTimeout(onsuccess.bind(null, result), 0);
        return;
    }

    urls.forEach(function(url, i) {
        downloadAsync(url, function(text) {
            if (result) {
                result[i] = text;
                pending--;

                if (pending === 0) {
                    onsuccess(result);
                }
            }
        }, function(error) {
            if (result) {
                result = null;
                onerror(error);
            }
        });
    });
}
```

- JavaScript中事件的发生顺序是不可预测的, 因此需要使用计数器来避免并行操作中的数据竞争.

## 不要同步地调用异步的回调函数

- 即使数据可以立即得到, 也绝不要同步地调用异步的回调函数
- 同步地调用异步的函数扰乱了预期的操作序列, 可能导致意想不到的交错代码
- 同步地调用异步数的回调函数可能导致栈溢出或错误地处理异常
- 使用异步API, 如setTimeout来调用异步回调函数, 使其运行在下一次事件队列中

