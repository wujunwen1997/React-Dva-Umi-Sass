import http from '@/api/config/api';
import { login } from '@/api/login';
import { message } from 'antd'
import { router } from '@/utils'
import {setUserName, setPowerRoute} from '@/utils/cookies'
import md5 from 'js-md5'
import cookie from 'js-cookie';

export default {
  namespace: 'login',
  effects: {
    * login({ payload }, { call, put, select }) {
      const {userName, userToken, role} = yield call(http, login({username: payload.username, password: md5(payload.password)}));
      if (!userToken || !userName) {
        message.error('返回数据有误');
        return;
      }
      cookie.set('token', userToken)
      setUserName(userName);
      setPowerRoute(role.split('、'));
      router.push('/userManagement')
    },
  },
};
