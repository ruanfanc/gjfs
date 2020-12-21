import Vue from 'vue'
import App from './App.vue'
import router from './router'
import './plugins/element.js'
import './assets/css/global.css'

import axios from 'axios'
//请求根路径
axios.default.baseURL = ''
axios.interceptors.request.use(config => {
	config.headers.Authorization = window.sessionStorage.getItem('token')
	return config
})
Vue.config.productionTip = false
Vue.prototype.$http = axios

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
