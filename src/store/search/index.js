import { reqSearchList } from "@/api"
const state = {
  searchList:{}
}
const getters = {
  goodsList(state) {
    return state.searchList.goodsList||[]
  },
  attrsList(state) {
    return state.searchList.attrsList||[]
  },
  trademarkList(state) {
    return state.searchList.trademarkList||[]
  }
}
const actions = {
  async searchList({commit},params={}) {
    const result = await reqSearchList(params)
    if (result.code == '200') {
      commit('SEARCHLIST',result.data)
    }
  }
}
const modules = {}
const mutations = {
  SEARCHLIST(state, searchList) {
    state.searchList=searchList
  }
}
export default {
  state, getters, actions, modules, mutations
  }