<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const email = ref('')
const submitted = ref(false)
const error = ref('')

const handleSubmit = () => {
  if (!email.value) {
    error.value = 'Please enter your email'
    return
  }
  submitted.value = true
}

const goToLogin = () => {
  router.push('/login')
}
</script>

<template>
  <div class="px-4 py-6">
    <div class="bg-luxury-charcoal rounded-2xl p-6">
      <h2 class="text-xl font-bold mb-2 text-center">Forgot Password</h2>
      <p class="text-gray-400 text-center mb-6">Enter your email to receive a password reset link</p>
      
      <div v-if="submitted" class="text-center">
        <div class="w-16 h-16 mx-auto mb-4 rounded-full bg-green-500/20 flex items-center justify-center">
          <svg class="w-8 h-8 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h3 class="font-semibold mb-2">Check Your Email</h3>
        <p class="text-gray-400 text-sm mb-6">We've sent a password reset link to {{ email }}</p>
        <button @click="goToLogin" class="w-full py-3 bg-luxury-gold text-luxury-dark font-semibold rounded-xl">Back to Login</button>
      </div>
      
      <div v-else class="space-y-4">
        <div v-if="error" class="p-3 bg-red-500/20 text-red-400 rounded-xl text-sm">{{ error }}</div>
        
        <div>
          <label class="block text-sm text-gray-400 mb-2">Email Address</label>
          <input v-model="email" type="email" placeholder="Enter your email" class="w-full px-4 py-3 bg-luxury-dark rounded-xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-luxury-gold" />
        </div>
        
        <button @click="handleSubmit" class="w-full py-3 bg-luxury-gold text-luxury-dark font-semibold rounded-xl">Send Reset Link</button>
        
        <p class="text-center text-gray-400 text-sm mt-6">
          Remember your password? 
          <router-link to="/login" class="text-luxury-gold">Sign In</router-link>
        </p>
      </div>
    </div>
  </div>
</template>
