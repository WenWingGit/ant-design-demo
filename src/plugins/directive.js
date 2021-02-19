/**
 * 全局自定义指令
 */
let directives = {
  red(el) {
    el.style.color = 'red'
  }
}

export default Vue => {
  Object.keys(directives).forEach(key => {
    Vue.directive(key, directives[key])
  })
  console.log('自定义指令已经部署')
}
