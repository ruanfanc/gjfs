import Vue from 'vue'
import App from './App.vue'
import router from './router'
import './plugins/element.js'
import './assets/css/global.css'

import axios from 'axios'



/* axios.interceptors.request.use(config => {
	config.headers.Authorization = wsindow.sessionStorage.getItem('token')
	return config
}) */
Vue.config.productionTip = false
Vue.prototype.$http = axios

//请求根路径
/* axios.defaults.baseURL = '/api3' */

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
