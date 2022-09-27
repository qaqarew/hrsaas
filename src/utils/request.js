import router from '@/router'
import store from '@/store'
import axios from 'axios'
import { Message } from 'element-ui'
const TimeOut = 3600

function IsCheckTimeOut() {
  const currentTime = Date.now()
  const timeStamp = (currentTime - store.getters.hrsaasTime) / 1000
  return timeStamp > TimeOut
}
const service = axios.create({
  baseURL: process.env.VUE_APP_BASE_API,
  Timeout: 5000
})

service.interceptors.request.use(config => {
  if (store.getters.token) {
    if (IsCheckTimeOut()) {
      store.dispatch('user/logout')
      router.push('/login')
      return Promise.reject(new Error('token 超时'))
    }
    config.headers.Authorization = `Bearer ${store.getters.token}`
  }
  return config
}, error => {
  return Promise.reject(error)
})

service.interceptors.response.use(response => {
  const { message, data, success } = response.data
  if (success) {
    return data
  }

  MessageChannel.error(message)
  return Promise.reject(new Error(message))
}, error => {
  if (error.response.status === 401) {
    store.dispatch('user/logout')
    router.push('/login')
    Message.error('token 超时')
  } else {
    Message.error(error.message)
  }
  return Promise.reject(error)
})

export default service
