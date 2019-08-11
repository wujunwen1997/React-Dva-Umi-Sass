import getRequest from '@/api/config/getNotiData'

//  用户列表
export function getUserList (data) {
  return getRequest('user/query', data, 'POST')
}
//  新增用户
export function addUser (data) {
  return getRequest('/register', data, 'POST')
}
//  删除用户
export function deleteUser (id) {
  return getRequest('/user/delete/' + id, '', 'DELETE')
}
//  修改用户信息
export function modifyUser (data) {
  return getRequest('/user/modify', data, 'POST')
}
//  批量删除
export function deleteBatch(data) {
  return getRequest('/user/deleteBatch', data, 'DELETE')
}

