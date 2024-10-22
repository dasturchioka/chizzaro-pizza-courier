<script lang="ts" setup>
import OrderBlock from '@/components/orders/order-block.vue'
import { Header } from '@/components/ui/header'
</script>

<template>
	<div class="px-2 min-h-screen">
		<Header>Buyurtmalar</Header>
		<div class="orders">
			<OrderBlock />
		</div>
	</div>
</template>
