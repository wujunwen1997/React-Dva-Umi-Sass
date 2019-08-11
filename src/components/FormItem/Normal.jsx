import { Form } from 'antd';
import React from 'react';

function NormalFormItem({common, arr}) {
  const {getFieldDecorator, formItemLayout} = common;
  return (
    arr.map(u => {
     return (
       <Form.Item {...formItemLayout} label={u.label} key={u.key} style={{display: u.need ? 'none' : 'block'}}>
         {getFieldDecorator(u.key, {rules: u.rules})(
           u.html
         )}
       </Form.Item>
     )
    })
  )
}

export default NormalFormItem;
