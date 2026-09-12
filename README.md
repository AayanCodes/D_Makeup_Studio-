# D Makeup Studio & Academy 💄✨

> A modern, full-stack web application for **D Makeup Studio & Academy** (Bijnor, Uttar Pradesh) — featuring online booking with deposit payment (QR Code & UPI), interactive before/after transformation slider, service menus, stylist profiles, client reviews, and an AI-powered personalized beauty consultant.

---

## 🌟 Overview

**D Makeup Studio & Academy** is a luxury beauty parlour and bridal studio located in Shakti Chowk, Bijnor, UP. This web application provides clients with a seamless digital experience: from exploring bridal and salon services to comparing transformation results, consulting an AI beauty expert, and reserving appointments with online deposit authorizations.

---

## ✨ Features

### 📅 1. Online Appointment Booking & Deposit Payments
- **Multi-Step Scheduling Flow**: Select services, choose a preferred stylist, pick a date and time slot, and provide event notes.
- **Deposit Payment Gateway**:
  - **Instant UPI QR Code**: Dynamically generated UPI payment QR code (`upi://pay`) compatible with Google Pay, PhonePe, Paytm, BHIM, and any standard UPI app.
  - **Copyable Salon UPI ID**: One-click VPA copying (`dmakeupstudio@upi`) and mobile deep-link to trigger payment apps directly.
  - **Multi-Rail Payment Options**: Supports UPI ID, Debit/Credit Cards, and NetBanking.
  - **Downloadable Booking Receipts**: Instant confirmation with a unique booking reference ID and transaction receipt for salon check-in.

### 🔍 2. Booking Receipt Lookup
- Allows clients to look up existing appointments and receipts anytime using their mobile number.

### 🔄 3. Interactive Transformation Gallery
- Interactive before-and-after comparison slider with smooth touch and drag gestures.
- High-performance responsive image filter interactions for mobile, tablet, and desktop devices.
- Filtering by category (Bridal, Party Glam, Hair Makeover, Skin Glow).

### 💅 4. Comprehensive Service Menu
- Transparent breakdown of salon services including:
  - **Signature HD Bridal & Reception Packages**
  - **Airbrush & Traditional Bridal Makeup**
  - **Keratin & Nanoplastia Hair Treatments**
  - **HydraFacial, O3+ Glow, & Organic Skin Therapy**
  - **Party Makeup & Pre-Bridal Packages**
- Real-time price breakdown, duration estimates, and direct *"Book Now"* integration.

### 👩‍🎨 5. Stylist & Artist Profiles
- Verified profiles of master makeup artists and hair stylists detailing experience, specialties, client ratings, and portfolio previews.

### 🤖 6. AI Beauty & Bridal Advisor (Google Gemini)
- Integrated with Google Gemini (`@google/genai`) to generate personalized consultations:
  - Custom advice based on skin type (Oily, Dry, Combination, Sensitive) and hair texture.
  - Event preparation timeline and seasonal skincare regimen.
  - Weather-tailored makeup prep advice for North Indian climates.
  - Recommended D Makeup Studio service packages.

### 💬 7. Client Reviews & Feedback
- Community testimonials from verified brides and salon clients across Bijnor and nearby regions.
- Interactive form for submitting new ratings and reviews.

### 📍 8. Studio Location & Contact Details
- Direct WhatsApp enquiry button, phone calling shortcut, opening hours, and embedded Google Maps directions.

---

## 🛠️ Tech Stack

