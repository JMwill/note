const NS_PER_SEC = 1e9;

module.exports = class Benchmark {
    /**
     * 创建基准测试类
     *
     * @param {Function} fun 执行测试的函数
     * @param {Object} opt 基准测试的参数
     * @param {String} opt.name 测试的名称
     * @param {Number} opt.repeat 重复执行测试的次数
     * @param {Number} opt.times 每个测试执行的函数的次数
     * @param {String} [opt.logType=normal|average] 设置打印的类型
     * @memberof Benchmark
     */
    constructor(fun, opt) {
        this.fun = fun;
        this.opt = opt;
    };

    /**
     * 获取打印函数的名称
     *
     * @readonly
     * @memberof Benchmark
     */
    get logFun() {
        switch (this.opt.logType) {
            case 'normal':
                return 'log';
            case 'average':
                return 'logAverage';
            default:
                return 'log';
        };
    };

    /**
     * 只以 console.time 的方式输出运行结果
     *
     * @memberof Benchmark
     */
    log() {
        for (let i = 0; i < this.opt.repeat; i++) {
            let name = `Benchmark test ${this.opt.name || this.fun.name || 'Anonymous'} ${i}`
            console.time(name);
            for (let j = 0; j < this.opt.times; j++) {
                this.fun();
            }
            console.timeEnd(name);
        }
    };

    /**
     * 记录每次运行的耗时, 计算出平均值, 并打印
     *
     * @memberof Benchmark
     */
    logAverage() {
        let time = process.hrtime();
        let timeLog = [0, 0];
        for (let i = 0; i < this.opt.repeat; i++) {
            for (let j = 0; j < this.opt.times; j++) {
                this.fun();
            }
            let diff = process.hrtime(time);
            timeLog[0] += diff[0];
            timeLog[1] += diff[1];
            time = process.hrtime();
        }

        let totalTime = timeLog[0] * NS_PER_SEC + timeLog[1];
        let averageTime = totalTime / this.opt.repeat / this.opt.times / NS_PER_SEC;
        console.log(`Benchmark test ${this.opt.name || this.fun.name} average time is: ${averageTime} seconds!`);
    };

    /**
     * 执行对应的基准函数
     *
     * @memberof Benchmark
     */
    run() {
        this[this.logFun]();
    };
};
