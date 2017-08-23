import Vue from 'vue'
import Router from 'vue-router'
// import Hello from '@/components/Hello'
// import Login from '@/pages/Login'
import Login from '@/pages/Index'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Login',
      component: Login
    }
  ]
})
