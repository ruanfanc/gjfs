/* eslint-disable */
import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '../components/Login.vue'
import Home from '../components/Home.vue'
import Welcome from '../components/welcom/Welcom.vue'
import Work from '../components/task/Work.vue'
import Reporter from '../components/search/Reporter.vue'
import People from '../components/search/People.vue'
import Captain from '../components/task/Captain.vue'
import BigCaptain from '../components/task/BigCaptain.vue'
import Leader from '../components/task/Leader.vue'
import Publicity from '../components/Publicity.vue'
import Checkout from '../components/Checkout.vue'
import Case from '../components/task/Case.vue'
import NoRight from '../components/noRight/noRight.vue'
import First from '../components/firstpage/firstpage.vue'

Vue.use(VueRouter)

const routes = [
	{
		path: '/',
		redirect: '/first'
	},
	{
		path: '/first',
			component: First
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
				path: '/welcome',
				component: Welcome
			},
			{
				path: '/work',
				component: Work
			},
			{
				path: '/reporter',
				component: Reporter
			},
			{
				path: '/people',
				component: People
			},
			{
				path: '/captain',
				component: Captain
			},
			{
				path: '/bigcaptain',
				component: BigCaptain
			},
			{
				path: '/leader',
				component: Leader
			},
			{
				path: '/publicity',
				component: Publicity
			},
			{
				path: '/checkout',
				component: Checkout
			},
			{
				path: '/case',
				component: Case
			},
			{
				path:'/noRight',
				component:NoRight
			}
		]
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
