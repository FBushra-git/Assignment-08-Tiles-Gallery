# 🏛️ Tiles Gallery

A curated web gallery showcasing premium tiles — ceramic, marble, terracotta, mosaic and more.

## 🌐 Live URL
**https://tiles-gallery.vercel.app** *(update after deploying)*

## ✨ Key Features
- Hero slider with SwiperJS (3 slides, autoplay, fade effect)
- Animated marquee strip via `react-fast-marquee`
- Featured tiles (top 4 by rating) fetched from JSON Server
- Full searchable gallery — search by title, material, category, or tag
- Email/password authentication + Google OAuth via BetterAuth
- Private routes: Tile Detail, My Profile, Update Profile
- Update name & profile image using BetterAuth `updateUser`
- Fully responsive (mobile, tablet, desktop)
- Custom 404, loading, and error pages
- Environment variables for all secrets

## 🚀 Setup

```bash
# 1. Install dependencies
npm install

# 2. Fill in your secrets
# .env.local is already pre-filled

# 3. Start JSON Server (tile data) — keep running in separate terminal
npm run server

# 4. Start Next.js
npm run dev
```

Open http://localhost:3000

## 📦 NPM Packages

| Package | Purpose |
|---|---|
| `next@14` | React framework (App Router) |
| `better-auth` | Auth — email/password + Google OAuth |
| `mongodb` | Database client for BetterAuth adapter |
| `swiper` | SwiperJS hero carousel |
| `react-fast-marquee` | Scrolling marquee strip |
| `react-hot-toast` | Toast notifications |
| `react-icons` | Icon set |
| `tailwindcss` + `daisyui` | Styling |
| `json-server` | Mock REST API for tile data |

## 🛣️ Routes

| Route | Access |
|---|---|
| `/` | Public |
| `/all-tiles` | Public |
| `/login` | Public |
| `/register` | Public |
| `/tile/[id]` | **Private** |
| `/my-profile` | **Private** |
| `/my-profile/update` | **Private** |

## 🚀 Deploy (Vercel)

1. Push to GitHub
2. Import on vercel.com
3. Add environment variables
4. Update `BETTER_AUTH_URL` to your Vercel URL
