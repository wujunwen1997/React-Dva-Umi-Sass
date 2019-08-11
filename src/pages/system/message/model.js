import modelExtend from 'dva-model-extend'
import {getMessageList, deleteMessage} from '@/api/systemManagement/systemMessage'
import http from '@/api/config/api';
import { pathMatchRegexp } from '@/utils'
import { pageModel } from '@/utils/model'
import { SetUp } from '@/utils/commonModalSet';

export default modelExtend(pageModel, {
  namespace: 'systemMessage',

  state: {
    selectedRowKeys: [],
    loadDel: false,
  },

  subscriptions: {
    setup({ dispatch, history }) {
      return history.listen(({ pathname, query }) => {
        if (pathMatchRegexp("/system/message", pathname)) {
          SetUp(query, getMessageList, dispatch);
        }
      })
    },
  },

  effects: {
    * multiDelete(payload, { call, put, select}) {
      const m = yield select((state) => state.systemMessage.selectedRowKeys) //select就是用来选择上面state里的，这里没用上
      const data = yield call(http, deleteMessage(m));
      if (data === null) {
        yield put({ type: 'updateState', payload: { selectedRowKeys: [] } })
      } else {
        throw data
      }
    }
  }
})
