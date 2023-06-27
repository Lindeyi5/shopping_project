import { createStore } from 'vuex'
import search from './search'
import home from './home'
import detail from './detail'
import cartList from './cartList'
import user from './user'
import trade from './trade'
export default createStore({
  modules: {
    home,search,detail,cartList,user,trade
  }
})
