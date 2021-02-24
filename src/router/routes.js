/**
 * 自动导入modules目录下的路由配置文件
 */
let context = require.context('./root_modules', true, /\.js$/)
let routes = context.keys().map(filePath => context(filePath).default)

export default routes