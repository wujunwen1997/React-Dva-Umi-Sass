import { notification } from 'antd';
import {getUserName} from '@/utils/cookies';
import io from 'socket.io-client';

notification.config({
  placement: 'bottomRight',
});

class websocket {
  constructor() {
    this.socket = '';
  }
  open(token) {
    if (token) {
      if (this.socket === '') {
        this.socket = io('http://127.0.0.1:7001', { query: {token},transports: ['websocket'], reconnection: false, autoConnect: false});
      }
      if (!this.socket.connected) {
        this.socket.open();
        this.init()
      }
    }
  }
  close() {
    console.log(33333333333, this.socket);
    this.socket.close();
    this.socket.off('res', this.onMsg);
    this.socket.off('connect');
  }
  init() {
    this.socket.on('connect', () => {
      console.log('已连接!');
      this.socket.emit('chat', getUserName());
    });
    this.socket.on('res', this.onMsg)
  }
  onMsg(msg) {
    notification['info']({
      message: msg.title,
      description: msg.content,
    });
  }
}

export default websocket
