import Vue from 'vue'
import App from './App.vue'
import plugin from './plugins'
import router from './router'

import antd from 'ant-design-vue'
import 'ant-design-vue/dist/antd.css';
Vue.use(antd)

import './assets/css/jjj.css'
Vue.use(plugin, {
  silent: process.env.NODE_ENV !== 'development'
})


new Vue({
  router,
  render: function (h) { return h(App) },
}).$mount('#app')
