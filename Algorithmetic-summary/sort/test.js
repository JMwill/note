// 工具
const Benchmark = require('./benchmark');
const data = require('./data');

// 算法
const bubbleSort = require('./bubble');
const selectSort = require('./select');
const insertSort = require('./insert');
const shellSort = require('./shell');
const mergeSort = require('./merge');
const quickSort = require('./quick');
const heapSort = require('./heap');

// 基准数据
const randomWords = data.getRandomWords(1000);
const randomInts = data.getRandomInts(1000);

// benchmark 配置
const benchmarkOpt = {
    repeat: 10,
    times: 1000,
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
    insertSort(randomInts.slice());
}, benchmarkOpt);

// Shell 排序的基准测试实例
let shellBenchmark = new Benchmark(function shell() {
    shellSort(randomWords.slice());
    shellSort(randomInts.slice());
}, benchmarkOpt);

// Merge 排序的基准测试实例
let mergeBenchmark = new Benchmark(function merge() {
    mergeSort(randomWords.slice());
    mergeSort(randomInts.slice());
}, benchmarkOpt);

// Quick 排序的基准测试实例
let quickBenchmark = new Benchmark(function quick() {
    quickSort(randomWords.slice());
    quickSort(randomInts.slice());
}, benchmarkOpt);

// Heap 排序的基准测试实例
let heapBenchmark = new Benchmark(function heap() {
    heapSort(randomWords.slice());
    heapSort(randomInts.slice());
}, benchmarkOpt);

function run() {
    // bubbleBenchmark.run();
    // selectBenchmark.run();
    // insertBenchmark.run();
    // shellBenchmark.run();
    // mergeBenchmark.run();
    quickBenchmark.run();
    heapBenchmark.run();
}

run();
