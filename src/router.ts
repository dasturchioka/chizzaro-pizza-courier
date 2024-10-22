import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import { Preferences } from '@capacitor/preferences'

const routes: RouteRecordRaw[] = [
	{
		path: '/',
		name: 'default-layout',
		meta: { layout: 'default' },
		component: () => import('@/layouts/default-layout.vue'),
		children: [
			{
				path: '',
				name: 'default-home-page',
				component: () => import('@/pages/default/home-page.vue'),
			},
			{
				path: 'orders',
				name: 'default-orders-page',
				meta: { layout: 'default' },
				component: () => import('@/pages/default/orders-page.vue'),
			},
			{
				path: 'profile',
				name: 'default-profile-page',
				meta: { layout: 'default' },
				component: () => import('@/pages/default/profile-page.vue'),
			},
		],
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

router.beforeEach(async (to, from, next) => {
	const { value: token } = await Preferences.get({ key: 'token' })

	if (to.meta.layout === 'default' && !token) {
		next('/login')
	} else {
		next()
	}
})

export default router
