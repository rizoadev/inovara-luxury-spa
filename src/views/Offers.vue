<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

const offers = ref([
  {
    id: 1,
    title: '20% Off Your First Visit',
    subtitle: 'EXCLUSIVE OFFER',
    description: 'New customers get 20% off their first spa experience. Includes any service of your choice.',
    discount: '20%',
    code: 'FIRST20',
    validUntil: 'March 31, 2025',
    gradient: 'from-yellow-400 via-orange-400 to-red-400',
    claimed: false
  },
  {
    id: 2,
    title: '50% Off Massage',
    subtitle: 'MEMBER ONLY',
    description: 'Exclusive discount for premium members on all massage services.',
    discount: '50%',
    code: 'MASSAGE50',
    validUntil: 'February 28, 2025',
    gradient: 'from-purple-400 via-pink-400 to-red-400',
    claimed: false
  },
  {
    id: 3,
    title: 'Free Add-On',
    subtitle: 'SPECIAL DEAL',
    description: 'Get a free aromatherapy add-on with any 60+ minute service.',
    discount: 'FREE',
    code: 'AROMAFREE',
    validUntil: 'February 14, 2025',
    gradient: 'from-green-400 via-teal-400 to-blue-400',
    claimed: false
  },
  {
    id: 4,
    title: 'Buy 1 Get 1',
    subtitle: 'LIMITED TIME',
    description: 'Bring a friend and both get a free treatment on their birthday month.',
    discount: 'BOGO',
    code: 'BOGO2025',
    validUntil: 'December 31, 2025',
    gradient: 'from-blue-400 via-indigo-400 to-purple-400',
    claimed: false
  },
  {
    id: 5,
    title: '30% Off Package',
    subtitle: 'WELCOME',
    description: 'Save 30% when you book a spa package of 5 or more sessions.',
    discount: '30%',
    code: 'PACKAGE30',
    validUntil: 'June 30, 2025',
    gradient: 'from-pink-400 via-rose-400 to-orange-400',
    claimed: false
  }
])

const claimOffer = (offer) => {
  offer.claimed = true
  router.push('/services')
}
</script>

<template>
  <div class="px-4 py-6">
    <h2 class="text-xl font-bold mb-6">Special Offers</h2>
    
    <div class="space-y-4">
      <div v-for="offer in offers" :key="offer.id" class="relative">
        <!-- Gradient Card -->
        <div :class="`bg-gradient-to-br ${offer.gradient} rounded-3xl p-6 text-white relative overflow-hidden`">
          <!-- Leaf Graphic -->
          <div class="absolute right-4 bottom-4 opacity-30">
            <svg class="w-24 h-24" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 2C12 2 11 4 11 7C11 9 12 11 12 11C12 11 13 9 13 7C13 4 12 2 12 2ZM8 4C8 4 6 6 6 9C6 11 7 13 8 14C8 14 7 16 7 18C7 19 8 20 9 20C10 20 11 19 11 18C11 16 10 14 10 14C11 13 12 11 12 9C12 7 10 5 10 5C9 6 8 7 8 7C8 7 8 6 8 4ZM16 4C16 4 15 6 15 9C15 11 14 13 13 14C13 14 14 16 14 18C14 19 13 20 12 20C11 20 10 19 10 18C10 16 11 14 11 14C10 13 9 11 9 9C9 7 11 5 11 5C12 6 13 7 14 7C14 7 14 6 14 5C15 4 16 4 16 4Z"/>
            </svg>
          </div>
          
          <!-- Header -->
          <div class="relative z-10">
            <p class="text-xs font-semibold tracking-wider opacity-80 mb-1">{{ offer.subtitle }}</p>
            <h3 class="text-2xl font-bold mb-2">{{ offer.title }}</h3>
            <p class="text-sm opacity-90 mb-4">{{ offer.description }}</p>
            
            <!-- Discount Badge -->
            <div class="inline-block bg-white/20 backdrop-blur-sm rounded-full px-4 py-1 mb-4">
              <span class="text-lg font-bold">{{ offer.discount }}</span>
            </div>
            
            <!-- Code -->
            <p class="text-xs opacity-70 mb-4">Use code: <span class="font-mono font-bold">{{ offer.code }}</span></p>
            
            <!-- Buttons -->
            <div class="flex gap-3">
              <button @click="claimOffer(offer)" class="flex-1 py-3 bg-white text-black font-semibold rounded-full flex items-center justify-center gap-2">
                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z"/>
                </svg>
                Book Now
              </button>
            </div>
            
            <!-- Valid Until -->
            <p class="text-xs opacity-60 mt-3">Valid until {{ offer.validUntil }}</p>
          </div>
        </div>
      </div>
    </div>
    
    <!-- Newsletter Section -->
    <div class="mt-8 bg-luxury-charcoal rounded-2xl p-6 text-center">
      <h3 class="font-bold mb-2">Get Exclusive Offers</h3>
      <p class="text-gray-400 text-sm mb-4">Subscribe to our newsletter and never miss a deal</p>
      <div class="flex gap-2">
        <input type="email" placeholder="Your email" class="flex-1 px-4 py-3 bg-luxury-dark rounded-full text-white text-sm placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-luxury-gold" />
        <button class="px-6 py-3 bg-luxury-gold text-luxury-dark font-semibold rounded-full text-sm">Subscribe</button>
      </div>
    </div>
  </div>
</template>
