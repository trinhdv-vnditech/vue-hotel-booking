<template>
    <div class="confirmation-container">
        <h2 class="title">YOUR BOOKING HAS BEEN CONFIRMED</h2>
        <p class="subtitle">
            We have sent your booking confirmation to the email address that you have provided.
        </p>

        <div class="booking-details">
            <p>
                Check-in/Check-out: <span class="bold">{{ displayDate }}</span><br />
                Booking Confirmation Number: <span class="bold">{{ bookingInfo?.bookingNumber }}</span><br />
                Total Price for 1 Night: <span class="bold">${{ totalPrice }}</span>
            </p>
        </div>

        <div class="card">
            <div class="room-section">
                <div class="room-header">
                    <img src="https://partnerhub.agoda.com/wp-content/uploads/2021/07/which_photos_22.png"
                        alt="room image" />
                    <div>
                        <span class="bold">ROOM: {{ bookingInfo?.room.name }}</span>
                        <div class="bold">1 Guest</div>
                    </div>
                </div>

                <div class="package">
                    <h4 class="bold">PACKAGE:</h4>
                    <div class="row">
                        <span>Room</span>
                        <span>${{ bookingInfo?.room.price }}</span>
                    </div>
                    <div class="row">
                        <span>Tax & Service Charges (10%)</span>
                        <span>${{ taxPrice }}</span>
                    </div>
                    <div class="row total">
                        <span>Total Price</span>
                        <span>${{ totalPrice }}</span>
                    </div>
                </div>
            </div>

            <div class="guest-section">
                <h4 class="bold">GUEST DETAILS</h4>
                <br>
                <p>Name: {{ bookingInfo?.contact.title }} {{ bookingInfo?.contact.name }}</p>
                <p>Email Address: {{ bookingInfo?.contact.email }}</p>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { getBookingDetail } from '@/api/booking';
import { useBookingStore } from '@/stores/booking';
import type { Booking } from '@/types/booking';
import { DateUtils } from '@/utils/DateUtils';
import { computed, onMounted, ref } from 'vue';
import { useToast } from 'vue-toastification';

const booking = useBookingStore()
const toast = useToast()

const bookingInfo = ref<Booking>()

const displayDate = computed(() => DateUtils.displayDate(booking.bookingDate ?? ''))
const taxPrice = computed(() => bookingInfo.value?.room.price ? bookingInfo.value?.room.price * 0.1 : 0)
const totalPrice = computed(() => bookingInfo.value?.room.price ? bookingInfo.value?.room.price + taxPrice.value : 0)

onMounted(() => {
    const bookingId = booking.bookingId
    getBookingDetail(bookingId)
        .then(
            data => {
                bookingInfo.value = data
            }
        )
        .catch(error => {
            toast.error(error.message);
        })
})
</script>

<style scoped>
.confirmation-container {
    padding: 2rem;
    background-color: #fff;
}

.title {
    text-align: center;
    font-size: 1.5rem;
    margin-bottom: 0.5rem;
}

.subtitle {
    text-align: center;
    font-size: 0.9rem;
    margin-bottom: 1.5rem;
}

.booking-details {
    text-align: center;
    margin-bottom: 2rem;
    font-size: 0.9rem;
    color: #444;
}

.card {
    display: flex;
    justify-content: space-between;
    gap: 1.5rem;
    background-color: #f2f2ec;
    padding: 1.5rem;
    border-radius: 4px;
    font-size: 0.9rem;
}

.room-section {
    flex: 2;
}

.room-header {
    display: flex;
    gap: 1rem;
    margin-bottom: 1rem;
}

.package h4 {
    margin-bottom: 0.5rem;
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

.guest-section {
    flex: 1;
    background-color: #e9e9db;
    padding: 1rem;
}

.bold {
    font-weight: 600;
}
</style>