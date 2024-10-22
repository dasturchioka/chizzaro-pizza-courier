import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import { Preferences } from '@capacitor/preferences'

const routes: RouteRecordRaw[] = [
	{
		path: '/',
		name: 'default-layout',
		meta: { layout: 'default' },
		component: () => import('@/layouts/default-layout.vue'),
		async beforeEnter(to, from, enter) {
			const { value: token } = await Preferences.get({ key: 'token' })

			if (token) {
				return enter()
			} else {
				return enter('/auth')
			}
		},
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
		async beforeEnter(to, from, enter) {
			const { value: token } = await Preferences.get({ key: 'token' })

			if (!token) {
				return enter()
			} else {
				return enter('/')
			}
		},
	},
]

const router = createRouter({
	history: createWebHistory(),
	routes,
})

export default router
