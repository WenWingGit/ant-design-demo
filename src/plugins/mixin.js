import { $get } from './util/request'
import { $post } from './util/request'

export default Vue => {
  Vue.mixin({
    methods: {
      $get,
      $post,
      // 操作提示
      __msg__(type, message, description) {
        this.$notification[type]({
          message,
          description,
          duration: 2,
        });
      },
      $ms(message= '操作成功', description= '稍后为您呈现最新效果') {
        this.__msg__('success',message, description);
      },
      $me(message = '操作失败', description = '请刷新页面后重试') {
        this.__msg__('error' ,message, description);
      },
      $mw(message, description) {
        this.__msg__('warning',message, description);
      },
      $mi(message, description) {
        this.__msg__('info',message, description);
      },
      $mc(title = '您确认删除此项吗？', content = '删除后将无法恢复，请谨慎操作。') {
        return new Promise(resolve => {
          this.$confirm({
            title,
            content,
            onOk: () => {
              resolve()
            }
          });
        })
      }
    },
  })
  console.log('全局混入已经部署')
}
