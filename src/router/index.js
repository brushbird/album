import Vue from 'vue'
import Router from 'vue-router'
import Hello from 'components/Hello'
import test from 'components/testDemo/test'
 
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/hello',
      component: Hello
    },
    {
    	path: '/test',
    	component:test
    }
  ]
})
