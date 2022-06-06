<template>
  <div>
    <Header></Header>
    <!-- 路由组件出口 -->
    <router-view></router-view>
    <Footer v-show="$route.meta.show"></Footer>
  </div>
</template>

<script>
import Header from './components/Header'
import Footer from './components/Footer'
export default {
  name: 'App',
  components: {
    Header,
    Footer,
  },
  // 组件挂载完毕，就向服务器发请求
  mounted() {
    // 通知Vuex发请求，获取数据，存储于仓库中
    this.$store.dispatch('categoryList')
  },
}
</script>

<style scoped lang="less"></style>
