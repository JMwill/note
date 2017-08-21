const Readable = require('stream').Readable


/**
 * 使用 Readable 流
 */
let rs = new Readable()
rs.push('beep ')
rs.push('boop\n')
rs.push(null)

rs.pipe(process.stdout)


/**
 * 在数据被消耗时才再次推入数据
 */
let rs1 = new Readable()
let c = 97

rs1._read = function() {
    rs1.push(String.fromCharCode(c++))
    if (c > 'z'.charCodeAt(0)) {
        rs1.push('\n')
        rs1.push(null)
    }
}

rs1.pipe(process.stdout)

/**
 * 演示确实是在有消耗时才再次填入数据
 */
let rs2 = new Readable()
let c2 = 97

rs2._read = function() {
    if (c2 > 'z'.charCodeAt(0)) {
        rs2.push('\n')
        return rs2.push(null)
    }
    setTimeout(() => {
        rs2.push(String.fromCharCode(c2++))
    }, 100)
}

process.on('exit', () => {
    console.error(`\n_read called ${c2 - 97 - 1} times`);
})
process.stdout.on('error', process.exit);

rs2.pipe(process.stdout)

/**
 * 主动消耗 readable 对象
 */
process.stdin.on('readable', () => {
    // 当数据可用时会触发 readable 事件
    // 可以调用 read 方法来获取数据
    let buf = process.stdin.read(3)
    console.dir(buf)
})
