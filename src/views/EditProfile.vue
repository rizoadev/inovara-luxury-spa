<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const form = ref({
  name: 'Elena Sterling',
  email: 'elena.sterling@email.com',
  phone: '+1 (555) 123-4567',
  dateOfBirth: '1990-05-15',
  address: '456 Wellness Ave, Spa City, SC 12345'
})
const saved = ref(false)

const handleSave = () => {
  saved.value = true
  setTimeout(() => {
    saved.value = false
    router.push('/profile')
  }, 1500)
}
</script>

<template>
  <div class="px-4 py-6">
    <h2 class="text-xl font-bold mb-6">Edit Profile</h2>
    
    <div v-if="saved" class="mb-6 p-4 bg-green-500/20 text-green-400 rounded-xl text-center">
      Profile updated successfully!
    </div>
    
    <div class="bg-luxury-charcoal rounded-2xl p-6 space-y-6">
      <!-- Avatar -->
      <div class="flex items-center gap-4">
        <img 
          src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&q=80" 
          alt="Avatar" 
          class="w-20 h-20 rounded-full object-cover"
        />
        <button class="px-4 py-2 bg-luxury-dark rounded-xl text-sm text-luxury-gold">Change Photo</button>
      </div>
      
      <!-- Form -->
      <div class="space-y-4">
        <div>
          <label class="block text-sm text-gray-400 mb-2">Full Name</label>
          <input v-model="form.name" type="text" class="w-full px-4 py-3 bg-luxury-dark rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-luxury-gold" />
        </div>
        <div>
          <label class="block text-sm text-gray-400 mb-2">Email</label>
          <input v-model="form.email" type="email" class="w-full px-4 py-3 bg-luxury-dark rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-luxury-gold" />
        </div>
        <div>
          <label class="block text-sm text-gray-400 mb-2">Phone</label>
          <input v-model="form.phone" type="tel" class="w-full px-4 py-3 bg-luxury-dark rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-luxury-gold" />
        </div>
        <div>
          <label class="block text-sm text-gray-400 mb-2">Date of Birth</label>
          <input v-model="form.dateOfBirth" type="date" class="w-full px-4 py-3 bg-luxury-dark rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-luxury-gold" />
        </div>
        <div>
          <label class="block text-sm text-gray-400 mb-2">Address</label>
          <textarea v-model="form.address" rows="2" class="w-full px-4 py-3 bg-luxury-dark rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-luxury-gold resize-none"></textarea>
        </div>
      </div>
      
      <!-- Buttons -->
      <div class="flex gap-4 pt-4">
        <button @click="router.back()" class="flex-1 py-3 bg-luxury-dark rounded-xl">Cancel</button>
        <button @click="handleSave" class="flex-1 py-3 bg-luxury-gold text-luxury-dark font-semibold rounded-xl">Save Changes</button>
      </div>
    </div>
    
    <!-- Change Password -->
    <div class="mt-6 bg-luxury-charcoal rounded-2xl p-6">
      <h3 class="font-semibold mb-4">Change Password</h3>
      <div class="space-y-4">
        <input type="password" placeholder="Current Password" class="w-full px-4 py-3 bg-luxury-dark rounded-xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-luxury-gold" />
        <input type="password" placeholder="New Password" class="w-full px-4 py-3 bg-luxury-dark rounded-xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-luxury-gold" />
        <input type="password" placeholder="Confirm New Password" class="w-full px-4 py-3 bg-luxury-dark rounded-xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-luxury-gold" />
        <button class="w-full py-3 border border-luxury-gold text-luxury-gold rounded-xl">Update Password</button>
      </div>
    </div>
  </div>
</template>
