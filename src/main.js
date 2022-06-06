import Vue from 'vue'
import App from './App.vue'
//三级联动组件（全局组件）
import TypeNav from '@/components/TypeNav'
// 轮播图
import Carousel from '@/components/Carousel'
// 分页器
import Pagination from '@/components/Pagination'
import { Button, MessageBox } from 'element-ui'
Vue.component(TypeNav.name, TypeNav)
Vue.component(Carousel.name, Carousel)
Vue.component(Pagination.name, Pagination)
// 注册全局组件
Vue.component(Button.name, Button)
// elementUI注册组件的时候还有一种写法：挂在原型上
Vue.prototype.$msgbox = MessageBox
Vue.prototype.$alert = MessageBox.alert
// 引入MockServer.js的mock数据
import '@/mock/mockServe'
// 引入swiper样式
import 'swiper/css/swiper.css'

// 统一接口api文件夹里面全部请求函数（统一引入）
import * as API from '@/api'
import pkq from '@/assets/images/pikachu.gif'
Vue.config.productionTip = false
//引入路由
import router from '@/router'
// 引入仓库
import store from '@/store'
// 引入懒加载插件
import VueLazyload from 'vue-lazyload'
// 注册懒加载插件
Vue.use(VueLazyload, {
  // 懒加载默认图片
  loading: pkq,
})
// 引入表单校验插件
import '@/plugins/validate'
new Vue({
  render: (h) => h(App),
  // 配置全局事件总线
  beforeCreate() {
    Vue.prototype.$bus = this
    // 挂载接口到vue原型
    Vue.prototype.$API = API
  },
  //注册路由
  router,
  // 注册仓库:组件实例身上会多一个$store的属性
  store,
}).$mount('#app')
