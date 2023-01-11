// 创建vuex，存放公共属性方法
import { createStore } from 'vuex'
import tab from './tab'

export default new createStore({
  modules: {
    tab
  }
})
