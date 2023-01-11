import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import router from './router'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
import store from './store/index' //引入vuex
import './api/mock' //引入mock
import api from './api/api'

const app = createApp(App)
app.config.globalProperties.$api = api //挂载到全局
app.use(router).use(store)
if (router.currentRoute.value.path != '/home') router.push('/home')
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component)
}
app.mount('#app')
