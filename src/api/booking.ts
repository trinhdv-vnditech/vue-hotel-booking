import type { Booking, Contact, Room, RoomResponse } from '@/types/booking'
import api from './axios'

export async function getMyBookings(): Promise<Booking[]> {
    try {
        const res = await api.get<Booking[]>('/bookings/myBookings')
        return res.data
    } catch (error) {
        throw new Error('Fetch data failed.')
    }
}

export async function getRooms(bookingDate: string): Promise<RoomResponse> {
    try {
        const res = await api.get<RoomResponse>(`/bookings/rooms?page=0&size=100&bookingDate=${bookingDate}`)
        return res.data
    } catch (error) {
        throw new Error('Fetch data failed.')
    }
}

export async function bookRoom(roomId: string, bookingDate: string, contact: Contact): Promise<Booking> {
    try {
        const res = await api.post<Booking>(`bookings/book/${roomId}`, {
            bookingDate,
            contact,
        })
        return res.data
    } catch (error) {
        throw new Error('Book room failed.')
    }
}

export async function getRoomDetail(roomId: string): Promise<Room> {
    try {
        const res = await api.get<Room>(`/room/${roomId}`)
        return res.data
    } catch (error) {
        throw new Error('Fetch data failed.')
    }
}

export async function getBookingDetail(bookingId: string): Promise<Booking> {
    try {
        const res = await api.get<Booking>(`/bookings/${bookingId}`)
        return res.data
    } catch (error) {
        throw new Error('Fetch data failed.')
    }
}