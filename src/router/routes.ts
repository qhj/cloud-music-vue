import { RouteRecordRaw } from 'vue-router'

import Search from '../pages/Search.vue'
import Discover from '../pages/Discover.vue'

export const routes: RouteRecordRaw[] = [
  { path: '/search', component: Search },
  { path: '/', component: Discover }
]
