<template>
  <div class="container">
    <div class="register-card">
      <h2>Register</h2>
      <form @submit.prevent="handleRegister">
        <label for="firstName">User name*</label>
        <input id="firstName" type="text" v-model="form.username" required />

        <label for="email">Email*</label>
        <input id="email" type="email" v-model="form.email" required />

        <label for="password">Password*</label>
        <input id="password" type="password" v-model="form.password" required />

        <label for="confirmPassword">Confirm Password*</label>
        <input id="confirmPassword" type="password" v-model="form.confirmPassword" required />

        <button type="submit">SIGN UP</button>

        <p class="login-text">
          You have an account? <router-link to="/auth/login">Login here.</router-link>
        </p>
      </form>
    </div>
  </div>
</template>

<script setup lang="ts">
import { registerUser } from '@/api/auth'
import { reactive } from 'vue'
import { useRouter } from 'vue-router'
import { useToast } from 'vue-toastification'

const router = useRouter()
const toast = useToast()

const form = reactive({
  username: '',
  email: '',
  password: '',
  confirmPassword: '',
})

const handleRegister = () => {
  if (form.password !== form.confirmPassword) {
    toast.error('Passwords do not match!');
    return
  }

  registerUser(form.username, form.password, form.email)
    .then(
      () => {
        toast.success('Register successfully.');
        router.push('/auth/login')
      }
    )
    .catch(error => {
      toast.error(error.message);
    })
}
</script>

<style scoped>
.container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
}

.register-card {
  width: 350px;
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
  text-align: left;
}

label {
  font-weight: bold;
  font-size: 0.95rem;
}

input {
  padding: 0.5rem;
  font-size: 1rem;
  border: 1px solid #ccc;
  border-radius: 3px;
}

button {
  background-color: #019267;
  color: white;
  padding: 0.6rem;
  font-weight: bold;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  margin-top: 1rem;
}

button:hover {
  background-color: #017856;
}

.login-text {
  text-align: center;
  margin-top: 1rem;
  font-size: 0.9rem;
}
</style>