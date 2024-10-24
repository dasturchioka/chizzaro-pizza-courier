import axios, { AxiosInstance } from 'axios'
import { useLoading } from '@/stores/loading'
import { config } from '@/config'
import { Preferences } from '@capacitor/preferences'

// Function to set interceptors
const setInterceptors = (instance: AxiosInstance) => {
	instance.interceptors.request.use(
		async config => {
			const loadingStore = useLoading()
			await loadingStore.setLoading(true)
			return config
		},
		async error => {
			const loadingStore = useLoading()
			await loadingStore.setLoading(false)
			return Promise.reject(error)
		}
	)

	instance.interceptors.response.use(
		async response => {
			const loadingStore = useLoading()
			await loadingStore.setLoading(false)
			return response
		},
		async error => {
			const loadingStore = useLoading()
			await loadingStore.setLoading(false)
			return Promise.reject(error)
		}
	)
}

// Example of usage:
export const authInstance = axios.create({
	baseURL: config.SERVER_API + '/auth',
})

export const profileInstance = axios.create({
	baseURL: config.SERVER_API + '/profile',
})

// Function to set token to profileInstance headers
const setProfileInstanceToken = async () => {
	const { value: token } = await Preferences.get({ key: 'token' })
	profileInstance.defaults.headers.common['Authorization'] = `Bearer ${token}`
}

// Apply interceptors to all instances
setInterceptors(authInstance)
setInterceptors(profileInstance)

// Set token to profileInstance headers
setProfileInstanceToken()
