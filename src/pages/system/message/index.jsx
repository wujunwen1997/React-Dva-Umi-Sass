import React, { PureComponent } from 'react';
import Search from '@/components/Search'
import Table from '@/components/Table'
import { connect } from 'dva'
import { message } from 'antd';
import { router } from '@/utils';
import { stringify } from 'qs'
// import { addLangPrefix } from '@/utils';
import PropTypes from 'prop-types'
import {deleteMessage} from '@/api/systemManagement/systemMessage'
import {timeFormat} from '@/utils/filter.js'
import http from '@/api/config/api';
// import Link from 'umi/link';

@connect(({ systemMessage, loading }) => ({ systemMessage, loading }))
class RouterComponent extends PureComponent {
  render() {
    const { systemMessage, loading, location, dispatch } = this.props;
    const { query, pathname } = location;
    const { selectedRowKeys, pagination, dataSource, loadDel} = systemMessage;
    const columns = [
      {
        title: '标题',
        dataIndex: 'title',
        width: 300,
      },
      {
        title: '内容',
        dataIndex: 'content',
      },
      // {
      //   title: '是否已读',
      //   dataIndex: 'isRead',
      //   width: 150,
      //   render: (text, record) => <span>{text ? '已读' : '未读'}</span>
      // },
      {
        title: '时间',
        dataIndex: 'create_time',
        width: 150,
        render: (text, record) => <span>{timeFormat(text)}</span>
      }
    ];
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
    const changeLoading = (is, who) => {
      dispatch({
        type: 'systemMessage/updateState',
        payload: {[who]: is},
      })
    };
    const onRemove = () => {
      changeLoading(true, 'loadDel');
      http(deleteMessage(selectedRowKeys)).then((data) => {
        changeLoading(false, 'loadDel');
        message.success('删除成功');
        dispatch({
          type: 'systemMessage/updateState',
          payload: {
            selectedRowKeys: []
          }
        });
        onSearch({
          page:
            dataSource.length === selectedRowKeys.length && pagination.current > 1
              ? pagination.current - 1
              : pagination.current,
        })
      }).catch(() => {
        changeLoading(false, 'loadDel')
      })
    };
    let load = loading.effects['systemMessage/query'];
    const searchList = {
      textSearch: {
        key: 'search',
        placeholder: '标题 / 内容'
      },
      load,
      filter: { ...query },
      onRemove,
      onSearch,
      selectedRowKeys,
      notNeedInitial: true,
      loadDel,
    };
    const ListAndPagination = {
      dataSource,onChange,
      pagination,
      columns,
      loading: load,
      rowSelection: {
        selectedRowKeys: selectedRowKeys,
        onChange: (selectedRowKeys, selectedRows) => {
          dispatch({
            type: 'systemMessage/updateState',
            payload: {
              selectedRowKeys: selectedRowKeys,
            },
          });
        },
      }
    };
    return (
      <div>
        <Search {...searchList}/>
        <Table {...ListAndPagination}/>
      </div>
    );
  }
}
RouterComponent.propTypes = {
  systemMessage: PropTypes.shape({
    // currentItem: {}
    list: PropTypes.array,
    // modalType: "create"
    // modalVisible: false
    pagination: PropTypes.object,
    // selectedRowKeys: []
  })
}

export default RouterComponent;
