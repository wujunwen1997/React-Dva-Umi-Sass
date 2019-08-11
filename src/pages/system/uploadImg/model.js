import { pathMatchRegexp } from '@/utils'
import http from '@/api/config/api';
import {getImgArr} from '@/api/systemManagement/upload.js';

export default {
  namespace: 'upload',
  state: {
    fileList: []
  },
  reducers: {
    'setLocale'(state, { payload }) {
      return {
        ...state,
        ...payload,
      }
    }
  },
  effects: {
    * getImageArr({ payload }, { call, put }) {
      const arr = yield call(http, getImgArr());
      yield put({
        type: 'setLocale',
        payload: {
          fileList: arr
        }
      });
    },
  },
  subscriptions: {
    setup({ dispatch, history }) {
      return history.listen(({ pathname, query }) => {
        if (pathMatchRegexp("/system/uploadImg", pathname)) {
          dispatch({ type: 'getImageArr'})
        }
      })
    },
  }
};
