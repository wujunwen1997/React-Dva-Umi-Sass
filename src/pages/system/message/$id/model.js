import {seeMessage} from '@/api/systemManagement/systemMessage'
import http from '@/api/config/api';
import { pathMatchRegexp } from '@/utils'

export default {
  namespace: 'newsDetails',

  state: {
    newsDetail: {}
  },

  subscriptions: {
    setup({ dispatch, history }) {
      return history.listen(({ pathname, query }) => {
        const match = pathMatchRegexp('/system/message/:id', pathname)
        if (match) {
          dispatch({ type: 'detail', payload: match[1] })
        }
      })
    },
  },

  effects: {
    * detail({ payload }, { call, put }) {
      const data = yield call(http, seeMessage(payload));
      if (data) {
        yield put({
          type: 'querySuccess',
          payload: data,
        })
      }
    }
  },

  reducers: {
    querySuccess(state, { payload }) {
      return {
        ...state,
      newsDetail: payload
      }
    }
  }
}
