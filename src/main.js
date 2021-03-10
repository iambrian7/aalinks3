import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store/store'

Vue.config.productionTip = false

import gmapsInit from './utils/gmaps';
gmapsInit();

new Vue({
  router,
  store,
  render: function (h) { return h(App) }
}).$mount('#app')
