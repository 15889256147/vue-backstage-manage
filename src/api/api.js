// 管理整个项目的api
import request from '../utils/request'

export default {
  // 请求首页数据
  getTableData() {
    return request({
      url: '/home/getData',
      mock: true
    })
  },
  // 请求用户数据
  getUser(params) {
    return request({
      url: '/user/getUser',
      data: params,
      mock: false
    })
  },
  // 删除用户数据
  delUser(data) {
    return request({
      url: '/user/delUser',
      method: 'POST',
      mock: false,
      data
    })
  },
  // 新增用户数据
  addUser(data) {
    return request({
      url: '/user/addUser',
      method: 'POST',
      mock: false,
      data
    })
  },
  // 修改用户数据
  editUser(data) {
    return request({
      url: '/user/editUser',
      method: 'POST',
      mock: false,
      data
    })
  },
  // 批量删除用户数据
  batchDel(data) {
    return request({
      url: '/user/batchDel',
      method: 'POST',
      mock: false,
      data
    })
  },
  // 登录获取菜单数据
  getMenu(data) {
    return request({
      url: '/permission/getMenu',
      method: 'POST',
      mock: false,
      data
    })
  }
}
