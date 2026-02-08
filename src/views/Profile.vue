<script setup>
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const profileTab = ref('info')

const currentUser = {
  name: 'Elena Sterling',
  email: 'elena.sterling@email.com',
  phone: '+1 (555) 123-4567',
  memberSince: '2024',
  membership: 'Premium',
  avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&q=80'
}

const allServices = [
  { id: 1, name: 'Deep Tissue Massage', image: 'https://images.unsplash.com/photo-1544161515-4ab6ce6db874?w=800&q=80', price: 120 },
  { id: 2, name: 'Swedish Massage', image: 'https://images.unsplash.com/photo-1600334089648-b0d9d3028eb2?w=800&q=80', price: 100 },
  { id: 3, name: 'Hot Stone Therapy', image: 'https://images.unsplash.com/photo-1519823551278-64ac92734fb1?w=800&q=80', price: 150 },
  { id: 4, name: 'Thai Massage', image: 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?w=800&q=80', price: 110 },
  { id: 5, name: 'Reiki Healing', image: 'https://images.unsplash.com/photo-1552693673-1bf958298935?w=800&q=80', price: 95 },
  { id: 6, name: 'Aromatherapy Spa', image: 'https://images.unsplash.com/photo-1600334089648-b0d9d3028eb2?w=800&q=80', price: 130 }
]

// Get favorites from localStorage
const getFavorites = () => {
  const stored = localStorage.getItem('favorites')
  return stored ? JSON.parse(stored) : [1, 3]
}

const favorites = ref(getFavorites())

// Get bookings from localStorage
const getBookings = () => {
  const stored = localStorage.getItem('bookings')
  return stored ? JSON.parse(stored) : []
}

const bookings = ref(getBookings())
const upcomingCount = computed(() => bookings.value.filter(b => b.status === 'upcoming').length)
const completedCount = computed(() => bookings.value.filter(b => b.status === 'completed').length)
const totalCount = computed(() => bookings.value.length)

const logout = () => {
  localStorage.removeItem('isLoggedIn')
  router.push('/login')
}

const formatPrice = (price) => `$${price}`
</script>

<template>
  <div class="px-4 py-6">
    <h2 class="text-xl font-bold mb-6">Profile</h2>
    
    <div class="bg-luxury-charcoal rounded-2xl p-6 mb-6">
      <div class="flex items-center gap-4 mb-6">
        <img :src="currentUser.avatar" alt="Avatar" class="w-20 h-20 rounded-full object-cover" />
        <div>
          <h3 class="text-xl font-bold">{{ currentUser.name }}</h3>
          <p class="text-luxury-gold">{{ currentUser.membership }} Member</p>
          <p class="text-gray-400 text-sm">Since {{ currentUser.memberSince }}</p>
        </div>
      </div>
      
      <div class="flex gap-2 mb-6">
        <button @click="profileTab = 'info'" class="flex-1 py-2 rounded-full text-sm font-medium" :class="profileTab === 'info' ? 'bg-luxury-gold text-luxury-dark' : 'bg-luxury-dark'">Info</button>
        <button @click="profileTab = 'favorites'" class="flex-1 py-2 rounded-full text-sm font-medium" :class="profileTab === 'favorites' ? 'bg-luxury-gold text-luxury-dark' : 'bg-luxury-dark'">Favorites</button>
        <button @click="profileTab = 'settings'" class="flex-1 py-2 rounded-full text-sm font-medium" :class="profileTab === 'settings' ? 'bg-luxury-gold text-luxury-dark' : 'bg-luxury-dark'">Settings</button>
      </div>

      <div v-if="profileTab === 'info'" class="space-y-4">
        <div class="flex items-center justify-between py-3 border-b border-luxury-dark">
          <span class="text-gray-400">Email</span>
          <span>{{ currentUser.email }}</span>
        </div>
        <div class="flex items-center justify-between py-3 border-b border-luxury-dark">
          <span class="text-gray-400">Phone</span>
          <span>{{ currentUser.phone }}</span>
        </div>
        <div class="flex items-center justify-between py-3 border-b border-luxury-dark">
          <span class="text-gray-400">Total Bookings</span>
          <span>{{ totalCount || 5 }}</span>
        </div>
        <div class="flex items-center justify-between py-3 border-b border-luxury-dark">
          <span class="text-gray-400">Completed</span>
          <span>{{ completedCount || 3 }}</span>
        </div>
        <div class="flex items-center justify-between py-3">
          <span class="text-gray-400">Upcoming</span>
          <span>{{ upcomingCount || 2 }}</span>
        </div>
      </div>

      <div v-if="profileTab === 'favorites'" class="space-y-4">
        <div v-for="service in allServices.filter(s => favorites.includes(s.id))" :key="service.id" class="flex items-center gap-4 p-3 bg-luxury-dark rounded-xl">
          <img :src="service.image" :alt="service.name" class="w-16 h-16 rounded-lg object-cover" />
          <div class="flex-1">
            <h4 class="font-semibold">{{ service.name }}</h4>
            <p class="text-luxury-gold text-sm">{{ formatPrice(service.price) }}</p>
          </div>
        </div>
        <div v-if="favorites.length === 0" class="text-center py-8 text-gray-400">No favorites yet</div>
      </div>

      <div v-if="profileTab === 'settings'" class="space-y-4">
        <router-link to="/notifications" class="w-full py-3 bg-luxury-dark rounded-xl text-left px-4 flex items-center justify-between">
          <span>Notifications</span>
          <svg class="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" /></svg>
        </router-link>
        <router-link to="/privacy" class="w-full py-3 bg-luxury-dark rounded-xl text-left px-4 flex items-center justify-between">
          <span>Privacy Policy</span>
          <svg class="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" /></svg>
        </router-link>
        <router-link to="/help-support" class="w-full py-3 bg-luxury-dark rounded-xl text-left px-4 flex items-center justify-between">
          <span>Help & Support</span>
          <svg class="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" /></svg>
        </router-link>
        <router-link to="/edit-profile" class="w-full py-3 bg-luxury-dark rounded-xl text-left px-4 flex items-center justify-between">
          <span>Edit Profile</span>
          <svg class="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" /></svg>
        </router-link>
        <button @click="logout" class="w-full py-3 bg-red-500/20 text-red-400 rounded-xl font-medium">Logout</button>
      </div>
    </div>
  </div>
</template>
