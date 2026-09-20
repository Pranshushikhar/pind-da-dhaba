# Pind Da Dhaba
## Product Requirements Document (PRD)

**Document Version:** 1.0  
**Project Type:** Fictional Premium Restaurant Demo / Portfolio Project  
**Status:** Ready for implementation  
**Primary Goal:** Create a premium full-stack restaurant website that can later be adapted into a reusable website product for real restaurants.

---

# 1. PRODUCT OVERVIEW

## 1.1 Product Name

**Pind Da Dhaba**

## 1.2 Product Type

A fictional restaurant website created as a portfolio/demo project.

Pind Da Dhaba is **not a real restaurant**.

The website should feel like a legitimate premium restaurant brand while making it clear in an appropriate location that it is a fictional demo concept.

## 1.3 Brand Tagline

**Punjab, Served With Soul.**

Secondary tagline:

**Authentic flavours. Rustic warmth. Modern hospitality.**

## 1.4 Product Vision

Build a visually exceptional restaurant website combining:

- traditional Punjabi warmth
- modern premium restaurant aesthetics
- cinematic food photography
- sophisticated animations
- excellent mobile UX
- functional restaurant interactions
- full-stack architecture
- MongoDB persistence
- reusable configuration

The final result should be good enough to demonstrate to real restaurant owners as an example of what a professional restaurant website could look like.

---

# 2. BUSINESS OBJECTIVE

The website serves two purposes.

### Primary

Demonstrate the ability to create premium websites for restaurants.

### Secondary

Serve as a reusable technical foundation for future restaurant clients.

The architecture must therefore separate:

- restaurant content
- branding
- images
- menu data
- contact information
- testimonials
- theme configuration

from the UI components.

A future restaurant should be able to receive the same architecture with its own:

- name
- logo
- colors
- photos
- menu
- address
- phone
- WhatsApp
- opening hours
- social links

without requiring major frontend restructuring.

---

# 3. TARGET USERS

## 3.1 Website Visitors

Potential restaurant customers who want to:

- discover the restaurant
- view the menu
- see food and ambience
- read reviews
- learn about the restaurant
- make a reservation
- contact the restaurant
- find the location

## 3.2 Restaurant Owner / Manager

For the demo dashboard, the owner should be able to:

- view reservations
- change reservation status
- view enquiries
- manage menu items
- toggle menu availability

## 3.3 Portfolio Viewer

A potential client or recruiter should immediately understand that the project demonstrates:

- high-end UI design
- responsive development
- animation
- frontend engineering
- backend development
- MongoDB
- REST APIs
- deployment readiness

---

# 4. DESIGN DIRECTION

## 4.1 Design Concept

### Modern Punjabi Luxury

The visual identity should combine:

**Traditional Punjab**

with

**Contemporary premium restaurant design.**

The site should feel:

- warm
- sophisticated
- authentic
- atmospheric
- premium
- welcoming
- food-focused

## 4.2 Avoid

Do NOT create:

- cartoonish Punjabi graphics
- excessive truck-art patterns
- cheesy cultural clichés
- excessive red/yellow
- childish animations
- generic SaaS layouts
- excessive glassmorphism
- excessive gradients
- excessive rounded cards
- random decorative elements

## 4.3 Visual Inspiration

Use the visual language of:

- premium restaurants
- editorial food photography
- boutique hospitality
- luxury dining websites
- modern Indian restaurants

## 4.4 Suggested Palette

Primary:

Deep Charcoal

Secondary:

Warm Cream

Accent:

Muted Terracotta

Accent:

Earthy Brown

Highlight:

Subtle Saffron / Gold

Colors must remain sophisticated and restrained.

---

# 5. TYPOGRAPHY

Use:

- premium modern sans-serif for body text
- elegant editorial/display font for large headings where appropriate

Typography must prioritize:

- readability
- hierarchy
- premium appearance
- responsive scaling

Use fluid typography where appropriate.

---

# 6. TECHNOLOGY STACK

## Frontend

- React
- TypeScript
- Vite
- Tailwind CSS
- Framer Motion
- Lucide React

## Backend

- Node.js
- Express
- TypeScript

## Database

- MongoDB
- Mongoose

