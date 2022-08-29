import Vue from 'vue'
import App from './App.vue'
import router from './router'
import { message } from './util'

Vue.config.productionTip = false

function resize() {
  const maxSize = 50;
  let width = document.documentElement.clientWidth / 10;
  width > maxSize && (width = maxSize);
  document.documentElement.style.fontSize = width + 'px';
}

resize();
window.onresize = () => {
  resize();
}

Vue.prototype.$message = message;
Vue.prototype.$message.error = function (str) {
  message({
    type: 'error',
    msg: str
  })
}

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
