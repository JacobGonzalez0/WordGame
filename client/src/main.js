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

new Vue({

  store,
  router,
    render: h => h(App)
}).$mount('#app')
