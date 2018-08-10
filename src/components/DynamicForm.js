import React from 'react'
import _ from 'lodash'
import { Form, Row, Col } from 'antd'
import './DynamicForm.less'
import text from './types/text'
import hidden from './types/hidden'
import digit from './types/digit'
import number from './types/number'
import radio from './types/radio'

const types = {
  text,
  hidden,
  digit,
  number,
  radio
}

const FormItem = Form.Item

class DynamicForm extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      fieldsValue: {}
    }
  }
  // 添加必填校验
  addRequiredRule (rules, required) {
    if (required) {
      const rule = { required: true }
      if (_.isString(required)) {
        rule.message = required
      }
      rules.push(rule)
    }
  }

  getFieldControl (field) {
    const typeFn = types[field.type]
    if (_.isFunction(typeFn)) {
      return typeFn(field)
    }
    throw new Error(`Invalid type: "${field.name} => ${field.type}"`)
  }

  renderFields () {
    const { config, expand = {}, form } = this.props
    const { fields, colProps = { xs: 24, sm: 12, md: 8, lg: 8, xl: 6 } } = config
    const { getFieldDecorator } = form
    const cols = []
    for (let i = 0; i < fields.length; i++) {
      const field = fields[i]
      field.props = _.isObject(field.props) ? field.props : {}
      field.expand = expand[field.name] || {}
      field.props.placeholder = field.props.placeholder || field.label
      const itemOptions = {
        rules: [],
        initialValue: field.props.defaultValue
      }
      this.addRequiredRule(itemOptions.rules, field.props.required)
      cols.push(
        <Col key={i} {...colProps}>
          <FormItem label={field.label}>
            {getFieldDecorator(field.name, itemOptions)(
              this.getFieldControl(field)
            )}
          </FormItem>
        </Col>
      )
    }
    return cols
  }

  handleSubmit (e) {
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values)
      }
    })
  }

  render () {
    return (
      <Form layout={'inline'} onSubmit={this.handleSubmit}>
        <Row>{this.renderFields()}</Row>
      </Form>
    )
  }
}

export default Form.create()(DynamicForm)
