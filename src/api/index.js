// 当前这个模块，api进行统一管理
import requests from './request'
import mockRequest from './mockAjax'
import axios from 'axios'
// 三级联动接口
// /api/product/getBaseCategoryList get 无参数

export const reqCategoryList = () =>
  requests({ url: '/product/getBaseCategoryList', method: 'get' })

// 获取banner（Home首页轮播图接口）
export const reqGetBannerList = () => mockRequest.get('/banner')

// 获取floor数据
export const reqFloorList = () => mockRequest.get('/floor')

// 获取搜索模块数据 地址：/api/list 请求方式：post， 参数：10个
export const reqGetSearchInfo = (params) => requests({ url: '/list', method: 'post', data: params })

// 获取产品详情信息的接口 URL： /api/item/{ skuId }   请求方式：get
export const reqGoodsInfo = (skuId) => requests({ url: `/item/${skuId}`, method: 'get' })

// 将产品添加到购物车中（获取更新某一个产品的个数）
// /api/cart/addToCart/{ skuId }/{ skuNum }  POST
export const reqAddOrUpdateShopCart = (skuId, skuNum) =>
  requests({ url: `/cart/addToCart/${skuId}/${skuNum}`, method: 'post' })

// 获取购物车列表数据接口
// URL:/api/cart/cartList method:get
export const reqCartList = () => requests({ url: '/cart/cartList', method: 'get' })

// 删除购物产品的接口
// URL: /api/cart/deleteCart/{skuId}  method:DELET
export const reqDeleteCartById = (skuId) =>
  requests({ url: `/cart/deleteCart/${skuId}`, method: 'delete' })

// 修改商品的选中状态
// URL:/api/cart/checkCart/{skuID}/{isChecked} , method:GET
export const reqUpdateCheckedByid = (skuId, isChecked) =>
  requests({ url: `/cart/checkCart/${skuId}/${isChecked}`, method: 'get' })

// 获取验证码
// URL：/api/user/passport/sendCode/{phone}  GET
export const reqGetCode = (phone) =>
  requests({ url: `/user/passport/sendCode/${phone}`, method: 'get' })

// 注册
// url： /api/user/passport/register   post
export const reqUserRegister = (data) =>
  requests({ url: '/user/passport/register', data, method: 'post' })

// 登录
// URL:/api/user/passport/login   POST
export const reqUserLogin = (data) =>
  requests({ url: '/user/passport/login', data, method: 'post' })

// 获取用户信息（需要带着用户的token向服务器要用户信息）
// URL：/api/user/passport/auth/getUserInfo  GET
export const reqUserInfo = () => requests({ url: '/user/passport/auth/getUserInfo', method: 'get' })

// 退出登录
export const reqLogout = () => requests({ url: '/user/passport/logout', method: 'get' })

// 获取用户地址信息
// URL: /api/user/userAddress/auth/findUserAddressList  GET
export const reqAddressInfo = () =>
  requests({ url: '/user/userAddress/auth/findUserAddressList', method: 'get' })

// 获取商品清单
// URL：/api/order/auth/trade  GET
export const reqOrderInfo = () => requests({ url: '/order/auth/trade', method: 'get' })

// 提交订单的接口
// URL：/api/order/auth/submitOrder?tradeNo={tradeNo}  POST
export const reqSubmitOrder = (tradeNo, data) =>
  requests({ url: `/order/auth/submitOrder?tradeNo=${tradeNo}`, data, method: 'post' })

// 获取订单支付信息
// URL:/api/payment/weixin/createNative/{orderId} GET
export const reqPayInfo = (orderId) =>
  requests({ url: `/payment/weixin/createNative/${orderId}`, method: 'get' })

// 获取支付订单状态
// URL: /api/payment/weixin/queryPayStatus/{orderId}   GET
export const reqPayStatus = (orderId) =>
  requests({ url: `/payment/weixin/queryPayStatus/${orderId}`, method: 'get' })

// 获取个人中心的数据
// URL：/api/order/auth/{page}/{limit}   GET
export const reqMyOrderList = (page, limit) =>
  requests({ url: `/order/auth/${page}/${limit}`, method: 'get' })
