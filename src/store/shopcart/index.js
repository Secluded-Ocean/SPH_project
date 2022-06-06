import { reqCartList, reqDeleteCartById, reqUpdateCheckedByid } from '@/api'
const state = {
  cartList: [],
}
const mutations = {
  GETCARTLIST(start, cartList) {
    state.cartList = cartList
  },
}
const actions = {
  // 获取购物车列表数据
  async getCartList({ commit }) {
    let result = await reqCartList()
    if (result.code == 200) {
      commit('GETCARTLIST', result.data)
    }
  },
  // 删除购物车某一个产品
  async deleteCartListBySkuId({ commit }, skuId) {
    let result = await reqDeleteCartById(skuId)
    if (result.code == 200) {
      return 'ok'
    } else {
      return Promise.reject(new Error('faile'))
    }
  },
  // 修改购物车某个产品的选中状态
  async reqUpdateCheckedByid({ commit }, { skuId, isChecked }) {
    let result = await reqUpdateCheckedByid(skuId, isChecked)
    if (result.code == 200) {
      return 'ok'
    } else {
      return Promise.reject(new Error('faile'))
    }
  },
  // 删除全部勾选的产品
  deleteAllCheckedCart({ dispatch, getters }) {
    // context:小仓库，commit，getters，dispatch，state
    // 获取购物车中的全部产品（是一个数组）
    let PromiseAll = []
    getters.cartList.cartInfoList.forEach((item) => {
      let promise = item.isChecked == 1 ? dispatch('deleteCartListBySkuId', item.skuId) : ''
      PromiseAll.push(promise)
    })
    // 只要全部的p1/p2都成功，返回结果为成功；只要有一个失败，返回结果则为失败
    return Promise.all(PromiseAll)
  },
  // 修改全部产品的状态
  updateAllCartIsChecked({ dispatch, state }, isChecked) {
    let promiseAll = []
    state.cartList[0].cartInfoList.forEach((item) => {
      let promise = dispatch('reqUpdateCheckedByid', { skuId: item.skuId, isChecked })
      promiseAll.push(promise)
    })
    // 最终返回的结果
    return Promise.all(promiseAll)
  },
}
const getters = {
  cartList(state) {
    return state.cartList[0] || {}
  },
}
export default {
  state,
  mutations,
  actions,
  getters,
}
