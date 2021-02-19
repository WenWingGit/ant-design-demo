import deployMixins from './mixin'
import deployDirectives from './directive'
import deployFilters from './filter'
import deployComponents from './conponent'
import deployExpands from './deployExpand'

const plugin = {
  // 解构 与 赋默认值
  install (Vue, { silent } = {}) {
    // 改 console.log
    let oldLog = console.log
    console.log = (...str) => {
      if(!silent) oldLog(...str)
    }

    Vue.config.productionTip = !silent

    deployMixins(Vue)

    deployDirectives(Vue)

    deployFilters(Vue)

    deployComponents(Vue)

    deployExpands(Vue)

  }
}

export default plugin