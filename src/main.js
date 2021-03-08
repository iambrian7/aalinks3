import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store/store'
import * as VueGoogleMaps from "vue2-google-maps";

Vue.use(VueGoogleMaps, {
  load: {
    key: process.env.VUE_APP_MAPS_KEY,
    libraries: "places" // necessary for places input
  }
});

Vue.config.productionTip = false
new Vue({
  router,
  store,
  render: function (h) { return h(App) }
}).$mount('#app')


// var vm = new Vue({
//   el: '#app',
//   router,
//   store,
//   template: '<App/>',
//   components: { App },
//   async created() {
//     console.log("Vue: created: **************")
//   //  await this.$store.dispatch("getStripeKey");
//   },
// })
