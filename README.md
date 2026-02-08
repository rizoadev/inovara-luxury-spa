# Luxury Spa Landing

A modern luxury spa booking website built with Vue 3, Vue Router, and Tailwind CSS.

## 🚀 Live Demo

**https://luxury-spa-landing.pages.dev/**

## ✨ Features

- **Home** - Hero section, featured services, promo banner, upcoming bookings
- **Services** - Browse all spa services with pricing and details
- **Therapists** - Search and filter therapists by specialty
- **Bookings** - View upcoming and history bookings with cancel/rebook
- **Profile** - User info, favorites, settings
- **Authentication** - Login, Register, Forgot Password
- **Notifications** - Booking confirmations and updates
- **Privacy Policy** - Data protection information
- **Help & Support** - FAQ and contact form

## 🛠️ Tech Stack

- Vue 3 (Composition API)
- Vue Router 4
- Tailwind CSS
- Vite
- Cloudflare Pages

## 📦 Installation

```bash
npm install
npm run dev
```

## 🚀 Deployment

```bash
# Build for production
npm run build

# Deploy to Cloudflare Pages
CLOUDFLARE_API_TOKEN=your_token CLOUDFLARE_ACCOUNT_ID=your_account npx wrangler pages deploy dist --project-name=luxury-spa-landing
```

## 📁 Project Structure

```
src/
├── App.vue           # Main app layout with navigation
├── main.js           # App entry point with router
├── router/index.js   # Vue Router configuration
├── views/
│   ├── Home.vue
│   ├── Services.vue
│   ├── Therapists.vue
│   ├── Bookings.vue
│   ├── Profile.vue
│   ├── Login.vue
│   ├── Register.vue
│   ├── ForgotPassword.vue
│   ├── EditProfile.vue
│   ├── Notifications.vue
│   ├── Privacy.vue
│   └── HelpSupport.vue
└── style.css         # Global styles
```

## 🌐 Routes

| Path | Page |
|------|------|
| / | Home |
| /services | Services |
| /therapists | Therapists |
| /bookings | Bookings |
| /profile | Profile |
| /login | Login |
| /register | Register |
| /forgot-password | Forgot Password |
| /edit-profile | Edit Profile |
| /notifications | Notifications |
| /privacy | Privacy Policy |
| /help-support | Help & Support |

---

Built with ❤️ using Vue 3
