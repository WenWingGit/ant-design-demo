export default {
  path: '/login',
  name: 'login',
  meta: {
    title: "登录页面",
  },
  component: () => import(/* webpackChunkName: "goodTypeList" */"~v/Login"),
}