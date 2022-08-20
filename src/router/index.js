import Vue from 'vue'
import VueRouter from 'vue-router'
import login from '@/views/login'
import exam from '@/views/exam'

Vue.use(VueRouter)

const routes = [{
  path: '/',
  name: 'login',
  component: login
},{
  path: '/exam',
  name: 'exam',
  component: exam
}]

const router = new VueRouter({
  routes
})

export default router
