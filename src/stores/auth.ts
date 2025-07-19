import { defineStore } from 'pinia'
import type { User } from '@/types/auth'
import { loginUser } from '@/api/auth'

export const useAuthStore = defineStore('auth', {
  state: () => ({
    user: null as User | null,
    token: localStorage.getItem('token') || '',
  }),
  getters: {
    isAuthenticated: (state) => !!state.token,
  },
  actions: {
    async login(username: string, password: string) {
      const data = await loginUser(username, password)
      this.token = data.token
      this.user = data.user
      localStorage.setItem('token', data.token)
    },
    logout() {
      this.token = ''
      this.user = null
      localStorage.removeItem('token')
    }
  }
})