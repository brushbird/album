import Vue from 'vue'
import Router from 'vue-router'
import test from 'components/testDemo/test'
import canvasModule from 'components/canvasModule/canvasModule.vue'
Vue.use(Router)

export default new Router({
  routes: [
   
    {
    	path: '/test',
    	component:test
    },
    {
    	path: '/canvasmodule',
    	component:canvasModule
    },
    
  ]
})
