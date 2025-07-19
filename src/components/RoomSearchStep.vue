<template>
    <div class="search-container">
        <img src="https://www.ktc.co.th/pub/media/ktcworld/Travel/Online-Travel-Agency/agoda-e-coupon/agoda-e-coupon-may-promo-en.jpg"
            alt="Banner" class="banner" />

        <h2 class="title">BOOK A ROOM</h2>

        <div class="search-row">
            <div class="select-box">
                <span class="icon">👤</span>
                <select v-model="guests">
                    <option v-for="n in 6" :key="n" :value="n">{{ n }}</option>
                </select>
            </div>

            <div class="select-box">
                <input type="date" v-model="selectedDate" />
            </div>
        </div>

        <button class="search-button" @click="searchRooms">
            SEARCH FOR ROOMS
        </button>
    </div>
</template>

<script setup lang="ts">
import { useBookingStore } from '@/stores/booking'
import { ref } from 'vue'

const emit = defineEmits(['submit'])

const booking = useBookingStore()

const guests = ref(1)
const selectedDate = ref(new Date().toISOString().substr(0, 10))

const searchRooms = () => {
    booking.saveBookingDate(selectedDate.value)
    emit('submit')
}
</script>

<style scoped>
.search-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 2rem;
}

.banner {
    width: 100%;
    max-width: 1000px;
    height: auto;
    margin-bottom: 2rem;
}

.title {
    font-weight: bold;
    letter-spacing: 1px;
    margin-bottom: 2rem;
}

.search-row {
    display: flex;
    gap: 1rem;
    margin-bottom: 1.5rem;
}

.select-box {
    display: flex;
    align-items: center;
    background-color: #f0f1e8;
    padding: 0.5rem 1rem;
    border-radius: 4px;
}

.select-box select,
.select-box input {
    border: none;
    background: transparent;
    font-size: 1rem;
    padding-left: 0.5rem;
    outline: none;
}

.icon {
    font-size: 1.2rem;
}

.search-button {
    background-color: #019267;
    color: white;
    padding: 0.75rem 2rem;
    font-weight: bold;
    letter-spacing: 1px;
    border: none;
    cursor: pointer;
}

.search-button:hover {
    background-color: #8cd1b1;
}
</style>