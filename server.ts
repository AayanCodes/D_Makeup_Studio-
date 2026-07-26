import express from "express";
import path from "path";
import dotenv from "dotenv";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI } from "@google/genai";

dotenv.config();

const app = express();
const PORT = 3000;

app.use(express.json());

// In-memory store for bookings & reviews
const bookingsStore: any[] = [
  {
    id: "DMS-BK-9821",
    clientName: "Priya Chauhan",
    clientPhone: "8650367876",
    clientEmail: "priya@example.com",
    serviceIds: ["serv-hd-bridal"],
    stylistId: "stylist-deepika",
    bookingDate: "2026-08-15",
    bookingTime: "11:00 AM",
    notes: "Bridal lehenga color is Crimson Red. Need heavy jewelry setting.",
    totalAmount: 15000,
    depositPaid: 3000,
    paymentMethod: "upi",
    paymentTransactionId: "TXN-UPI-98218734",
    status: "confirmed",
    createdAt: new Date().toISOString()
  }
];

const reviewsStore: any[] = [
  {
    id: "rev-1",
    clientName: "Priya Chauhan",
    serviceName: "Signature HD Bridal Makeup",
    date: "June 2026",
    rating: 5,
    comment: "Deepika ma'am created magic on my wedding day! My HD bridal makeup lasted from morning rituals till late night vidai without cracking or sweating. Received endless compliments! Bijnor's absolute best studio.",
    verified: true,
    location: "Bijnor"
  },
  {
    id: "rev-2",
    clientName: "Shweta Agarwal",
    serviceName: "Keratin Smooth Hair Treatment",
    date: "July 2026",
    rating: 5,
    comment: "Got my Keratin done by Ananya at D Makeup Studio near SRS Mall. My hair was extremely frizzy and unmanageable before. Now it feels so silky and smooth! Very clean salon and polite staff.",
    verified: true,
    location: "Shakti Chowk, Bijnor"
  },
  {
    id: "rev-3",
    clientName: "Ritu Sharma",
    serviceName: "7-Step Advanced HydraFacial",
    date: "May 2026",
    rating: 5,
    comment: "The HydraFacial here gave me instant glass skin glow for my brother's wedding! Meera was super gentle and explained every step. The deposit booking system on their website made reserving my slot hassle-free.",
    verified: true,
    location: "Chandpur, Bijnor"
  }
];

// Lazy initialiser for Gemini API
let genAIInstance: GoogleGenAI | null = null;
function getGenAI(): GoogleGenAI | null {
  if (!genAIInstance) {
    const apiKey = process.env.GEMINI_API_KEY;
    if (apiKey && apiKey !== "MY_GEMINI_API_KEY") {
      genAIInstance = new GoogleGenAI({ apiKey });
    }
  }
  return genAIInstance;
}

// API Health Check
app.get("/api/health", (req, res) => {
  res.json({ status: "ok", studio: "D Makeup Studio, Bijnor", time: new Date().toISOString() });
});

// Create Booking & Process Deposit
app.post("/api/bookings", (req, res) => {
  try {
    const { clientName, clientPhone, clientEmail, serviceIds, stylistId, bookingDate, bookingTime, notes, totalAmount, depositPaid, paymentMethod } = req.body;

    if (!clientName || !clientPhone || !serviceIds || serviceIds.length === 0 || !bookingDate || !bookingTime) {
      return res.status(400).json({ error: "Missing required booking details (Name, Phone, Service, Date, Time)." });
    }

    const bookingId = `DMS-BK-${Math.floor(1000 + Math.random() * 9000)}`;
    const txnId = `TXN-${(paymentMethod || 'PAY').toUpperCase()}-${Date.now().toString().slice(-8)}`;

    const newBooking = {
      id: bookingId,
      clientName,
      clientPhone,
      clientEmail: clientEmail || "client@dmakeupstudio.com",
      serviceIds,
      stylistId: stylistId || "stylist-deepika",
      bookingDate,
      bookingTime,
      notes: notes || "",
      totalAmount: Number(totalAmount) || 0,
      depositPaid: Number(depositPaid) || 500,
      paymentMethod: paymentMethod || "upi",
      paymentTransactionId: txnId,
      status: "confirmed",
      createdAt: new Date().toISOString()
    };

    bookingsStore.unshift(newBooking);

    res.json({
      success: true,
      message: "Deposit payment authorized & booking confirmed successfully!",
      booking: newBooking
    });
  } catch (err: any) {
    res.status(500).json({ error: "Failed to create booking: " + err.message });
  }
});

// Lookup Bookings by Phone
app.get("/api/bookings/lookup/:phone", (req, res) => {
  const phone = req.params.phone.replace(/[^0-9]/g, "");
  const matched = bookingsStore.filter(b => b.clientPhone.replace(/[^0-9]/g, "").includes(phone) || phone.includes(b.clientPhone.replace(/[^0-9]/g, "")));
  res.json({ success: true, count: matched.length, bookings: matched });
});

