import axios from 'axios'
import { Message } from 'element-ui'

const service = axios.create({
  baseURL: process.env.VUE_APP_BASE_API,
  Timeout: 5000
})

service.interceptors.response.use(response => {
  const { message, data, success } = response.data
  if (success) {
    return data
  }

  MessageChannel.error(message)
  return Promise.reject(new Error(message))
}, error => {
  Message.error(error.message)
  return Promise.reject(error)
})

export default service