## Deployment

Frontend:

Vercel

Backend:

Render

Repository:

GitHub

---

# 7. SYSTEM ARCHITECTURE

Use a monorepo-style structure:

```text
pind-da-dhaba/
│
├── frontend/
├── backend/
├── docs/
│   └── PRD.md
├── .gitignore
├── README.md
└── .env.example
```

Frontend and backend must remain independently deployable.

---

# 8. FRONTEND PAGES / ROUTES

Required routes:

```text
/
 /menu
 /gallery
 /story
 /contact
 /reserve
 /admin
```

The homepage may contain sections linking to the dedicated pages.

Use client-side routing.

---

# 9. HOMEPAGE

The homepage must contain:

1. Navbar
2. Hero
3. Brand statement
4. Trust/statistics section
5. Signature dishes
6. Menu preview
7. Story section
8. Experience section
9. Marquee
10. Gallery preview
11. Testimonials
12. Reservation CTA
13. Contact/location
14. Footer
15. Mobile action bar

---

# 10. NAVIGATION

## Desktop

Navigation items:

- Home
- Our Story
- Menu
- Gallery
- Reviews
- Contact

Primary CTA:

**Book a Table**

## Behavior

At page top:

- transparent navbar

After scrolling:

- dark/blurred background
- subtle border
- subtle shadow

Use smooth transitions.

## Mobile

Use:

- hamburger button
- full-screen/drawer navigation
- animated menu items
- Book a Table CTA

---

# 11. HERO

Hero should occupy approximately the first viewport.

## Content

Eyebrow:

**FROM THE HEART OF PUNJAB**

Headline:

**PUNJAB,  
SERVED WITH SOUL.**

Description:

**Bold flavours, smoky tandoors and the warmth of a true Punjabi table.**

Primary CTA:

**Explore Our Menu**

Secondary CTA:

**Book a Table**

Bottom indicator:

**SCROLL TO EXPLORE**

## Animation

Sequence:

1. background image fades/scales into place
2. eyebrow appears
3. headline reveals
4. description fades upward
5. buttons stagger
6. scroll indicator appears

Use subtle cinematic motion.

---

# 12. DEMO INDICATOR

Because the restaurant is fictional, include a subtle indication such as:

**DEMO CONCEPT — FICTIONAL RESTAURANT**

This should not dominate the website.

Place it in the footer or another unobtrusive location.

---

# 13. BRAND STATEMENT

Section label:

**THE PIND EXPERIENCE**

Heading:

**Where every plate carries a little piece of Punjab.**

Explain that Pind Da Dhaba is a fictional modern interpretation of a traditional Punjabi dhaba.

Use editorial composition rather than a standard card grid.

---

# 14. SIGNATURE DISHES

Feature:

1. Amritsari Kulcha
2. Tandoori Chicken
3. Dal Makhani
4. Butter Chicken

Example fictional prices:

- Amritsari Kulcha — ₹249
- Tandoori Chicken — ₹449
- Dal Makhani — ₹299
- Butter Chicken — ₹399

Each item must contain:

- image
- name
- description
- price
- category

Hover behavior:

- image zoom
- card lift
- subtle overlay
- arrow movement

---

# 15. MENU

Menu categories:

- Veg
- Non-Veg
- Tandoor
- Breads
- Rice
- Desserts
- Drinks

Features:

- category filtering
- search
- responsive layout
- menu item images
- vegetarian indicator
- spicy indicator
- availability status

Search must update results without page reload.

Empty state:

**No dishes found. Try another craving.**

---

# 16. MENU DATA MODEL

Each menu item should support:

```text
id
name
description
price
category
image
vegetarian
spicy
available
createdAt
```

Menu data must ultimately be retrieved through the backend API.

---

# 17. OUR STORY

Heading:

**Born from the warmth of the pind.**

Content should explain the fictional brand concept.

Highlight:

- Traditional Recipes
- Fresh Ingredients
- Clay-Tandoor Cooking
- Made To Share

Include high-quality visual storytelling.

---

# 18. EXPERIENCE SECTION

Create three visual experiences:

### THE TANDOOR

Smoky. Charred. Unforgettable.

