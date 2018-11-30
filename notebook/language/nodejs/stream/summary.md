# 流模块记录

## 基础

node 中, 一共有五种流: readable, writable, transform, duplex 以及 classic

上面的5种流如果要实现输入或输出都需要调用 `pipe` 方法, 调用者为源头, 流向传入的参数对象中. [例子][1]

### readable 流

readable 流定义完成后, 就可以使用 `push` 方法向流输入数据, 当 `push` 方法输入的是 `null` 时, 表明流的结束. 在调用 readable 的 `pipe` 方法时才会开始消耗存储的数据.

但是这样直接使用 `push` 的方式会导致预先存储了数据在内存中, 好的做法应该是在有消耗时才向流填入数据. 保证少占用内存. 因此 readable 流提供了一个 `_read` 方法, 这个方法接受表示数据大小的参数 `size` 每次数据消耗者消耗数据时, 就会调用这个方法. 因此在这个方法里面进行数据的填入是更好的做法. [例子][2]

如果要创建一个可以将任何值推入的 readable 流的话, 可以在创建的时候指定参数 `objectMode`: `Readable({ objectMode: true })`

### writable 流

只要定义一个 `_write(chunk, enc, nest)` 函数, 就能够让对象被 `readable` 流对应地将数据推入到函数中. [例子][3]

在处理完数据后, 需要调用 `next` 方法, 有错误时可以传入 `error` 对象, 同样地, 如果需要传递对象, 需要指定 `objectMode` 为 `true`

可以调用 `write` 方法来向 `writable` 流写入东西, 结束时再调用 `end` 方法

在创建可写流时有需要调整内部缓冲区大小的话, 可以在创建可写流时设置 `highWaterMark`. 一旦调用 `write()` 方法时返回 `false`, 则说明数据大小超过了该值

监听 `drain` 事件还可以避免速率不匹配造成的内存过度增长, 让可写流内部缓存清空后在继续写入.

### transform 流

流的中间部分, 可读可写, 且并不保存数据, 只对流经的数据执行处理.

### duplex 流

可读可写的流, 像: `a.pipe(b).pipe(a)`

[1]: ./src/exed1.js
[2]: ./src/exec2.js
[3]: ./src/exec3.js
