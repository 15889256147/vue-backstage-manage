// 封装请求方法
import http from '../utils/index'

// 请求首页数据
export const getData = () => {
  return http.get('/home/getData')
}
