import Vue from 'vue'
import Router from 'vue-router'
import APP from 'App'
import test from 'components/testDemo/test'
import itextbar from 'components/itextbar/itextbar.vue'
import canvasModule from 'components/canvasModule/canvasModule.vue'
Vue.use(Router)

export default new Router({
  routes: [
    {
        path: '/',
        component:APP
    },
    {
    	path: '/test',
    	component:test
    },
    {
    	path: '/itextbar',
    	component:itextbar
    },
    {
    	path: '/canvasmodule',
    	component:canvasModule
    },
    
  ]
})
