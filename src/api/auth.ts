import type { AuthResponse } from '@/types/auth'
import api from './axios'

export async function loginUser(username: string, password: string): Promise<AuthResponse> {
  try {
    const res = await api.post<AuthResponse>('/auth/login', {
      username,
      password,
    })
    return res.data
  } catch (error) {
    throw new Error('Login failed. Please check your credentials.')
  }
}

export async function registerUser(username: string, password: string, email: string): Promise<string> {
  try {
    const res = await api.post<string>('/auth/register', {
      username,
      password,
      email
    })
    return res.data
  } catch (error) {
    throw new Error('Register failed. Please check your information.')
  }
}