<script setup>
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

// Services Data
const services = [
  { id: 1, name: 'Deep Tissue Massage', image: 'https://images.unsplash.com/photo-1544161515-4ab6ce6db874?w=800&q=80', rating: 4.9, reviews: 128, duration: 60, price: 120, tags: ['Organic Oils', 'Heated Table'], description: 'Therapeutic massage for deep muscle tension.', gradient: 'from-yellow-400 via-orange-400 to-red-400' },
  { id: 2, name: 'Swedish Massage', image: 'https://images.unsplash.com/photo-1600334089648-b0d9d3028eb2?w=800&q=80', rating: 4.8, reviews: 95, duration: 60, price: 100, tags: ['Relaxation', 'Aromatherapy'], description: 'Classic relaxation massage.', gradient: 'from-blue-400 via-indigo-400 to-purple-400' },
  { id: 3, name: 'Hot Stone Therapy', image: 'https://images.unsplash.com/photo-1519823551278-64ac92734fb1?w=800&q=80', rating: 4.9, reviews: 156, duration: 90, price: 150, tags: ['Heated Stones'], description: 'Heated stones for deep relaxation.', gradient: 'from-pink-400 via-rose-400 to-red-400' },
  { id: 4, name: 'Thai Massage', image: 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?w=800&q=80', rating: 4.7, reviews: 89, duration: 90, price: 110, tags: ['Stretching'], description: 'Ancient stretching and energy work.', gradient: 'from-green-400 via-teal-400 to-blue-400' },
  { id: 5, name: 'Reiki Healing', image: 'https://images.unsplash.com/photo-1552693673-1bf958298935?w=800&q=80', rating: 4.9, reviews: 112, duration: 60, price: 95, tags: ['Energy Healing'], description: 'Japanese energy healing.', gradient: 'from-purple-400 via-violet-400 to-indigo-400' },
  { id: 6, name: 'Aromatherapy Spa', image: 'https://images.unsplash.com/photo-1600334089648-b0d9d3028eb2?w=800&q=80', rating: 4.8, reviews: 134, duration: 75, price: 130, tags: ['Essential Oils'], description: 'Essential oils treatment.', gradient: 'from-amber-400 via-yellow-400 to-orange-400' }
]

// Therapists Data
const therapists = [
  { id: 1, name: 'Sarah Mitchell', title: 'Senior Therapist', image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&q=80', rating: 5.0, specialties: ['Deep Tissue', 'Sports Massage'], bio: '10+ years experience.', price: 140, available: true },
  { id: 2, name: 'James Chen', title: 'Massage Specialist', image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&q=80', rating: 4.9, specialties: ['Thai Massage', 'Reiki'], bio: 'Asian healing expert.', price: 130, available: true },
  { id: 3, name: 'Emma Rodriguez', title: 'Wellness Expert', image: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=400&q=80', rating: 4.8, specialties: ['Aromatherapy', 'Swedish'], bio: 'Holistic wellness.', price: 125, available: true },
  { id: 4, name: 'Michael Park', title: 'Sports Therapist', image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&q=80', rating: 4.9, specialties: ['Sports Massage', 'Deep Tissue'], bio: 'Former athlete.', price: 145, available: false },
  { id: 5, name: 'Lisa Thompson', title: 'Holistic Practitioner', image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&q=80', rating: 5.0, specialties: ['Reiki', 'Meditation'], bio: 'Mind-body expert.', price: 120, available: true }
]

// Booking History (shared state via localStorage)
const getBookings = () => {
  const stored = localStorage.getItem('bookings')
  return stored ? JSON.parse(stored) : []
}

const saveBooking = (booking) => {
  const bookings = getBookings()
  bookings.unshift(booking)
  localStorage.setItem('bookings', JSON.stringify(bookings))
}

// State
const favorites = ref([1, 3])
const showBookingModal = ref(false)
const selectedService = ref(null)
const selectedTherapist = ref(null)
const selectedDate = ref('')
const selectedTime = ref('')
const bookingNotes = ref('')
const currentBookingStep = ref(1)
const bookingSuccess = ref(false)
const appliedDiscount = ref(null)

const discounts = [
  { code: 'FIRST20', discount: 20, title: '20% Off First Visit' },
  { code: 'MASSAGE50', discount: 50, title: '50% Off Massage' },
  { code: 'PACKAGE30', discount: 30, title: '30% Off Package' }
]

const applyDiscount = (discount) => {
  appliedDiscount.value = discount
}

const clearDiscount = () => {
  appliedDiscount.value = null
}

const getDiscountedPrice = (price) => {
  if (appliedDiscount.value) {
    const discountAmount = (price * appliedDiscount.value.discount) / 100
    return Math.round(price - discountAmount)
  }
  return price
}

// Computed
const availableDates = computed(() => {
  const dates = []
  const today = new Date()
  for (let i = 1; i <= 14; i++) {
    const date = new Date(today)
    date.setDate(today.getDate() + i)
    dates.push({
      value: date.toISOString().split('T')[0],
      label: date.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' })
    })
  }
  return dates
})

const timeSlots = [
  { label: '09:00 AM', value: '09:00' },
  { label: '10:00 AM', value: '10:00' },
  { label: '11:00 AM', value: '11:00' },
  { label: '01:00 PM', value: '13:00' },
  { label: '02:00 PM', value: '14:00' },
  { label: '03:00 PM', value: '15:00' },
  { label: '04:00 PM', value: '16:00' },
  { label: '05:00 PM', value: '17:00' }
]

// Methods
const formatPrice = (price) => `$${price}`
const formatDate = (dateStr) => new Date(dateStr).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })

const toggleFavorite = (id) => {
  const idx = favorites.value.indexOf(id)
  if (idx !== -1) favorites.value.splice(idx, 1)
  else favorites.value.push(id)
  localStorage.setItem('favorites', JSON.stringify(favorites.value))
}

const openBooking = (service) => {
  selectedService.value = service
  selectedTherapist.value = null
  selectedDate.value = ''
  selectedTime.value = ''
  bookingNotes.value = ''
  currentBookingStep.value = 1
  bookingSuccess.value = false
  showBookingModal.value = true
}

const nextStep = () => {
  if (currentBookingStep.value < 3) currentBookingStep.value++
}

const prevStep = () => {
  if (currentBookingStep.value > 1) currentBookingStep.value--
}

const selectTherapist = (therapist) => {
  selectedTherapist.value = therapist
}

const confirmBooking = () => {
  const discountedPrice = getDiscountedPrice(selectedService.value.price)
  const booking = {
    id: `BK-${String(Date.now()).slice(-6)}`,
    date: selectedDate.value,
    time: selectedTime.value,
    service: selectedService.value.name,
    therapist: selectedTherapist.value?.name || 'Any Available',
    originalPrice: selectedService.value.price,
    price: discountedPrice,
    discount: appliedDiscount.value?.code || null,
    status: 'upcoming',
    duration: selectedService.value.duration,
    notes: bookingNotes.value
  }
  saveBooking(booking)
  bookingSuccess.value = true
}

const closeModal = () => {
  showBookingModal.value = false
  if (bookingSuccess.value) {
    router.push('/bookings')
  }
}
</script>

<template>
  <div class="px-4 py-6">
    <h2 class="text-xl font-bold mb-6">All Services</h2>
    
    <div class="space-y-4">
      <div v-for="service in services" :key="service.id" :class="`bg-gradient-to-br ${service.gradient} rounded-3xl overflow-hidden text-white relative`">
        <!-- Image overlay -->
        <div class="absolute inset-0 opacity-40">
          <img :src="service.image" :alt="service.name" class="w-full h-full object-cover" />
        </div>
        
        <!-- Content -->
        <div class="relative p-6">
          <!-- Header -->
          <div class="flex items-start justify-between mb-4">
            <div>
              <div class="flex items-center gap-2 mb-1">
                <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" /></svg>
                <span class="font-semibold">{{ service.rating }} ({{ service.reviews }})</span>
              </div>
              <h3 class="text-xl font-bold">{{ service.name }}</h3>
            </div>
            <button @click.stop="toggleFavorite(service.id)" class="w-10 h-10 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center">
              <svg class="w-5 h-5" :class="favorites.includes(service.id) ? 'text-yellow-300' : 'text-white'" fill="currentColor" viewBox="0 0 20 20"><path fill-rule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clip-rule="evenodd" /></svg>
            </button>
          </div>
          
          <!-- Description -->
          <p class="text-white/90 text-sm mb-4">{{ service.description }}</p>
          
          <!-- Tags -->
          <div class="flex flex-wrap gap-2 mb-4">
            <span v-for="tag in service.tags" :key="tag" class="px-3 py-1 bg-white/20 backdrop-blur-sm rounded-full text-xs">{{ tag }}</span>
          </div>
          
          <!-- Price & Button -->
          <div class="flex items-center justify-between">
            <div>
              <span class="text-2xl font-bold">{{ formatPrice(service.price) }}</span>
              <span class="text-white/80 ml-2">- {{ service.duration }} min</span>
            </div>
            <button @click="openBooking(service)" class="px-6 py-3 bg-white text-black font-semibold rounded-full flex items-center gap-2">
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
              Book Now
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- Booking Modal -->
    <div v-if="showBookingModal" class="fixed inset-0 z-50 flex items-end justify-center">
      <div class="absolute inset-0 bg-black/60" @click="closeModal"></div>
      <div class="relative bg-luxury-charcoal rounded-t-3xl w-full max-w-md max-h-[80vh] overflow-y-auto">
        <div class="p-6">
          <!-- Success State -->
          <div v-if="bookingSuccess" class="text-center py-8">
            <div class="w-20 h-20 mx-auto mb-4 rounded-full bg-green-500/20 flex items-center justify-center">
              <svg class="w-10 h-10 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" /></svg>
            </div>
            <h3 class="text-xl font-bold mb-2">Booking Confirmed!</h3>
            <p class="text-gray-400 mb-6">Your appointment has been scheduled.</p>
            <div class="bg-luxury-dark rounded-xl p-4 mb-6 text-left">
              <div class="flex justify-between mb-2"><span class="text-gray-400">Service</span><span>{{ selectedService?.name }}</span></div>
              <div class="flex justify-between mb-2"><span class="text-gray-400">Date</span><span>{{ formatDate(selectedDate) }}</span></div>
              <div class="flex justify-between mb-2"><span class="text-gray-400">Time</span><span>{{ selectedTime }}</span></div>
              <div class="flex justify-between"><span class="text-gray-400">Therapist</span><span>{{ selectedTherapist?.name || 'Any Available' }}</span></div>
            </div>
            <div class="flex gap-4">
              <button @click="closeModal" class="flex-1 py-3 bg-luxury-dark rounded-xl">Close</button>
              <button @click="router.push('/bookings')" class="flex-1 py-3 bg-luxury-gold text-luxury-dark rounded-xl font-semibold">View Bookings</button>
            </div>
          </div>

          <!-- Booking Steps -->
          <div v-else>
            <div class="flex items-center justify-between mb-6">
              <button @click="closeModal" class="w-8 h-8 rounded-full bg-luxury-dark flex items-center justify-center">
                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" /></svg>
              </button>
              <div class="flex gap-2">
                <span class="w-3 h-3 rounded-full" :class="currentBookingStep >= 1 ? 'bg-luxury-gold' : 'bg-gray-600'"></span>
                <span class="w-3 h-3 rounded-full" :class="currentBookingStep >= 2 ? 'bg-luxury-gold' : 'bg-gray-600'"></span>
                <span class="w-3 h-3 rounded-full" :class="currentBookingStep >= 3 ? 'bg-luxury-gold' : 'bg-gray-600'"></span>
              </div>
              <span class="text-sm text-gray-400">Step {{ currentBookingStep }}/3</span>
            </div>

            <h3 class="text-xl font-bold mb-6">
              {{ currentBookingStep === 1 ? 'Select Date & Time' : currentBookingStep === 2 ? 'Select Therapist' : 'Confirm Booking' }}
            </h3>

            <!-- Step 1: Date & Time -->
            <div v-if="currentBookingStep === 1" class="space-y-4">
              <div>
                <label class="block text-sm text-gray-400 mb-3">Select Date</label>
                <div class="grid grid-cols-3 gap-2">
                  <button v-for="date in availableDates.slice(0, 6)" :key="date.value" @click="selectedDate = date.value" class="py-3 rounded-xl text-sm" :class="selectedDate === date.value ? 'bg-luxury-gold text-luxury-dark font-semibold' : 'bg-luxury-dark'">{{ date.label }}</button>
                </div>
              </div>
              <div>
                <label class="block text-sm text-gray-400 mb-3">Select Time</label>
                <div class="grid grid-cols-4 gap-2">
                  <button v-for="time in timeSlots" :key="time.value" @click="selectedTime = time.value" class="py-2 rounded-xl text-xs" :class="selectedTime === time.value ? 'bg-luxury-gold text-luxury-dark font-semibold' : 'bg-luxury-dark'">{{ time.label }}</button>
                </div>
              </div>
              <button @click="nextStep" :disabled="!selectedDate || !selectedTime" class="w-full py-3 bg-luxury-gold text-luxury-dark font-semibold rounded-xl mt-6 disabled:opacity-50">Continue</button>
            </div>

            <!-- Step 2: Therapist -->
            <div v-if="currentBookingStep === 2" class="space-y-4">
              <button @click="selectedTherapist = null" class="w-full p-4 rounded-xl text-left mb-3" :class="!selectedTherapist ? 'bg-luxury-gold text-luxury-dark' : 'bg-luxury-dark'">
                <p class="font-semibold">Any Available Therapist</p>
                <p class="text-sm opacity-70">We'll assign the best available</p>
              </button>
              <div v-for="therapist in therapists.filter(t => t.available)" :key="therapist.id" @click="selectTherapist(therapist)" class="w-full p-4 rounded-xl flex items-center gap-4 cursor-pointer" :class="selectedTherapist?.id === therapist.id ? 'bg-luxury-gold text-luxury-dark' : 'bg-luxury-dark'">
                <img :src="therapist.image" :alt="therapist.name" class="w-12 h-12 rounded-full object-cover" />
                <div>
                  <p class="font-semibold">{{ therapist.name }}</p>
                  <p class="text-sm opacity-70">{{ therapist.title }}</p>
                </div>
              </div>
              <div class="flex gap-3 mt-6">
                <button @click="prevStep" class="flex-1 py-3 bg-luxury-dark rounded-xl">Back</button>
                <button @click="nextStep" class="flex-1 py-3 bg-luxury-gold text-luxury-dark font-semibold rounded-xl">Continue</button>
              </div>
            </div>

            <!-- Step 3: Summary -->
            <div v-if="currentBookingStep === 3" class="space-y-4">
              <!-- Discount Section -->
              <div v-if="!appliedDiscount" class="bg-gradient-to-r from-yellow-400 via-orange-400 to-red-400 rounded-xl p-4 text-white">
                <p class="text-xs font-semibold tracking-wider opacity-80 mb-1">EXCLUSIVE OFFER</p>
                <h4 class="font-bold mb-2">20% Off Your First Visit</h4>
                <div class="flex gap-2">
                  <button @click="applyDiscount(discounts[0])" class="px-3 py-1.5 bg-white text-black text-xs font-semibold rounded-full">Apply FIRST20</button>
                  <button @click="applyDiscount(discounts[2])" class="px-3 py-1.5 bg-white/20 text-white text-xs rounded-full">PACKAGE30</button>
                </div>
              </div>
              
              <!-- Applied Discount -->
              <div v-else class="bg-green-500/20 border border-green-500 rounded-xl p-4">
                <div class="flex items-center justify-between">
                  <div>
                    <p class="text-green-400 font-semibold">{{ appliedDiscount.title }}</p>
                    <p class="text-xs text-gray-400">Code: {{ appliedDiscount.code }}</p>
                  </div>
                  <button @click="clearDiscount" class="text-gray-400 hover:text-white">
                    <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" /></svg>
                  </button>
                </div>
              </div>
              
              <div class="bg-luxury-dark rounded-xl p-4 space-y-3">
                <div class="flex justify-between"><span class="text-gray-400">Service</span><span>{{ selectedService?.name }}</span></div>
                <div class="flex justify-between"><span class="text-gray-400">Duration</span><span>{{ selectedService?.duration }} min</span></div>
                <div class="flex justify-between"><span class="text-gray-400">Date</span><span>{{ formatDate(selectedDate) }}</span></div>
                <div class="flex justify-between"><span class="text-gray-400">Time</span><span>{{ selectedTime }}</span></div>
                <div class="flex justify-between"><span class="text-gray-400">Therapist</span><span>{{ selectedTherapist?.name || 'Any Available' }}</span></div>
                <div v-if="appliedDiscount" class="flex justify-between text-green-400">
                  <span>Discount ({{ appliedDiscount.discount }}%)</span>
                  <span>-{{ formatPrice(Math.round((selectedService?.price * appliedDiscount.discount) / 100)) }}</span>
                </div>
                <div class="border-t border-luxury-charcoal pt-3 flex justify-between font-bold">
                  <span>Total</span>
                  <span class="text-luxury-gold">{{ formatPrice(getDiscountedPrice(selectedService?.price)) }}</span>
                </div>
              </div>
              <div>
                <label class="block text-sm text-gray-400 mb-2">Notes (optional)</label>
                <textarea v-model="bookingNotes" placeholder="Any special requests..." class="w-full px-4 py-3 bg-luxury-dark rounded-xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-luxury-gold resize-none h-20"></textarea>
              </div>
              <div class="flex gap-3">
                <button @click="prevStep" class="flex-1 py-3 bg-luxury-dark rounded-xl">Back</button>
                <button @click="confirmBooking" class="flex-1 py-3 bg-luxury-gold text-luxury-dark font-semibold rounded-xl">Confirm Booking</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
