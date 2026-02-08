import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import Services from '../views/Services.vue'
import Therapists from '../views/Therapists.vue'
import Bookings from '../views/Bookings.vue'
import Profile from '../views/Profile.vue'
import Login from '../views/Login.vue'
import Register from '../views/Register.vue'
import ForgotPassword from '../views/ForgotPassword.vue'
import EditProfile from '../views/EditProfile.vue'
import Notifications from '../views/Notifications.vue'
import Privacy from '../views/Privacy.vue'
import HelpSupport from '../views/HelpSupport.vue'

const routes = [
  { path: '/', name: 'Home', component: Home },
  { path: '/services', name: 'Services', component: Services },
  { path: '/therapists', name: 'Therapists', component: Therapists },
  { path: '/bookings', name: 'Bookings', component: Bookings },
  { path: '/profile', name: 'Profile', component: Profile },
  { path: '/login', name: 'Login', component: Login },
  { path: '/register', name: 'Register', component: Register },
  { path: '/forgot-password', name: 'ForgotPassword', component: ForgotPassword },
  { path: '/edit-profile', name: 'EditProfile', component: EditProfile },
  { path: '/notifications', name: 'Notifications', component: Notifications },
  { path: '/privacy', name: 'Privacy', component: Privacy },
  { path: '/help-support', name: 'HelpSupport', component: HelpSupport }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
