# 深入理解JavaScript事件

 setTimeout以及setInterval的触发频率都比较低，一般就是几百到上千次左右。相比与while的速度而言十分小，因此如果想要尽可能快地触发事件调度，node中可以使用process.nextTick函数。而在浏览器端在允许的基础上使用requestAnimateFrame

 通常来说尽量避免使用异步递归，即如：在setTimeout的函数里面包含调用setTimeout的函数。因为延时的触发次数是不受限制的，因此异步递归会有可能造成计算负荷，同时也将应用的结构复杂化，为了解决这个问题可以通过回调存储来实现，将需要触发的回调函数存储起来，在合适的时机进行触发。

---

错误处理：

全局的错误处理都应该被视作最后一根救命稻草，仅在调试的时候才使用，一般情况下，对于预期的错误需要进行及时的处理，不要仅仅只是抛出就算了。使用try/catch要谨慎。

---

嵌套回调与解嵌套

反例子：
```javascript
function checkPassword(username, passwordGuess, callback) {
    var queryStr = 'SELECT * FROM user WHERE username = ?';
    db.query(queryStr, username, function(err, result) {
        if (err) throw err;
        hash(passwordGuess, function(passwordGuess) {
            callback(passwordGuess === result['password_hash']);
            });
        });
}
```

修改后：
```
function checkPassword(username, passwordGuess, callback) {
    var passwordHash;
    var queryStr = 'SELECT * FROM user WHERE username = ?';
    db.query(queryStr, username, queryCallback);

    function queryCallback(err, result) {
        if (err) throw err;
        passwordHash = result['password_hash'];
        hash(passwordGuess, hashCallback);
    }

    function hashCallback(passwordGuessHash) {
        callback(passwordHash === passwordGuessHash);
    }
}
```

通过将操作分解为一个个的函数，将嵌套进行解耦，避免了回调嵌套的情况，虽然变得稍显麻烦。

一般来说，请避免两层以上的函数嵌套。其关键是要找到一种激活异步调用的函数的外部存储异步结果的方式（将回调结果共享），这样回调本身的嵌套就不必要了。