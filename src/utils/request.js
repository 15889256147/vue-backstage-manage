// 对axios进行二次封装,用于发送请求，后续mock将拦截发送的请求
import axios from 'axios'
import config from '../config/index'

const http = axios.create({
  baseURL: config.baseApi, //基础url地址
  timeout: 3000 //表超时等待时长
})

// 添加请求拦截器
http.interceptors.request.use(
  function (req) {
    // 在发送请求之前:自定义header,jwt-token认证的时候
    return req
  },
  function (error) {
    return Promise.reject(error)
  }
)

// 添加响应拦截器
http.interceptors.response.use(
  function (res) {
    // 2xx 范围内的状态码都会触发该函数。
    const { code, data } = res.data
    if (code === 200) return data
  },
  function (error) {
    // 超出 2xx 范围的状态码都会触发该函数。对响应错误做点什么
    return Promise.reject(error)
  }
)

// 封装核心函数
function request(options) {
  // 处理参数请求
  options.method = options.method || 'get'
  if (options.method.toLowerCase() == 'get') {
    options.params = options.data
  }
  // 对mock进行灵活处理(是否使用)
  let isMock = config.mock
  if (typeof options.mock !== 'undefined') {
    isMock = options.mock
  }
  // 判断所处环境
  // console.log(config.env)
  if (config.env == 'prod') {
    http.defaults.baseURL = config.baseApi
  } else {
    http.defaults.baseURL = isMock ? config.mockApi : config.baseApi
  }
  return http(options)
}

export default request
