<script setup>
import { computed } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

const currentUser = {
  name: 'Elena Sterling',
  avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&q=80'
}

const services = [
  { id: 1, name: 'Deep Tissue Massage', image: 'https://images.unsplash.com/photo-1544161515-4ab6ce6db874?w=800&q=80', rating: 4.9, duration: 60, price: 120, tags: ['Organic Oils'] },
  { id: 2, name: 'Swedish Massage', image: 'https://images.unsplash.com/photo-1600334089648-b0d9d3028eb2?w=800&q=80', rating: 4.8, duration: 60, price: 100, tags: ['Relaxation'] },
  { id: 3, name: 'Hot Stone Therapy', image: 'https://images.unsplash.com/photo-1519823551278-64ac92734fb1?w=800&q=80', rating: 4.9, duration: 90, price: 150, tags: ['Heated Stones'] }
]

// Get upcoming bookings from localStorage
const getUpcomingBookings = () => {
  const stored = localStorage.getItem('bookings')
  if (stored) {
    const bookings = JSON.parse(stored)
    return bookings.filter(b => b.status === 'upcoming').slice(0, 2)
  }
  // Default
  return [
    { id: 'BK-004', date: '2025-02-15', time: '11:00', service: 'Reiki Healing', therapist: 'Lisa Thompson' },
    { id: 'BK-005', date: '2025-02-20', time: '16:00', service: 'Thai Massage', therapist: 'James Chen' }
  ]
}

const upcomingBookings = computed(() => getUpcomingBookings())
const featuredServices = computed(() => services.slice(0, 3))

const formatPrice = (price) => `$${price}`
const formatDate = (dateStr) => new Date(dateStr).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
</script>

<template>
  <div>
    <!-- Hero Section -->
    <section class="relative h-80 overflow-hidden">
      <img src="https://images.unsplash.com/photo-1540555700478-4be289fbecef?w=800&q=80" alt="Spa" class="w-full h-full object-cover" />
      <div class="absolute inset-0 bg-gradient-to-t from-luxury-dark via-luxury-dark/50 to-transparent"></div>
      <div class="absolute bottom-0 left-0 right-0 p-6">
        <h1 class="text-2xl font-bold mb-2">Your sanctuary awaits</h1>
        <button @click="router.push('/services')" class="w-full py-3 bg-luxury-gold text-luxury-dark font-semibold rounded-full flex items-center justify-center gap-2">
          Book Your Session
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
        </button>
      </div>
    </section>

    <!-- Services Section -->
    <section class="px-4 py-6">
      <div class="flex items-center justify-between mb-4">
        <h2 class="text-lg font-bold">Top-Rated Services</h2>
        <button @click="router.push('/services')" class="text-luxury-gold text-sm">View All</button>
      </div>
      <div class="flex gap-4 overflow-x-auto pb-4">
        <div v-for="service in featuredServices" :key="service.id" class="flex-shrink-0 w-72 bg-luxury-charcoal rounded-2xl overflow-hidden">
          <div class="h-40 overflow-hidden relative">
            <img :src="service.image" :alt="service.name" class="w-full h-full object-cover" />
          </div>
          <div class="p-4">
            <div class="flex items-start justify-between mb-2">
              <h3 class="font-semibold">{{ service.name }}</h3>
              <div class="flex items-center gap-1 text-luxury-gold">
                <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" /></svg>
                <span class="text-sm">{{ service.rating }}</span>
              </div>
            </div>
            <p class="text-gray-400 text-sm mb-3">{{ service.duration }} min from {{ formatPrice(service.price) }}</p>
            <button @click="router.push('/services')" class="w-full py-2 bg-luxury-gold text-luxury-dark font-medium rounded-full text-sm">Book Now</button>
          </div>
        </div>
      </div>
    </section>

    <!-- Promo Banner -->
    <section class="px-4 pb-6">
      <div class="bg-gradient-to-r from-luxury-gold to-yellow-500 rounded-2xl p-6 text-luxury-dark">
        <p class="text-sm font-medium opacity-80">FIRST TIME?</p>
        <p class="text-2xl font-bold mb-2">20% OFF</p>
        <p class="text-sm opacity-80 mb-4">On your first session</p>
        <button class="px-6 py-2 bg-luxury-dark text-white rounded-full font-medium">Claim Now</button>
      </div>
    </section>

    <!-- Upcoming Bookings -->
    <section v-if="upcomingBookings.length > 0" class="px-4 pb-6">
      <div class="flex items-center justify-between mb-4">
        <h2 class="text-lg font-bold">Upcoming</h2>
        <button @click="router.push('/bookings')" class="text-luxury-gold text-sm">See All</button>
      </div>
      <div class="space-y-3">
        <div v-for="booking in upcomingBookings" :key="booking.id" class="bg-luxury-charcoal rounded-xl p-4 flex items-center gap-4">
          <div class="w-12 h-12 bg-luxury-gold/20 rounded-xl flex items-center justify-center">
            <svg class="w-6 h-6 text-luxury-gold" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
          </div>
          <div class="flex-1">
            <p class="font-medium">{{ booking.service }}</p>
            <p class="text-sm text-gray-400">{{ booking.therapist }} - {{ booking.time }}</p>
          </div>
          <span class="px-3 py-1 bg-luxury-gold/20 text-luxury-gold text-xs rounded-full">{{ formatDate(booking.date) }}</span>
        </div>
      </div>
    </section>
  </div>
</template>
