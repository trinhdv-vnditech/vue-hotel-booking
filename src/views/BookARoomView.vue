<template>
    <div class="booking-container">
        <div class="step-tabs">
            <div v-for="(step, index) in steps" :key="index"
                :class="['step', { active: currentStep === index, done: index < currentStep }]">
                <div class="circle">{{ index + 1 }}</div>
                <span class="step-title">{{ step }}</span>
            </div>
        </div>

        <div class="step-content">
            <component :is="currentComponent" @submit="nextStep" />
        </div>

        <div class="nav-buttons">
            <button v-if="currentStep > 0 && currentStep < steps.length - 1" @click="prevStep">Back</button>
            <button v-if="currentStep === steps.length - 1" class="done-btn" @click="finishBooking">Done</button>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'

import RoomSearchStep from '@/components/RoomSearchStep.vue'
import SelectRoomStep from '@/components/SelectRoomStep.vue'
import ContactInformationStep from '@/components/ContactInformationStep.vue'
import ConfirmationStep from '@/components/ConfirmationStep.vue'
import { useRouter } from 'vue-router'

const router = useRouter()

const steps = ['Search', 'Select Room', 'Contact Information', 'Confirmation']
const currentStep = ref(0)

const stepComponents = [RoomSearchStep, SelectRoomStep, ContactInformationStep, ConfirmationStep]
const currentComponent = computed(() => stepComponents[currentStep.value])

const nextStep = () => {
    if (currentStep.value < steps.length - 1) currentStep.value++
}
const prevStep = () => {
    if (currentStep.value > 0) currentStep.value--
}

function finishBooking() {
    router.push('/home/dashboard')
}
</script>

<style scoped>
.booking-container {
    background-color: #f3f4ef;
    padding: 2rem;
    border-radius: 8px;
    margin: 8px;
}

.step-tabs {
    display: flex;
    gap: 2rem;
    margin-bottom: 2rem;
    align-items: center;
}

.step {
    display: flex;
    align-items: center;
    color: #bbb;
    font-weight: bold;
    text-transform: uppercase;
    font-size: 0.8rem;
}

.step .circle {
    width: 24px;
    height: 24px;
    border-radius: 50%;
    background-color: #ccc;
    color: #fff;
    text-align: center;
    line-height: 24px;
    margin-right: 8px;
    font-size: 0.75rem;
}

.step.active .circle,
.step.done .circle {
    background-color: #000;
}

.step.active,
.step.done {
    color: #000;
}

.step-content {
    background: white;
    padding: 1rem;
    border-radius: 6px;
    min-height: 200px;
    border: 1px solid #ddd;
}

.nav-buttons {
    margin-top: 1rem;
    display: flex;
    justify-content: space-between;
}

button {
    padding: 0.5rem 1.5rem;
    background-color: #019267;
    color: white;
    border: none;
    cursor: pointer;
}

button:hover {
    background-color: #8cd1b1;
}

.step-title {
    font-weight: 500;
}

.done-btn {
    margin-left: auto;
}
</style>