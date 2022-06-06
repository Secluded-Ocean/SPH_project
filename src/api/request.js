// 对于axios二次封装
import axios from 'axios'
// 引入进度条
import nprogress from 'nprogress'
// 引入进度条样式
import 'nprogress/nprogress.css'
// 在当前模块中引入store
import store from '@/store'

//1. 利用axios对象的方法创建一个axios实例
const requests = axios.create({
  // 配置对象
  // 基础路径，发请求时路径中会出现“api”
  baseURL: '/api',
  //请求超时时间
  timeout: 5000,
})
// 请求拦截器：再发请求之前，请求拦截器可以检测到
requests.interceptors.request.use((config) => {
  // config:配置对象，其中header属性是请求头
  // 进度条开始动
  if (store.state.detail.uuid_token) {
    // 给请求头添加字段(userTempId)，已经在后台配置好
    config.headers.userTempId = store.state.detail.uuid_token
  }
  // 需要携带token带给服务器
  if (store.state.user.token) {
    config.headers.token = store.state.user.token
  }
  nprogress.start()
  return config
})
// 响应拦截器
requests.interceptors.response.use(
  (res) => {
    // 成功的回调函数
    // 进度条结束
    nprogress.done()
    return res.data
  },
  (error) => {
    return Promise.reject(new Error('faile'))
  }
)

export default requests
