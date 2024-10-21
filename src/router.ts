import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import Cookies from 'js-cookie'

const routes: RouteRecordRaw[] = [
	{
		path: '/',
		name: 'default-blank-page',
		meta: { layout: 'default' },
		redirect: '/orders',
	},
	{
		path: '/orders',
		name: 'default-orders-page',
		meta: { layout: 'default' },
		component: () => import('@/pages/default/orders-page.vue'),
	},
	{
		path: '/login',
		name: 'auth-login-page',
		meta: { layout: 'auth' },
		component: () => import('@/pages/auth/login-page.vue'),
	},
]

const router = createRouter({
	history: createWebHistory(),
	routes,
})

router.beforeEach((to, from, next) => {
	if (to.meta.layout === 'default' && !Cookies.get('token')) {
		next('/login')
	} else {
		next()
	}
})

export default router
