import { createRouter, createWebHistory } from 'vue-router'
import { useAuthStore } from '@/stores/auth'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    { path: '/', redirect: '/dashboard' },
    {
      path: '/auth',
      children: [
        { path: 'login', component: () => import('../views/LoginView.vue') },
        { path: 'register', component: () => import('../views/RegisterView.vue') }
      ]
    },
    {
      path: '/home',
      component: () => import('../views/HomeView.vue'),
      meta: { requiresAuth: true },
      children: [
        { path: 'dashboard', component: () => import('../views/DashboardView.vue') },
        { path: 'booking', component: () => import('../views/BookARoomView.vue') }
      ]
    }
  ],
})

router.beforeEach((to, _, next) => {
  const auth = useAuthStore()
  if (to.meta.requiresAuth && !auth.isAuthenticated) {
    next('/auth/login')
  } else {
    next()
  }
})

export default router
