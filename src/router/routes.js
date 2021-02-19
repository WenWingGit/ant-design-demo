/**
 * 自动导入modules目录下的路由配置文件
 */
let context = require.context('./modules',true, /\.js$/)
let routes = context.keys().map(filePath => context(filePath).default)

/**
 * 匹配所有路由 没找到自动路由到 no find 404
 */
routes.push({
  // 全局匹配
  path: "*",
  component: () => import(/* webpackChunkName: "NoFind404" */"~v/NoFind404")
})

export default routes