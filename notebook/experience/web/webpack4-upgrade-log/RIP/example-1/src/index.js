// 分块包含有来自 node_modules 的模块
// 块具有较大体积
// import 调用中并行请求数为 2
// 不会影响初始页面加载
import('./components/a')