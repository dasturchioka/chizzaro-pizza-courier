import { profileInstance } from '@/http'
import { Preferences } from '@capacitor/preferences'
import { defineStore } from 'pinia'
import { ref } from 'vue'
import { toast } from 'vue-sonner'
import { useRouter } from 'vue-router'
import { Courier } from '@/models'

export const useProfile = defineStore('profile-store', () => {
	const router = useRouter()

	const profile = ref<Courier>()

	async function getProfile() {
		try {
			const { value: login } = await Preferences.get({ key: 'login' })
			const response = await profileInstance.get(`/get-profile/${login}`)

			if (!response) {
				toast("Internet yoki server bilan aloqa mavjud emas, boshqatdan urinib ko'ring")
				return
			}

			const data = await response.data

			if (data.status === 'bad') {
				await Preferences.clear()
				toast(data.msg)
				await router.push('/login')
				return
			}

			await Preferences.set({ key: 'token', value: data.token })
			await Preferences.set({ key: 'login', value: data.login })
			profile.value = data.profile
			return
		} catch (error: any) {
			toast(
				error.message ||
					error.response.data.msg ||
					"Qandaydir xatolik yuzaga keldi, boshqatdan urinib ko'ring"
			)
		}
	}

	return { getProfile, profile }
})
