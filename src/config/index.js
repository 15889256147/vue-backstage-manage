// 设置环境配置

// 当前环境
const env = import.meta.env.MODE || 'prod'
const EnvConfig = {
  // 开发环境
  development: {
    baseApi: '/api',
    mockApi:
      'https://www.fastmock.site/mock/567142769cd8788fda6a29e4b1c7be8e/api'
  },
  // 测试环境
  test: {
    baseApi: '/api',
    mockApi: ''
  },
  // 线上环境
  prod: {
    baseApi: '/api',
    mockApi: ''
  }
}
export default {
  env,
  // mock的总开关
  mock: true,
  ...EnvConfig[env]
}
