import React, { Component } from 'react'
import { Form, Icon, Input, Button } from 'antd'
import styles from './Login.scss';
import { connect } from 'dva'
import { router } from '@/utils'
// import intl from 'react-intl-universal';
import PropTypes from 'prop-types'

@connect(({loading}) => ({loading}))
class LoginForm extends Component{
  render() {
    const { form, loading } = this.props;
    const { getFieldDecorator } = form;
    const handleOk = (e) => {
      e.preventDefault();
      this.props.form.validateFields((err, values) => {
        if (!err) {
          this.props.dispatch({
            type: 'login/login',
            payload: values,
          })
        } else {
          return null
        }
      });
    };
    const goRegister = () => {
      router.push('/register')
    }
    return (
      <div className={styles.loginForm}>
        <p>钱包服务后台</p>
        <Form>
          <Form.Item hasFeedback>
            {getFieldDecorator('username', {
              rules: [{ required: true, message: '请输入用户名!' }],
            })(
              <Input prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="请输入用户名"
                     onPressEnter={handleOk}/>
            )}
          </Form.Item>
          <Form.Item hasFeedback>
            {getFieldDecorator('password', {
              rules: [{ required: true, message: '请输入密码!' }],
            })(
              <Input prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />} type="password"
                     placeholder="请输入密码"  onPressEnter={handleOk}/>
            )}
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit" loading={loading.global} className={styles.formButton}
                    onClick={handleOk}>
              登 录
            </Button>
            <div className={styles.register} onClick={goRegister}>去注册</div>
          </Form.Item>
        </Form>
      </div>
    )
  }
}
LoginForm.propTypes = {
  form: PropTypes.object.isRequired,
  loading: PropTypes.object,
};
const WrappedNormalLoginForm = Form.create({ name: 'normal_login' })(LoginForm);

export default connect(({ user, loading }) => ({
  user, loading
}))(WrappedNormalLoginForm);
