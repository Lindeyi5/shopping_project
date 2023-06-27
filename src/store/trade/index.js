import { reqReceInfo,reqOrderInfo} from "@/api"
const state = {
  orderInfo: {},
  addressInfo:[]
}
const getters = {}
const actions = {
  async getReceInfo({ commit }) {
    const result = await reqReceInfo()
    if (result.code == '200') {
      // console.log(result.data)
      commit('GETRECEINFO',result.data)
    }
  },
  async OrderInfo({ commit }) {
    const result = await reqOrderInfo()
    // console.log(result)
    if (result.code == '200') {
      // console.log(result.data)
      commit('ORDERINFO',result.data.data)
    } 
  },

}
const modules = {}
const mutations = {
  ORDERINFO(state,orderinfo) {
    state.orderInfo=orderinfo
  },
  GETRECEINFO(state,addressInfo) {
    state.addressInfo=addressInfo
  }
}
export default{
  state, getters, actions, modules, mutations
}
