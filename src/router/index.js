import { createRouter, createWebHashHistory } from 'vue-router'
// import HomeView from '../views/HomeView.vue'
import routes from './routers'
import store from '@/store'

const router = createRouter({
  history: createWebHashHistory(),
  routes,
  scrollBehavior(to, from, savedPosition) {
    return {top:0}
  }
})

router.beforeEach(async (to, from, next) =>{
  // console.log(store._state.data.user.token)
  let token = store._state.data.user.token
  let name = store._state.data.user.userInfo.name
  // console.log(name)
  // 1.登录{1.不能去往login  2.去其他，先看name，有就跳，无就请求数据}
  // 2.未登录{}
  if (token) {
    console.log(1)
    if (to.path == '/login') {
      if (!name) {
        next()
      } else {
        next('/home')
      }    
    } else {
      if (name) {
        next()
      } else {
        try {
          await store.dispatch('reqUserInfo')
          next()
        } catch (error) {
          await store.dispatch('Logout')
          next('/login')
        }
      }   
    }
  }
  else {
    //未登录，不能去shopcart/center/pay/addcartsuccess/trade
    // if(to.path)
    // let Nopath = ['shopcart', 'center', 'center/myorder', 'center/grouporder', 'pay', 'paysuccess', 'addcartsuccess', 'trade']
    if (to.path.indexOf('shopcart') != -1 ||
      to.path.indexOf('center') != -1 ||
      to.path.indexOf('pay') != -1 ||
      to.path.indexOf('addcartsuccess') != -1 ||
      to.path.indexOf('trade') != -1 ) {
        next('/login?redirect='+to.path)
    }
    else {
      next()
    }

 
}
})
export default router
