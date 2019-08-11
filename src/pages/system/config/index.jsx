import React, { Component } from 'react';
import { Button } from 'antd';
import { connect } from 'dva';

@connect(({ loading, ipcMessage }) => ({ loading, ipcMessage }))
class RouterComponent extends Component {
  state = {
    visible: false,
  }
  render() {
    const { ipcMessage, dispatch } = this.props;
    const { ipcMsg} = ipcMessage;
    const getIpcMsgs = () => {
      dispatch({
        type: 'ipcMessage/getIpcMsg',
        payload: ''
      })
    };
    return (
      <div style={{padding: '30px 50px'}}>
        <h2>多进程、ipc</h2>
        <h3>以官网实战为例， 需求：</h3>
        <h4>
          1、定时从远程数据源获取数据，更新内存缓存，为了降低对数据源压力，更新的间隔时间会设置的比较长。<br/>
          2、远程数据源提供一个检查是否有数据更新的接口，我们的服务可以更频繁的调用检查接口，当有数据更新时才去重新拉取数据。<br/>
          3、远程数据源通过消息中间件推送数据更新的消息，我们的服务监听消息来更新数据。
        </h4>

        <Button onClick={getIpcMsgs}>开始获取数据</Button>

        <span>刷新数据次数： {ipcMsg.index}</span>, <span>数据来源： {ipcMsg.lastUpdateBy}</span>
      </div>
    );
  }
}

export default RouterComponent;

