/* eslint-disable no-constant-condition */
import { reqCategoryList, reqGetBannerList, reqFloorList } from '@/api'
// home模块的小仓库
// state:仓库存储数据的地方
const state = {
  // state中数据默认初始值不能随意写（根据服务器返回的初始值决定数据类型是对象还是数组）
  categoryList: [],
  // 轮播图的数据
  bannerList: [],
  floorList: [],
}
// mutations：修改state的唯一手段
const mutations = {
  CATEGORYLIST(state, categoryList) {
    categoryList.splice(15)
    state.categoryList = categoryList
  },
  GETBANNERLIST(state, bannerList) {
    state.bannerList = bannerList
  },
  GETFLOORLIST(state, floorList) {
    state.floorList = floorList
  },
}
// action:处理action，可以书写自己的业务逻辑也可以处理异步
const actions = {
  // 通过API里面的接口函数向服务器发请求获取数据
  async categoryList({ commit }) {
    let result = await reqCategoryList()
    if (result.code == 200) {
      commit('CATEGORYLIST', result.data)
    }
  },
  // 获取首页轮播图的数据
  async getBannerList({ commit }) {
    let result = await reqGetBannerList()
    if (result.code == 200) {
      commit('GETBANNERLIST', result.data)
    }
  },
  // 获取floor数据
  async getFloorList({ commit }) {
    let result = await reqFloorList()
    if (result.code == 200) {
      //提交mutation
      commit('GETFLOORLIST', result.data)
    }
  },
}
// getters:理解为计算属性，用于简化仓库数据，让组件获取仓库的数据更加方便
const getters = {}
export default {
  state,
  mutations,
  actions,
  getters,
}