### THE THALI

Generous plates made for sharing.

### THE PIND

Come hungry. Leave with stories.

Use cinematic imagery and hover transitions.

---

# 19. GALLERY

Create a masonry-style responsive gallery.

Use 9–12 fictional images.

Image categories:

- food
- tandoor
- interior
- dining
- chai
- naan
- thali
- ambience

Features:

- lazy loading
- hover zoom
- overlay
- fullscreen lightbox
- previous/next
- close
- keyboard support
- mobile support

---

# 20. MARQUEE

Create an animated horizontal marquee containing:

**AUTHENTIC PUNJABI FLAVOURS**

**FRESH FROM THE TANDOOR**

**MADE FOR SHARING**

**PUNJAB, SERVED WITH SOUL**

Animation must be smooth and subtle.

Respect reduced-motion settings.

---

# 21. TESTIMONIALS

Testimonials are fictional demo content.

Create at least five.

Each testimonial:

- name
- review
- rating
- optional avatar

Features:

- carousel
- previous
- next
- pagination
- autoplay
- pause on hover

Do not imply the reviews are from real customers.

---

# 22. RESERVATION SYSTEM

Create a reservation page/form.

Fields:

- name
- phone
- email
- date
- time
- guests
- special request

Validation:

- required fields
- valid email
- valid phone
- guests > 0
- valid date
- sensible time

On submit:

```text
POST /api/reservations
```

Store in MongoDB.

Show a polished success state.

Because this is a fictional demo, display a clear note that reservations are demonstration functionality.

---

# 23. RESERVATION DATA MODEL

```text
Reservation
----------------
name
phone
email
date
time
guests
specialRequest
status
createdAt
```

Status values:

```text
pending
confirmed
cancelled
```

Default:

```text
pending
```

---

# 24. CONTACT SYSTEM

Contact form fields:

- name
- email
- phone
- message

Endpoint:

```text
POST /api/contact
```

Store in MongoDB.

Show:

- loading
- success
- validation error
- server error
- empty states where relevant

---

# 25. CONTACT INFORMATION

Use fictional demo information only.

Example:

```text
Pind Da Dhaba
Sector 17, Chandigarh
India

Phone:
+91 98765 43210

Email:
hello@pinddadha.ba
```

Opening hours:

```text
Monday–Thursday
11:00 AM – 11:00 PM

Friday–Sunday
11:00 AM – 12:00 AM
```

Clearly identify this information as fictional demo data.

Do not present a fake Google Maps location as a real business location.

Use a styled map/location placeholder or clearly labelled demo map.

---

# 26. BACKEND API

Required endpoints:

```text
GET    /api/health

GET    /api/menu
POST   /api/menu
PUT    /api/menu/:id
DELETE /api/menu/:id

POST   /api/reservations
GET    /api/reservations
PUT    /api/reservations/:id

POST   /api/contact
GET    /api/contact
```

Use REST conventions.

Return appropriate HTTP status codes.

Implement:

- validation
- centralized error handling
- clean controllers
- clean routes
- clean models

---

# 27. DATABASE MODELS

Create:

```text
MenuItem
Reservation
ContactMessage
```

Use Mongoose.

MongoDB connection must use:

```text
process.env.MONGODB_URI
```

Never hardcode credentials.

---

# 28. ADMIN DEMO

Create:

```text
/admin
```

This is a portfolio demonstration dashboard.

It must clearly be labelled as a demo.

Dashboard statistics:

- total menu items
- available menu items
- total reservations
- pending reservations
- total enquiries

Reservation management:

- view
- confirm
- cancel

Menu management:

- add
- edit
- delete
- toggle availability

Contact management:

- view enquiries

Do not implement insecure fake authentication merely for appearance.

If authentication is implemented, use a proper architecture and environment-based credentials.

---

# 29. SEED DATA

Create:

```text
backend/seed.ts
```

Seed:

- 10–15 menu items
- 5 fictional testimonials
- several fictional reservations
- several fictional enquiries

All data must be clearly demo data.

Never use real personal information.

---

# 30. CONFIGURATION SYSTEM

Create:

```text
frontend/src/config/site.ts
```

Centralize:

