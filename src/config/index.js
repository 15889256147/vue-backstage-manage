// 设置环境配置

// 当前环境
const env = import.meta.env.MODE || 'prod'
const EnvConfig = {
  // 开发环境
  development: {
    baseApi: '/api',
    mockAPI: ''
  },
  // 测试环境
  test: {
    baseApi: '',
    mockAPI: ''
  },
  // 线上环境
  pro: {
    baseApi: '',
    mockAPI: ''
  }
}
export default {
  env,
  // mock的总开关
  mock: true,
  ...EnvConfig[env]
}
