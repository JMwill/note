const Writable = require('stream').Writable

let ws = Writable()
ws._write = function(chunk, enc, next) {
    console.log(chunk)
    next()
}

process.stdin.pipe(ws)

const fs = require('fs')

ws = fs.createWriteStream(`${__dirname}/message.txt`)

ws.write('beep ')

setTimeout(() => {
    ws.end('boop\n')
}, 1000)