```text
siteName
tagline
description
phone
whatsapp
email
address
hours
socialLinks
hero
gallery
testimonials
menuCategories
theme
```

Restaurant-specific content should not be scattered throughout components.

This is a core requirement because the project must later be reusable for other restaurant clients.

---

# 31. ANIMATION SYSTEM

Use Framer Motion.

Create reusable variants:

```text
fadeUp
fadeDown
fadeLeft
fadeRight
scaleIn
staggerChildren
imageReveal
```

Animations should be:

- smooth
- subtle
- fast
- premium

Avoid:

- excessive bouncing
- huge movements
- distracting transitions
- animation on every single element

Respect:

```text
prefers-reduced-motion
```

---

# 32. MICROINTERACTIONS

Buttons:

- subtle scale
- shadow transition
- arrow movement

Cards:

- subtle lift
- image zoom

Navigation links:

- animated underline

Images:

- subtle zoom

Interactive elements:

- clear hover
- clear focus
- clear active states

---

# 33. MOBILE EXPERIENCE

Required breakpoints:

```text
320px
375px
390px
430px
768px
1024px
1280px
1440px
1920px
```

Mobile must have:

- no horizontal overflow
- readable typography
- proper spacing
- large tap targets
- responsive images
- simplified animations
- mobile navigation
- mobile bottom CTA bar

---

# 34. MOBILE BOTTOM BAR

Show only on mobile:

```text
Call
WhatsApp
Book
```

Make it fixed to the bottom.

Support mobile safe areas.

---

# 35. ACCESSIBILITY

Support:

- keyboard navigation
- focus states
- semantic HTML
- accessible buttons
- form labels
- ARIA labels where required
- color contrast
- reduced motion

Do not rely only on color to communicate state.

---

# 36. SEO

Implement:

- page titles
- meta descriptions
- Open Graph metadata
- canonical URL
- semantic headings
- alt text
- structured data

Because the restaurant is fictional, structured data must not misleadingly claim a real operating business.

---

# 37. PERFORMANCE

Target:

- fast initial load
- optimized images
- lazy loading
- responsive images
- minimal unnecessary JavaScript
- efficient animations

Prefer animation using:

```text
transform
opacity
```

Avoid expensive layout animations.

---

# 38. SECURITY

Never commit:

```text
.env
MongoDB credentials
API keys
private secrets
```

Create:

```text
.env.example
.gitignore
```

`.gitignore` must include:

```text
node_modules
.env
dist
.DS_Store
```

---

# 39. ENVIRONMENT VARIABLES

Frontend:

```text
VITE_API_URL=
```

Backend:

```text
PORT=
MONGODB_URI=
CORS_ORIGIN=
```

Production configuration must not rely on localhost.

---

# 40. DEPLOYMENT ARCHITECTURE

## GitHub

Repository:

```text
pind-da-dhaba
```

Keep frontend and backend in the same repository unless a strong technical reason exists otherwise.

## Vercel

Deploy:

```text
/frontend
```

Frontend environment variable:

```text
VITE_API_URL
```

## Render

Deploy:

```text
/backend
```

Required:

```text
PORT
MONGODB_URI
CORS_ORIGIN
```

## MongoDB

Use MongoDB Atlas or another MongoDB-compatible hosted database.

Never expose database credentials to the frontend.

---

# 41. HEALTH CHECK

Create:

```text
GET /api/health
```

Response:

```json
{
  "status": "ok"
}
```

This endpoint will be used to verify Render deployment.

---

# 42. ERROR HANDLING

Backend must have centralized error handling.

Frontend must gracefully handle:

- API unavailable
- timeout
- invalid input
- server errors
- empty data
- database errors

Do not display raw stack traces to users.

---

# 43. LOADING STATES

Every asynchronous operation must have a polished loading state.

Examples:

- menu skeleton
- reservation submission state
- contact submission state
- dashboard loading
- gallery loading

Avoid blank screens.

---

# 44. PROJECT STRUCTURE

Suggested structure:

