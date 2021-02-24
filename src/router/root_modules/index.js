let context = require.context('../layout_modules', true, /\.js$/)
let routes_childrens = context.keys().map(filePath => context(filePath).default)

export default {
  path: '/',
  redirect: "/good-type-list",
  name: 'layout', 
  meta: {},
  component: () => import(/* webpackChunkName: "Layout" */"~v/Layout"),
  children: routes_childrens
}