import { reqGetSearchInfo } from '@/api'
// search模块的小仓库
// state:仓库存储数据的地方
const state = {
  searchList: {},
}
// mutations：修改state的唯一手段
const mutations = {
  GETSEARCHLIST(state, searchList) {
    state.searchList = searchList
  },
}
// action:处理action，可以书写自己的业务逻辑也可以处理异步
const actions = {
  // 获取search模块数据,至少要传递一个参数（空对象）
  async getSearchList({ commit }, params) {
    // params形参是当用户派发action时，第二个参数传过来的，至少要是一个空对象
    let result = await reqGetSearchInfo(params)
    if (result.code == 200) {
      commit('GETSEARCHLIST', result.data)
    }
  },
}
// getters:理解为计算属性，用于简化仓库数据，让组件获取仓库的数据更加方便
const getters = {
  // state是当前小仓库的state，并不是总的state
  goodsList(state) {
    // 如果服务器数据取到了，是一个数组，但是如果没有网络，会变成undefined，要加一个“|| []”
    return state.searchList.goodsList || []
  },
  trademarkList(state) {
    return state.searchList.trademarkList || []
  },
  attrsList(state) {
    return state.searchList.attrsList || []
  },
}
export default {
  state,
  mutations,
  actions,
  getters,
}
