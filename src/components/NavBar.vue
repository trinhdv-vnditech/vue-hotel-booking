<template>
  <header class="nav-header">
    <div class="nav-container">
      <div class="logo">
        Hotel Booking
      </div>
      <nav class="nav-links">
        <router-link to="/home/dashboard">Home</router-link>
        <router-link to="/home/booking">Book a Room</router-link>
      </nav>
      <div class="btn-container">
        <a v-if="auth.isAuthenticated" class="logout-btn" @click="logout">Log out</a>
      </div>
    </div>
  </header>
</template>

<script setup lang="ts">
import { useAuthStore } from '@/stores/auth';
import { useRouter } from 'vue-router';

const auth = useAuthStore()
const router = useRouter()

function logout() {
  auth.logout()
  router.push('/auth/login')
}
</script>

<style scoped>
.nav-header {
  background-color: #fff;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.nav-container {
  display: flex;
  align-items: center;
  padding: 1rem 2rem;
}

.logo {
  font-size: 1.5rem;
  font-weight: bold;
  color: #019267;
  text-decoration: none;
}

.nav-links a {
  margin-left: 1.5rem;
  color: #444;
  text-decoration: none;
  transition: color 0.3s;
}

.nav-links a:hover {
  color: #000;
  background-color: #fff;
}

.btn-container {
  margin-left: auto;
}

.router-link-exact-active {
  color: #2563eb;
  font-weight: bold;
  border-bottom: 2px solid #019267;
}

.logout-btn {
  cursor: pointer;
  font-weight: 600;
  color: #019267;
}

.logout-btn:hover {
  background-color: #fff;
  color: #8cd1b1;
}
</style>