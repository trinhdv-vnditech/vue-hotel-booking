<template>
  <div class="container">
    <div class="login-card">
      <h2>Welcome to Hotel Booking</h2>
      <form @submit.prevent="handleLogin">
        <label for="username" style="text-align: left;">Username*</label>
        <input id="username" type="text" v-model="username" required />

        <label for="password" style="text-align: left;">Password*</label>
        <input id="password" type="password" v-model="password" required />

        <button type="submit">LOGIN</button>

        <p class="register-text">
          No account? <router-link to="/auth/register">Register here.</router-link>
        </p>
      </form>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useAuthStore } from '@/stores/auth'
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useToast } from 'vue-toastification'

const router = useRouter()
const auth = useAuthStore()
const toast = useToast()

const username = ref('')
const password = ref('')

const handleLogin = async () => {
  try {
    await auth.login(username.value, password.value)
    router.push('/home/dashboard')
  } catch (error: any) {
    toast.error(error.message);
  }
}
</script>

<style scoped>
.container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
}

.login-card {
  width: 300px;
  text-align: center;
}

h2 {
  font-weight: bold;
  margin-bottom: 1.5rem;
}

form {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

input[type="text"],
input[type="password"] {
  padding: 0.5rem;
  font-size: 1rem;
  border: 1px solid #ccc;
  border-radius: 3px;
}

button {
  background-color: #019267;
  color: white;
  padding: 0.5rem;
  font-weight: bold;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

button:hover {
  background-color: #017856;
}

.register-text {
  font-size: 0.9rem;
  margin-top: 0.5rem;
}
</style>