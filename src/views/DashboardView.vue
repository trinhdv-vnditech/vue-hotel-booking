<template>
  <div class="container">
    <p class="title">Your imcoming bookings</p>
    <div class="content">
      <p class="not-found-label" v-if="incomingBookings.length === 0">No booking found.</p>
      <div v-for="booking in incomingBookings" :key="booking.id" class="card-container">
        <RoomCard :room="booking.room" :isView="true" />
      </div>
    </div>
    <p class="title">Your past bookings</p>
    <div class="content">
      <p class="not-found-label" v-if="pastBookings.length === 0">No booking found.</p>
      <div v-for="booking in pastBookings" :key="booking.id" class="card-container">
        <RoomCard :room="booking.room" :isView="true" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import RoomCard from '@/components/RoomCard.vue';
import type { Booking } from '@/types/booking';
import { computed, onMounted, ref } from 'vue';
import { getMyBookings } from '@/api/booking'
import { useToast } from 'vue-toastification';

const toast = useToast()

const bookings = ref<Booking[]>([])

const incomingBookings = computed(() => bookings ? bookings.value.filter(item => new Date(item.bookingDate) > new Date()) : [])

const pastBookings = computed(() => bookings ? bookings.value.filter(item => new Date(item.bookingDate) < new Date()) : [])

onMounted(() => {
  getBookings()
})

function getBookings() {
  getMyBookings()
    .then(
      data => {
        if (data) {
          bookings.value = data
        }
      }
    )
    .catch(error => {
      toast.error(error.message);
    })
}
</script>

<style scope>
.container {
  padding: 1rem 12rem;
}

.card-container {
  padding: 8px;
}

.title {
  padding: 8px;
  font-weight: 500;
}

.content {
  padding-bottom: 32px;
}

.not-found-label {
  padding: 8px;
  font-size: 14px;
}
</style>