import Vue from 'vue'
import Router from 'vue-router'
import APP from 'App'
import canvasModule from 'components/canvasModule/canvasModule.vue'
Vue.use(Router)

export default new Router({
  routes: [
    {
        path: '/',
        component:APP
    },
    {
    	path: '/canvasmodule',
    	component:canvasModule
    },
    
  ]
})
