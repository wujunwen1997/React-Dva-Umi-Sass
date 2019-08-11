import React, { Component } from 'react';
import { Modal, Form, Input, Button, message } from 'antd';
import { connect } from 'dva';
import FormItem from '../FormItem/Normal.jsx'

const { TextArea } = Input;
const formItemLayout = {
  labelCol: { span: 4 },
  wrapperCol: { span: 20 },
};
class RouterComponent extends Component {
  render() {
    const {form, loading, hide, dispatch, visible} = this.props;
    const { getFieldDecorator } = form;
    let load = loading.effects['systemConfig/addNewConfig']
    const normal_form = {
      common: {getFieldDecorator: getFieldDecorator, formItemLayout: formItemLayout},
      arr: [
        {
          label: '配置KEY值',
          key: 'key',
          rules: [{required: true, message: '请输入配置KEY值'}],
          html: <Input/>
        },
        {
          label: '配置规则',
          key: 'value',
          rules: [{required: true, message: '请输入配置规则'}],
          html:  <TextArea placeholder="请输入配置JSON字符" autosize={{ minRows: 3, maxRows:5 }} />
        }
      ]
    }
    const handleOk = (e) => {
      this.props.form.validateFields((err, values) => {
        if (!err) {
          dispatch({
            type: 'systemConfig/addNewConfig',
            payload: values,
          }).then((res) => {
            if (undefined === res) {
              hide()
              message.success('新增成功！')
              dispatch({
                type: 'systemConfig/query'
              })
            }
          });
        }
      });
    }
    return (
        <Modal
          title="添加新配置"
          visible={visible}
          onOk={handleOk}
          onCancel={hide}
          footer={[
            <Button key="back" onClick={hide}>返回</Button>,
            <Button key="submit" type="primary" loading={load} onClick={handleOk}>确认</Button>
          ]}
        >
          <Form>
            <FormItem {...normal_form}/>
          </Form>
        </Modal>
    );
  }
}
const WrappedDynamicRule = Form.create({ name: 'system_addConfig' })(RouterComponent);
export default connect(({ loading }) => ({
  loading
}))(WrappedDynamicRule);
