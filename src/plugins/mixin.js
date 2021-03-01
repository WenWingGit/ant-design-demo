import {
  reject
} from 'lodash';
import {
  $get
} from './util/request'
import {
  $post
} from './util/request'

export default Vue => {
  Vue.mixin({
    methods: {
      $get,
      $post,
      // 操作提示
      $msg(type, message, description) {
        this.$notification[type]({
          message,
          description,
          duration: 2,
        });
      },
      $ms(message = '操作成功', description = '稍后为您呈现最新效果') {
        this.$msg('success', message, description);
      },
      $me(message = '操作失败', description = '请刷新页面后重试') {
        this.$msg('error', message, description);
      },
      $mw(message, description) {
        this.$msg('warning', message, description);
      },
      $mi(message, description) {
        this.$msg('info', message, description);
      },
      $mc(title = '您确认删除此项吗？', content = '删除后将无法恢复，请谨慎操作！') {
        return new Promise(resolve => {
          this.$confirm({
            title,
            content,
            onOk: () => {
              resolve()
            }
          });
        })
      },
      // 验证表单
      $valid(ruleForm) {
        return new Promise(resolve => {
          this.$refs[ruleForm].validate(valid => {
            if (valid) resolve()
          });
        })
      },
      $sx_toast(toastText = '', visibleTime = 1500) {
        let body = document.body
        let children = document.createElement("div")
        let html = `<div class="toast">${toastText}</div>
          <style>.toast {
            position: fixed;
            z-index: 300000;
            left: 50%;
            top: 45%;
            transition: all .5s;
            -webkit-transform: translateX(-50%) translateY(-50%);
            -moz-transform: translateX(-50%) translateY(-50%);
            -ms-transform: translateX(-50%) translateY(-50%);
            -o-transform: translateX(-50%) translateY(-50%);
            transform: translateX(-50%) translateY(-50%);
            text-align: center;
            border-radius: 5px;
            color: #FFF;
            background: rgba(17, 17, 17, 0.7);
            line-height: 1.6;
            padding: 8px 15px;
            max-width: 56%;
            box-sizing: border-box;
            width: 100%;
        }</style>
        `
        children.innerHTML = html
        body.appendChild(children)
        let timer = setTimeout(function(){
          body.removeChild(children)
          clearTimeout(timer)
        }, visibleTime)
      }
    },
  })
  // console.log('全局混入已经部署')
}