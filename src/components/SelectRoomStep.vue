<template>
    <div class="select-room-container">
        <div class="info-bar">
            <div>
                <strong class="title">{{ displayDate }}</strong>
                <div class="title">1 NIGHT | 1 GUEST</div>
            </div>
            <div class="title">SORT BY:
                <select v-model="sortBy">
                    <option value="price-low">Lowest price</option>
                    <option value="price-high">Highest price</option>
                </select>
            </div>
        </div>

        <div class="room-list">
            <div v-for="room in sortedRooms" :key="room.id">
                <RoomCard :room="room" @select="handleSelectRoom" />
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import RoomCard from './RoomCard.vue'
import type { Room } from '@/types/booking'
import { useBookingStore } from '@/stores/booking'
import { getRooms } from '@/api/booking'
import { DateUtils } from '@/utils/DateUtils'
import { useToast } from 'vue-toastification'

const emit = defineEmits(['submit'])

const booking = useBookingStore()
const toast = useToast()

const sortBy = ref('price-low')
const rooms = ref<Room[]>([])
const bookingDate = ref<string>(booking.bookingDate)

const sortedRooms = computed(() => {
    return [...rooms.value].sort((a, b) =>
        sortBy.value === 'price-low' ? a.price - b.price : b.price - a.price
    )
})

const displayDate = computed(() => DateUtils.displayDate(bookingDate.value))

onMounted(() => {
    getRooms(bookingDate.value)
        .then(
            data => {
                if (data) {
                    rooms.value = data.content
                }
            }
        )
        .catch(error => {
            toast.error(error.message);
        })
})

function handleSelectRoom() {
    emit('submit')
}
</script>

<style scoped>
.select-room-container {
    padding: 2rem;
    background-color: #fff;
}

.info-bar {
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-size: 0.9rem;
    margin-bottom: 1.5rem;
}

.room-list {
    display: flex;
    flex-direction: column;
    gap: 1.5rem;
}

.title {
    font-weight: 600;
}
</style>