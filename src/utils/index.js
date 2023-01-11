// 对axios进行二次封装,用于发送请求，后续mock将拦截发送的请求
import axios from 'axios'
const http = axios.create({
  baseURL: '/api', //基础url地址
  timeout: 3000 //表超时等待时长
})

// 添加请求拦截器
http.interceptors.request.use(
  function (req) {
    // 在发送请求之前做些什么
    return req
  },
  function (error) {
    // 对请求错误做些什么
    return Promise.reject(error)
  }
)

// 添加响应拦截器
http.interceptors.response.use(
  function (response) {
    // 2xx 范围内的状态码都会触发该函数。
    // 对响应数据做点什么
    return response
  },
  function (error) {
    // 超出 2xx 范围的状态码都会触发该函数。
    // 对响应错误做点什么
    return Promise.reject(error)
  }
)

export default http
