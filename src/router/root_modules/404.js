export default {
  /**
  * 匹配所有路由 没找到自动路由到 no find 404
  */
  // 全局匹配
  path: "*",
  component: () => import(/* webpackChunkName: "NoFind404" */"~v/NoFind404")
}