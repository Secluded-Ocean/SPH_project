import { reqGoodsInfo, reqAddOrUpdateShopCart } from '@/api'
// 封装游客身份模块
import { getUUID } from '@/utils/uuid_token'
// detail模块的小仓库
// state:仓库存储数据的地方
const state = {
  goodInfo: {},
  // 游客临时身份
  uuid_token: getUUID(),
}
// mutations：修改state的唯一手段
const mutations = {
  GETGOODINFO(state, goodInfo) {
    state.goodInfo = goodInfo
  },
}
// action:处理action，可以书写自己的业务逻辑也可以处理异步
const actions = {
  // 获取产品信息的action
  async getGoodInfo({ commit }, skuId) {
    let result = await reqGoodsInfo(skuId)
    if (result.code == 200) {
      commit('GETGOODINFO', result.data)
    }
  },
  // 将产品添加到购物车中
  async addOrUpdateShopCart({ commit }, { skuId, skuNum }) {
    // 加入购物车返回的解构
    // 发请求：前端带一些参数给服务器，存储成功了，服务器没有返回数据
    // 不需要vuex三连环（不需要存储数据）
    let result = await reqAddOrUpdateShopCart(skuId, skuNum)
    if (result.code == 200) {
      return 'ok'
    } else {
      return Promise.reject(new Error('faile'))
    }
  },
}
// getters:理解为计算属性，用于简化仓库数据，让组件获取仓库的数据更加方便
const getters = {
  // 路径导航简化
  categoryView(state) {
    // state.goodInfo初始是空对象，没有categoryView属性
    return state.goodInfo.categoryView || {}
  },
  // 简化产品信息
  skuInfo(state) {
    return state.goodInfo.skuInfo || {}
  },
  // 产品售卖属性简化
  spuSaleAttrList(state) {
    return state.goodInfo.spuSaleAttrList || []
  },
}
export default {
  state,
  mutations,
  actions,
  getters,
}
