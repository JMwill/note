// 包含大分块的资源会被单独打包，并与原分块一起并行加载

// 分块在多个引入中共享
// 引入的资源大于 30kb
// import 调用的并行请求数为 2
// 不会影响初始页面加载
import('./components/a')
import('./components/b')