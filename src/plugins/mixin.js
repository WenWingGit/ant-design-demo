import { $get } from './util/request'
import { $post } from './util/request'

export default Vue => {
  Vue.mixin({
    methods: {
      $get,
      $post
    },
  })
  console.log('全局混入已经部署')
}
