export default {
  path: '/goodslist',
  // 当前从别的路由到 父级路由的时候，默认是不显示子组件的
  // 如果想要父级路由默认显示下面这个组件，可以给父级路由配置一个 redirect属性，值为需要默认显示的路由
  // redirect: "/aaa",
  // 或者用name 匹配
  // redirect: { name: 'aaa' },
  name: 'goodslist',
  // 路由元信息 可以在路由中携带自定义的值 例如 title信息, 
  meta: {
    menuBar: true,
    title: "商品管理",
    iconName: "appstore",
    sortNo: 3,
  },
  component: () => import(/* webpackChunkName: "goodslist" */"~v/GoodsList"),
  // children中的路由只能在父级中的component中的router-view渲染
}