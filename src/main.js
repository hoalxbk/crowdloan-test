import Vue from 'vue/dist/vue.js'
import App from './App.vue'
import Notifications from 'vue-notification'

Vue.use(Notifications)
Vue.config.productionTip = false

new Vue({
  render: h => h(App),
  components: { App }
}).$mount('#app')
