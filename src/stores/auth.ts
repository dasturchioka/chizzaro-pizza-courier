import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useAuth = defineStore('auth-store', () => {
	const courierDetails = ref<{ login: string; password: string }>({ login: '', password: '' })

	async function login(payload: typeof courierDetails.value) {
		try {
		} catch (error) {}
	}

	return { login, courierDetails }
})