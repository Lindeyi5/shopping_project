import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import TypeNav from '@/views/Home/TypeNav/TypeNav.vue'


createApp(App).component(TypeNav.TypeNav,TypeNav).use(router).mount('#app')
