import { login } from '@/api/login'
import { getUserInfo, getUserDeatilById } from '@/api/user'

export default {
  namespaced: true,
  state: {
    token: null,
    userInfo: {}
  },
  mutations: {
    SET_TOKEN(state, token) {
      state.token = token
    },
    SET_USERINFO(state, userInfo) {
      state.userInfo = userInfo
    },
    RMOVE_USERINFO(state, userInfo) {
      state.userInfo = {}
    }
  },
  actions: {
    async loginAction({ commit }, loginData) {
      const data = await login(loginData)
      console.log(data)
      commit('SET_TOKEN', data)
    },
    async getUserInfo({ commit }) {
      const res = await getUserInfo()
      const res1 = await getUserDeatilById(res.userId)
      const result = { ...res, ...res1 }
      commit('SET_USERINFO', result)
      return JSON.parse(JSON.stringify(result))
    }
  }
}
