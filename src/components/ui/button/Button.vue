<script setup lang="ts">
import type { HTMLAttributes } from 'vue'
import { cn } from '@/lib/utils'
import { Primitive, type PrimitiveProps } from 'radix-vue'
import { type ButtonVariants, buttonVariants } from '.'
import { useLoading } from '@/stores/loading'
import { storeToRefs } from 'pinia'

interface Props extends PrimitiveProps {
	variant?: ButtonVariants['variant']
	size?: ButtonVariants['size']
	class?: HTMLAttributes['class']
}

const props = withDefaults(defineProps<Props>(), {
	as: 'button',
})

const loadingStore = useLoading()
const { loading } = storeToRefs(loadingStore)
</script>

<template>
	<Primitive
		:as="as"
		:as-child="asChild"
		:disabled="loading"
		:class="cn(buttonVariants({ variant, size }), props.class)"
	>
		<slot />
	</Primitive>
</template>
