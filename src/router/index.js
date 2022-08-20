import Vue from 'vue'
import VueRouter from 'vue-router'
import login from '@/views/login'
import exam from '@/views/exam'

Vue.use(VueRouter)

const routes = [{
  path: '/login',
  name: 'login',
  component: login
}, {
  path: '/exam',
  name: 'exam',
  component: exam,
  meta: {
    showTab: {
      backBtnBol: true
    },
  }
}]

const router = new VueRouter({
  routes
})

// 监测没有token默认跳转登录页
// router.beforeEach((to, from, next) => {
//   const token = localStorage.getItem('token') || ''
//   if(!token) {
//     if(to.name === 'login') {
//       next()
//     }else {
//       next({name: 'login'})
//     }
//   }else {
//     if(to.name === 'login') {
//       next({path: '/'})
//     }else {
//       next()
//     }
//   }
// })



export default router
