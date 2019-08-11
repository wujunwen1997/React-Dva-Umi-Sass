import modelExtend from 'dva-model-extend'
import {getUserList} from '@/api/userManagement'
import { pathMatchRegexp } from '@/utils'
import { pageModel } from '@/utils/model'

export default modelExtend(pageModel, {
  namespace: 'userManagement',

  state: {
    selectedRowKeys: [],
    loadDel: false,
    formData: {}
  },

  subscriptions: {
    setup({ dispatch, history }) {
      return history.listen(({ pathname, query }) => {
        if (pathMatchRegexp("/userManagement", pathname)) {
          dispatch({
            type: 'query',
            payload: {
              api: getUserList,
              data: query
            },
          })
        }
      })
    },
  },
})
