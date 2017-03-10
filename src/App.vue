<template>
  <div id="app">
    <canvasmodule></canvasmodule>
  </div>
</template>

<script>
import canvasmodule from "components/canvasModule/canvasModule.vue";
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
  },
  components:{canvasmodule}
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  position: absolute;
  width: 100%;
  height: 100%;
  background-color: #ddd;
  overflow: hidden;
}
</style>
