import kebabCase from 'lodash/kebabCase'

export default Vue => {
  let context = require.context('./components',true, /\.vue$/)
  context.keys().forEach(filePath => {
    let componentName = filePath.replace(/\.\/(.+)\.vue$/, '$1')
    if(componentName.includes('/')) {
      let arr = componentName.split('/')
      componentName = arr[arr.length-1]
    }
    Vue.component('j-'+kebabCase(componentName), context(filePath).default)
  })
  
  // console.log('全局组件已经部署')
}