<script setup>
import { ref, computed } from 'vue'

const therapists = [
  { id: 1, name: 'Sarah Mitchell', title: 'Senior Therapist', image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&q=80', rating: 5.0, specialties: ['Deep Tissue', 'Sports Massage'], bio: '10+ years experience.', price: 140, available: true },
  { id: 2, name: 'James Chen', title: 'Massage Specialist', image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&q=80', rating: 4.9, specialties: ['Thai Massage', 'Reiki'], bio: 'Asian healing expert.', price: 130, available: true },
  { id: 3, name: 'Emma Rodriguez', title: 'Wellness Expert', image: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=400&q=80', rating: 4.8, specialties: ['Aromatherapy', 'Swedish'], bio: 'Holistic wellness.', price: 125, available: true },
  { id: 4, name: 'Michael Park', title: 'Sports Therapist', image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&q=80', rating: 4.9, specialties: ['Sports Massage', 'Deep Tissue'], bio: 'Former athlete.', price: 145, available: false },
  { id: 5, name: 'Lisa Thompson', title: 'Holistic Practitioner', image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&q=80', rating: 5.0, specialties: ['Reiki', 'Meditation'], bio: 'Mind-body expert.', price: 120, available: true }
]

const searchQuery = ref('')
const activeFilter = ref('All')

const filteredTherapists = computed(() => {
  let result = therapists
  if (searchQuery.value) {
    const q = searchQuery.value.toLowerCase()
    result = result.filter(t => t.name.toLowerCase().includes(q) || t.specialties.some(s => s.toLowerCase().includes(q)))
  }
  if (activeFilter.value !== 'All') {
    result = result.filter(t => t.specialties.some(s => s.toLowerCase().includes(activeFilter.value.toLowerCase())))
  }
  return result
})

const formatPrice = (price) => `$${price}`
</script>

<template>
  <div class="px-4 py-6">
    <h2 class="text-xl font-bold mb-6">Our Therapists</h2>
    
    <div class="relative mb-6">
      <input v-model="searchQuery" type="text" placeholder="Search therapists..." class="w-full px-4 py-3 bg-luxury-charcoal rounded-full text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-luxury-gold" />
    </div>

    <div class="flex gap-2 mb-6 overflow-x-auto pb-2">
      <button v-for="filter in ['All', 'Sports', 'Reiki', 'Thai', 'Deep Tissue']" :key="filter" @click="activeFilter = filter" class="px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap" :class="activeFilter === filter ? 'bg-luxury-gold text-luxury-dark' : 'bg-luxury-charcoal'">{{ filter }}</button>
    </div>

    <div class="space-y-4">
      <div v-for="therapist in filteredTherapists" :key="therapist.id" class="bg-luxury-charcoal rounded-2xl p-4">
        <div class="flex gap-4">
          <div class="relative">
            <img :src="therapist.image" :alt="therapist.name" class="w-20 h-20 rounded-xl object-cover" />
            <span v-if="!therapist.available" class="absolute inset-0 bg-luxury-dark/60 rounded-xl flex items-center justify-center"><span class="text-xs text-gray-300">Unavailable</span></span>
          </div>
          <div class="flex-1">
            <div class="flex items-start justify-between mb-1">
              <div>
                <h3 class="font-bold">{{ therapist.name }}</h3>
                <p class="text-gray-400 text-sm">{{ therapist.title }}</p>
              </div>
              <div class="flex items-center gap-1 text-luxury-gold">
                <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" /></svg>
                <span>{{ therapist.rating }}</span>
              </div>
            </div>
            <p class="text-gray-500 text-xs mb-2">{{ therapist.bio }}</p>
            <div class="flex flex-wrap gap-1 mb-2">
              <span v-for="spec in therapist.specialties" :key="spec" class="px-2 py-0.5 bg-luxury-dark/50 rounded text-xs text-gray-300">{{ spec }}</span>
            </div>
            <div class="flex items-center justify-between">
              <span class="text-luxury-gold font-bold">{{ formatPrice(therapist.price) }}/hr</span>
              <button :disabled="!therapist.available" class="px-4 py-1.5 rounded-full text-sm font-medium" :class="therapist.available ? 'bg-luxury-gold text-luxury-dark' : 'bg-gray-600 text-gray-400'">{{ therapist.available ? 'Book' : 'Unavailable' }}</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
