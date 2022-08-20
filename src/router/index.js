import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const router = new VueRouter({
  routes: [{
    path: '/login', // 登录页
    name: 'login',
    component: resolve => require(['@/views/login'], resolve)
  }, {
    path: '/',
    // component: resolve => require(['@/views/Home'], resolve),
    children: [{}]
  }]
})

// 监测没有token默认跳转登录页
router.beforeEach((to, from, next) => {
  const token = localStorage.getItem('token') || ''
  if(!token) {
    if(to.name === 'login') {
      next()
    }else {
      next({name: 'login'})
    }
  }else {
    if(to.name === 'login') {
      next({path: '/'})
    }else {
      next()
    }
  }
})



export default router
