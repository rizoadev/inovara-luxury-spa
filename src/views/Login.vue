<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const loginEmail = ref('')
const loginPassword = ref('')
const loginError = ref('')

const handleLogin = () => {
  if (loginEmail.value || loginPassword.value) {
    localStorage.setItem('isLoggedIn', 'true')
    router.push('/')
  } else {
    loginError.value = 'Please enter email and password'
  }
}

const demoLogin = () => {
  localStorage.setItem('isLoggedIn', 'true')
  router.push('/')
}
</script>

<template>
  <div class="px-4 py-6">
    <div class="bg-luxury-charcoal rounded-2xl p-6">
      <h2 class="text-xl font-bold mb-2 text-center">Welcome Back</h2>
      <p class="text-gray-400 text-center mb-6">Sign in to your account</p>
      
      <div v-if="loginError" class="mb-4 p-3 bg-red-500/20 text-red-400 rounded-xl text-sm">{{ loginError }}</div>
      
      <div class="space-y-4">
        <div>
          <label class="block text-sm text-gray-400 mb-2">Email</label>
          <input v-model="loginEmail" type="email" placeholder="demo@spa.com" class="w-full px-4 py-3 bg-luxury-dark rounded-xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-luxury-gold" />
        </div>
        <div>
          <label class="block text-sm text-gray-400 mb-2">Password</label>
          <input v-model="loginPassword" type="password" placeholder="password" class="w-full px-4 py-3 bg-luxury-dark rounded-xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-luxury-gold" />
        </div>
        
        <div class="flex items-center justify-between">
          <label class="flex items-center gap-2 cursor-pointer">
            <input type="checkbox" class="w-4 h-4 rounded bg-luxury-dark border-gray-600 text-luxury-gold focus:ring-luxury-gold" />
            <span class="text-sm text-gray-400">Remember me</span>
          </label>
          <router-link to="/forgot-password" class="text-sm text-luxury-gold">Forgot Password?</router-link>
        </div>
        
        <button @click="handleLogin" class="w-full py-3 bg-luxury-gold text-luxury-dark font-semibold rounded-xl">Sign In</button>
        
        <div class="relative my-4">
          <div class="absolute inset-0 flex items-center">
            <div class="w-full border-t border-luxury-dark"></div>
          </div>
          <div class="relative flex justify-center text-sm">
            <span class="px-2 bg-luxury-charcoal text-gray-400">or</span>
          </div>
        </div>
        
        <button @click="demoLogin" class="w-full py-3 border border-luxury-gold text-luxury-gold rounded-xl font-medium">Continue as Guest</button>
      </div>
      
      <p class="mt-6 text-center text-gray-400 text-sm">
        Don't have an account? 
        <router-link to="/register" class="text-luxury-gold">Sign Up</router-link>
      </p>
    </div>
  </div>
</template>
