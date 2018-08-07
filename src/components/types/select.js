import { Select } from 'antd'
const Option = Select.Option
export default props => {
  props.children = Array.isArray(props.children) ? props.children : []
  const options = []
  for (const item of props.children) {
    if (item.label && item.value) {
      options.push(
        <Option value={item.value}>{item.label}</Option>
      )
    }
  }
  return (
    <Select>{options}</Select>
  )
}
