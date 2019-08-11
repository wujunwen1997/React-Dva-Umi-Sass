import getRequest from '@/api/config/getNotiData'

//  消息列表
export function getMessageList (data) {
  return getRequest('notify/query', data, 'POST')
}
//  消息详情
export function seeMessage (data) {
  return getRequest('notify/read/' + data + '')
}
//  删除消息
export function deleteMessage (data) {
  return getRequest('notify/delete', data, 'DELETE')
}

