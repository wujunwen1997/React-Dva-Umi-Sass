import React, { PureComponent } from 'react';
import style from './index.scss'
import { connect } from 'dva';
import { Empty } from 'antd'

@connect((newsDetails) => ({newsDetails}))
class RouterComponent extends PureComponent {
  render() {
    const {newsDetails} = this.props;
    const {newsDetail} = newsDetails.newsDetails;
    return (
      <div className={style.newsDetail}>
        {
          newsDetail.content ?
            <div className={style.all}>
              <p className={style.title}>
                <span>
                  { newsDetail.type && '[ ' + (newsDetail.type || '无类型') +' ]'}  { newsDetail.title || '无标题'}
                </span>
              </p>
              <p className={style.content}><span>{ newsDetail.content || '内容为空'}</span></p>
              <p className={style.time}>
                <span>
                  { newsDetail.gmtCreate || '无时间'}
                </span>
              </p>
            </div> :
            <Empty description={'信息内容为空'}/>
        }

      </div>
    );
  }
}

export default RouterComponent;
