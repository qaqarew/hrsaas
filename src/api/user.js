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

export const saveUserDeatilById = (data) => {
  return request({
    url: `/sys/user/${data.id}`,
    method: 'put',
    data
  })
}

