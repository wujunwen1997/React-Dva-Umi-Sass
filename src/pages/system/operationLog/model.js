import modelExtend from 'dva-model-extend'
import {getLogList} from '@/api/systemManagement/operationLog'
import { pathMatchRegexp } from '@/utils'
import { pageModel } from '@/utils/model'
import { SetUp } from '@/utils/commonModalSet'


export default modelExtend(pageModel, {
  namespace: 'operationLog',

  subscriptions: {
    setup({ dispatch, history }) {
      return history.listen(({ pathname, query }) => {
        if (pathMatchRegexp("/system/operationLog", pathname)) {
          SetUp(query, getLogList, dispatch);
        }
      })
    },
  }

})
