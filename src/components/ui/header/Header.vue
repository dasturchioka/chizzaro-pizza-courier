<script lang="ts" setup>
import { cn } from '@/lib/utils'
const props = defineProps<{ class: string; [key: string]: any }>()
</script>

<template>
	<h1 :class="cn('font-bold text-2xl my-2 text-primary', props.class)">
		<slot></slot>
	</h1>
</template>
