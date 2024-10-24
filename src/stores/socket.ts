import { defineStore, storeToRefs } from 'pinia'
import { computed, ref } from 'vue'
import { io, Socket } from 'socket.io-client'
import { config } from '@/config'
import { useProfile } from './profile'
import { toast } from 'vue-sonner'

export const useSocket = defineStore('socket-store', () => {
	const profileStore = useProfile()

	const { profile } = storeToRefs(profileStore)

	const socket = ref<Socket | null>(null)
	const connectionError = ref<string | null>(null)

	const isConnected = computed(() => {
		return socket.value?.connected
	})

	async function connect() {
		try {
			if (!profile.value) {
				await profileStore.getProfile()
			}
			socket.value = io(config.SERVER_BASE, { reconnectionAttempts: Infinity })
			socket.value.on('connect', async () => {
				const socketId = socket.value?.id
				socket.value?.emit('connection:init', {
					user: {
						type: 'courier',
						login: profile.value?.login,
						socketId: socket.value.id,
						id: profile.value?.id,
						details: {
							fullname: profile.value?.fullname,
							phone: profile.value?.phone,
						},
					},
				})
			})

			socket.value.on('message:connection-confirmed', async data => {
				toast(data.msg)
				return
			})
		} catch (error) {
			console.error('Error connecting to the socket server:', error)
			connectionError.value = 'Failed to connect to the socket server'
		}
	}

	async function attachSocketEvents() {
		if (!socket.value) return

		socket.value.on('disconnect', () => {
			console.log('Disconnected from the socket server')
		})
	}

	async function detachSocketEvents() {
		if (!socket.value) return
		socket.value.off('disconnect')
	}

	return { socket, connect, connectionError, isConnected, attachSocketEvents, detachSocketEvents }
})
