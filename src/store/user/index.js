import { reqCode,reqRegister,reqLogin,reqUserInfo ,reqLogout} from "@/api"
const state = {
  codeInfo: '',
  token: localStorage.getItem('TOKEN'),
  userInfo:{}
}
const getters = {}
const actions = {
 async getCode({ commit }, phone) {
    const result = await reqCode(phone)
    if (result.code == '200') {
      commit('GETCODE',result.data)
    } else {
      return Promise.reject(new Error('获取验证码失败'))
    }
  },
  async getRegister({ commit }, data) {
    const result = await reqRegister(data)
    if (result.code == 200) {
      return 'ok'
    } else {
      return Promise.reject(new Error('注册失败'))
    }
  },
  async LoginInfo({ commit }, data) {
    const result = await reqLogin(data)
    if (result.code == 200) {
      commit('LOGININFO', result.data.token)
      localStorage.setItem('TOKEN',result.data.token)
      //  console.log(result)
        return 'ok'
      } else {
        return Promise.reject(new Error('登录失败!'))
      }
  },
  async reqUserInfo({ commit }) {
    const result = await reqUserInfo()
    if (result.code == 200) {
      // console.log(result)
      commit('USERINFO', result.data)
        return 'ok'
    }
    else {
      localStorage.removeItem('TOKEN')
        // return Promise.reject(new Error('获取用户信息失败!'))
      return 'false'
      }
  },
  async Logout({ commit }) {
    const result = await reqLogout()
    if (result.code == 200) {
      commit('CLEARINFO')
     return 'ok'
      } else {
        return Promise.reject(new Error('退出登录失败!'))
      }
  },
  
}
const modules = {}
const mutations = {
  GETCODE(state,code) {
    state.codeInfo=code
  },
  LOGININFO(state, token) {
    state.token=token
  },
  USERINFO(state,userinfo) {
    state.userInfo=userinfo
  },
  CLEARINFO(state) {
    state.userInfo = {}
    state.token = ''
    localStorage.removeItem('TOKEN')
  }
}
export default{
  state, getters, actions, modules, mutations
}
