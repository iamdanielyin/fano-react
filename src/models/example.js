import effects from './$effects'
export default {
  state: {
    a: 123
  },
  subscriptions: {
    setup ({ dispatch, history }) {
    }
  },
  effects,
  reducers: {
    save (state, action) {
      return { ...state, ...action.payload }
    }
  }
}
