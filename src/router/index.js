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

export default router
