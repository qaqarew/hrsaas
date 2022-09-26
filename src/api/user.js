import request from '@/utils/request'

export const getUserInfo = (data) => {
  return request({
    url: '/sys/profile',
    method: 'post',
    data
  })
}

export const getUserDeatilById = (id) => {
  return request({
    url: `/sys/user/${id}`
  })
}

