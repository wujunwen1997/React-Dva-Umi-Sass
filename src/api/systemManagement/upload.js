import getRequest from '@/api/config/getNotiData'

//  查询img
export function getImgArr (data) {
  return getRequest('img/query')
}
//  删除img
export function delImg (data) {
  return getRequest('img/delete', data, 'DELETE')
}
//  获得头像
export function getHeadImg () {
  return getRequest('imgHead')
}
