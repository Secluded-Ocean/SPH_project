import Home from '@/pages/Home'
import Search from '@/pages/Search'
import Login from '@/pages/Login'
import Register from '@/pages/Register'
import Detail from '@/pages/Detail'
import AddCartSuccess from '@/pages/AddCartSuccess'
import ShopCart from '@/pages/ShopCart'
import Trade from '@/pages/Trade'
import Pay from '@/pages/Pay'
import PaySuccess from '@/pages/PaySuccess'
import Center from '@/pages/Center'
// 引入二级路由组件
import MyOrder from '@/pages/Center/myOrder'
import GroupOrder from '@/pages/Center/groupOrder'

export default [
  {
    path: '/center',
    component: Center,
    meta: { show: true },
    // 子路由
    children: [
      {
        path: 'myorder',
        component: MyOrder,
      },
      {
        path: 'grouporder',
        component: GroupOrder,
      },
      {
        path: '/center',
        redirect: '/center/myorder',
      },
    ],
  },
  {
    path: '/paysuccess',
    component: PaySuccess,
    meta: { show: true },
  },
  {
    path: '/pay',
    component: Pay,
    meta: { show: true },
    beforeEnter: (to, from, next) => {
      if (from.path == '/trade') {
        next()
      } else {
        next(false)
      }
    },
  },
  {
    path: '/trade',
    component: Trade,
    meta: { show: true },
    // 路由独享守卫
    beforeEnter: (to, from, next) => {
      // 去交易页面，必须从购物车而来
      if (from.path == '/shopcart') {
        next()
      } else {
        // 如果不是从购物车跳到交易页面，则阻止跳转
        next(false)
      }
    },
  },
  {
    path: '/shopcart',
    component: ShopCart,
    meta: { show: true },
  },
  {
    path: '/addcartsuccess',
    name: 'addcartsuccess',
    component: AddCartSuccess,
    meta: { show: true },
  },
  {
    path: '/detail/:skuid',
    component: Detail,
    meta: { show: true },
  },
  {
    path: '/home',
    component: Home,
    meta: { show: true },
  },
  {
    path: '/search/:keyword?',
    component: Search,
    meta: { show: true },
    name: 'search',
  },
  {
    path: '/login',
    component: Login,
    meta: { show: false },
  },
  {
    path: '/register',
    component: Register,
    meta: { show: false },
  },
  //当访问空路径时，重定向到首页
  {
    path: '*',
    redirect: '/home',
  },
]
