export default {
  state: {
    a: 'user page!!!'
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
