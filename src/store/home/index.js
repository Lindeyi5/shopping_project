// import { createStore } from "vuex"
import { reqList } from "@/api/index"
import { reqBannerList } from "@/api/index"
import { reqFloorList } from "@/api/index"
const state = {
  categroyList: [],
  bannerList: [],
  floorList:[]
}
const getters = {}
const actions = {
  
  async categroyList({ commit }) {
    const result = await reqList()
    if (result.code == '200') {
      commit('CATEGROYLIST',result.data)
    }
  },
   async bannerList({commit}) {
    const result = await reqBannerList()
    if (result.code == '200') {
      commit('BANNERLIST',result.data)
    }
  },
  async floorList({commit}) {
    const result = await reqFloorList()
    // console.log(result)
    if (result.code == '200') {
      commit('FLOORLIST',result.data)
    }
  }
}
const modules = {}
const mutations = {
  CATEGROYLIST(state, categroyList) {
    state.categroyList = categroyList.slice(0,16)
  },
  BANNERLIST(state, bannerList) {
    state.bannerList=bannerList
  },
  FLOORLIST(state, floorList) {
    state.floorList=floorList
  }
}
export default{
  state, getters, actions, modules, mutations
}
