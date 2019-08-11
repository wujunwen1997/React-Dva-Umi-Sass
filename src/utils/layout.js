import { removePowerRoute, removeUserName } from './cookies';
import { router } from '@/utils'
import cookie from 'js-cookie';

function layout() {
  removePowerRoute();
  removeUserName();
  router.push('/login');
  cookie.remove('token')
}

export default layout
