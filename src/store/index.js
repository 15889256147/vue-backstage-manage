// 创建vuex，存放公共属性方法
import { createStore } from 'vuex'
import tab from './tab'
import daiLog from './dailog'

export default new createStore({
  modules: {
    tab,
    daiLog
  }
})
