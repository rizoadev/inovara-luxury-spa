<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const isLoggedIn = ref(true)
const showDropdown = ref(false)
const showMobileMenu = ref(false)

onMounted(() => {
  const stored = localStorage.getItem('isLoggedIn')
  if (stored) {
    isLoggedIn.value = true
  }
})

const currentRoute = () => router.currentRoute.value.name

const logout = () => {
  localStorage.removeItem('isLoggedIn')
  isLoggedIn.value = false
  showDropdown.value = false
  router.push('/login')
}

const closeDropdown = () => {
  showDropdown.value = false
}

const toggleDropdown = () => {
  showDropdown.value = !showDropdown.value
}

// Close dropdown when clicking outside
window.addEventListener('click', (e) => {
  if (!e.target.closest('.dropdown-container')) {
    showDropdown.value = false
  }
})
</script>

<template>
  <div class="min-h-screen bg-luxury-dark text-white max-w-md mx-auto relative font-sans">
    
    <!-- Header -->
    <header class="fixed top-0 left-0 right-0 z-50 bg-luxury-dark/95 backdrop-blur-sm border-b border-luxury-charcoal">
      <div class="max-w-md mx-auto px-4 py-4 flex items-center justify-between">
        <div class="flex items-center gap-3">
          <div class="w-10 h-10 rounded-full bg-luxury-gold flex items-center justify-center">
            <span class="text-luxury-dark font-bold text-lg">S</span>
          </div>
          <div v-if="isLoggedIn">
            <p class="text-xs text-gray-400">Welcome back</p>
            <p class="font-semibold">Elena Sterling</p>
          </div>
          <div v-else>
            <p class="text-xs text-gray-400">Guest</p>
          </div>
        </div>
        
        <div v-if="isLoggedIn" class="dropdown-container relative">
          <button @click="toggleDropdown" class="w-10 h-10 rounded-full bg-luxury-charcoal flex items-center justify-center">
            <img 
              src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&q=80" 
              alt="Avatar" 
              class="w-10 h-10 rounded-full object-cover"
            />
          </button>
          
          <!-- Dropdown Menu -->
          <div 
            v-if="showDropdown"
            class="absolute right-0 top-12 w-56 bg-luxury-charcoal rounded-xl shadow-xl overflow-hidden py-2 z-50"
          >
            <div class="px-4 py-3 border-b border-luxury-dark">
              <p class="font-semibold">Elena Sterling</p>
              <p class="text-sm text-gray-400">Premium Member</p>
            </div>
            
            <router-link to="/edit-profile" @click="closeDropdown" class="flex items-center gap-3 px-4 py-3 hover:bg-luxury-dark transition-colors">
              <svg class="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" /></svg>
              <span>Edit Profile</span>
            </router-link>
            
            <router-link to="/notifications" @click="closeDropdown" class="flex items-center gap-3 px-4 py-3 hover:bg-luxury-dark transition-colors">
              <svg class="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" /></svg>
              <span>Notifications</span>
            </router-link>
            
            <router-link to="/privacy" @click="closeDropdown" class="flex items-center gap-3 px-4 py-3 hover:bg-luxury-dark transition-colors">
              <svg class="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" /></svg>
              <span>Privacy</span>
            </router-link>
            
            <router-link to="/help-support" @click="closeDropdown" class="flex items-center gap-3 px-4 py-3 hover:bg-luxury-dark transition-colors">
              <svg class="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
              <span>Help & Support</span>
            </router-link>
            
            <div class="border-t border-luxury-dark mt-2 pt-2">
              <button @click="logout" class="flex items-center gap-3 w-full px-4 py-3 text-red-400 hover:bg-luxury-dark transition-colors">
                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" /></svg>
                <span>Logout</span>
              </button>
            </div>
          </div>
        </div>
        
        <router-link v-else to="/login" class="px-4 py-2 bg-luxury-gold text-luxury-dark rounded-full text-sm font-medium">Login</router-link>
      </div>
    </header>

    <!-- Main Content -->
    <main class="pt-20 pb-24">
      <router-view v-if="isLoggedIn" />
      <router-view v-else name="Login" />
    </main>

    <!-- Bottom Navigation -->
    <nav v-if="isLoggedIn" class="fixed bottom-0 left-0 right-0 bg-luxury-dark/95 backdrop-blur-sm border-t border-luxury-charcoal">
      <div class="max-w-md mx-auto px-4 py-3 flex items-center justify-around">
        <router-link to="/" class="flex flex-col items-center gap-1" :class="currentRoute() === 'Home' ? 'text-luxury-gold' : 'text-gray-400'">
          <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" /></svg>
          <span class="text-xs">Home</span>
        </router-link>
        <router-link to="/services" class="flex flex-col items-center gap-1" :class="currentRoute() === 'Services' ? 'text-luxury-gold' : 'text-gray-400'">
          <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" /></svg>
          <span class="text-xs">Services</span>
        </router-link>
        <router-link to="/therapists" class="flex flex-col items-center gap-1" :class="currentRoute() === 'Therapists' ? 'text-luxury-gold' : 'text-gray-400'">
          <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" /></svg>
          <span class="text-xs">Therapists</span>
        </router-link>
        <router-link to="/bookings" class="flex flex-col items-center gap-1" :class="currentRoute() === 'Bookings' ? 'text-luxury-gold' : 'text-gray-400'">
          <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
          <span class="text-xs">Bookings</span>
        </router-link>
        <router-link to="/offers" class="flex flex-col items-center gap-1" :class="currentRoute() === 'Offers' ? 'text-luxury-gold' : 'text-gray-400'">
          <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
          <span class="text-xs">Offers</span>
        </router-link>
        <router-link to="/profile" class="flex flex-col items-center gap-1" :class="currentRoute() === 'Profile' ? 'text-luxury-gold' : 'text-gray-400'">
          <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" /></svg>
          <span class="text-xs">Profile</span>
        </router-link>
      </div>
    </nav>
  </div>
</template>

<style>
.scrollbar-hide::-webkit-scrollbar { display: none; }
.scrollbar-hide { -ms-overflow-style: none; scrollbar-width: none; }
.router-link-active { color: #d4af37; }
</style>
