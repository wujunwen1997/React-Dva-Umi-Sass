import React, { Component } from 'react'
import { Menu, Dropdown, Avatar, Button, Icon, Badge } from 'antd';
import style from './set.scss'
import PropTypes from 'prop-types'
import withRouter from 'umi/withRouter';
import { connect } from 'dva';
import { setLocale } from '@/utils'
import {getUserName} from '@/utils/cookies';

@withRouter
@connect(({dispatch, user}) => ({ dispatch, user}))
class UserSet extends Component {
  componentDidMount () {
    this.setState((prevState, props) => this.getLangTitle(this.props.user.currLocale))
  }
  changeLang = (value) => {
    if (value.key !== this.props.user.currLocale) {
      setLocale(value.key)
    }
  };
  getLangTitle = (key) => {
    let title = '中文';
    this.props.langs.forEach(item => {
      if (item.key === key) {
        title = item.title
      }
    });
    return title;
  };
  menuLang = () => {
    return <Menu onClick={this.changeLang}>
      {
        this.props.langs.map(item => {
          return <Menu.Item key={item.key}>
            <span>{item.title}</span>
          </Menu.Item>
        })
      }
    </Menu>
  };
  render() {
    const {event, user} = this.props;
    const {headUrl} = user;
    const menuUser = (
      <Menu>
        <Menu.Item key="0">
          <a target="_blank" rel="noopener noreferrer" href="http://www.alipay.com/">1st menu item</a>
        </Menu.Item>
        <Menu.Item key="1">
          <a target="_blank" rel="noopener noreferrer" href="http://www.taobao.com/">2nd menu item</a>
        </Menu.Item>
        <Menu.Divider />
        <Menu.Item key="3" onClick={event}>退出登录</Menu.Item>
      </Menu>
    );
    return (
          <div className={style.set}>
            <div className={style.menuLang}>
              <Badge count={10} dot>
                <Icon type="bell"/>
              </Badge>
            </div>
            <Dropdown overlay={this.menuLang} className={style.menuLang}>
              <div className={style.name}>
                <Button size='small' type="dashed">{this.getLangTitle(this.props.user.currLocale)}</Button>
              </div>
            </Dropdown>
            <Dropdown overlay={menuUser} trigger={['hover']}>
              <div className={style.name}>
                Hi, {getUserName()}
              </div>
            </Dropdown>
            <Avatar src={headUrl} alt={''}/>
          </div>
    );
  }
}
UserSet.propTypes = {
  event: PropTypes.func.isRequired,
  langs: PropTypes.array,
  user: PropTypes.object
};
export default UserSet;
