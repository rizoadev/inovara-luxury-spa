<script setup>
import { ref } from 'vue'

const notifications = ref([
  { id: 1, title: 'Booking Confirmed', message: 'Your Deep Tissue Massage with Sarah Mitchell is confirmed for Feb 15, 2025 at 11:00 AM', time: '2 hours ago', read: false },
  { id: 2, title: 'Reminder', message: 'Your upcoming appointment with James Chen is tomorrow at 4:00 PM', time: '1 day ago', read: false },
  { id: 3, title: 'Promo', message: '20% off on your next visit! Valid until end of month.', time: '3 days ago', read: true },
  { id: 4, title: 'Review Request', message: 'How was your session with Emma Rodriguez? Leave a review!', time: '1 week ago', read: true }
])

const markAllRead = () => {
  notifications.value.forEach(n => n.read = true)
}

const markRead = (id) => {
  const n = notifications.value.find(x => x.id === id)
  if (n) n.read = true
}
</script>

<template>
  <div class="px-4 py-6">
    <div class="flex items-center justify-between mb-6">
      <h2 class="text-xl font-bold">Notifications</h2>
      <button @click="markAllRead" class="text-luxury-gold text-sm">Mark all read</button>
    </div>

    <div v-if="notifications.length === 0" class="text-center py-12 text-gray-400">
      No notifications
    </div>

    <div class="space-y-4">
      <div 
        v-for="notification in notifications" 
        :key="notification.id"
        @click="markRead(notification.id)"
        class="p-4 rounded-xl cursor-pointer transition-all"
        :class="notification.read ? 'bg-luxury-charcoal/50' : 'bg-luxury-charcoal border border-luxury-gold/30'"
      >
        <div class="flex items-start gap-4">
          <div 
            class="w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0"
            :class="notification.read ? 'bg-gray-600' : 'bg-luxury-gold'"
          >
            <svg class="w-5 h-5" :class="notification.read ? 'text-gray-400' : 'text-luxury-dark'" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
            </svg>
          </div>
          <div class="flex-1">
            <div class="flex items-center justify-between mb-1">
              <h3 class="font-semibold" :class="notification.read ? '' : 'text-luxury-gold'">{{ notification.title }}</h3>
              <span class="text-xs text-gray-500">{{ notification.time }}</span>
            </div>
            <p class="text-sm text-gray-400">{{ notification.message }}</p>
          </div>
          <div v-if="!notification.read" class="w-2 h-2 rounded-full bg-luxury-gold flex-shrink-0"></div>
        </div>
      </div>
    </div>
  </div>
</template>
