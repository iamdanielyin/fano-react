export default {
  * fetch ({ payload }, { call, put }) {
    yield put({ type: 'save' })
  }
}
