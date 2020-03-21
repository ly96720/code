import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: Home
  },
  {
    path: '/classify',
    name: 'classify',
    component: () => import('../views/Classify.vue')
  },
  {
    path: '/car',
    name: 'car',
    component: () => import('../views/Car.vue'),
    meta: {
      flag: false
    }

  }, {
    path: '/message',
    name: 'message',
    component: () => import('../views/Message.vue')

  }, {
    path: '/my',
    name: 'my',
    component: () => import('../views/mine/My.vue')
  },
  {
    path: '/list/:id?',
    name: 'list',
    component: () => import('../views/List.vue'),
    meta: {
      flag: false
    }
  },

  {
    path: '/detail/:id?',
    name: 'detail',
    component: () => import('../views/Detail.vue'),
    meta: {
      flag: false
    }
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('../views/mine/Login.vue'),
    meta: {
      flag: false
    }
  },
  {
    path: '/register',
    name: 'register',
    component: () => import('../views/mine/Register.vue'),
    meta: {
      flag: false
    }
  }, {
    path: '/order',
    name: 'order',
    component: () => import('../views/mine/Order.vue'),
    meta: {
      flag: false
    }
  }, {
    path: '/search/:keyword?',
    name: 'search',
    component: () => import('../views/index/Search.vue'),
    meta: {
      flag: false
    }
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
