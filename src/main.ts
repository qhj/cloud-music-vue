import { createApp } from 'vue'
import App from './App.vue'
import 'modern-normalize/modern-normalize.css'
import ElementPlus from 'element-plus'
import 'element-plus/lib/theme-chalk/index.css'

import { router } from './router'

createApp(App)
  .use(ElementPlus)
  .use(router)
  .mount('#app')
