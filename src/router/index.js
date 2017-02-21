import Vue from 'vue'
import Router from 'vue-router'
import test from 'components/testDemo/test'
Vue.use(Router)

export default new Router({
  routes: [
   
    {
    	path: '/test',
    	component:test
    },
    
  ]
})
