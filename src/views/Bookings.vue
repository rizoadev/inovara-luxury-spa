<script setup>
import { ref, computed } from 'vue'

const bookingHistory = ref([
  { id: 'BK-001', date: '2025-02-10', time: '14:00', service: 'Deep Tissue Massage', therapist: 'Sarah Mitchell', price: 140, status: 'completed', duration: 60 },
  { id: 'BK-002', date: '2025-01-25', time: '10:00', service: 'Swedish Massage', therapist: 'Emma Rodriguez', price: 100, status: 'completed', duration: 60 },
  { id: 'BK-003', date: '2025-01-28', time: '15:00', service: 'Hot Stone Therapy', therapist: 'James Chen', price: 150, status: 'completed', duration: 90 },
  { id: 'BK-004', date: '2025-02-15', time: '11:00', service: 'Reiki Healing', therapist: 'Lisa Thompson', price: 95, status: 'upcoming', duration: 60 },
  { id: 'BK-005', date: '2025-02-20', time: '16:00', service: 'Thai Massage', therapist: 'James Chen', price: 110, status: 'upcoming', duration: 90 }
])

const bookingTab = ref('upcoming')
const upcomingBookings = computed(() => bookingHistory.value.filter(b => b.status === 'upcoming'))
const completedBookings = computed(() => bookingHistory.value.filter(b => b.status === 'completed'))

const formatPrice = (price) => `$${price}`
const formatDate = (dateStr) => new Date(dateStr).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })

const getStatusColor = (status) => {
  if (status === 'completed') return 'text-green-400 bg-green-400/20'
  if (status === 'upcoming') return 'text-luxury-gold bg-luxury-gold/20'
  return 'text-gray-400 bg-gray-400/20'
}

const cancelBooking = (bookingId) => {
  const idx = bookingHistory.value.findIndex(b => b.id === bookingId)
  if (idx !== -1) bookingHistory.value.splice(idx, 1)
}
</script>

<template>
  <div class="px-4 py-6">
    <h2 class="text-xl font-bold mb-6">Your Bookings</h2>
    
    <div class="flex gap-2 mb-6">
      <button @click="bookingTab = 'upcoming'" class="flex-1 py-2 rounded-full text-sm font-medium" :class="bookingTab === 'upcoming' ? 'bg-luxury-gold text-luxury-dark' : 'bg-luxury-charcoal'">Upcoming ({{ upcomingBookings.length }})</button>
      <button @click="bookingTab = 'history'" class="flex-1 py-2 rounded-full text-sm font-medium" :class="bookingTab === 'history' ? 'bg-luxury-gold text-luxury-dark' : 'bg-luxury-charcoal'">History ({{ completedBookings.length }})</button>
    </div>
    
    <div v-if="bookingTab === 'upcoming'">
      <div v-if="upcomingBookings.length === 0" class="bg-luxury-charcoal rounded-2xl p-8 text-center">
        <p class="text-gray-400 mb-4">No upcoming appointments</p>
      </div>
      <div v-else class="space-y-4">
        <div v-for="booking in upcomingBookings" :key="booking.id" class="bg-luxury-charcoal rounded-2xl p-4">
          <div class="flex items-start justify-between mb-3">
            <span class="text-xs text-gray-400">#{{ booking.id }}</span>
            <span :class="getStatusColor(booking.status)" class="px-2 py-1 rounded-full text-xs capitalize">{{ booking.status }}</span>
          </div>
          <h3 class="font-bold mb-1">{{ booking.service }}</h3>
          <p class="text-gray-400 text-sm mb-2">{{ booking.therapist }}</p>
          <div class="flex items-center gap-4 text-sm text-gray-400 mb-3">
            <span>{{ formatDate(booking.date) }}</span>
            <span>{{ booking.time }}</span>
            <span>{{ booking.duration }} min</span>
          </div>
          <div class="flex items-center justify-between">
            <span class="text-luxury-gold font-bold">{{ formatPrice(booking.price) }}</span>
            <button @click="cancelBooking(booking.id)" class="px-4 py-1.5 bg-red-500/20 text-red-400 rounded-full text-sm">Cancel</button>
          </div>
        </div>
      </div>
    </div>

    <div v-if="bookingTab === 'history'" class="space-y-4">
      <div v-for="booking in completedBookings" :key="booking.id" class="bg-luxury-charcoal rounded-2xl p-4">
        <div class="flex items-start justify-between mb-3">
          <span class="text-xs text-gray-400">#{{ booking.id }}</span>
          <span :class="getStatusColor(booking.status)" class="px-2 py-1 rounded-full text-xs capitalize">{{ booking.status }}</span>
        </div>
        <h3 class="font-bold mb-1">{{ booking.service }}</h3>
        <p class="text-gray-400 text-sm mb-2">{{ booking.therapist }}</p>
        <div class="flex items-center gap-4 text-sm text-gray-400 mb-3">
          <span>{{ formatDate(booking.date) }}</span>
          <span>{{ booking.time }}</span>
        </div>
        <div class="flex items-center justify-between">
          <span class="text-luxury-gold font-bold">{{ formatPrice(booking.price) }}</span>
          <button class="px-4 py-1.5 bg-luxury-gold text-luxury-dark rounded-full text-sm">Rebook</button>
        </div>
      </div>
    </div>
  </div>
</template>
