import modelExtend from 'dva-model-extend'
import http from '@/api/config/api';

export const model = {
  reducers: {
    updateState(state, { payload }) {
      return {
        ...state,
        ...payload,
      }
    },
  },
}

export const pageModel = modelExtend(model, {
  state: {
    dataSource: [],
    pagination: {
      showSizeChanger: true,
      showQuickJumper: true,
      current: 1,
      total: 0,
      pageSize: 10,
      showTotal: total => `共 ${total} 条`
    },
  },

  reducers: {
    querySuccess(state, { payload }) {
      const { dataSource, pagination } = payload
      return {
        ...state,
        dataSource,
        pagination: {
          ...state.pagination,
          ...pagination,
        },
      }
    },
  },
  effects: {
    * query({ payload }, { call, put }) {
      const data = yield call(http, payload.api(payload.data));
      if (data) {
        yield put({
          type: 'querySuccess',
          payload: {
            dataSource: data.list,
            pagination: {
              current: Number(payload.data.page) || 1,
              pageSize: Number(payload.data.pageSize) || 10,
              total: data.total,
            },
          },
        })
      }
    }
  },
})
