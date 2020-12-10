import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import Index from '../pages/index'
import Aboutus from '../pages/aboutus.vue'
import Contact from '../pages/contactus.vue'
import Products from '../pages/products.vue'
import cart from '../pages/cart.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path:'/',
      name:'index',
      component:Index,
      meta: {requiresAuth:false},

    },
    {
      path:'/index',
      name:'index',
      component:Index,
      meta: {requiresAuth:false},
    },
    {
      path:'/aboutus',
      name:'aboutus',
      component: Aboutus,
      meta: {requiresAuth:true},
    },
    {
      path:'/products',
      name:'products',
      component: Products,
      meta: {requiresAuth:true},
    },
    {
      path:'/contactus',
      name:'contact',
      component: Contact,
      meta: {requiresAuth:true},
    },
    {
      path: '/cart',
      name: 'cart',
      component: cart,
      meta: {requiresAuth:true},
    },
    { path: '/*', redirect: '/index' },
  ]
})
