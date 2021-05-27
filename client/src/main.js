import Vue from 'vue'
import App from './App.vue'
import store from './store'
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap"
import VueToast from 'vue-toast-notification';
import 'vue-toast-notification/dist/theme-sugar.css';
import router from './router'

Vue.use(VueToast);

Vue.config.productionTip = false


import VueSocketIO from 'vue-socket.io'
 
Vue.use(new VueSocketIO({
  debug: true,
  connection: 'http://localhost:3000',
  vuex: {
      store,
      actionPrefix: 'SOCKET_',
      mutationPrefix: 'SOCKET_'
  },
  options: { path: "/my-app/" } //Optional options
}))

new Vue({

  store,
  router,
    render: h => h(App)
}).$mount('#app')
