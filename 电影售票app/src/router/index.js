import Vue from 'vue'
import VueRouter from 'vue-router'
import Index from '../views/Index.vue'
import List from '../views/List.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'index',
    component: Index,
    children: [
      {
        path: '/list/:genre?', // genre 类型
        name: 'list',
        component: List
      }
    ]
  },
  {
    path: '/my',
    name: 'my',
    component: () => import('../views/My.vue')
  },
  {
    path: '/new',
    name: 'new',
    component: () => import('../views/New.vue')
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('../views/Login.vue'),
    meta: {
      flag: true
    }
  },
  {
    path: '/locate',
    name: 'locate',
    component: () => import('../views/Locate.vue'),
    meta: {
      flag: true
    }
  },
  {
    path: '/cinema',
    name: 'cinema',
    component: () => import('../views/Cinema.vue')
  },
  {
    path: '/detail/:id?',
    name: 'detail',
    component: () => import('../views/Detail.vue'),
    meta: {
      flag: true
    }
  },
  {
    path: '/buylist',
    name: 'buylist',
    component: () => import('../views/BuyList.vue'),
    meta: {
      flag: true
    }
  },
  {
    path: '/buymovie',
    name: 'buymovie',
    component: () => import('../views/BuyMovie.vue'),
    meta: {
      flag: true
    }
  },
  {
    path: '/seat/:id?',
    name: 'seat',
    component: () => import('../views/Seat.vue'),
    meta: {
      flag: true
    }
  },
  {
    path: '/set',
    name: 'set',
    component: () => import('../views/Set.vue'),
    meta: {
      flag: true
    }
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
