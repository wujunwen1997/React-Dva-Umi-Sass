import React, { Component } from 'react';
import { Form, Input, Button, DatePicker, Select, Popconfirm } from 'antd';
import style from './index.scss'
import moment from 'moment'
import PropTypes from 'prop-types'

const { RangePicker } = DatePicker;
const Option = Select.Option;
const Search = Input.Search;

@Form.create()
class RouterComponent extends Component {
  state = {
    searchValue: '',
    selectValue: '',
    RangePickerValue: '',
    formLayout: 'inline',
    text: '确认删除选中的信息吗？'
  };
  render() {
    const { form, textSearch, select, range, notNeedInitial, filter, onRemove, load, loadDel, selectedRowKeys, onSearch } = this.props;
    const { getFieldDecorator } = form;
    let initialCreateTime = []
    if (filter && filter.time && filter.time[0]) {
      initialCreateTime[0] = moment(parseInt(filter.time[0]))
    }
    if (filter && filter.time && filter.time[1]) {
      initialCreateTime[1] = moment(parseInt(filter.time[1]))
    }
    const handleFields = fields => {
      const { time } = fields
      if (time && time.length) {
        fields.time = [
          moment(time[0]).valueOf(),
          moment(time[1]).valueOf()
        ]
      }
      return fields
    }
    const getSearchText = (textSearch, getFieldDecorator) => {
      return (
        <Form.Item>
          {getFieldDecorator(textSearch.key, { initialValue: (filter && filter.search) || '' })(
            <Search
              placeholder={textSearch.placeholder}
              onSearch={handleSearch}
            />
          )}
        </Form.Item>
      )
    }
    const getSearchSelect = (select, getFieldDecorator) => {
      return (
        <Form.Item label={select.label} style={{width: '140px'}}>
          {getFieldDecorator(select.key, { initialValue: (filter && filter.isRead) || '' })(
            <Select onSelect={handleSubmit.bind(this, select.key)}>
              {
                select.Options.map(item => {
                  return  <Option value={item.key} key={item.key}>{item.label}</Option>
                })
              }
            </Select>
          )}
        </Form.Item>
      )

    }
    const getSearchRange = (range, getFieldDecorator) => {
      return (
        <Form.Item label={range.label}>
          {getFieldDecorator(range.key, { initialValue: initialCreateTime })(
            <RangePicker onChange={handleSubmit.bind(this, range.key)} placeholder={['开始时间', '结束时间']}/>
          )}
        </Form.Item>
      )
    }
    const goSearch = data => {
      onSearch(Object.assign({}, data, {page: 1}))
    };
    const handleSubmit = (key, value) => {
      const { form } = this.props
      const { getFieldsValue } = form

      let fields = getFieldsValue()
      fields[key] = value
      fields = handleFields(fields)
      goSearch(fields)
    };
    const handleSearch = () => {
      const { form } = this.props
      const { getFieldsValue } = form

      let fields = getFieldsValue()
      fields = handleFields(fields)
      goSearch(fields)
    }
    const handleReset = () => {
      const { form } = this.props
      const { getFieldsValue, setFieldsValue } = form

      const fields = getFieldsValue()
      for (let item in fields) {
        if ({}.hasOwnProperty.call(fields, item)) {
          if (fields[item] instanceof Array) {
            fields[item] = []
          } else {
            fields[item] = ''
          }
        }
      }
      setFieldsValue(fields)
      handleSubmit()
    };
    return (
      <div className={style.search}>
        {
          (textSearch || select || range) && (
            <Form className={style.searchForm} layout={this.state.formLayout}>
              {textSearch && getSearchText(textSearch, getFieldDecorator)}
              {select && getSearchSelect(select, getFieldDecorator)}
              {range && getSearchRange(range, getFieldDecorator)}
              <Form.Item>
                <Button type="primary" htmlType="submit" onClick={handleSearch} loading={load}>查 询</Button>
                { !notNeedInitial && <Button style={{ marginLeft: 8 }} onClick={handleReset}>重 置</Button>}
              </Form.Item>
            </Form>
          )
        }
        {
          selectedRowKeys && selectedRowKeys.length > 0 && (
            <Popconfirm placement="left" title={this.state.text} onConfirm={onRemove} okText="Yes" cancelText="No" className={style.sureBtn}>
              <Button type="danger" loading={loadDel}>删 除</Button>
            </Popconfirm>
          )
        }
        {this.props.children}
      </div>
    );
  }
}
RouterComponent.propTypes = {
    textSearch: PropTypes.object,
    select: PropTypes.object,
    range: PropTypes.object,
    notNeedInitial: PropTypes.bool,
    onSearch: PropTypes.func,
    onRemove: PropTypes.func,
    filter: PropTypes.object,
    load: PropTypes.bool,
    loadDel: PropTypes.bool,
    selectedRowKeys: PropTypes.array
}

export default RouterComponent;
