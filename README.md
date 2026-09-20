# Pind Da Dhaba (ਪਿੰਡ ਦਾ ਢਾਬਾ)
### *Punjab, Served With Soul.*

> **DEMO CONCEPT — FICTIONAL RESTAURANT SHOWCASE**  
> *Pind Da Dhaba is a full-stack modern restaurant web application built as a portfolio showcase and an adaptable, reusable architecture for future hospitality clients. It is not an operating commercial eatery.*

---

## 📸 Overview

**Pind Da Dhaba** combines traditional Punjabi warmth, rustic charcoal tandoor heritage, and contemporary luxury dining aesthetics. Built with **React 19**, **TypeScript**, **Tailwind CSS**, **Framer Motion**, and **Express / MongoDB**, the project delivers smooth micro-animations, rich editorial typography, and functional full-stack interactions including instant table reservations, menu management, and real-time administrative control.

---

## ✨ Key Features

- **Cinematic Visual Identity**: Modern Punjabi Luxury color palette (Deep Charcoal, Warm Cream, Muted Terracotta, Earthy Brown, and Subtle Saffron/Gold).
- **Separation of Content & Presentation**: Centralized `frontend/src/config/site.ts` allows quick rebranding and client customization in minutes.
- **Dynamic Dhaba Menu**: Category tabs (Veg, Non-Veg, Tandoor, Breads, Rice, Desserts, Drinks), instant debounced search, pure vegetarian filter, and availability status.
- **Atmospheric Masonry Gallery**: Fullscreen keyboard-accessible Lightbox with prev/next controls, category filtering, and image optimization.
- **Full Table Reservation Flow**: Validated booking forms with guest slider, date/time pickers, and persistent database storage.
- **Interactive Customer Enquiries**: Direct messaging system for inquiries, reviews, and event bookings.
- **Portfolio Admin Console (`/admin`)**:
  - Live statistics dashboard (dishes, reservations, enquiries, DB connection status).
  - One-click dish availability toggle (`In Stock` / `Sold Out`).
  - Add, edit, and delete dishes with modal forms.
  - Accept or cancel incoming table reservations in real-time.
- **Resilient Offline Fallback**: If MongoDB or Render backend is asleep/offline, the frontend seamlessly utilizes structured demo fallbacks and local storage state so reviewers never see a blank or broken page.
- **Mobile-First Luxury Experience**: Tested across 9 screen breakpoints (320px to 1920px), featuring a fixed mobile bottom action bar (`Call`, `WhatsApp`, `Book`).

---

## 🛠️ Technology Stack

### Frontend
- **Framework**: React 19 + TypeScript + Vite
- **Styling**: Tailwind CSS (custom tokens for Modern Punjabi Luxury)
- **Animations**: Framer Motion (hardware-accelerated transforms, reduced motion support)
- **Routing**: `react-router-dom` (client-side routing with `vercel.json` rewrite)
- **Icons**: `lucide-react`

### Backend
- **Runtime & Server**: Node.js + Express + TypeScript
- **Database ODM**: Mongoose (MongoDB / MongoDB Atlas)
- **Validation**: Zod (strict schema validation for all endpoints)
- **Security & Rate Limiting**: `helmet`, `cors`, `express-rate-limit`
- **Execution & Seeding**: `tsx`

### Deployment Readiness
- **Frontend**: Cloudflare Pages (`public/_redirects` for client-side SPA routing)
- **Backend**: Render Web Service (`render.yaml` with `rootDir: backend`)
- **Database**: MongoDB Atlas (persistent cloud cluster with idempotent seed script)

---

## 📁 Project Structure

