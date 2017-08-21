const http = require('http')
const fs = require('fs')

function logTimeConsum(url, server) {
    setImmediate(() => {
        http.get(url, (res) => {
            let rawData = ''
            console.time(`log ${url} consume time`)
            res.on('data', (chunk) => { rawData += chunk })
            res.on('end', () => {
                console.timeEnd(`log ${url} consume time`)
                server.close()
            })
        }).on('error', (e) => {
            console.log(`Got Error: ${e.message}`)
        })
    })
}

/**
 * 使用非流式的方式传输数据, 传输打文件时会造成内存占用过多
 * 且客户端也需要等待至程序完全将文件内容读入内存后才能接收
 * 数据
 */
const server1 = http.createServer((req, res) => {
    fs.readFile(`${__dirname}/data.txt`, (err, data) => {
        res.end(data)
    })
})

logTimeConsum('http://localhost:9000', server1)

server1.listen(9000)

const server2 = http.createServer((req, res) => {
    let stream = fs.createReadStream(`${__dirname}/data.txt`)
    stream.pipe(res)

})

server2.listen(8000)

logTimeConsum('http://localhost:8000', server2)
