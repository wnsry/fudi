import Vue from 'vue'
import Router from 'vue-router'

import Index from '@/views/index'
import Home from '@/views/home'
import Goods from '@/views/goods'
import Detail from '@/views/detail'
import Lunbo from '@/views/lunbo'
import Schang from '@/views/schang'
import Jiedai from '@/views/jiedai'
import Kucun from '@/views/kucun'
import Xihuan from '@/views/xihuan'
import Baojia from '@/views/baojia'
import Login from '@/views/login'

Vue.use(Router)

let router = new Router({
  routes: [
    {
      path: '/',
      component: Index,
      meta: { auth: true },
      children:[
        {
          path: '/',
          name: 'Home',
          component: Home
        },
        {
          path: 'goods',
          name: 'Goods',
          component: Goods
        },
        {
          path: 'detail/:id',
          name: 'Detail',
          component: Detail
        },
        {
          path: 'schang',
          name: 'Schang',
          component: Schang
        },
        {
          path: 'jiedai',
          name: 'Jiedai',
          component: Jiedai
        },
        {
          path: 'kucun',
          name: 'Kucun',
          component: Kucun
        },
        {
          path: 'xihuan',
          name: 'Xihuan',
          component: Xihuan
        },
        {
          path: 'baojia',
          name: 'Baojia',
          component: Baojia
        }
      ]
    },
    {
      path: '/lunbo/:id',
      name: 'Lunbo',
      meta: { auth: true },
      component: Lunbo
    },
    {
      path: '/login',
      name: 'Login',
      component: Login
    }
  ]
})

router.beforeEach((to, from, next) => {
  const storage = localStorage.getItem('user')
  if (to.matched.some(item => item.meta.auth)) {
    if (storage) {
      next()
    } else {
      next({ path: '/login' })
    }
  } else {
    next()
  }
})

export default router