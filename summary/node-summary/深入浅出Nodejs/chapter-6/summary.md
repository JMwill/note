## 理解Buffer

Buffer对象用于操作二进制数据，NodeJs中的Buffer对象与数组有相似的地方，具有length属性以及许多实用的方法。

### Buffer的转换

Buffer对象提供的编码类型有有限的几种：ASCII、UTF-8、Base64、Binary、Hex、UTF-16LE/UCS-2。

同时一个Buffer对象通过write方法可以存储不同编码的数据。解编码时需要小心进行。对于不支持的编码类型可以通过iconv-lite等模块进行编码转换

### Buffer的拼接

由于存在宽字节的文字，Buffer在传输并进行拼接时，如果使用常见的__\+__操作符进行拼接的话，会出现乱码的现象，原因就是在使用__+__操作符的时候，Buffer对象会转换成String对象，因此对于宽字符便会有可能在截断的情况下进行转换，然后便会出现乱码的情况。解决的方法可以是通过将可读流用设置编码函数`setEncoding`进行编码设定，不过目前只能解决nodejs支持的编码类型。最正确的拼接方式是：

```
var iconv = require('iconv-lite');
var chunks = [];
var size = 0;
res.on('data', function (chunk) {
    chunks.push(chunk);
    size += chunk.length;
});

res.on('end', function () {
    var buf = Buffer.concat(chunks, size);
    var str = iconv.decode(buf, 'utf8');
    console.log(str);
})
```

### Buffer与性能

当需要进行网络传输的时候，数据都会转化成Buffer，并以二进制进行数据传输。因此在Web应用中，尽量只读取Buffer，然后直接传输，能够避免损耗，因为无需做额外的转换。

文件转换，在文件读取时，有一个highWaterMark设置能够设定每次的读取长度，长度过小会导致系统调用次数过多，影响性能。对大文件而言，该值越大，读取速度越快。