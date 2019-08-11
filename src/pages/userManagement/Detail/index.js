/**
 * Routes:
 *   - ./src/routes/router.js
 */
import React, { Component} from 'react';
import {Button, Form, message, Input, Checkbox, Row, Col, Switch} from 'antd';
import {addUser, modifyUser} from '@/api/userManagement'
import http from '@/api/config/api';
import { router } from '@/utils';
import md5 from 'js-md5'
import {cloneDeep} from 'lodash'
import s from './index.scss'

class UserDetail extends Component {
  state = {
    loading: false
  };
  render() {
    const { location, form } = this.props;
    const {allow_login, role, id, username} = location.query;
    const { getFieldDecorator } = form;
    const formItemLayout = { labelCol: { span: 6 }, wrapperCol: { span: 14 }, };
    const surePassword = (rule, value, callback) => {
      form.getFieldsValue().password === value ? callback() : callback('两次输入密码不同')
    }
    const checkPassword = (rule, value, callback) => {
      value ? value.length > 2 ? callback() : callback('超过2个字符') : callback()
    }

    const handleSubmit = (e) => {
      e.preventDefault();
      this.props.form.validateFields((err, values) => {
        if (!err) {
          this.setState({loading: true});
          const is = location.query.id;
          let obj = cloneDeep(values);
          obj.password && (obj.password = md5(obj.password));
          delete obj.passwordTwo;
          !obj.username && delete obj.username;
          !obj.password && delete obj.password;
          is && (obj.id = id);
          http((is ? modifyUser : addUser)(obj)).then(() => {
            this.setState({loading: false});
            message.success(is ? '修改成功' : '创建成功');
            router.push('/userManagement')
          }).catch(() => {
            this.setState({loading: false});
          })
        }
      });
    };
    return (
      <div className={s.userDetail}>
        <Form onSubmit={handleSubmit}>
          <Form.Item label={'用户名'} {...formItemLayout}>
            {getFieldDecorator('username', {initialValue: username, rules: [{required: true, message: '请输入用户名'}]})(
              <Input/>
            )}
          </Form.Item>
          <Form.Item label={'密码'} {...formItemLayout}>
            {getFieldDecorator('password',
              {rules: location.query.id ? [{validator: checkPassword }] :[{required: true, message: '请输入密码'}, {validator: checkPassword }]})(
              <Input type="password"/>
            )}
          </Form.Item>
          <Form.Item label={'确认密码'} {...formItemLayout}>
            {getFieldDecorator('passwordTwo',
              {rules: location.query.id ? [{validator: surePassword }] :[{required: true, message: '请再次输入密码'}, {validator: surePassword }]})(
              <Input type="password"/>
            )}
          </Form.Item>
          <Form.Item label="权限" {...formItemLayout}>
            {getFieldDecorator('role', {
              initialValue: role ? role.length > 1 ? role.split('、') : [role] : [],
            })(
              <Checkbox.Group style={{ width: '100%' }}>
                <Row>
                  <Col span={8}>
                    <Checkbox value="商户管理">商户管理</Checkbox>
                  </Col>
                </Row>
                <Row>
                  <Col span={8}>
                    <Checkbox value="系统管理">系统管理</Checkbox>
                  </Col>
                  <Col span={8}>
                    <Checkbox value="操作日志">操作日志</Checkbox>
                  </Col>
                  <Col span={8}>
                    <Checkbox value="系统消息">系统消息</Checkbox>
                  </Col>
                  <Col span={8}>
                    <Checkbox value="ipc信息">ipc信息</Checkbox>
                  </Col>
                  <Col span={8}>
                    <Checkbox value="图片上传">图片上传</Checkbox>
                  </Col>
                </Row>
              </Checkbox.Group>,
            )}
          </Form.Item>
          <Form.Item label="允许登录" {...formItemLayout}>
            {getFieldDecorator('allowLogin', {initialValue: allow_login === '1', valuePropName: 'checked'})(<Switch/>)}
          </Form.Item>
          <Form.Item wrapperCol={{ span: 14, offset: 6 }}>
            <Button loading={this.state.loading} htmlType="submit" type="primary">{location.query.id ? '修 改' : '新 增'}</Button>
          </Form.Item>
        </Form>
      </div>
    );
  }
}

const UserManagementDetail = Form.create({ name: 'userManagement' })(UserDetail);
export default UserManagementDetail;
