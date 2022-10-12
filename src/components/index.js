import * as filters from '@/filters'
console.log(Object.keys(filters))
const fn = require.context('./', true, /\.vue$/)
const components = fn.keys().map(ele => {
  return fn(ele)
})

export default (Vue) => {
  components.forEach(ele => {
    Vue.component(ele.default.name, ele.default)
  })

  Object.keys(filters).forEach(key => {
    Vue.filter(key, filters[key])
  })
}

