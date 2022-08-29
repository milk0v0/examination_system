import Vue from 'vue'
import VueRouter from 'vue-router'
import login from '@/views/login'
import exam from '@/views/exam'
import examStart from '@/views/examStart'
import userInfo from '@/views/userInfo'

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
}, {
  path: '/examStart', // 考试入口
  name: 'examStart',
  component: examStart,
  meta: {
    showTab: {
      backBtnBol: true
    }
  }
}, {
  path: '/userInfo', // 用户信息
  name: 'userInfo',
  component: userInfo,
  meta: {
    showTab: {
      backBtnBol: true,
      logoutBtnBol: true
    }
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
