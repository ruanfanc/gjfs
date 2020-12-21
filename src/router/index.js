/* eslint-disable */
import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '../components/Login.vue'
import Home from '../components/Home.vue'
import Welcome from '../components/Welcom.vue'
import Work from '../components/Work.vue'

Vue.use(VueRouter)

const routes = [
  { 
	  path:'/', 
	  redirect: '/home'
	  },
  { 
	  path: '/login', 
	  component: Login
	  },
  {
	  path: '/home',
	  component: Home, 
	  redirect: '/welcome',
	  children: [{
		  path:'/welcome', component: Welcome
	  },
	  {
		  path:'/work', component: Work
	  }]
	  }
]

const router = new VueRouter({
  routes
})

//登录权限管理
/* router.beforeEach((to, from, next) => {
	if(to.path === '/login') return next();
	
	const tokenStr = window.sessionStorage.getItem('token')
	if (!tokenStr) return next('/login')
	next()
}) */
export default router
