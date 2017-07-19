// 根元素的确定
self = (typeof self === 'object' && self.self === self && self) // 确定是否是浏览器下，用self是因为需要支持WebWorker
    || (typeof global === 'object' && global.global === global && global) // 确定是否是node环境下