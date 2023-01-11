// 存放关于tab栏的vuex容器
// import Cookies from 'js-cookie'
export default {
  state: {
    // 判断侧边栏是否折叠
    isCollapse: false,
    // 菜单数据
    tabsList: [
      {
        path: '/home',
        name: 'home',
        label: '首页',
        icon: 'HomeFilled',
        url: 'Home/Home'
      }
    ]
  },
  mutations: {
    // 修改菜单展开收起的方法
    COLLAPSE_MENU(state) {
      state.isCollapse = !state.isCollapse
    },
    // 添加菜单数据
    ADD_MENU(state, value) {
      const index = state.tabsList.findIndex((item) => value.path == item.path)
      if (index == -1) {
        state.tabsList.push(value)
      }
    },
    // 删除一条菜单数据
    DEL_MENU(state, value) {
      const index = state.tabsList.findIndex((item) => value.path == item.path)
      state.tabsList.splice(index, 1)
    }
  }
}
