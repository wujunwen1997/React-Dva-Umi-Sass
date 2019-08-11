
//  注意：subscription 并没有加 try...catch，所以有错误时需通过第二个参数 done 主动抛错
export const dva = {
  config: {
    //  effect 执行错误或 subscription 通过 done 主动抛错时触发，可用于管理全局出错状态
    onError(err) {
      err.preventDefault();
      // console.error('error', err);
    },
    initialState: {
      products: [
        { name: 'dva', id: 1 },
        { name: 'antd', id: 2 },
      ],
    }
  },
};

// onAction(fn | fn[])          ： 在action被dispatch时触发，用于注册 redux 中间件。支持函数或函数数组格式
// import createLogger from 'redux-logger';
// const app = dva({
//   onAction: createLogger(opts),
// })


// onStateChange(fn)            ： state 改变时触发，可用于同步 state 到 localStorage，服务器端等

// onReducer(fn)                ：  封装 reducer 执行，比如借助 redux-undo 实现 redo/undo

// onEffect(fn)                 ：  封装 effect 执行。比如 dva-loading 基于此实现了自动处理 loading 状态

// onHmr(fn)                      ：  热替换相关，目前用于 babel-plugin-dva-hmr

// extraReducers                 ：  指定额外的 reducer，比如 redux-form 需要指定额外的 form reducer：
