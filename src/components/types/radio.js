import { Radio } from 'antd'
import _ from 'lodash'

const RadioButton = Radio.Button
const RadioGroup = Radio.Group

export default field => {
  const fieldProps = field.props
  const itemProps = { name: field.name }
  const options = []
  if (_.isArray(fieldProps.options)) {
    for (const option of fieldProps.options) {
      if (fieldProps.showButtonStyle) {
        options.push(<RadioButton key={option.value} value={option.value}>{option.label}</RadioButton>)
      } else {
        options.push(<Radio key={option.value} value={option.value}>{option.label}</Radio>)
      }
    }
  }
  return (<RadioGroup {...itemProps}>{options}</RadioGroup>)
}
