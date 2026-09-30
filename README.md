# ÉLANE — Haute Beauté & Grooming Atelier (Sliema, Malta)

[![Next.js](https://img.shields.io/badge/Next.js-14.2-black?style=flat&logo=next.js)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue?style=flat&logo=typescript)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.4-38bdf8?style=flat&logo=tailwindcss)](https://tailwindcss.com/)
[![License](https://img.shields.io/badge/License-MIT-gold.svg)](LICENSE)

A commercial-grade digital platform, guest booking engine, and salon operations suite engineered for **ÉLANE**, a premier luxury European hair, aesthetics, and bespoke grooming atelier located at **123 Triq il-Kbira, Sliema, Malta**.

---

## ✨ Features & Architecture

### 1. High-Fashion Editorial Experience
- **Fluid Route Transitions**: Synchronized champagne gold indicator sweeps and physical sliding active tab animations powered by Framer Motion.
- **Continuous Left-to-Right Discovery**: Seamless, self-running marquee carousels for service discovery and the artisan team showcase.
- **Micro-Interactions**: Hover elevation, 3D card pop-up, and interactive before/after transformation sliders.
- **Strictly Profile-Only Team Collective**: Stylist portfolios highlighting craft disciplines, bios, and credentials without commercial distraction.

### 2. Multi-Channel Booking Engine (`/booking`)
- **7-Step Seamless Flow**: Service selection → Artisan assignment → Location preference → Interactive calendar date/time picker → Guest details → Instant confirmation with unique reference code (`ELN-2026-XXXXX`).
- **Malta Atelier & Island-Wide Concierge**: Supports on-site appointments in Sliema and luxury mobile Home Service across all Malta zones (Valletta, Sliema, Mdina, Mellieħa, Gozo).
- **Calendar Integration**: One-click Google Calendar / iCal export.

### 3. Client Hub (`/account`)
- Real-time appointment management (Reschedule / Cancel).
- Interactive verified post-service review modal.
- Wishlist and personalized beauty profile.

### 4. Gated Salon Operations SaaS Suite (`/admin`)
- **Security-Gated Portal**: Protected by salon director credentials (`admin@elanesalon.com` / `admin123`).
- **Live Agenda**: Real-time appointment status management (Confirm, Complete, Reschedule, Cancel).
- **Scheduled Revenue & Shift Operations**: Daily capacity tracking, staff shifts, and wedding/event inquiries pipeline.

---

## 🛠️ Tech Stack

- **Framework**: [Next.js 14](https://nextjs.org/) (App Router, Server & Client Components)
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/) + Custom Luxury Palette (Charcoal `#171513`, Ivory `#FAF7F2`, Gold `#B99A68`, Sand `#DED4C7`)
- **Icons**: [Lucide React](https://lucide.dev/)
- **Animation**: [Framer Motion](https://www.framer.com/motion/) + GPU-accelerated CSS keyframe tracks
- **Database Schema**: [Prisma ORM](https://www.prisma.io/) (`prisma/schema.prisma` with 21 relational models)

---

## 🚀 Quick Start (Local Development)

```bash
# 1. Clone the repository
git clone https://github.com/<YOUR-USERNAME>/elane-salon-malta.git
cd elane-salon-malta

# 2. Install dependencies
npm install

# 3. Start the development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 🌐 Deploy Live to the Web

The fastest and most reliable way to deploy your Next.js application live is using **[Vercel](https://vercel.com)**:

1. Push this project to your GitHub account (see step-by-step instructions below).
2. Go to [vercel.com/new](https://vercel.com/new) and log in with your GitHub account.
3. Click **"Import"** next to `elane-salon-malta`.
4. Click **"Deploy"** (no custom environment variables required for the demo experience).
5. Within 60 seconds, your site will be live at `https://elane-salon-malta.vercel.app` with free SSL and worldwide CDN!

---

## 📁 Project Structure

```
elane-salon-malta/
├── prisma/
│   └── schema.prisma          # PostgreSQL production database schema
├── public/                    # Static assets & luxury brand imagery
├── src/
│   ├── app/                   # Next.js App Router pages
│   │   ├── page.tsx           # Atelier Homepage
│   │   ├── about/             # Heritage & Atelier story
│   │   ├── services/          # Full treatment menu & dynamic [slug] pages
│   │   ├── women/             # Women's hair & aesthetic therapies
│   │   ├── men/               # Men's grooming suite & hot-towel barbery
│   │   ├── kids/              # Junior & teen styling
│   │   ├── home-service/      # Island-wide concierge home styling
│   │   ├── events/            # Bridal & bespoke celebrations
│   │   ├── shop/              # Boutique retail formulations
│   │   ├── booking/           # 7-Step booking engine
│   │   ├── account/           # Customer dashboard & appointment manager
│   │   └── admin/             # Operations SaaS portal (credential-gated)
│   ├── components/
│   │   ├── layout/            # Navbar with active layoutId animations & Footer
│   │   ├── home/              # Hero, discovery loops, before/after slider
│   │   ├── team/              # Continuous left-to-right team carousel
│   │   └── shared/            # Service cards, modals, and cart drawer
│   ├── context/               # Persisted AppContext with localStorage sync
│   └── data/                  # Curated Mediterranean services & staff data
└── tailwind.config.ts         # Luxury color tokens & typography scale
```

---

## 🔒 Demo Credentials

- **Admin Portal Access**:
  - Email: `admin@elanesalon.com`
  - Password: `admin123`

---

## 📄 License

MIT © [ÉLANE Haute Beauté & Grooming Atelier](https://github.com)
