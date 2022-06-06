// 用于配置路由
import Vue from 'vue'
import VueRouter from 'vue-router'
import routes from './routes'
// 使用插件
Vue.use(VueRouter)
// 配置路由
// 引入store
import store from '@/store'

// 为了解决反复搜索时飘红的问题：
// 先把VueRouter原型对象的push保存一份
let originPush = VueRouter.prototype.push
let originReplace = VueRouter.prototype.replace

//重写push|replace
// 第一个参数：告诉原来push方法往哪里跳转（传哪些参数）
VueRouter.prototype.push = function (location, resolve, reject) {
  if (resolve && reject) {
    originPush.call(this, location, resolve, reject)
  } else {
    originPush.call(
      this,
      location,
      () => {},
      () => {}
    )
  }
}
VueRouter.prototype.replace = function (location, resolve, reject) {
  if (resolve && reject) {
    originReplace.call(this, location, resolve, reject)
  } else {
    originReplace.call(
      this,
      location,
      () => {},
      () => {}
    )
  }
}

// 配置路由
let router = new VueRouter({
  //配置
  routes,
  scrollBehavior(to, from, savedPosition) {
    // 返回的y为0代表滚动条在最上方
    return { y: 0 }
  },
})

// 全局守卫：前置守卫
router.beforeEach(async (to, from, next) => {
  // to:可以获取要跳转到的路由信息
  // from：获取来源路由的信息
  // next：放行函数 next(path)放行到指定路由
  // 用户登陆了会有token
  let token = store.state.user.token
  // 用户信息
  let name = store.state.user.userInfo.name
  if (token) {
    // 用户已登录
    if (to.path == '/login' || to.path == '/register') {
      // 若此时用户前往登录界面，则停留在首页
      next('/home')
    } else {
      // 登陆了，但是去的不是login
      // 如果用户名已有
      if (name) {
        next()
      } else {
        // 没有用户信息,派发action让仓库存储用户信息再跳转
        try {
          // 获取用户信息成功
          await store.dispatch('getUserInfo')
          next()
        } catch (error) {
          // token失效了，获取不到用户信息
          // 清除token
          await store.dispatch('userLogout')
          next('/login')
        }
      }
    }
  } else {
    // 未登录,不能去交易相关的页面和支付相关的页面（pay/paysuccess）以及个人中心，如果去这些页面要先登录
    let toPath = to.path
    if (
      toPath.indexOf('/trade') == !-1 ||
      toPath.indexOf('/pay') == !-1 ||
      toPath.indexOf('/center') == !-1
    ) {
      // 把未登录时想去而没有去成的信息存储于地址栏中
      next('/login?redirect=' + toPath)
    } else {
      // 如果去的不是上述页面，则放行
      next()
    }
  }
})

export default router
