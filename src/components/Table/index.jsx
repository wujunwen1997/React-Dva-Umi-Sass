import React, { Component } from 'react';
import { Table } from 'antd';
import style from './index.scss'
import PropTypes from 'prop-types'

class RouterComponent1 extends Component {
  state = {
    //  设置默认的配置
    defaultConfig: {
      bordered: true,
      simple: true,
      size: 'Small'
    }
  };
  render() {
    const getProps = (data) => {
      return Object.assign({}, this.state.defaultConfig, data)
    };
    const height = window.innerHeight - 190;
    return (
        <Table
          {...getProps(this.props)}
          className={style.table}
          rowKey={(record, index) => record.id || index}
          size={'small'}
          scroll={{y: height}}
        />
    );
  }
}
RouterComponent1.propTypes = {
    pagination: PropTypes.object,
    dataSource: PropTypes.array,
    onChange: PropTypes.func,
    rowSelection: PropTypes.object,
    loading: PropTypes.bool,
    bordered: PropTypes.bool,
    simple: PropTypes.bool
}
export default RouterComponent1;
