import React, { Component } from 'react';
import { Menu, Icon } from 'antd';
import Navlink from 'umi/navlink'
import PropTypes from 'prop-types'
import {addLangPrefix} from '@/utils/index'
import withRouter from 'umi/withRouter';
import { connect } from 'dva';
import {getPowerRoute} from '@/utils/cookies.js'

const SubMenu = Menu.SubMenu;

@withRouter
@connect(({loading, user}) => ({ loading, user}))
class MenuList extends Component {
  generateMenus = (data) => {
    // title 和 role进行比较，不对等的去掉，这里只是去掉导航，还要去掉路由-->routes/router.js
    return data.map(item => {
      if (getPowerRoute() && getPowerRoute().includes(item.title)) {
        if (item.child) {
          return (
            <SubMenu key={item.title} title={<span><Icon type={item.icon} style={item.style}/><span>{item.title}</span></span>}>
              {this.generateMenus(item.child)}
            </SubMenu>
          )
        }
        return (
          <Menu.Item key={item.title}>
            <Navlink to={addLangPrefix(item.path) || '#'}>
              {item.icon && <Icon type={item.icon} />}
              <span>{item.title}</span>
            </Navlink>
          </Menu.Item>
        )
      } else {
        return null;
      }
    })
  };
  render() {
    const {theme, mode, nav, user} = this.props;
    return (
        <Menu theme={theme} mode={mode} selectedKeys={user.muneKey}>
          {this.generateMenus(nav)}
        </Menu>
    );
  }
}
MenuList.propTypes = {
  theme: PropTypes.string.isRequired,
  mode: PropTypes.string,
  nav: PropTypes.array
}

export default MenuList;
