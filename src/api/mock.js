// 拦截请求,利用mock.js来模拟后端数据
import Mock from 'mockjs'
import homeApi from './mockServeData/home'
import userApi from './mockServeData/user'
// import loginApi from './mockServeData/permission'

// 定义mock请求拦截
Mock.mock('/api/home/getData', homeApi.getStaticalData)

// 拦截本地获取用户列表请求
Mock.mock(/api\/user\/getUser/, userApi.getUserList) //请求数据
Mock.mock('/api/user/delUser', 'post', userApi.deleteUser) //删除数据
Mock.mock('/api/user/addUser', 'post', userApi.createUser) //新增数据
Mock.mock('/api/user/editUser', 'post', userApi.updateUser) //修改数据
Mock.mock('/api/user/batchDel', 'post', userApi.batchremove) //批量删除数据
