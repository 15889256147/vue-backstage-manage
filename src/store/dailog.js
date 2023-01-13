// 存放关于daiLog的vuex容器
export default {
  state: {
    isVisible: false,
    //表单数据
    form: {
      name: '',
      sex: '',
      age: '',
      birth: '',
      addr: ''
    }
  },
  mutations: {
    // 修改对话框展开收起的方法
    CHANGE_DAI(state, value) {
      state.isVisible = value
    },
    CHANGE_FROM(state, value) {
      for (let key in value._value || value) {
        if (value._value) state.form[key] = value._value[key]
        else state.form[key] = value[key]
      }
    },
    DELETE_FROM(state) {
      for (let key in state.form) {
        state.form[key] = ''
      }
    }
  }
}