```text
pind-da-dhaba/
├── frontend/
│   ├── src/
│   │   ├── animations/           # Framer Motion variants (fadeUp, scaleIn, etc.)
│   │   ├── components/
│   │   │   ├── common/           # Navbar, Footer, MobileActionBar, Button, Modal, Badge
│   │   │   └── home/             # Hero, BrandStatement, SignatureDishes, Marquee, etc.
│   │   ├── config/
│   │   │   └── site.ts           # Centralized restaurant brand & content configuration
│   │   ├── lib/                  # Resilient API client & utility functions
│   │   ├── pages/                # Home, Menu, Gallery, Story, Reserve, Contact, Admin
│   │   ├── types/                # TypeScript interfaces
│   │   ├── App.tsx               # App routes and persistent shell
│   │   ├── index.css             # Tailwind layers, scrollbars, and luxury textures
│   │   └── main.tsx              # DOM mounting
│   ├── public/                   # Vector favicons and static assets
│   ├── tailwind.config.js        # Punjabi Luxury color palette and breakpoints
│   ├── vercel.json               # SPA routing rewrite rule
│   └── package.json
│
├── backend/
│   ├── src/
│   │   ├── config/               # Database connection and environment variables
│   │   ├── controllers/          # Menu, reservation, contact, and admin business logic
│   │   ├── middleware/           # Centralized error handler and admin auth
│   │   ├── models/               # Mongoose schemas (MenuItem, Reservation, ContactMessage)
│   │   ├── routes/               # REST endpoints
│   │   ├── utils/                # Validation schemas (Zod) and initial seed data
│   │   └── server.ts             # Express server setup and route mounting
│   ├── seed.ts                   # Idempotent database seeding script
│   ├── render.yaml               # Render deployment blueprint
│   └── package.json
│
├── docs/
│   └── PRD.md                    # Canonical Product Requirements Document
├── .env.example                  # Consolidated environment variable reference
├── .gitignore                    # Monorepo gitignore
└── README.md                     # Documentation
```

---

## 🚀 Getting Started Locally

### 1. Prerequisites
- Node.js (v18 or higher)
- npm (v9 or higher)
- MongoDB instance (local or MongoDB Atlas connection URI)

### 2. Clone Repository
```bash
git clone https://github.com/your-username/pind-da-dhaba.git
cd pind-da-dhaba
```

### 3. Environment Variables
Copy `.env.example` templates for both frontend and backend:

```bash
# Backend
cp backend/.env.example backend/.env

# Frontend
cp frontend/.env.example frontend/.env
```

**Backend (`backend/.env`):**
```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/pind_da_dhaba
CORS_ORIGIN=http://localhost:5173
ADMIN_SECRET_KEY=dhaba_demo_admin_2026
NODE_ENV=development
```

**Frontend (`frontend/.env`):**
```env
VITE_API_URL=http://localhost:5000/api
VITE_ADMIN_DEMO_KEY=dhaba_demo_admin_2026
```

### 4. Install Dependencies

```bash
# Install backend dependencies
cd backend
npm install

# Install frontend dependencies
cd ../frontend
npm install
```

### 5. Seed the Database (Optional but Recommended)
Populate MongoDB with authentic demo menu dishes, reservations, and inquiries:
```bash
cd backend
npm run seed
```

### 6. Run the Application
In separate terminal windows:

**Terminal 1 (Backend API):**
```bash
cd backend
npm run dev
# Server runs on http://localhost:5000
# Health check: http://localhost:5000/api/health
```

**Terminal 2 (Frontend App):**
```bash
cd frontend
npm run dev
# Application runs on http://localhost:5173
```

---

## 📡 REST API Documentation

| Method | Endpoint | Access | Description |
|---|---|---|---|
| `GET` | `/api/health` | Public | Service health & database connectivity status |
| `GET` | `/api/menu` | Public | List menu items (`?category=...&search=...&available=true`) |
| `POST` | `/api/menu` | Admin | Create a new dish |
| `PUT` | `/api/menu/:id` | Admin | Update dish details or toggle availability |
| `DELETE` | `/api/menu/:id` | Admin | Remove a dish from the menu |
| `POST` | `/api/reservations` | Public | Submit a table reservation |
| `GET` | `/api/reservations` | Admin | Retrieve all reservations (`?status=pending/confirmed/cancelled`) |
| `PUT` | `/api/reservations/:id` | Admin | Update reservation status |
| `POST` | `/api/contact` | Public | Submit a customer enquiry or feedback message |
| `GET` | `/api/contact` | Admin | Retrieve customer messages |
| `GET` | `/api/admin/stats` | Admin | Aggregate dashboard counts & DB status |

