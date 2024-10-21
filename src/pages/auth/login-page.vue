<script lang="ts" setup>
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import AuthLayout from '@/layouts/auth-layout.vue'
import { ref } from 'vue'

const courierDetails = ref({ login: '', password: '' })
</script>

<template>
	<AuthLayout>
		<div
			class="form h-screen container mx-auto px-2 flex flex-col items-center justify-center space-y-4"
		>
			<h1 class="text-xl font-bold text-primary">Kirish</h1>
			<form @submit.prevent class="form-wrapper w-full px-2 space-y-4">
				<div class="form-group space-y-1">
					<Input v-model:model-value.trim="courierDetails.login" id="login" placeholder="Login" />
				</div>
				<div class="form-group space-y-1">
					<Input
						v-model:model-value.trim="courierDetails.password"
						id="password"
						type="password"
						placeholder="Parol"
					/>
				</div>
				<Button type="submit" class="w-full">Kirish</Button>
			</form>
		</div>
	</AuthLayout>
</template>
