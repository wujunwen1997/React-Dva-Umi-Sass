import getRequest from '@/api/config/getNotiData'

//  操作日志列表
export function getLogList (data) {
  return getRequest('log/query', data, 'POST')
}