*Note: Administrative endpoints require header `x-admin-key: <ADMIN_SECRET_KEY>`.*

---

## 🌐 Production Deployment Guide

### Architecture Overview
```text
GitHub Repository
   ├── Frontend (frontend/)  ───>  Cloudflare Pages (*.pages.dev / custom domain)
   └── Backend  (backend/)   ───>  Render Web Service (*.onrender.com)
                                         └── MongoDB Atlas Cluster
```

---

### Local Development

#### Frontend
```bash
cd frontend
npm install
npm run dev
```

#### Backend
```bash
cd backend
npm install
npm run dev
```

---

### MongoDB Atlas Setup
1. Create a free M0 cluster on [MongoDB Atlas](https://www.mongodb.com/cloud/atlas).
2. Create a database user with read/write privileges.
3. In Network Access, allow IP `0.0.0.0/0` (required for Render dynamic IPs).
4. Obtain your connection URI in the format:
   `mongodb+srv://<username>:<password>@<cluster>.mongodb.net/pind_da_dhaba?retryWrites=true&w=majority`
5. Seed the database (run once locally or in build step):
   ```bash
   cd backend
   npm run seed
   ```

---

### Cloudflare Pages (Frontend)
1. In Cloudflare Dashboard, navigate to **Compute (Workers) & Pages** → **Pages** → **Connect to Git**.
2. Select your repository.
3. Build Settings:
   - **Framework Preset**: `Vite`
   - **Root Directory**: `frontend`
   - **Build Command**: `npm run build`
   - **Build Output Directory**: `dist`
4. Environment Variables:
   - `VITE_API_URL`: `https://<your-render-app>.onrender.com/api`
5. Click **Save and Deploy**. `frontend/public/_redirects` automatically configures SPA client-side routing.
6. *(Optional)* Add your custom domain (e.g. `pinddadhaba.com`) under Pages Custom Domains.

---

### Render (Backend)
1. In [Render Dashboard](https://dashboard.render.com), click **New** → **Web Service**.
2. Connect your repository.
3. Build Settings:
   - **Root Directory**: `backend`
   - **Build Command**: `npm install && npm run build`
   - **Start Command**: `npm run start`
4. Environment Variables:
   - `PORT`: `10000` (or leave default assigned by Render)
   - `NODE_ENV`: `production`
   - `MONGODB_URI`: `<your-mongodb-atlas-connection-string>`
   - `CORS_ORIGIN`: `https://<your-cloudflare-pages-app>.pages.dev` (or `https://pinddadhaba.com`)
   - `ADMIN_SECRET_KEY`: `<your-strong-private-secret-key>`
5. Render monitors health at `GET /api/health`.

---

### Environment Variables Summary

#### Backend (`backend/.env` / Render Dashboard)
| Variable | Description |
|---|---|
| `PORT` | Web server listening port (e.g. `10000` on Render) |
| `NODE_ENV` | `production` (enforces strict security & persistent DB check) |
| `MONGODB_URI` | MongoDB Atlas cluster connection string |
| `CORS_ORIGIN` | Cloudflare Pages domain or custom domain |
| `ADMIN_SECRET_KEY` | Strong random private secret for administrative API actions |

#### Frontend (`frontend/.env` / Cloudflare Pages Dashboard)
| Variable | Description |
|---|---|
| `VITE_API_URL` | Public endpoint to the backend API (e.g. `https://<app>.onrender.com/api`) |

---

## 📜 Fictional Concept Disclaimer

Pind Da Dhaba is a fictional brand concept and full-stack software demonstration created for portfolio review and restaurant web architecture prototyping. The telephone numbers, physical addresses, customer reviews, and menu prices shown on the website are strictly demo data and do not represent a commercial operating restaurant.

---

## 👨‍💻 Author & License

Crafted with care, modern React, and authentic Punjabi hospitality.  
ISC License.
