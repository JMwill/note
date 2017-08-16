// 工具
const Benchmark = require('./benchmark');
const data = require('./data');

// 算法
const bubbleSort = require('./bubble');
const insertSort = require('./insert');

// 基准数据
const randomWords = data.getRandomWords(1000);
const randomInts = data.getRandomInts(1000);

// benchmark 配置
const benchmarkOpt = {
    repeat: 100,
    times: 10,
    logType: 'normal',
    // logType: 'average',
};

// Bubble 排序的基准测试实例
let bubbleBenchmark = new Benchmark(function bubble() {
    bubbleSort(randomWords.slice());
    bubbleSort(randomInts.slice());
}, benchmarkOpt);

let insertBenchmark = new Benchmark(function insert() {
    insertSort(randomWords.slice());
    insertSort(randomInts.slice());
}, benchmarkOpt);

function run() {
    bubbleBenchmark.run();
    insertBenchmark.run();
}

run();
