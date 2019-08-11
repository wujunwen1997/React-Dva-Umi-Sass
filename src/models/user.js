import nav from '@/lang/zh_cn'
import {deLangPrefix} from '@/utils/index'
import webSocket from '@/utils/webSocket';
import { pathMatchRegexp } from '@/utils'
import http from '@/api/config/api';
import {loginOut} from '@/api/login/index.js';
import cookie from 'js-cookie';
import {getHeadImg} from '@/api/systemManagement/upload.js';

export default {
  namespace: 'user',
  state: {
    locationPathname: '',
    locationQuery: {},
    currLocale: 'zh_CN',
    userName: '',
    muneKey: [],
    ws: new webSocket(),
    headUrl: ''
  },
  reducers: {
    'info'(state, {payload: newState}) {
      return Object.assign({}, state, newState)
    },
    'setLocale'(state, { payload }) {
      return {
        ...state,
        ...payload,
      }
    }
  },
  effects: {
    * changeLocale({ payload }, { call, put }) { // 改国际化的语种
      yield put({
        type: 'setLocale',
        payload: {
          currLocale: payload,
          initDone: true
        }
      });
      // 把当前国际化持久化到 localstorage 中
      // storage.add('locale', payload);
    },
    * closeWs({payload}, {call, put, select}) {
      http(loginOut());
      const {ws} = yield select(_=>_.user);
      ws.close()
    },
    * openWs ({ payload }, { call, put, select}) {
      const {ws} = yield select(_=>_.user);
      ws.open(cookie.get('token'));
    },
    * getHeadImg({ payload }, { call, put, select}) {
      const res = yield call(http, getHeadImg());
      yield put({
        type: 'setLocale',
        payload: {
          headUrl: res
        }
      })
    }
  },
  subscriptions: {
    setupHistory({ dispatch, history }) {
      history.listen(location => {
        const getMuneKey = (nav) => {
          nav.forEach(u => {
            if (u.child) {
              getMuneKey(u.child)
            } else {
              if (deLangPrefix(location.pathname).includes(u.path)) {
                dispatch({
                  type: 'setLocale',
                  payload: {muneKey: [u.title]}
                });
              }
            }
          })
        }
        getMuneKey(nav);
        dispatch({
          type: 'setLocale',
          payload: {
            locationPathname: location.pathname,
            locationQuery: location.query,
          },
        })
      })
    },
    setup({ dispatch, history }) {
      return history.listen(({ pathname, query }) => {
        if (pathMatchRegexp("/login", pathname)) {
          dispatch({ type: 'closeWs'})
        } else {
          dispatch({ type: 'openWs'});
          dispatch({ type: 'getHeadImg' })
        }
      })
    },
  }
};
