import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import TypeNav from '@/components/TypeNav/TypeNav.vue'
import Carousel from '@/components/Carousel/index.vue'
import Pagination from '@/components/Pagination/index.vue'

import store from '@/store/index.js'
import '@/mock/mockServe.js'
import 'swiper/css/swiper.css'
import * as API from '@/api/index'

import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'

const APP = createApp(App)
  APP.component('Carousel', Carousel)
APP.component('TypeNav', TypeNav)
APP.component('Pagination', Pagination)
APP.use(router).use(store).use(ElementPlus).mount('#app')
APP.config.globalProperties.$API = API
