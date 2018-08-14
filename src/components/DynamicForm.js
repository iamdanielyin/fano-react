import React from 'react'
import _ from 'lodash'
import { Form, Row, Col, Button } from 'antd'
import styles from './DynamicForm.less'
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
      fieldsError: {}
    }
    this.handleSubmit = this.handleSubmit.bind(this)
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

  componentDidMount () {
    this.setFieldsValue(this.props.values)
  }

  getFieldControl (field) {
    const typeFn = types[field.type]
    if (_.isFunction(typeFn)) {
      return typeFn(field)
    }
    throw new Error(`Invalid type: "${field.name} => ${field.type}"`)
  }

  getColProps (maxCol) {
    if (!_.isNumber(maxCol) || !_.isFinite(maxCol)) {
      maxCol = 4
    }
    switch (maxCol) {
      case 4:
        return { xs: 24, sm: 12, md: 8, lg: 8, xl: 6 }
      case 3:
        return { xs: 24, sm: 12, md: 8 }
      case 2:
        return { xs: 24, sm: 12 }
      case 1:
        return { xs: 24 }
      default:
        return { xs: 24, sm: 12, md: 8, lg: 8, xl: 6 }
    }
  }

  setFieldsValue (values) {
    if (_.isObject(values)) {
      return !!this.props.form.setFieldsValue(values)
    }
    return false
  }

  getFieldsValue (fieldNames) {
    return this.props.form.getFieldsValue(fieldNames)
  }

  getFieldsProps (fieldNames = []) {
    if (!Array.isArray(fieldNames)) {
      console.warn('argument must be a array')
      return {}
    }
    const { config } = this.props
    const fields = _.chain(config.fields)
      .filter(f => _.isEmpty(fieldNames) || fieldNames.includes(f.name))
      .groupBy('name')
      .mapValues(v => _.head(v))
      .value()
    return fields
  }

  setFieldsError (data) {
    // requiredMark:boolean - 是否显示必填
    // validateStatus:string - 校验状态，可选 'success', 'warning', 'error', 'validating'
    // hasFeedback:boolean - 用于给输入框添加反馈图标
    // help:string - 设置校验文案
    if (_.isObject(data)) {
      const { fieldsError } = this.state
      Object.assign(fieldsError, data)
      this.setState({ fieldsError })
      return true
    }
    return false
  }

  renderFields () {
    const { config, fieldExpand = {}, form } = this.props
    const { fieldsError } = this.state
    const { fields, maxCol = 4 } = config
    const colProps = this.getColProps(maxCol)
    const { getFieldDecorator } = form
    const cols = []
    for (let i = 0; i < fields.length; i++) {
      const field = fields[i]
      field.props = _.isObject(field.props) ? field.props : {}
      field.fieldExpand = fieldExpand[field.name] || {}
      field.props.placeholder = field.props.placeholder || field.label
      const itemOptions = {
        rules: [],
        initialValue: field.props.defaultValue
      }
      this.addRequiredRule(itemOptions.rules, field.props.required)
      const errorProps = _.pick(fieldsError[field.name], ['requiredMark', 'validateStatus', 'hasFeedback', 'help'])
      const label = [<span key={'label'}>{field.label}</span>]
      if (!field.props.required && (field.props.requiredMark === true || errorProps.requiredMark === true)) {
        label.unshift(<span key={'requiredMark'} className={styles.requiredMark}>*</span>)
      }
      cols.push(
        <Col key={i} {...colProps}>
          <FormItem
            label={label}
            {...errorProps}
          >
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
      <Form layout={'inline'}>
        <Row>{this.renderFields()}</Row>
        <Row>
          <Col>
            <div className={styles.footer}>
              <Button>取消</Button>
              <Button type={'primary'} onClick={this.handleSubmit}>确定</Button>
            </div>
          </Col>
        </Row>
      </Form>
    )
  }
}

export default Form.create()(DynamicForm)
