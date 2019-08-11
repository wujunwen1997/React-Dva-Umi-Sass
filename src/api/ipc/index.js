import getRequest from '@/api/config/getNotiData'

//  信息来源
export function getMsgForm () {
  return getRequest('ipc')
}
