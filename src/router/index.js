import Cookies from 'js-cookie'
import { createWebHistory, createRouter } from 'vue-router'

// 定义路由规则
const routes = [
  {
    path: '/',
    name: 'Main',
    component: () => import('../view/Main.vue'),
    redirect: '/home',
    children: []
    // children: [
    //   { path: '/home', component: () => import('../view/home/Home.vue') },
    //   { path: '/mall', component: () => import('../view/mall/Mall.vue') },
    //   { path: '/user', component: () => import('../view/user/User.vue') },
    //   { path: '/page1', component: () => import('../view/other/PageOne.vue') },
    //   { path: '/page2', component: () => import('../view/other/PageTwo.vue') }
    // ]
  },
  { path: '/login', component: () => import('../view/login/Login.vue') }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

// 判断将去路由是否存在
let checkRoute = (path) => {
  let len = router.getRoutes().filter((item) => item.path == path).length
  if (len) return true
  else return false
}
router.beforeEach((to, form, next) => {
  let token = Cookies.get('token')
  // 不去非登录页面且没有token
  if (to.path != '/login' && !token) {
    next('/login')
    // 去登录页面但有token
  } else if (to.path == '/login' && token) {
    next('/home')
    // 去不存在页面
  } else if (!checkRoute(to.path)) {
    next('/home')
  } else next()
})

export default router
