<template>
  <div id="app">
    <canvasmodule :canvasList="canvasList"></canvasmodule>
  </div>
</template>

<script>
import canvasmodule from "components/canvasModule/canvasModule.vue";
export default {
  name: 'app',
  data(){
    return{
      
      canvasList:[]
    }
  },
  beforeMount:function(){
      let that = this;
      this.$http.get('http://123.207.169.138/guangmu/photo/selectphoto.s',{u_id:1}).then(response => {
                if(response == 1)
                {
                  console.log("success");
                  console.log(response);
                }
                 var list =[];
                 list = response.data.split("$");
                 for(var i=0; i<list.length; i++){
                    that.canvasList.push(list[i]);
                 }
            }, response => {
              console.log(that.canvasJson[0]);
            });
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
  overflow: hidden;
}
</style>
