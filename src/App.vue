<template>
  <div id="app">
    <ul>
        <li v-for="value in list">
          <router-link :to="value.href">{{ value.des }}</router-link>
        </li>
        <div :style="decPosition" class="dec"></div>
      </ul>
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: 'app',
  data(){
    return{
      list:{
        '/hello': {href: '/hello', des: "Hello Vue.js"},
        '/test': {href: '/test', des: "测试"},
        '/test1': {href: '/test1', des: "测试1"},
      }
    }
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
