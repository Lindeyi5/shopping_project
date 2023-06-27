// import Home from "@/views/Home/Home.vue"
// import Login from "@/views/Login"
// import Register from "@/views/Register"
// import Search from "@/views/Search/Search.vue"
// import Detail from '@/views/Detail/index.vue'
// import AddCartSuccess from '@/views/AddCartSuccess/index.vue'
// import ShopCart from '@/views/ShopCart/index.vue'
// import Trade from '@/views/Trade/index.vue'
// import Pay from '@/views/Pay'
// import Paysuccess from '@/views/PaySuccess'
// import Center from '@/views/Center'
// import MyOrder from '@/views/Center/myOrder'
// import GroupOrder from '@/views/Center/groupOrder'
const routes = [
  {
    path: '/',
    redirect:'/home'
  },
  
  // ()=>import('@/views/Search/Search.vue')
  {
    path: '/center',
    name: 'center',
    component: ()=>import('@/views/Center'),
    meta: { footerShow: true },
    children: [{
      path: 'myorder',
      component:()=>import('@/views/Center/myOrder')
    },{
      path: 'grouporder',
      component:()=>import('@/views/Center/groupOrder')
      }, {
      path: '/center',
        redirect:'/center/myorder'
        
    }]
  },
  {
    path: '/addcartsuccess',
    name: 'addcartsuccess',
    component: ()=>import('@/views/AddCartSuccess/index.vue'),
    meta: { footerShow: true },
    beforeEnter: (to, from, next) => {
      // console.log(from.path)
      if (from.path.indexOf('/detail') !=-1||from.path=='/' ) {
        next()
      } else {
        next(false)
      }
    }
  },
  {
    path: '/paysuccess',
    name: 'paysuccess',
    component: ()=>import('@/views/PaySuccess'),
    meta: { footerShow: true },
    beforeEnter: (to, from, next) => {
      if (from.path == '/pay'||from.path=='/') {
        next()
      } else {
        next(false)
      }
    }
  },
  {
    path: '/pay',
    name: 'pay',
    component: ()=>import('@/views/Pay'),
    meta: { footerShow: true },
    beforeEnter: (to, from, next) => {
      if (from.path == '/trade'||from.path=='/') {
        next()
      } else {
        next(false)
      }
    }
  },
  {
    path: '/trade',
    name: 'trade',
    component: ()=>import('@/views/Trade/index.vue'),
    meta: { footerShow: true },
    beforeEnter: (to, from, next) => {
      if (from.path == '/shopcart'||from.path=='/') {
        next()
      } else {
        next(false)
      }
    }
  },
  {
    path: '/shopcart',
    name: 'shopcart',
    component: ()=>import('@/views/ShopCart/index.vue'),
    meta:{footerShow:true}
  },
  {
    path: '/home',
    name: 'home',
    component: ()=>import('@/views/Home/Home.vue'),
    meta:{footerShow:true}
  },
  {
    path: '/login',
    name: 'login',
    component: ()=>import('@/views/Login'),
    meta:{footerShow:false}
  },
  {
    path: '/detail/:skuid',
    // name: 'detail',
    component: ()=>import('@/views/Detail/index.vue'),
    meta:{footerShow:false}
  },
  {
    path: '/register',
    name: 'register',
    component: ()=>import("@/views/Register"),
    meta:{footerShow:false}
  },
  {
    path: '/search/:keyword?',
    name: 'search',
    component: ()=>import('@/views/Search/Search.vue'),
    meta:{footerShow:true}
  },
]

export default routes