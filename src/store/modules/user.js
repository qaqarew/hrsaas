import { login } from '@/api/login'
import { getUserInfo, getUserDeatilById } from '@/api/user'

export default {
  namespaced: true,
  state: {
    token: null,
    userInfo: {},
    hrsaasTime: 0
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
    },
    RMOVE_TOKEN(state, token) {
      state.token = null
    },
    SET_HRSAAS_TIME(state, hrsaasTime) {
      state.hrsaasTime = hrsaasTime
    }
  },
  actions: {
    async loginAction({ commit }, loginData) {
      const data = await login(loginData)
      commit('SET_TOKEN', data)
      commit('SET_HRSAAS_TIME', new Date().getTime())
    },
    async getUserInfo({ commit }) {
      const res = await getUserInfo()
      const res1 = await getUserDeatilById(res.userId)
      const result = { ...res, ...res1 }
      commit('SET_USERINFO', result)
      return JSON.parse(JSON.stringify(result))
    },
    logout({ commit }) {
      commit('RMOVE_USERINFO')
      commit('RMOVE_TOKEN')
    }
  }
}
