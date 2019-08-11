/**
 * Routes:
 *   - ./src/routes/router.js
 */
import React, { Component} from 'react';
import {Button, Form, message, Modal} from 'antd';
import Table from '@/components/Table';
import Search from '@/components/Search';
import AddBtn from '@/components/SearchEvent/Add';
import {deleteUser} from '@/api/userManagement'
import http from '@/api/config/api';
import {getUserList, deleteBatch} from '@/api/userManagement'
import { router } from '@/utils';
import {timeFormat} from '@/utils/filter.js'
import { stringify } from 'qs'
import { connect } from 'dva';
const confirm = Modal.confirm;

@connect(({ loading, userManagement }) => ({ loading, userManagement }))
class UserOperation extends Component {
  state = {
    delVisible: false
  }
  render() {
    const { loading, location, dispatch, userManagement } = this.props;
    const {selectedRowKeys, pagination, dataSource,loadDel} = userManagement;
    const { query, pathname } = location;
    let load = loading.effects['userManagement/query'];
    const changeLoading = (is, who) => {
      dispatch({
        type: 'userManagement/updateState',
        payload: {[who]: is},
      })
    };
    const changeUserMsg = (data) => {
      router.push({
        pathname: '/userManagement/Detail',
        search: stringify(
          {
            id: data.id,
            username: data.username,
            role: data.role,
            allow_login: data.allow_login
          },
          { arrayFormat: 'repeat' }
        ),
      })
    };
    const onDeleteUser = (id) => {
      confirm({
        title: '操作提示',
        content: '确认删除此用户?',
        okType: 'danger',
        okText: '确认',
        cancelText: '取消',
        onOk() {
          http(deleteUser(id)).then(() => {
            message.success('删除成功');
            dispatch({
              type: 'userManagement/query',
              payload: {
                api: getUserList,
                data: query
              },
            })
          })
        },
      });
    };
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
    const onRemove = () => {
      changeLoading(true, 'loadDel');
      http(deleteBatch(selectedRowKeys)).then((data) => {
        changeLoading(false, 'loadDel');
        message.success('删除成功');
        dispatch({
          type: 'userManagement/updateState',
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
    const onChange = (page) => {
      onSearch({
        page: page.current,
        pageSize: page.pageSize,
      })
    };
    const goAddPage = () => {
      router.push('/userManagement/Detail')
    };
    const columns = [
      {
        title: '用户名',
        dataIndex: 'username',
        width: 200,
      },
      {
        title: '角色',
        dataIndex: 'role',
      },
      {
        title: '允许登录',
        dataIndex: 'allow_login',
        width: 150,
        render: (text, record) => <span>{text === 0 ? '禁止' : '允许'}</span>
      },
      {
        title: '注册时间',
        dataIndex: 'create_time',
        width: 200,
        render: (text, record) => <span>{timeFormat(text)}</span>
      },
      {
        title: '上次修改时间',
        width: 200,
        dataIndex: 'update_time',
        render: (text, record) => <span>{timeFormat(text)}</span>
      },
      {
        title: '修改 / 删除',
        fixed: 'right',
        width: 100,
        render: (text, record) => {
          return (
            <div>
              <Button shape="circle" size='small' icon="edit" onClick={() => {changeUserMsg(record)}}/>
              <Button shape="circle" size='small' icon="close" style={{marginLeft: '18px'}} onClick={() => {onDeleteUser(record.id)}}/>
            </div>
          )
        }
      },
    ];
    const searchList = {
      textSearch: {
        key: 'search',
        placeholder: '请输入用户名'
      },
      onSearch,
      onRemove,
      selectedRowKeys,
      notNeedInitial: true,
      load,
      loadDel,
      filter: { ...query }
    };
    const ListAndPagination = {
      pagination, dataSource, columns,
      loading:　load,
      onChange,
      rowSelection: {
        selectedRowKeys: selectedRowKeys,
        onChange: (selectedRowKeys, selectedRows) => {
          dispatch({
            type: 'userManagement/updateState',
            payload: {
              selectedRowKeys: selectedRowKeys,
            },
          });
        },
      }
    };
    return (
      <div>
        <Search {...searchList}>
          <AddBtn show={goAddPage}/>
        </Search>
        <Table {...ListAndPagination}/>
      </div>
    );
  }
}

const UserManagement = Form.create({ name: 'userManagement' })(UserOperation);
export default UserManagement;
