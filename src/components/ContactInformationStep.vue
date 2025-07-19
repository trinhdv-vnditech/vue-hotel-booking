<template>
    <div class="contact-step-container">
        <div class="content">
            <div class="form-section">
                <h2>CONTACT INFORMATION</h2>

                <div class="form-group">
                    <label for="title">Title</label>
                    <select v-model="form.title" id="title">
                        <option>Mr.</option>
                        <option>Ms.</option>
                        <option>Mrs.</option>
                        <option>Dr.</option>
                    </select>
                </div>

                <div class="form-group">
                    <label for="name">Name</label>
                    <input v-model="form.name" id="name" type="text" />
                </div>

                <div class="form-group">
                    <label for="email">Email Address</label>
                    <input v-model="form.email" id="email" type="email" />
                </div>

                <button class="proceed-button" @click="onProceed">PROCEED</button>
            </div>

            <div class="summary-section">
                <p><strong>{{ displayDate }}</strong></p>
                <p class="sub-label">1 NIGHT</p>
                <p class="sub-label">ROOM: 1 GUEST</p>
                <img :src="roomInfo?.image" alt="room preview" class="summary-img" />
                <h4 class="room-title">{{ roomInfo?.name }}</h4>

                <div class="price-breakdown">
                    <div class="row">
                        <span>Room</span>
                        <span>${{ roomInfo?.price }}</span>
                    </div>
                    <div class="row">
                        <span>Tax & Service Charges (10%)</span>
                        <span>${{ taxPrice }}</span>
                    </div>
                    <div class="row total">
                        <span>Total</span>
                        <span>${{ totalPrice }}</span>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { bookRoom, getRoomDetail } from '@/api/booking'
import { useBookingStore } from '@/stores/booking'
import { type Room, type Contact } from '@/types/booking'
import { DateUtils } from '@/utils/DateUtils'
import { computed, onMounted, ref } from 'vue'
import { useToast } from 'vue-toastification'

const booking = useBookingStore()
const toast = useToast()

const emit = defineEmits(['submit'])

const roomInfo = ref<Room>()

const displayDate = computed(() => DateUtils.displayDate(booking.bookingDate ?? ''))
const taxPrice = computed(() => roomInfo.value?.price ? roomInfo.value?.price * 0.1 : 0)
const totalPrice = computed(() => roomInfo.value?.price ? roomInfo.value?.price + taxPrice.value : 0)

const form = ref({
    title: 'Mr.',
    name: '',
    email: '',
})

onMounted(() => {
    const roomId = booking.roomId
    getRoomDetail(roomId)
        .then(
            data => {
                roomInfo.value = data
            }
        )
        .catch(error => {
            toast.error(error.message);
        })
})

function onProceed() {
    const bookingDate = booking.bookingDate
    const roomId = booking.roomId
    const contact: Contact = {
        title: form.value.title,
        name: form.value.name,
        email: form.value.email
    }

    bookRoom(roomId, bookingDate, contact)
        .then(
            data => {
                toast.success('Book room successfully.');
                booking.saveBookingId(String(data.id))
                emit('submit')
            }
        )
        .catch(error => {
            toast.error(error.message);
        })
}
</script>

<style scoped>
.contact-step-container {
    padding: 2rem;
    background-color: #fff;
}

.content {
    display: flex;
    justify-content: space-between;
    gap: 2rem;
}

.form-section {
    background-color: #f2f2ec;
    padding: 1.5rem;
    flex: 1;
}

.form-group {
    margin-bottom: 1rem;
    display: flex;
    flex-direction: column;
}

.form-group label {
    font-size: 0.85rem;
    margin-bottom: 0.3rem;
}

.form-group input,
.form-group select {
    padding: 0.6rem;
    border: 1px solid #ccc;
    font-size: 1rem;
}

.proceed-button {
    background-color: #019267;
    color: #fff;
    padding: 0.7rem 1.5rem;
    font-weight: bold;
    letter-spacing: 1px;
    border: none;
    margin-top: 1rem;
    cursor: pointer;
}

.proceed-button:hover {
    background-color: #8cd1b1;
}

.summary-section {
    background-color: #e9e9db;
    padding: 1.5rem;
    width: 400px;
}

.sub-label {
    font-size: 0.8rem;
    color: #555;
    margin-top: 0.3rem;
    font-weight: 500;
}

.summary-img {
    width: 100%;
    margin: 1rem 0;
}

.room-title {
    margin: 0.5rem 0;
    font-weight: bold;
}

.price-breakdown {
    margin-top: 1rem;
    font-size: 0.9rem;
}

.row {
    display: flex;
    justify-content: space-between;
    margin-bottom: 0.3rem;
}

.total {
    font-weight: bold;
    margin-top: 0.7rem;
}
</style>