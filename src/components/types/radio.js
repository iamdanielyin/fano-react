import { Radio } from 'antd'
const RadioGroup = Radio.Group
export default props => {
  props.children = Array.isArray(props.children) ? props.children : []
  const options = []
  for (const item of props.children) {
    if (item.label && item.value) {
      options.push(
        <Radio value={item.value}>{item.label}</Radio>
      )
    }
  }
  return (
    <RadioGroup>{options}</RadioGroup>
  )
}
