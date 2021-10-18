import Vue from 'vue'
import App from './App.vue'
import router from './router'
import './plugins/element.js'
import './assets/css/global.css'

import axios from 'axios'
import store from './store'



/* axios.interceptors.request.use(config => {
	config.headers.Authorization = wsindow.sessionStorage.getItem('token')
	return config
}) */
Vue.config.productionTip = false
Vue.prototype.$http = axios
Vue.prototype.$eventBus = new Vue()

//请求根路径
//axios.defaults.baseURL = 'http://isihon.cn/sc'

new Vue({
    router,
    store,
    render: h => h(App)
}).$mount('#app')