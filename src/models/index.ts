export interface Courier {
	id: string
	phone: string
	login: string
	fullname: string
	status: CourierStatus
	password: string
	orders: Order[]
	createdAt: Date
}

export interface Order {
	id: string
	price: string
	deliveryFee: string
	items: object[]
	location: string
	lat: string
	lng: string
	distance: string // in km
	status: string | undefined
	client: Client | undefined
	courier: Courier | undefined
	createdAt: Date
	clientId: string | undefined
	courierId: string | undefined
}

export interface Client {
	id: string
	phone: string
	fullname: string
	status: ClientStatus
	confirmation?: object
	telegramId: string
	orders: Order[]
	createdAt?: Date
}

type ClientStatus = 'IDLE' | 'OFFLINE'

type CourierStatus = 'IDLE' | 'OFFLINE' | 'BUSY'
