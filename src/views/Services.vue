<script setup>
import { ref } from 'vue'

const services = [
  { id: 1, name: 'Deep Tissue Massage', image: 'https://images.unsplash.com/photo-1544161515-4ab6ce6db874?w=800&q=80', rating: 4.9, reviews: 128, duration: 60, price: 120, tags: ['Organic Oils', 'Heated Table'], description: 'Therapeutic massage for deep muscle tension.' },
  { id: 2, name: 'Swedish Massage', image: 'https://images.unsplash.com/photo-1600334089648-b0d9d3028eb2?w=800&q=80', rating: 4.8, reviews: 95, duration: 60, price: 100, tags: ['Relaxation', 'Aromatherapy'], description: 'Classic relaxation massage.' },
  { id: 3, name: 'Hot Stone Therapy', image: 'https://images.unsplash.com/photo-1519823551278-64ac92734fb1?w=800&q=80', rating: 4.9, reviews: 156, duration: 90, price: 150, tags: ['Heated Stones'], description: 'Heated stones for deep relaxation.' },
  { id: 4, name: 'Thai Massage', image: 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?w=800&q=80', rating: 4.7, reviews: 89, duration: 90, price: 110, tags: ['Stretching'], description: 'Ancient stretching and energy work.' },
  { id: 5, name: 'Reiki Healing', image: 'https://images.unsplash.com/photo-1552693673-1bf958298935?w=800&q=80', rating: 4.9, reviews: 112, duration: 60, price: 95, tags: ['Energy Healing'], description: 'Japanese energy healing.' },
  { id: 6, name: 'Aromatherapy Spa', image: 'https://images.unsplash.com/photo-1600334089648-b0d9d3028eb2?w=800&q=80', rating: 4.8, reviews: 134, duration: 75, price: 130, tags: ['Essential Oils'], description: 'Essential oils treatment.' }
]

const favorites = ref([1, 3])
const showBookingModal = ref(false)
const selectedService = ref(null)

const formatPrice = (price) => `$${price}`

const toggleFavorite = (id) => {
  const idx = favorites.value.indexOf(id)
  if (idx !== -1) favorites.value.splice(idx, 1)
  else favorites.value.push(id)
}

const openBooking = (service) => {
  selectedService.value = service
  showBookingModal.value = true
}
</script>

<template>
  <div class="px-4 py-6">
    <h2 class="text-xl font-bold mb-6">All Services</h2>
    
    <div class="space-y-4">
      <div v-for="service in services" :key="service.id" class="bg-luxury-charcoal rounded-2xl overflow-hidden">
        <div class="relative h-48">
          <img :src="service.image" :alt="service.name" class="w-full h-full object-cover" />
          <button @click.stop="toggleFavorite(service.id)" class="absolute top-3 right-3 w-8 h-8 rounded-full bg-luxury-dark/50 flex items-center justify-center">
            <svg class="w-5 h-5" :class="favorites.includes(service.id) ? 'text-luxury-gold' : 'text-white'" fill="currentColor" viewBox="0 0 20 20"><path fill-rule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clip-rule="evenodd" /></svg>
          </button>
        </div>
        <div class="p-4">
          <div class="flex items-start justify-between mb-2">
            <h3 class="text-lg font-bold">{{ service.name }}</h3>
            <div class="flex items-center gap-1 text-luxury-gold">
              <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" /></svg>
              <span>{{ service.rating }} ({{ service.reviews }})</span>
            </div>
          </div>
          <p class="text-gray-400 text-sm mb-3">{{ service.description }}</p>
          <div class="flex items-center justify-between">
            <div>
              <span class="text-2xl font-bold text-luxury-gold">{{ formatPrice(service.price) }}</span>
              <span class="text-gray-400 ml-2">- {{ service.duration }} min</span>
            </div>
            <button @click="openBooking(service)" class="px-6 py-2 bg-luxury-gold text-luxury-dark font-medium rounded-full">Book Now</button>
          </div>
        </div>
      </div>
    </div>

    <!-- Booking Modal placeholder -->
    <div v-if="showBookingModal" class="fixed inset-0 z-50 flex items-end justify-center">
      <div class="absolute inset-0 bg-black/60" @click="showBookingModal = false"></div>
      <div class="relative bg-luxury-charcoal rounded-t-3xl w-full max-w-md p-6">
        <h3 class="text-xl font-bold mb-4">Book {{ selectedService?.name }}</h3>
        <p class="text-gray-400">Booking flow coming soon...</p>
        <button @click="showBookingModal = false" class="mt-4 w-full py-3 bg-luxury-gold text-luxury-dark rounded-xl">Close</button>
      </div>
    </div>
  </div>
</template>
