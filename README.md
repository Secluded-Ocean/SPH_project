# 尚品汇前台页面

### **项目描述**

1. 本项目基于尚硅谷尚品汇项目开发，为电商类Web App（SPA）；
2. 此项目包括首页、搜索列表、商品详情、购物车、订单、支付、用户登录/注册等多个子模块；
3. 使用Vue全家桶+ES6+Webpack+Axios等技术，采用模块化、组件化、工程化的模式开发；
4. 此项目主要用于学习实践，后台数据来自尚硅谷服务器；
5. 项目已部署上线于43.138.173.87:80服务器

### **已部署项目演示**

​	http://43.138.173.87/

### **技术选型**

1. 前台数据处理/交互/组件化：vue，vue-router，vuex，vue-lazyload，element-ui，swiper，moment
2. 前后台交互（后台数据来源于尚硅谷服务器）：
   - ajax请求：axios，async/await
   - mock数据：mockjs
   - 接口测试：postman
3. 模块化：ES6，Babel
4. 项目构建/工程化：webpack，vue-cli3，eslint
5. CSS预编译器：less
6. 其他：lodash，store，uuidjs

### **路由模块**

- 首页：/, pages/Home
- 商品搜索页：/search, pages/Search
- 商品详情：/detail, pages/Detail
- 加入购物车成功页：/addcartsuccess, pages/AddCartSuccess
- 购物车：/shopcart, pages/ShopCart
- 订单交易：/trade, /pages/Trade
- 个人中心：/center, /pages/PersonCenter
  - 个人中心子路由：
    - 我的订单：/center/myorder, /pages/PersonCenter/MyOrder
    - 团购商品：/center/groupbuy
- 支付成功页：/paysuccess, /pages/PaySuccess
- 支付：/pay, /pages/Pay
- 登录：/login, pages/Login
- 注册：/register, pages/Register

### 学习收获

-  熟悉一个项目的开发流程
- 学会模块化、组件化、工程化的开发模式
- 掌握使用vue-cli脚手架初始化Vue.js项目
- 学会模拟json后端数据，实现前后端分离开发
- 学会ES6+eslint的开发方式
- 掌握一些项目优化技巧



## 项目依赖安装
```
npm install
```

### 运行项目
```
npm run serve
```

### 打包构建项目
```
npm run build
```
