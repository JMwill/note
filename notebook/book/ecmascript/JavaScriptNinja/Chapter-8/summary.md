# 线程与定时器

定时器函数, setTimeout以及setInterval允许我们传入参数: 

```javascript
setTimeout(function() {
  console.log(arguments);
}, 1000, 'test', 'hello', 1);

setInterval(function() {
  console.log(arguments);
}, 1000, 'test', 'hello', 1);
```

通过将强循环的函数转化为非堵塞的操作能够避免出现程序卡死的问题: 

```javascript
// 堵塞线程的操作
var tbody = document.createElement('tbody');
var table = document.createElement('table');
table.appendChild(tbody);
document.body.prepend(table);
var tbody = document.getElementsByTagName('tbody')[0];

for (var i = 0; i < 20000; i++) {
  var tr = document.createElement('tr');
  for (var t = 0; t < 6; t++) {
    var td = document.createElement('td');
    td.appendChild(document.createTextNode(i + ', ' + t));
    tr.appendChild(td);
  }
  tbody.appendChild(tr);
}

// 减少卡死时间的实现
var rowCount = 20000;
var divideInto = 4;
var chunkSize = rowCount / divideInto;
var iteration = 0;

var tbody = document.createElement('tbody');
var table = document.createElement('table');
table.appendChild(tbody);
document.body.prepend(table);
var tbody = document.getElementsByTagName('tbody')[0];

setTimeout(function generateRows() {
  var base = (chunkSize) * iteration;
  for (var i = 0; i < chunkSize; i++) {
    var tr = document.createElement('tr');
    for (var t = 0; t < 6; t++) {
      var td = document.createElement('td');
      td.appendChild(document.createTextNode((i + base) + ', ' + t + ', ' + iteration));
      tr.appendChild(td);
    }
    table.appendChild(tr);
  }
  iteration++;
  if (iteration < divideInto)
    setTimeout(generateRows, 0);
}, 0);
```

为了避免过多的定时器造成浏览器维护的开销增大, 可以手动实现一个中央定时器控制对象:

```javascript
var timers = {
    timerID: 0,
    timers: [],

    add: function(fn) {
        this.timers.push(fn);
    },

    start: function() {
        if (this.timerID) return;
        (function runNext() {
            if (timers.timers.length > 0) {
                for (var i = 0; i < timers.timers.length; i++) {
                    if (timers.timers[i]() === false) { // 如果传入的回调函数返回false则删除这个回调函数, 停止周期回调. 相当于简便地进行clearTimeout
                        timers.timers.splice(i, 1);
                        i--;
                    }
                }
                timers.timerID = setTimeout(runNext, 0);
            }
        })();
    },

    stop: function() {
        clearTimeout(this.timerID);
        this.timerID = 0;
    }
}

var box = document.getElementById('box'), x = 0, y = 20;
timers.add(function() {
  box.style.left = x + 'px';
  if (++x > 50) return false;
});

timers.add(function() {
  box.style.top = y + 'px';
  y += 2;
  if (y > 120) return false;
});
timers.start();
```