// Process Deposit Payment Simulation
app.post("/api/payments/process-deposit", (req, res) => {
  const { amount, paymentMethod, clientPhone, clientName } = req.body;
  
  if (!amount || amount <= 0) {
    return res.status(400).json({ error: "Invalid deposit amount" });
  }

  const txnId = `TXN-${(paymentMethod || 'UPI').toUpperCase()}-${Math.floor(10000000 + Math.random() * 90000000)}`;
  
  setTimeout(() => {
    res.json({
      success: true,
      status: "PAID",
      transactionId: txnId,
      amountPaid: amount,
      paymentMethod,
      timestamp: new Date().toISOString(),
      receiptUrl: `#receipt-${txnId}`,
      note: `Deposit of ₹${amount} successfully received for ${clientName || 'Valued Client'}. Remaining balance due at D Makeup Studio salon.`
    });
  }, 1000);
});

// Get Reviews
app.get("/api/reviews", (req, res) => {
  res.json({ success: true, reviews: reviewsStore });
});

// Submit Review
app.post("/api/reviews", (req, res) => {
  const { clientName, serviceName, rating, comment, location } = req.body;
  if (!clientName || !comment) {
    return res.status(400).json({ error: "Client name and review comment are required." });
  }

  const newReview = {
    id: `rev-${Date.now()}`,
    clientName,
    serviceName: serviceName || "Beauty & Makeup Service",
    date: "Just now",
    rating: Number(rating) || 5,
    comment,
    verified: true,
    location: location || "Bijnor"
  };

  reviewsStore.unshift(newReview);
  res.json({ success: true, review: newReview });
});

// AI Personalised Beauty Tips & Recommendations using Gemini
app.post("/api/ai/beauty-tips", async (req, res) => {
  try {
    const { skinType, hairType, occasion, season, skinConcerns } = req.body;

    const ai = getGenAI();
    if (ai) {
      const prompt = `You are the lead beauty & bridal expert at 'D Makeup Studio' in Bijnor, Uttar Pradesh, India.
Generate a friendly, highly personalized 4-step Beauty & Skincare Consultation for a client with:
- Skin Type: ${skinType || 'Combination'}
- Hair Type: ${hairType || 'Normal/Frizzy'}
- Upcoming Occasion: ${occasion || 'Bridal / Wedding Guest'}
- Current Season: ${season || 'Monsoon / Summer'}
- Specific Concerns: ${skinConcerns || 'Glow, Long-lasting makeup'}

Format your response in structured JSON with:
1. "personalizedAdvice": short warm recommendation paragraph.
2. "preEventSkincareTips": 3 key actionable bullet tips for skin prep.
3. "hairStylingTip": 2 actionable hair tips.
4. "recommendedStudioPackage": suggested service from D Makeup Studio (e.g. Signature HD Bridal, HydraFacial, O3+ Glow, or Keratin).
5. "makeupSecret": 1 pro makeup tip for Bijnor weather.`;

      const response = await ai.models.generateContent({
        model: "gemini-2.5-flash",
        contents: prompt,
      });

      const responseText = response.text || "";
      let jsonResult;
      try {
        const cleanJson = responseText.replace(/```json/g, "").replace(/```/g, "").trim();
        jsonResult = JSON.parse(cleanJson);
      } catch {
        jsonResult = {
          personalizedAdvice: responseText,
          preEventSkincareTips: ["Hydrate skin with hyaluronic acid gel moisturizer", "Use O3+ anti-tan peel mask", "Avoid new heavy skincare 1 week prior"],
          hairStylingTip: ["Opt for Keratin smooth treatment for frizz-free humidity resistance", "Use thermal spray before styling waves"],
          recommendedStudioPackage: "Signature HD Bridal Makeup & HydraFacial Package",
          makeupSecret: "Layer mattifying primer on T-zone and lock foundation with sandwich setting spray."
        };
      }

      return res.json({ success: true, consultation: jsonResult });
    }

    // Fallback if Gemini key is not configured
    res.json({
      success: true,
      consultation: {
        personalizedAdvice: `For your ${skinType || 'combination'} skin and ${occasion || 'upcoming celebration'} during ${season || 'monsoon'}, D Makeup Studio recommends a water-based hydration prep followed by HD long-wearing base.`,
        preEventSkincareTips: [
          `Prep skin with 7-step HydraFacial at least 3-5 days before ${occasion || 'the event'}.`,
          "Avoid direct heavy oils on T-zone; use lightweight hyaluronic serums.",
          "Keep drinking 3L water daily and apply SPF 50 daily even indoors."
        ],
        hairStylingTip: [
          `For ${hairType || 'frizzy'} hair, book a Keratin Smooth treatment at D Makeup Studio for 5-month silky shine.`,
          "Always apply heat protection serum before curling or blow-drying."
        ],
        recommendedStudioPackage: "Signature HD Bridal / Party Glam + O3+ Glow Package",
        makeupSecret: "Use D Makeup Studio's signature double setting spray lock technique for sweat-proof results in Bijnor climate."
      }
    });
  } catch (error: any) {
    res.status(500).json({ error: "AI Consultation failed: " + error.message });
  }
});

// Contact Form Endpoint
app.post("/api/contact", (req, res) => {
  const { name, phone, message, subject } = req.body;
  if (!name || !phone) {
    return res.status(400).json({ error: "Name and phone number are required." });
  }

  res.json({
    success: true,
    message: `Thank you, ${name}! Your message regarding "${subject || 'General Enquiry'}" has been sent to D Makeup Studio. Our team will call you back shortly on ${phone}.`
  });
});

// Vite middleware setup for Dev / Production serving
async function startServer() {
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`D Makeup Studio Server running on http://localhost:${PORT}`);
  });
}

startServer();
