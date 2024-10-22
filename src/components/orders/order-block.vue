<script lang="ts" setup>
import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from '@/components/ui/card'
import { Badge } from '../ui/badge'
import { BanknoteIcon, PackageIcon } from 'lucide-vue-next'
import { Button } from '../ui/button'
</script>

<template>
	<div class="order-block">
		<Card class="p-4">
			<CardHeader class="p-0 flex flex-col items-start mb-2">
				<Badge class="mb-1">YARATILDI</Badge>
				<CardTitle class="-mb-1">Mustaqillik ko'chasi</CardTitle>
				<CardDescription>2km</CardDescription>
			</CardHeader>
			<CardContent class="p-0 font-semibold space-y-1">
				<div class="packages flex items-center space-x-2">
					<PackageIcon class="text-primary size-5" />
					<p>4 ta</p>
				</div>
				<div class="price flex items-center space-x-2">
					<BanknoteIcon class="text-primary size-5" />
					<p>110,000 so'm <span class="text-xs opacity-50">+ 12,000</span></p>
				</div>
			</CardContent>
			<CardFooter class="p-0 mt-6 w-full">
				<Button class="w-full font-bold">OLISH</Button>
			</CardFooter>
		</Card>
	</div>
</template>
