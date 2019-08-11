import React, { PureComponent } from 'react';
import Search from '@/components/Search';
import Table from '@/components/Table'
import { connect } from 'dva';
import { router } from '@/utils';
import { stringify } from 'qs'
import {timeFormat} from '@/utils/filter.js'

@connect(({ loading, operationLog }) => ({ loading, operationLog }))
class RouterComponent extends PureComponent {
  render() {
    const { location, loading, operationLog, dispatch } = this.props;
    const { pagination, dataSource} = operationLog;
    const { query, pathname } = location;
    const columns = [
      {
        title: '用户',
        dataIndex: 'username',
        width: 200
      },
      {
        title: 'IP地址',
        dataIndex: 'ip',
        width: 150
      },
      {
        title: '操作',
        dataIndex: 'operation',
        width: 250
      },
      {
        title: '是否成功',
        dataIndex: 'isSuccess',
        render: (text, record) => <span>{text ? '是' : '否'}</span>,
        width: 80
      },
      {
        title: '日期',
        dataIndex: 'create_time',
        render: (text, record) => <span>{timeFormat(text)}</span>
      }
    ];
    let load = loading.effects['operationLog/query'];
    const onSearch = data => {
      router.push({
        pathname,
        search: stringify(
          {
            ...query,
            ...data,
          },
          { arrayFormat: 'repeat' }
        ),
      })
    };
    const onChange = (page) => {
      onSearch({
        page: page.current,
        pageSize: page.pageSize,
      })
    };
    const searchList = {
      textSearch: {
        key: 'search',
        placeholder: 'IP / 用户名'
      },
      dispatch,
      onSearch,
      config: operationLog,
      location,
      load,
      filter: { ...query }
    };
    const ListAndPagination = {
      pagination, dataSource,onChange,
      config: operationLog,
      location,
      columns,
      load
    };
    return (
      <div>
        <Search {...searchList}/>
        <Table {...ListAndPagination}/>
      </div>
    );
  }
}

export default RouterComponent;
