<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const form = ref({
  name: '',
  email: '',
  phone: '',
  password: '',
  confirmPassword: ''
})
const agreeTerms = ref(false)
const error = ref('')

const handleRegister = () => {
  if (!form.value.name || !form.value.email || !form.value.password) {
    error.value = 'Please fill in all required fields'
    return
  }
  if (form.value.password !== form.value.confirmPassword) {
    error.value = 'Passwords do not match'
    return
  }
  if (!agreeTerms.value) {
    error.value = 'Please agree to the terms'
    return
  }
  localStorage.setItem('isLoggedIn', 'true')
  router.push('/')
}
</script>

<template>
  <div class="px-4 py-6">
    <div class="bg-luxury-charcoal rounded-2xl p-6">
      <h2 class="text-xl font-bold mb-2 text-center">Create Account</h2>
      <p class="text-gray-400 text-center mb-6">Join Sanctuary Spa for exclusive benefits</p>
      
      <div v-if="error" class="mb-4 p-3 bg-red-500/20 text-red-400 rounded-xl text-sm">{{ error }}</div>
      
      <div class="space-y-4">
        <div>
          <label class="block text-sm text-gray-400 mb-2">Full Name *</label>
          <input v-model="form.name" type="text" placeholder="Enter your name" class="w-full px-4 py-3 bg-luxury-dark rounded-xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-luxury-gold" />
        </div>
        <div>
          <label class="block text-sm text-gray-400 mb-2">Email *</label>
          <input v-model="form.email" type="email" placeholder="Enter your email" class="w-full px-4 py-3 bg-luxury-dark rounded-xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-luxury-gold" />
        </div>
        <div>
          <label class="block text-sm text-gray-400 mb-2">Phone Number</label>
          <input v-model="form.phone" type="tel" placeholder="+1 (555) 123-4567" class="w-full px-4 py-3 bg-luxury-dark rounded-xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-luxury-gold" />
        </div>
        <div>
          <label class="block text-sm text-gray-400 mb-2">Password *</label>
          <input v-model="form.password" type="password" placeholder="Create password" class="w-full px-4 py-3 bg-luxury-dark rounded-xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-luxury-gold" />
        </div>
        <div>
          <label class="block text-sm text-gray-400 mb-2">Confirm Password *</label>
          <input v-model="form.confirmPassword" type="password" placeholder="Confirm password" class="w-full px-4 py-3 bg-luxury-dark rounded-xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-luxury-gold" />
        </div>
        
        <label class="flex items-start gap-3 cursor-pointer">
          <input v-model="agreeTerms" type="checkbox" class="mt-1 w-5 h-5 rounded bg-luxury-dark border-gray-600 text-luxury-gold focus:ring-luxury-gold" />
          <span class="text-sm text-gray-400">I agree to the <a href="#" class="text-luxury-gold">Terms of Service</a> and <a href="#" class="text-luxury-gold">Privacy Policy</a></span>
        </label>
        
        <button @click="handleRegister" class="w-full py-3 bg-luxury-gold text-luxury-dark font-semibold rounded-xl">Create Account</button>
      </div>
      
      <p class="mt-6 text-center text-gray-400 text-sm">
        Already have an account? 
        <router-link to="/login" class="text-luxury-gold">Sign In</router-link>
      </p>
    </div>
  </div>
</template>
