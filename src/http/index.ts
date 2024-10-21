import axios from 'axios'
import { useLoading } from '../stores/loading'

const baseURL = 'https://api.example.com'

const http = axios.create({
	baseURL,
	headers: {
		'Content-Type': 'application/json',
	},
})

http.interceptors.request.use(
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

http.interceptors.response.use(
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

export default http
