// 管理整个项目的api
import request from '../utils/request'

// 请求首页数据
export default {
  getTableData() {
    return request({
      url: '/home/getTableData',
      mock: true
    })
  },
  getCountData() {
    return request({
      url: '/home/getCountData'
    })
  }
}
