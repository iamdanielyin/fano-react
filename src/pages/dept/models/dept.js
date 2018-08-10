export default {
  state: {
    a: 'dept page!!!'
  },
  effects: {
    * fetch ({ payload }, { call, put }) {
      yield put({ type: 'save' })
    }
  },
  reducers: {
    save (state, action) {
      return { ...state, ...action.payload }
    }
  }
}
