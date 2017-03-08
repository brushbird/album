<template>
  <div id="app">
    <ul>
        <li v-for="value in list">
          <router-link :to="value.href">{{ value.des }}</router-link>
        </li>
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
        '/test': {href: '/test', des: "测试"},
        '/itextbar': {href: '/itextbar', des:'文字工具'},
        '/canvasmodule': {href: '/canvasmodule', des: "测试canvas"},
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
