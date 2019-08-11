import http from '@/api/config/api';
import { register } from '@/api/login';
import { message } from 'antd'
import { router } from '@/utils'

export default {
  namespace: 'register',
  effects: {
    * goRegister({ payload }, { call, put}) {
      const res = yield call(http, register(payload));
      if (res === null) {
        message.success('注册成功');
        router.push('/login')
      }
    },
  }
};
