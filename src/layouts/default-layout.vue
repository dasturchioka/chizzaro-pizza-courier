<script lang="ts" setup>
import { ref, computed, watchEffect } from 'vue'
import { useRoute } from 'vue-router'
import { HomeIcon, ListIcon, UserIcon } from 'lucide-vue-next'

const route = useRoute()

const tabs = ref([
	{ name: 'Uy', route: '/', icon: HomeIcon },
	{ name: 'Buyurtmalar', route: '/orders', icon: ListIcon },
	{ name: 'Profil', route: '/profile', icon: UserIcon },
])

const isActive = computed(() => (path: string) => route.path === path)

const activeTab = ref<null | any>(null)

watchEffect(() => {
	activeTab.value = tabs.value.find(tab => isActive.value(tab.route))
})


</script>

<template>
	<div class="layout-default flex flex-col">
		<RouterView v-slot="{ Component }">
			<transition name="page" mode="out-in">
				<component :is="Component" />
			</transition>
		</RouterView>
		<nav class="fixed bottom-0 left-0 right-0 bg-white shadow-lg rounded-t-xl border-t">
			<ul class="flex justify-around px-2 py-1">
				<li v-for="tab in tabs" :key="tab.name" class="relative">
					<router-link
						:to="tab.route"
						class="flex flex-col items-center p-2 rounded-lg transition-all duration-300 ease-in-out"
						:class="{ 'text-primary': isActive(tab.route) }"
					>
						<component :is="tab.icon" class="size-5 mb-1" />
						<span class="text-xs font-medium">{{ tab.name }}</span>
					</router-link>
					<span
						class="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-1 h-1 bg-primary rounded-full transition-all duration-300 ease-in-out"
						:class="isActive(tab.route) ? 'opacity-100 scale-100' : 'opacity-0 scale-0'"
					></span>
				</li>
			</ul>
		</nav>
	</div>
</template>

<style>
.router-link-exact-active {
	@apply animate-bounce
}
@keyframes bounce {
  0%, 100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-5px);
  }
}

.animate-bounce {
  animation: bounce 0.5s;
}

.page-enter-active,
.page-leave-active {
  transition: opacity 0.5s ease, transform 0.5s ease;
}

.page-enter-from,
.page-leave-to {
  opacity: 0;
  transform: translateY(20px);
}
</style>
