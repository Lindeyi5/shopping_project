import { createRouter, createWebHashHistory } from 'vue-router'
// import HomeView from '../views/HomeView.vue'
import Home from "@/views/Home/Home.vue"
import Login from "@/views/Login/Login.vue"
import Register from "@/views/Register/Register.vue"
import Search from "@/views/Search/Search.vue"

const routes = [
  {
    path: '/',
    redirect:'/home'
  },
  {
    path: '/home',
    name: 'home',
    component: Home,
    meta:{footerShow:true}
  },
  {
    path: '/login',
    name: 'login',
    component: Login,
    meta:{footerShow:false}
  },
  {
    path: '/register',
    name: 'register',
    component: Register,
    meta:{footerShow:false}
  },
  {
    path: '/search/:keyword?',
    name: 'search',
    component: Search,
    meta:{footerShow:true}
  },
  // {
  //   path: '/about',
  //   name: 'about',
  //   // route level code-splitting
  //   // this generates a separate chunk (about.[hash].js) for this route
  //   // which is lazy-loaded when the route is visited.
  //   component: () => import(/* webpackChunkName: "about" */ '../views/AboutView.vue')
  // }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
