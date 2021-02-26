import dayjs from 'dayjs'
/**
 * 全局过滤器
 */
let filters = {
  fmtGender: val => ['男','女'][val] || '未知',
  fmtDate: val => {
    return dayjs(val).format('YYYY-MM-DD HH:mm:ss')
  }
}

export default Vue => {
  Object.keys(filters).forEach(key => {
    Vue.filter(key, filters[key])
  })
  // console.log('全局过滤器已经部署')
}
