import { Layout } from 'antd'
import React, { Component } from 'react'
import Header from '@/components/Layout/Header'
import MenuList from '@/components/Layout/MenuList'
import style from './index.scss'
import nav from '@/lang/zh_cn'
import icon from '@/assets/icon.png'
import icons from '@/assets/icons.png'
import ScrollArea from 'react-scrollbar'
import { i18n } from '@/utils/config'
import NProgress from 'nprogress';
import withRouter from 'umi/withRouter';
import { connect } from 'dva';
import layout from '@/utils/layout.js'

const {Content, Sider} = Layout;

@withRouter
@connect(({loading}) => ({ loading}))
class SiderDemo extends Component {
  state = {
    getIcon: icon,
    silder: false,
    theme: 'dark',
    model: 'inline'
  };
  previousPath = '';
  componentWillUnmount() {
    NProgress.done();
  }
  render() {
    const { location, loading } = this.props;
    const currentPath = location.pathname + location.search;
    if (currentPath !== this.previousPath) {
      //  不用loading。global判断是为了在一些没有异步请求的页面也有进度条的效果
      NProgress.start()
    }
    if (!loading.global) {
      NProgress.done();
      this.previousPath = currentPath
    }
    const eventProps  = {
      layout,
      langs: i18n.languages
    }
    const onCollapse = (collapsed) => {
      this.setState({collapsed});
      let img = collapsed ? icons : icon;
      this.setState({ getIcon: img, silder: collapsed});
    }
    return (
      <Layout className={style.layout}>
        <Sider
          className={style.Sider}
          collapsible
          collapsed={this.state.collapsed}
          onCollapse={onCollapse}
        >
          <div className={style.logo}>
            <img src={this.state.getIcon} className={this.state.silder ? style.imgSmall : style.imgBig} alt=""/>
          </div>
          <ScrollArea className={style.list} speed={0.8} horizontal={false} verticalScrollbarStyle={{borderRadius: '4px', width:　'4px',background: '#a4a7a9'}}
                      verticalContainerStyle={{background: 'none',width: '8px'}}>
              <MenuList theme={this.state.theme} mode={this.state.model} nav={nav}/>
          </ScrollArea>
        </Sider>
        <Layout className={style.right}>
          <Header {...eventProps}/>
            <Content className={style.content}>
              {this.props.children}
            </Content>
        </Layout>
      </Layout>
    );
  }
}
export default SiderDemo
