export default {
  path: '/forget-pwd',
  name: 'forget-pwd',
  meta: {
    title: "忘记密码",
  },
  component: () => import(/* webpackChunkName: "ForgetPwd" */"~v/User/ForgetPwd"),
}