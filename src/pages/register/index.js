import React, { Component } from 'react'
import { Form, Icon, Input, Button } from 'antd'
import styles from './register.scss';
import { connect } from 'dva'
// import intl from 'react-intl-universal';
import PropTypes from 'prop-types'
import { router } from '@/utils'

@connect(({loading}) => ({loading}))
class RegisterForm extends Component{
  render() {
    const { form, loading, dispatch } = this.props;
    const { getFieldDecorator } = form;
    const surePassword = (rule, value, callback) => {
      form.getFieldsValue().password === value ? callback() : callback('两次输入密码不同')
    }
    const checkPassword = (rule, value, callback) => {
      value ? value.length > 3 ? callback() : callback('超过3个字符') : callback()
    }
    const doRegister = (e) => {
      e.preventDefault();
      this.props.form.validateFields((err, values) => {
        delete values.passwordAgain;
        if (!err) {
          dispatch({
            type: 'register/goRegister',
            payload: values,
          })
        } else {
          return null
        }
      });
    }
    const goLogin = () => {
      router.push('/login')
    }
    return (
      <div className={styles.loginForm}>
        <p>钱包服务注册</p>
        <Form>
          <Form.Item hasFeedback>
            {getFieldDecorator('username', {
              rules: [{ required: true, message: '请输入用户名!' }],
            })(
              <Input prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="请输入用户名"
                     onPressEnter={doRegister}/>
            )}
          </Form.Item>
          <Form.Item hasFeedback>
            {getFieldDecorator('password', {
              rules: [{ required: true, message: '请输入密码!' }, {validator: checkPassword }],
            })(
              <Input prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />} type="password"
                     placeholder="请输入密码"  onPressEnter={doRegister}/>
            )}
          </Form.Item>
          <Form.Item hasFeedback>
            {getFieldDecorator('passwordAgain', {
              rules: [{ required: true, message: '请再次输入密码!' }, {validator: surePassword }],
            })(
              <Input prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />} type="password"
                     placeholder="请再次输入密码"  onPressEnter={doRegister}/>
            )}
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit" loading={loading.global} className={styles.formButton}
                    onClick={doRegister}>
              注 册
            </Button>
            <div className={styles.register} onClick={goLogin}>去登录</div>
          </Form.Item>
        </Form>
      </div>
    )
  }
}
RegisterForm.propTypes = {
  form: PropTypes.object.isRequired,
  loading: PropTypes.object,
};
const ClassRegisterForm = Form.create({ name: 'register' })(RegisterForm);

export default connect(({ user, loading }) => ({
  user, loading
}))(ClassRegisterForm);
