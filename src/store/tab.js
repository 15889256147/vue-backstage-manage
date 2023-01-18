// 存放关于tab栏的vuex容器
// import Cookies from 'js-cookie'
export default {
  state: {
    // 判断侧边栏是否折叠
    isCollapse: false,
    // 面包屑数据
    tabsList: [
      {
        path: '/home',
        name: 'home',
        label: '首页',
        icon: 'HomeFilled',
        url: 'Home/Home'
      }
    ],
    menu: []
  },
  mutations: {
    // 修改菜单展开收起的方法
    COLLAPSE_MENU(state) {
      state.isCollapse = !state.isCollapse
    },
    // 添加面包屑菜单数据
    ADD_MENU(state, value) {
      const index = state.tabsList.findIndex((item) => value.path == item.path)
      if (index == -1) {
        state.tabsList.push(value)
      }
    },
    // 删除一条面包屑菜单数据
    DEL_MENU(state, value) {
      const index = state.tabsList.findIndex((item) => value.path == item.path)
      state.tabsList.splice(index, 1)
    },
    // 登录后获取菜单数据
    UPDATE_MENU(state, value) {
      state.menu = value
      localStorage.setItem('menu', JSON.stringify(state.menu))
    },
    // 读取本地菜单数据
    LOCAL_MENU(state, router) {
      if (localStorage.getItem('menu')) {
        const menu = JSON.parse(localStorage.getItem('menu'))
        state.menu = menu
      }
      // console.log(state.menu)
      const menuArray = []
      state.menu.forEach((element) => {
        if (element.children) {
          element.children.map((item) => {
            let url = `../view${item.url}`
            item.component = () => import(url)
            return item
          })
          menuArray.push(...element.children)
        } else {
          let url = `../view${element.url}`
          element.component = () => import(url)
          menuArray.push(element)
        }
      })
      // console.log(menuArray)
      menuArray.forEach((item) => {
        router.addRoute('Main', item)
      })
    }
  }
}
