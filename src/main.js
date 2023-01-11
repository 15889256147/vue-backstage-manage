import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import router from './router'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
import store from './store/index'
import './api/mock'

const app = createApp(App)
app.use(router)
app.use(store)
if (router.currentRoute.value.path != '/home') router.push('/home')
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component)
}
app.mount('#app')
