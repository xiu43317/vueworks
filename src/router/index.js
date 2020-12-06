import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import Index from '../pages/index'
import Aboutus from '../pages/aboutus.vue'
import Contact from '../pages/contactus.vue'
import Products from '../pages/products.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path:'/index',
      name:'index',
      component:Index
    },
    {
      path:'/aboutus',
      name:'aboutus',
      component: Aboutus
    },
    {
      path:'/products',
      name:'products',
      component: Products
    },
    {
      path:'/contactus',
      name:'contact',
      component: Contact
    },
    { path: '/*', redirect: '/index' },
  ]
})
