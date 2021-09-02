import Vue from 'vue/dist/vue.js'
import App from './App.vue'
import Notifications from 'vue-notification'
import VueRouter from 'vue-router'
import Home from "@/pages/Home";
import Events from "@/pages/Events";
import EventDetail from "@/pages/EventDetail";

Vue.use(VueRouter)
Vue.use(Notifications)
Vue.config.productionTip = false

const routes = [
  { path: '/', component: Home },
  { path: '/events', component: Events },
  { path: '/event/:id', component: EventDetail }
]
const router = new VueRouter({
  routes // short for `routes: routes`
})
new Vue({
  router,
  render: h => h(App),
  components: { App }
}).$mount('#app')
