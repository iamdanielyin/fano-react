import { Upload } from 'antd'
export default props => {
  const { children } = props
  delete props.children
  return (
    <Upload {...props}>{children}</Upload>
  )
}
