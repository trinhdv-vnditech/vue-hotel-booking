import { defineStore } from 'pinia'

export const useBookingStore = defineStore('booking', {
  state: () => ({
    bookingDate: localStorage.getItem('bookingDate') || '',
    roomId: localStorage.getItem('roomId') || '',
    bookingId: localStorage.getItem('bookingId') || '',
  }),
  actions: {
    saveBookingDate(bookingDate: string) {
      this.bookingDate = bookingDate
      localStorage.setItem('bookingDate', bookingDate)
    },
    saveRoomId(roomId: string) {
      this.roomId = roomId
      localStorage.setItem('roomId', roomId)
    },
    saveBookingId(bookingId: string) {
      this.bookingId = bookingId
      localStorage.setItem('bookingId', bookingId)
    }
  }
})