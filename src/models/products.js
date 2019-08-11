export default {
  namespace: 'products',
  state: [],
  reducers: {
    'delete'(state, { payload: id }) {
      return state.filter(item => item.id !== id);
    },
  },
  // effects: {
  //   * fetchNum({ payload2 }, { call, put, select }) {//fetchNum方法名，payload2是传来的参数，是个对象，如果没参数可以写成{_,{call,put,select}}
  //     const { data } = yield call(myService.doit, { anum: payload2.numCount }) // myService是引入service层那个js的一个名字，
  //     // anum是后台要求传的参数，data就是后台返回来的数据
  //     //const m = yield select((state) => state.test.num) //select就是用来选择上面state里的，这里没用上
  //     yield put({
  //       type: "addNum",// 这就是reducer中addNum方法, put就是用来触发上面reducer的方法，payload里就是传过去的参数。 同时它也能触发同等级effects中其他方法。
  //       payload: {
  //         num: data, // 把后台返回的数据赋值给了num，假如那个reducer中方法是由这里effects去触发的，那个num名必须是这里名字num，
  //         // 如果reducer中方法不是这触发，那名字可随便起
  //       },
  //     })
  //   },
  // },
  //
  // subscriptions: {
  //   // 订阅监听，比如我们监听路由，进入页面就如何，可以在这写
  //   setup({ dispatch, history, query }) {
  //     return history.listen(async ({ pathname, search, query }) => {
  //       if (pathname === "/testdemo") {// 当进入testdemo这路由，就会触发fetchUser方法
  //         dispatch({ type: "fetchUser" })
  //       }
  //     })
  //   }
  // }
};
