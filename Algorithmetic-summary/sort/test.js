// 工具
const Benchmark = require('./benchmark');
const data = require('./data');

// 算法
const bubbleSort = require('./bubble');
const selectSort = require('./select');
const insertSort = require('./insert');

// 基准数据
const randomWords = data.getRandomWords(1000);
const randomInts = data.getRandomInts(1000);

// benchmark 配置
const benchmarkOpt = {
    repeat: 1,
    times: 1,
    // logType: 'normal',
    logType: 'average',
};

// Bubble 排序的基准测试实例
let bubbleBenchmark = new Benchmark(function bubble() {
    bubbleSort(randomWords.slice());
    bubbleSort(randomInts.slice());
}, benchmarkOpt);

// Select 排序的基准测试实例
let selectBenchmark = new Benchmark(function select() {
    selectSort(randomWords.slice());
    selectSort(randomInts.slice());
}, benchmarkOpt);

// Insert 排序的基准测试实例
let insertBenchmark = new Benchmark(function insert() {
    insertSort(randomWords.slice());
    console.log(insertSort(randomInts.slice()).join(', '));
}, benchmarkOpt);

function run() {
    // bubbleBenchmark.run();
    // selectBenchmark.run();
    insertBenchmark.run();
}

run();
