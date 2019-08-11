import nav from '@/utils/roleRoute.js'
import {pathMatchRegexp} from '@/utils/index.js'
import {getPowerRoute} from '../utils/cookies';
import { router } from '@/utils';

export default (props) => {
  const {location} = props;
  let title = '';
  Object.keys(nav).forEach(u => {
    if (pathMatchRegexp(u, location.pathname)) {
      title = nav[u]
    }
  })
  if (!(getPowerRoute() || []).includes(title)) {
    //  404
    router.push('/')
  }
  return (
    <div>
      { props.children }
    </div>
  );
}
