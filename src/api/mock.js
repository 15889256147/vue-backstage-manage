// 拦截请求,利用mock.js来模拟后端数据
import Mock from 'mockjs'
import homeApi from './mockServeData/home'
// import userApi from './mockServeData/user'
// import loginApi from './mockServeData/permission'

// 定义mock请求拦截
Mock.mock('/api/home/getData', homeApi.getStaticalData)
