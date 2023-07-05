/*
 * @Description: 路由配置
 */
import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

const routes = [
  // ---------------------- CMS router --------------
  {
    path: '/',
    name: 'Index',
    component: () => import('../views/login/Login.vue')
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import('../views/login/Login.vue')
  },
  {
    path: '/regist',
    name: 'Rrgist',
    component: () => import('../views/login/Regist.vue')
  },
  
  {
    path: '/goods',
    name: 'Goods',
    component: () => import('../views/GoodsList.vue')
  },
  {
    path: '/goods/add',
    name: 'GoodsAdd',
    component: () => import('../views/GoodsAdd.vue')
  },
  {
    path: '/goods/edit',
    name: 'GoodsEdit',
    component: () => import('../views/GoodsEdit.vue')
  },
  {
    path: '/orders',
    name: 'Orders',
    component: () => import('../views/OrdersList.vue')
  },
]

const router = new Router({
  // base: '/dist',
  // mode: 'history',
  routes
})

/* 由于Vue-router在3.1之后把$router.push()方法改为了Promise。所以假如没有回调函数，错误信息就会交给全局的路由错误处理。
vue-router先报了一个Uncaught(in promise)的错误(因为push没加回调) ，然后再点击路由的时候才会触发NavigationDuplicated的错误(路由出现的错误，全局错误处理打印了出来)。*/
// 禁止全局路由错误处理打印
const originalPush = Router.prototype.push;
Router.prototype.push = function push (location, onResolve, onReject) {
  if (onResolve || onReject)
    return originalPush.call(this, location, onResolve, onReject)
    return originalPush.call(this, location).catch(err => err)
}

// src/router/index.js
 



export default router
