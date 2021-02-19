export default {
  path: '/orderlist',
  // 当前从别的路由到 父级路由的时候，默认是不显示子组件的
  // 如果想要父级路由默认显示下面这个组件，可以给父级路由配置一个 redirect属性，值为需要默认显示的路由
  // redirect: "/orderlist",
  // 或者用name 匹配
  // redirect: { name: 'aaa' },
  name: 'orderlist',
  // 路由元信息 可以在路由中携带自定义的值 例如 title信息, 
  meta: {
    menuBar: true,
    title: "订单管理",
    iconName: "ordered-list",
    sortNo: 1,
  },
  component: () => import(/* webpackChunkName: "orderlist" */"~v/OrderList"),
  // children中的路由只能在父级中的component中的router-view渲染
}