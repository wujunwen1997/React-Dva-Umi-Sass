export function SetUp(query, api, dispatch) {
  const data = query || { page: 1, pageSize: 10 };
  const payload = { data, api: api };
  dispatch({
    type: 'query',
    payload,
  })
}
