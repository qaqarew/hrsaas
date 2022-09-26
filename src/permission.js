import router from './router'
import store from './store'
const whiteList = ['/login', '/404']
router.beforeEach(async(to, from, next) => {
//   console.log(to)
  //   console.log(from)
//   next(false)
  // 1.判断token是否存在；2-存在 处于登入状态 是否在登入页面 是的话跳转到首页；3-不存在 不处于登入状态 是否处于白名单 处于则放行 否则一直在登入页面

  if (store.getters.token) {
    if (!store.getters.userId) {
      await store.dispatch('user/getUserInfo')
    }
    if (to.path === '/login') {
      next('/')
    } else {
      next()
    }
  } else {
    if (whiteList.includes(to.path)) {
      next()
    } else {
      next('/login')
    }
  }
})
