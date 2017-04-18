<template>
  <div id="app">
    <canvasmodule :scalefont="scalefont" :colorCanvasWidth="colorCanvasWidth"></canvasmodule>
  </div>
</template>

<script>
import canvasmodule from "components/canvasModule/canvasModule.vue";
export default {
  name: 'app',
  data(){
    return{
      
      canvasList:[],
      scalefont:'',
      colorCanvasWidth:''
    }
  },
  beforeMount(){
    this.scalefont = 4961/document.body.clientWidth;
    this.colorCanvasWidth = document.body.clientWidth * 0.12;
    console.log(this.canvasWidth);
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
  background-color: #fdebeb;
  /*overflow: hidden;*/
}
</style>
