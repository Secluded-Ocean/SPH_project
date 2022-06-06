import { reqGetCode, reqUserLogin, reqUserRegister, reqUserInfo, reqLogout } from '@/api'
import { setToken, getToken, removeToken } from '@/utils/token'
// 登陆与注册的模块
const state = {
  code: '',
  token: getToken(),
  userInfo: {},
}
const mutations = {
  GETCODE(state, code) {
    state.code = code
  },
  USERLOGIN(state, token) {
    state.token = token
  },
  GETUSERINFO(state, userInfo) {
    state.userInfo = userInfo
  },
  CLEAR(state) {
    // 清空仓库相关数据以及本地存储
    state.userInfo = {}
    state.token = ''
    removeToken()
  },
}
const actions = {
  // 获取验证码
  async getCode({ commit }, phone) {
    let result = await reqGetCode(phone)
    if (result.code == 200) {
      commit('GETCODE', result.data)
      return 'ok'
    } else {
      return Promise.reject(new Error('faile'))
    }
  },
  // 用户注册
  async userRegister({ commit }, user) {
    let result = await reqUserRegister(user)
    if (result.code == 200) {
      return 'ok'
    } else {
      return Promise.reject(new Error(result.message))
    }
  },
  // 登录
  async userLogin({ commit }, data) {
    let result = await reqUserLogin(data)
    // 服务器下发token，用户唯一标识符（uuid）
    if (result.code == 200) {
      // 用户已登录成功且获取到token
      commit('USERLOGIN', result.data.token)
      // 持久化存储token
      setToken(result.data.token)
      return 'ok'
    } else {
      return Promise.reject(new Error(result.message))
    }
  },
  // 获取用户信息
  async getUserInfo({ commit }) {
    let result = await reqUserInfo()
    if (result.code == 200) {
      // 将用户信息提交到本地仓库
      commit('GETUSERINFO', result.data)
      return 'ok'
    } else {
      return Promise.reject(new Error('faile'))
    }
  },
  // 退出登录
  async userLogout({ commit }) {
    let result = await reqLogout()
    if (result.code == 200) {
      commit('CLEAR')
      return 'ok'
    } else {
      return Promise.reject(new Error('faile'))
    }
  },
}
const getters = {}
export default {
  state,
  mutations,
  actions,
  getters,
}
