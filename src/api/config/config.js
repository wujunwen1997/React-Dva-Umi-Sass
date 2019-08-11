export default {
  // 基础url前缀
  baseURL: '/api',
  // 请求头信息
  headers: {
    'Content-Type': 'application/json;charset=UTF-8',
    'Accept': 'application/json, text/plain'
  },
  // 设置超时时间
  timeout: 10000,
  // 携带凭证,跨域携帶cookie
  withCredentials: true,
  // 返回数据类型
  responseType: 'json',
  dataType: 'json'
}
