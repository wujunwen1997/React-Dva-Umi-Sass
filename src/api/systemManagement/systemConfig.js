import getRequest from '@/api/config/getNotiData'

//  查询配置列表
export function getSystemConfigList (data) {
  return getRequest('admin/systemConfig/list', data)
}
// 修改、新增消息配置
export function newSystemConfig (data) {
  return getRequest('admin/systemConfig/update', data, 'POST')
}
//  删除配置
export function delSystemConfig (data) {
  return getRequest('admin/systemConfig/delete/' + data, '', 'DELETE')
}
