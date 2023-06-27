import { reqGoodsList,reqGoodsCartList,reqLogin } from "@/api";
import { getUUID } from "@/utils/uuid_token";
const state = {
  goodsInfo: {},
  uuid_token: getUUID(),

}

const mutations = {
  GOODSLIST(state,result) {
    state.goodsInfo=result
  },

}
const actions = {
 async goodsList({commit},skuid) {
     const result =await reqGoodsList(skuid)
    if (result.code == '200') {
      commit('GOODSLIST', result.data)
      // console.log(result)
    }
  },
  async goodsCartList({commit},{skuid,skuNum}) {
    const result = await reqGoodsCartList(skuid,skuNum)
    if (result.code == 200) {
    //  console.log(result)
      return 'ok'
    } else {
      return Promise.reject(new Error('服务器请求失败!'))
    }
  },

  
}
const getters = {
  categoryView(state) {
    // console.log(state)
      return state.goodsInfo.categoryView||{}
  },
  skuInfo(state) {
    return state.goodsInfo.skuInfo||{}
  },
  spuSaleAttrList(state) {
    return state.goodsInfo.spuSaleAttrList||[]
  }
}
const modules = {}

export default {
  state,getters,mutations,actions,modules
}