```text
pind-da-dhaba/
│
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── config/
│   │   ├── hooks/
│   │   ├── lib/
│   │   ├── animations/
│   │   ├── App.tsx
│   │   └── main.tsx
│   │
│   ├── public/
│   ├── package.json
│   └── vite.config.ts
│
├── backend/
│   ├── src/
│   │   ├── controllers/
│   │   ├── models/
│   │   ├── routes/
│   │   ├── middleware/
│   │   ├── config/
│   │   ├── utils/
│   │   └── server.ts
│   │
│   ├── seed.ts
│   └── package.json
│
├── docs/
│   └── PRD.md
│
├── .gitignore
├── .env.example
└── README.md
```

The implementation may improve this structure if there is a strong engineering reason.

---

# 45. README

Create a professional README containing:

- project overview
- screenshots section placeholder
- features
- technology stack
- project structure
- installation
- environment variables
- MongoDB setup
- frontend development
- backend development
- seed instructions
- API documentation
- deployment instructions
- Vercel instructions
- Render instructions
- demo disclaimer

---

# 46. TESTING REQUIREMENTS

Before declaring the project complete, verify:

### Frontend

- builds successfully
- TypeScript passes
- routes work
- responsive layout works
- no horizontal overflow
- no console errors

### Backend

- starts successfully
- MongoDB connection works
- health endpoint works
- menu API works
- reservation API works
- contact API works

### UI

- navbar works
- mobile menu works
- animations work
- gallery lightbox works
- menu search works
- category filters work
- reservation form works
- contact form works
- mobile bottom bar works

### Admin

- dashboard loads
- menu CRUD works
- reservation status updates work
- enquiries load

---

# 47. ACCEPTANCE CRITERIA

The project is complete only when all of the following are true:

- The website looks premium.
- The website clearly communicates the Pind Da Dhaba brand.
- The site does not look like a generic AI-generated template.
- It works on mobile and desktop.
- Navigation works.
- Menu filtering works.
- Menu search works.
- Gallery works.
- Lightbox works.
- Reservation submission works.
- Contact submission works.
- MongoDB persistence works.
- Admin demo works.
- Backend API works.
- Environment variables are used correctly.
- Frontend can deploy to Vercel.
- Backend can deploy to Render.
- MongoDB can connect through environment configuration.
- No secrets are committed.
- No major console errors exist.
- Accessibility basics are implemented.
- Reduced-motion behavior works.
- README is complete.
- Demo data is clearly fictional.

---

# 48. IMPLEMENTATION RULE

This PRD defines the source of truth for implementation.

Before writing application code:

1. Read this entire PRD.
2. Identify architectural dependencies.
3. Create the project structure.
4. Implement the design system.
5. Implement frontend.
6. Implement backend.
7. Implement database models.
8. Implement APIs.
9. Implement demo admin.
10. Seed demo data.
11. Test.
12. Fix issues.
13. Prepare deployment configuration.

Do not skip directly to a visually impressive frontend while leaving the backend architecture incomplete.

Do not create fake functionality that only appears to work.

Core functionality must actually work.

---

# 49. IMPORTANT IMPLEMENTATION PRINCIPLE

This project is intended to become a reusable restaurant website system.

Therefore:

**Separate content from presentation.**

Do not hardcode restaurant-specific content inside UI components when it can reasonably live in configuration or the database.

The Pind Da Dhaba brand should be replaceable without rewriting the entire application.

---

# 50. DEFINITION OF DONE

The project is considered done only when it can be:

1. cloned from GitHub
2. configured with environment variables
3. connected to MongoDB
4. started locally
5. used as a restaurant website
6. used to submit demo reservations
7. used to submit contact enquiries
8. managed through the demo admin
9. deployed to Vercel
10. deployed to Render

AND the visual quality must be high enough to use as a portfolio demonstration for prospective restaurant clients.

---

# FINAL INSTRUCTION TO IMPLEMENTATION AGENT

Treat this PRD as the authoritative product specification.

Do not remove requirements simply because they are inconvenient.

If an implementation detail is unspecified, choose a sensible production-quality solution consistent with the architecture and design direction above.

Prioritize:

1. visual quality
2. user experience
3. responsive behavior
4. maintainable architecture
5. actual functionality
6. performance
7. accessibility
8. deployment readiness

Build the project as a real full-stack application, not a static mockup.
