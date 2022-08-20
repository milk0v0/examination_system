import Vue from 'vue'
import App from './App.vue'
import router from './router'

Vue.config.productionTip = false

document.documentElement.style.fontSize = document.documentElement.clientWidth / 10 + 'px';
window.onresize = () => {
  document.documentElement.style.fontSize = document.documentElement.clientWidth / 10 + 'px';
}

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
