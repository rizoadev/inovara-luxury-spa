<script setup>
import { ref } from 'vue'

const faqs = ref([
  { question: 'How do I book an appointment?', answer: 'Browse our services, select a therapist, choose your preferred date and time, then confirm your booking.' },
  { question: 'Can I cancel or reschedule?', answer: 'Yes, you can cancel or reschedule up to 24 hours before your appointment from the Bookings section.' },
  { question: 'What payment methods do you accept?', answer: 'We accept credit cards, debit cards, and digital wallets. Payment is processed at the spa.' },
  { question: 'What should I wear?', answer: 'Comfortable clothing. We provide robes and disposable wear for treatments.' },
  { question: 'How early should I arrive?', answer: 'Please arrive 15 minutes before your scheduled appointment for check-in.' }
])

const expandedFaq = ref(null)

const toggleFaq = (index) => {
  expandedFaq.value = expandedFaq.value === index ? null : index
}

const contactForm = ref({ name: '', email: '', message: '' })
const submitted = ref(false)

const submitForm = () => {
  submitted.value = true
  setTimeout(() => submitted.value = false, 3000)
}
</script>

<template>
  <div class="px-4 py-6">
    <h2 class="text-xl font-bold mb-6">Help & Support</h2>
    
    <!-- Contact Form -->
    <div class="bg-luxury-charcoal rounded-2xl p-6 mb-6">
      <h3 class="font-semibold mb-4">Contact Us</h3>
      <div v-if="submitted" class="p-4 bg-green-500/20 text-green-400 rounded-xl text-center">
        Message sent! We'll respond within 24 hours.
      </div>
      <div v-else class="space-y-4">
        <input v-model="contactForm.name" type="text" placeholder="Your Name" class="w-full px-4 py-3 bg-luxury-dark rounded-xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-luxury-gold" />
        <input v-model="contactForm.email" type="email" placeholder="Email Address" class="w-full px-4 py-3 bg-luxury-dark rounded-xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-luxury-gold" />
        <textarea v-model="contactForm.message" placeholder="How can we help?" rows="4" class="w-full px-4 py-3 bg-luxury-dark rounded-xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-luxury-gold resize-none"></textarea>
        <button @click="submitForm" class="w-full py-3 bg-luxury-gold text-luxury-dark font-semibold rounded-xl">Send Message</button>
      </div>
    </div>
    
    <!-- FAQs -->
    <h3 class="font-semibold mb-4">Frequently Asked Questions</h3>
    <div class="space-y-3">
      <div 
        v-for="(faq, index) in faqs" 
        :key="index"
        class="bg-luxury-charcoal rounded-xl overflow-hidden"
      >
        <button 
          @click="toggleFaq(index)"
          class="w-full p-4 flex items-center justify-between text-left"
        >
          <span class="font-medium">{{ faq.question }}</span>
          <svg 
            class="w-5 h-5 transition-transform" 
            :class="expandedFaq === index ? 'rotate-180' : ''"
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24"
          >
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
          </svg>
        </button>
        <div 
          v-if="expandedFaq === index"
          class="px-4 pb-4 text-gray-400 text-sm"
        >
          {{ faq.answer }}
        </div>
      </div>
    </div>
    
    <!-- Contact Info -->
    <div class="mt-6 bg-luxury-charcoal rounded-2xl p-6">
      <h3 class="font-semibold mb-4">Other Ways to Reach Us</h3>
      <div class="space-y-3">
        <div class="flex items-center gap-3">
          <svg class="w-5 h-5 text-luxury-gold" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
          <span class="text-gray-400">support@sanctuaryspa.com</span>
        </div>
        <div class="flex items-center gap-3">
          <svg class="w-5 h-5 text-luxury-gold" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" /></svg>
          <span class="text-gray-400">+1 (555) 123-4567</span>
        </div>
        <div class="flex items-center gap-3">
          <svg class="w-5 h-5 text-luxury-gold" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
          <span class="text-gray-400">123 Wellness Street, Spa City</span>
        </div>
      </div>
    </div>
  </div>
</template>
