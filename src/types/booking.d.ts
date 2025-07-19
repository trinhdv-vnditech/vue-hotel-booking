import type { User } from "./auth"

export interface Booking {
    id: number
    bookingNumber: number
    bookingDate: string
    user: User
    room: Room
    contact: Contact
    taxPercent: number
    totalPrice: number
}

export interface Room {
    id: number
    name: string
    description: string
    address: string
    price: number
    image: string
}

export interface Contact {
    title: string
    name: string
    email: string
}

export interface RoomResponse {
    content: Room[]
}