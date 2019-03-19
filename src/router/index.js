import Vue from 'vue'
import Router from 'vue-router'

import Index from '@/views/index'

Vue.use(Router)

let router = new Router({
  routes: [
    {
      path: '/',
      component: Index,
      meta: { auth: true },
      children:[]
    }
  ]
})

export default router