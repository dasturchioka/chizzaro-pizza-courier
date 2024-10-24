<script lang="ts" setup>
import Button from '@/components/ui/button/Button.vue';
import { Header } from '@/components/ui/header'
import router from '@/router';
import { Preferences } from '@capacitor/preferences';
const logout = async () => {
	await Preferences.clear()
	await router.push("/login")
}
</script>

<template>
	<div class="profile-page px-2">
		<Header>Profil</Header>
		<Button @click="logout">Logout</Button>
	</div>
</template>
