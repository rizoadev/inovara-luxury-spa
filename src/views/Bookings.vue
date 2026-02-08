<script setup>
import { ref, computed, onMounted } from 'vue'

// Get bookings from localStorage
const getBookings = () => {
  const stored = localStorage.getItem('bookings')
  if (stored) {
    return JSON.parse(stored)
  }
  // Default mock bookings if none exist
  return [
    { id: 'BK-001', date: '2025-02-10', time: '14:00', service: 'Deep Tissue Massage', therapist: 'Sarah Mitchell', price: 140, status: 'completed', duration: 60 },
    { id: 'BK-002', date: '2025-01-25', time: '10:00', service: 'Swedish Massage', therapist: 'Emma Rodriguez', price: 100, status: 'completed', duration: 60 },
    { id: 'BK-003', date: '2025-01-28', time: '15:00', service: 'Hot Stone Therapy', therapist: 'James Chen', price: 150, status: 'completed', duration: 90 },
    { id: 'BK-004', date: '2025-02-15', time: '11:00', service: 'Reiki Healing', therapist: 'Lisa Thompson', price: 95, status: 'upcoming', duration: 60 },
    { id: 'BK-005', date: '2025-02-20', time: '16:00', service: 'Thai Massage', therapist: 'James Chen', price: 110, status: 'upcoming', duration: 90 }
  ]
}

const bookingHistory = ref(getBookings())
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
  if (idx !== -1) {
    bookingHistory.value.splice(idx, 1)
    localStorage.setItem('bookings', JSON.stringify(bookingHistory.value))
  }
}

const markCompleted = (bookingId) => {
  const booking = bookingHistory.value.find(b => b.id === bookingId)
  if (booking) {
    booking.status = 'completed'
    localStorage.setItem('bookings', JSON.stringify(bookingHistory.value))
  }
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
        <div class="w-16 h-16 mx-auto mb-4 rounded-full bg-luxury-dark/50 flex items-center justify-center">
          <svg class="w-8 h-8 text-luxury-gold" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
        </div>
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
          
          <!-- Discount Badge -->
          <div v-if="booking.discount" class="flex items-center gap-2 mb-3">
            <span class="px-2 py-1 bg-green-500/20 text-green-400 rounded-full text-xs font-semibold">{{ booking.discount }}</span>
            <span v-if="booking.originalPrice > booking.price" class="text-gray-500 line-through text-sm">{{ formatPrice(booking.originalPrice) }}</span>
            <span class="text-luxury-gold font-bold">{{ formatPrice(booking.price) }}</span>
          </div>
          
          <div class="flex items-center justify-between">
            <span v-if="!booking.discount" class="text-luxury-gold font-bold">{{ formatPrice(booking.price) }}</span>
            <div class="flex gap-2">
              <button @click="cancelBooking(booking.id)" class="px-3 py-1.5 bg-red-500/20 text-red-400 rounded-full text-xs">Cancel</button>
              <button @click="markCompleted(booking.id)" class="px-3 py-1.5 bg-green-500/20 text-green-400 rounded-full text-xs">Mark Done</button>
            </div>
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
        
        <!-- Discount Badge -->
        <div v-if="booking.discount" class="flex items-center gap-2 mb-3">
          <span class="px-2 py-1 bg-green-500/20 text-green-400 rounded-full text-xs font-semibold">{{ booking.discount }}</span>
          <span v-if="booking.originalPrice > booking.price" class="text-gray-500 line-through text-sm">{{ formatPrice(booking.originalPrice) }}</span>
          <span class="text-luxury-gold font-bold">{{ formatPrice(booking.price) }}</span>
        </div>
        
        <div class="flex items-center justify-between">
          <span v-if="!booking.discount" class="text-luxury-gold font-bold">{{ formatPrice(booking.price) }}</span>
          <button class="px-4 py-1.5 bg-luxury-gold text-luxury-dark rounded-full text-sm">Rebook</button>
        </div>
      </div>
    </div>
  </div>
</template>
