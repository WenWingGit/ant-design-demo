import Vue from 'vue'
import VueRouter from 'vue-router'
import NProgress from 'nprogress'
Vue.use(VueRouter)

import routes from './routes'

let router = new VueRouter({
  routes,
})

router.beforeEach((to, from, next) => {
  // to and from are both route objects. must call `next`.
  // to代表即将要跳转的路由信息
  // next() 调用这个方法路由才会去跳转
  NProgress.start()
  document.title = to.meta.title + ' | 后台管理系统'
  next();
})

router.afterEach((to, from) => {
  // to and from are both route objects.
  NProgress.done()
})

export default router