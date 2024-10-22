<script lang="ts" setup>
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import AuthLayout from '@/layouts/auth-layout.vue'
import { computed, onMounted, ref, watch } from 'vue'
import { useAuth } from '@/stores/auth'
import { Eye, EyeClosed } from 'lucide-vue-next'
import { Preferences } from '@capacitor/preferences'

const authStore = useAuth()

const courierDetails = ref({ login: '', password: '' })

const login = async () => {
	if (buttonDisabled.value) return
	await authStore.login(courierDetails.value)
}

const buttonDisabled = computed(() => {
	return (
		courierDetails.value.login.length < 5 ||
		courierDetails.value.password.length < 8 ||
		!/^[a-zA-Z0-9]+$/.test(courierDetails.value.login)
	)
})

const showPassword = ref(false)

const togglePassword = () => {
	showPassword.value = !showPassword.value
}

watch(
	() => courierDetails.value,
	val => {
		if (val.login.includes(' ')) {
			val.login = val.login.replace(/\s/g, '')
		}
		if (val.password.includes(' ')) {
			val.password = val.password.replace(/\s/g, '')
		}
	},
	{ deep: true }
)
</script>

<template>
	<AuthLayout>
		<div
			class="form h-screen container mx-auto px-2 flex flex-col items-center justify-center space-y-4"
		>
			<h1 class="text-xl font-bold text-primary">Kirish</h1>
			<form @submit.prevent="login" class="form-wrapper w-full px-2 space-y-4">
				<div class="form-group space-y-1">
					<Input v-model:model-value.trim="courierDetails.login" id="login" placeholder="Login" />
				</div>
				<div class="form-group space-y-1 relative">
					<Input
						v-model:model-value.trim="courierDetails.password"
						id="password"
						:type="[showPassword ? 'text' : 'password']"
						placeholder="Parol"
					/>
					<button type="button" class="absolute right-2 top-0.5 p-1" @click="togglePassword">
						<EyeClosed v-if="showPassword" class="size-4" />
						<Eye v-else class="size-4" />
					</button>
				</div>
				<Button :disabled="buttonDisabled" type="submit" class="w-full">Kirish</Button>
			</form>
		</div>
	</AuthLayout>
</template>
