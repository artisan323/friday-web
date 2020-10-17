import Vue from 'vue'
import App from './App.vue'
import router from './router'
import './plugins/element.js'
import './assets/css/global.css'
import axios from "axios";

Vue.prototype.$http = axios
axios.defaults.baseURL = 'http://localhost:8081'
Vue.config.productionTip = false

axios.interceptors.request.use(config => {
  console.log(config)
  config.headers.authorization = window.sessionStorage.getItem('token')
  return config
})

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
