import { reqCartList,reqDeleteCart ,reqUpdateisChecked} from "@/api"

const modules = {}
const actions = {
  async getCartList({commit}) {
    const result =await reqCartList();
    if (result.code == '200') {
      commit('CARTLIST',result.data)
    }
  },
  async deleteCart({commit},skuId) {
    const result =await reqDeleteCart(skuId);
    if (result.code == '200') {
      return 'ok'
    } else {
      return Promise.reject(new Error('删除失败'))
    }
  },
  async UpdateisChecked({commit},{skuId,isChecked}) {
    const result =await reqUpdateisChecked(skuId,isChecked);
    if (result.code == '200') {
      return 'ok'
    } else {
      return Promise.reject(new Error('修改选中状态失败'))
    }
  },
   deleteisChecked({ dispatch, getters }) {
    let PromiseAll=[]
    getters.cartlist.cartInfoList.forEach(element => {
      let isc = element.isChecked == 1 ? dispatch('deleteCart', element.skuId) : ''
      // console.log(isc)
      PromiseAll.push(isc)
    })
    return Promise.all(PromiseAll)
  },
  AllisChecked({ dispatch, getters }, isCheckedd) {
    let PromiseAll = []
    getters.cartlist.cartInfoList.forEach((element) => {
      let isa= dispatch('UpdateisChecked', { skuId: element.skuId, isChecked: isCheckedd })
      PromiseAll.push(isa)
    })
    return Promise.all(PromiseAll)
  }
}
const state = {
  cartlist:[]
}
const mutations = {
  CARTLIST(state,cartlist) {
    state.cartlist=cartlist
  }
}
const getters = {
  cartlist(state) {
    return state.cartlist[0]||{}
  }
}
export default{
  getters,
  modules,
  actions,
  state,
  mutations
}