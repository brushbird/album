import Vue from 'vue'
import Router from 'vue-router'
import Hello from 'components/Hello'
import test from 'components/testDemo/test'
import test1 from 'components/testDemo1/test1'
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
    },
     {
      path: '/test1',
      component:test1
    }
  ]
})
