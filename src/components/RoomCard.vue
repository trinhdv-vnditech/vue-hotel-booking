<template>
    <div class="room-card">
        <!-- Room Image -->
        <div class="room-image">
            <img :src="room.image" alt="Room" />
        </div>

        <!-- Room Details -->
        <div class="room-details">
            <h3>{{ room?.name }}</h3>
            <p class="subtitle">{{ room.address }}</p>
            <p class="description">{{ room.description }}</p>
        </div>

        <!-- Pricing and Action -->
        <div v-if="!isView" class="room-price">
            <p class="price">${{ room.price }}<span class="unit">/night</span></p>
            <p class="note">Subject to GST and charges</p>
            <button class="book-btn" @click="onSelectRoom(room.id)">BOOK ROOM</button>
        </div>
    </div>
</template>

<script setup lang="ts">
import { useBookingStore } from '@/stores/booking';
import type { Room } from '@/types/booking'

const booking = useBookingStore()

const props = defineProps<{
    room: Room,
    isView?: boolean
}>()

const emit = defineEmits(['select'])

function onSelectRoom(roomId: number) {
    booking.saveRoomId(String(roomId))
    emit('select')
}
</script>

<style scoped>
.room-card {
    display: flex;
    border: 1px solid #e0e0e0;
    padding: 1rem;
    background-color: #f7f7f2;
    gap: 1rem;
    align-items: flex-start;
}

.room-image img {
    width: 340px;
    height: 210px;
    object-fit: cover;
    background-color: #ccc;
}

.room-details {
    flex: 1;
}

.room-details h3 {
    font-weight: bold;
    margin-bottom: 0.3rem;
    font-size: 1rem;
    letter-spacing: 0.5px;
}

.room-details .subtitle {
    text-transform: uppercase;
    font-size: 0.75rem;
    letter-spacing: 1px;
    color: #666;
    margin-bottom: 0.5rem;
}

.room-details .description {
    font-size: 0.9rem;
    color: #333;
    line-height: 1.4;
}

.room-price {
    text-align: left;
    min-width: 150px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
}

.price {
    font-size: 1.5rem;
    font-weight: bold;
    color: #111;
}

.unit {
    font-size: 0.9rem;
    color: #555;
}

.note {
    font-size: 0.75rem;
    color: #666;
    margin-top: 0.5rem;
}

.book-btn {
    margin-top: 1rem;
    background-color: #019267;
    color: white;
    padding: 0.5rem 1rem;
    border: none;
    font-size: 0.75rem;
    letter-spacing: 1px;
    cursor: pointer;
    align-self: start;
}

.book-btn:hover {
    background-color: #8cd1b1;
}
</style>