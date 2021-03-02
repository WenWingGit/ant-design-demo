export default {
  path: '/register',
  name: 'register',
  meta: {
    title: "注册",
  },
  component: () => import(/* webpackChunkName: "Register" */"~v/User/Register"),
}