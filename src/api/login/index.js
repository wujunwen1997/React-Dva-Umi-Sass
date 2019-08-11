import getRequest from '@/api/config/getNotiData'
//  操作列表
export function login (data) {
  return getRequest('/login', data, 'POST')
}
export function register (data) {
  return getRequest('/register', data, 'POST')
}
export function loginOut () {
  return getRequest('/loginOut')
}
