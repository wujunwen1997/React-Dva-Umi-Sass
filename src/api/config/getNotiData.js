const getRequest = (api, data, type, num) => {
  let method = type || 'GET'
  return {
      url: api,
      method: method,
      data
    }
}
export default getRequest
