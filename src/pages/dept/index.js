import { connect } from 'dva'

export default connect(state => {
  console.log(state)
  return {}
})((props, values) => {
  console.log(props, values)
  console.log(window.g_app._store.dispatch)
  return <div>Dept Page</div>
})