### Frontend
- **Framework**: [React 19](https://react.dev/) + [Vite](https://vite.dev/)
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **Styling**: [Tailwind CSS v4](https://tailwindcss.com/)
- **Animations**: [Motion](https://motion.dev/)
- **Icons**: [Lucide React](https://lucide.dev/)

### Backend & API
- **Server**: [Node.js](https://nodejs.org/) with [Express](https://expressjs.com/)
- **Development Runtime**: [tsx](https://github.com/privatenumber/tsx)
- **Production Bundler**: [esbuild](https://esbuild.github.io/)
- **AI Integration**: [@google/genai](https://www.npmjs.com/package/@google/genai) (Gemini 2.5 Flash)

---

## 📂 Project Structure

```text
├── src/
│   ├── components/
│   │   ├── AiConsultantModal.tsx       # AI Beauty & Bridal Advisor modal
│   │   ├── BlogSection.tsx             # Beauty tips & bridal trends blog
│   │   ├── BookingLookupModal.tsx      # Phone-based appointment receipt lookup
│   │   ├── BookingModal.tsx            # Multi-step booking & deposit modal (QR, UPI, Cards)
│   │   ├── ContactAndMap.tsx           # Contact form, salon info & Google Map
│   │   ├── Footer.tsx                  # Footer links & quick access
│   │   ├── Header.tsx                  # Navigation bar & quick action buttons
│   │   ├── Hero.tsx                    # Hero banner with call-to-action
│   │   ├── ServiceMenu.tsx             # Categorized salon services with pricing
│   │   ├── StylistProfiles.tsx         # Salon artist bios & expertise
│   │   ├── Testimonials.tsx            # Client reviews & review submission
│   │   └── TransformationGallery.tsx   # Before/After interactive slider
│   ├── data/
│   │   └── salonData.ts                # Studio details, services catalog & team data
│   ├── App.tsx                         # Main application layout & state
│   ├── main.tsx                        # Client entry point
│   ├── index.css                       # Tailwind CSS imports & theme styling
│   └── types.ts                        # TypeScript interfaces & types
├── server.ts                           # Express backend API & Vite middleware
├── metadata.json                       # Application metadata
├── package.json                        # Dependencies & scripts
└── vite.config.ts                      # Vite build configuration
```

---

## 🚀 Getting Started

### Prerequisites
- **Node.js** (v18.0.0 or later recommended)
- **npm** (v9.0.0 or later)

### 1. Clone the Repository
```bash
git clone https://github.com/your-username/d-makeup-studio.git
cd d-makeup-studio
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Configure Environment Variables
Create a `.env` file in the root directory (based on `.env.example`):

```env
# Google Gemini API key for AI Beauty Advisor features
GEMINI_API_KEY="your-gemini-api-key-here"

# Application URL (optional in local development)
APP_URL="http://localhost:3000"
```

> **Note**: If `GEMINI_API_KEY` is not set, the AI Advisor automatically falls back to curated expert beauty routines without interrupting application functionality.

### 4. Run Development Server
```bash
npm run dev
```
Open your browser and navigate to `http://localhost:3000`.

---

## 📦 Production Build

To compile both the Vite client-side bundle and the Express backend bundle:

```bash
# Build client and bundle server
npm run build

# Run production server
npm start
```

---

## 📡 API Endpoints

| Method | Endpoint | Description |
|---|---|---|
| `GET` | `/api/health` | Health check endpoint |
| `POST` | `/api/bookings` | Create new appointment & record deposit |
| `GET` | `/api/bookings/lookup/:phone` | Lookup previous bookings by phone number |
| `POST` | `/api/payments/process-deposit` | Deposit payment authorization simulation |
| `GET` | `/api/reviews` | Fetch client reviews |
| `POST` | `/api/reviews` | Submit a new client review |
| `POST` | `/api/ai/beauty-tips` | Generate personalized consultation via Gemini |

---

## 📜 Available Scripts

- `npm run dev` — Starts the Express backend and Vite in development mode on port 3000.
- `npm run build` — Builds the Vite frontend into `dist/` and bundles `server.ts` with `esbuild` into `dist/server.cjs`.
- `npm start` — Runs the compiled production server (`node dist/server.cjs`).
- `npm run lint` — Runs TypeScript type-checking (`tsc --noEmit`).
- `npm run clean` — Cleans up build artifacts.

---

## 📍 Studio Location

**D Makeup Studio & Academy**  
Opposite Civil Lines, Near Shakti Chowk,  
Bijnor, Uttar Pradesh – 246701, India  
📞 Phone / WhatsApp: +91 86503 67876  
✉️ Email: info@dmakeupstudio.com  
🕒 Hours: Monday – Sunday: 10:00 AM – 8:00 PM

---

## 📄 License

This project is licensed under the [MIT License](LICENSE).
