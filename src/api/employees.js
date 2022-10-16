import request from '@/utils/request'

export function getEmployeesSimple() {
  return request({
    url: '/sys/user/simple'
  })
}

export function getEmployeeListAPI(params) {
  return request({
    url: '/sys/user',
    params
  })
}

/** **
 *  新增员工的接口
 * **/
export function addEmployee(data) {
  return request({
    method: 'post',
    url: '/sys/user',
    data
  })
}

/**
 * 删除接口
 */
export function delEmployee(id) {
  return request({
    url: `/sys/user/${id}`,
    method: 'delete'
  })
}

/** *
 *  读取用户详情的基础信息
 * **/
export function getPersonalDetail(id) {
  return request({
    url: `/employees/${id}/personalInfo`
  })
}

export function getJobDetail(id) {
  return request({
    url: `/employees/${id}/jobs`
  })
}
