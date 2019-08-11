import modelExtend from 'dva-model-extend'
import {getMsgForm} from '@/api/ipc/index'
import { pageModel } from '@/utils/model'
import { pathMatchRegexp } from '@/utils'
import http from '@/api/config/api';

export default modelExtend(pageModel, {
  namespace: 'ipcMessage',

  state: {
    ipcMsg: {}
  },
  subscriptions: {
    setup({ dispatch, history }) {
      return history.listen(({ pathname }) => {
        if (pathMatchRegexp("/system/config", pathname)) {
          dispatch({
            type: 'getIpcMsg',
            payload: {},
          })
        }
      })
    },
  },
  effects: {

    * getIpcMsg(payload, { call, put}) {
      const data = yield call(http, getMsgForm());
      yield put({
        type: 'updateState',
        payload: {ipcMsg: data}
      })
    }
  }
})
