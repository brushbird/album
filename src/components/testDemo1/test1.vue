<template>
  <div class="content">
    <div class="account-center-pretitle">{{title}}</div>
    <div class="account-content-left">
      <div class="changeLeft">
        <input type="text" name="" v-model="content">
        <p>{{content}}</p>
      </div>
    </div>
  <test></test>
  </div>
</template>

<style lang="less">
  @import "test1.less";
</style>

<script>

  import test from '../testDemo/test.vue';

  export default {
  data(){
    return {
      content:"",
       title:"测试中心",
    }
  },
  methods: {
    
  },
  beforeMount: function() {
  
    
  },
  mounted: function() {

  },
  components:{ test }
}


</script>
