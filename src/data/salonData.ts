import { ServiceItem, Stylist, TransformationItem, BlogPost, Testimonial, StudioInfo } from '../types';

export const STUDIO_INFO: StudioInfo = {
  name: "D Makeup Studio",
  tagline: "Premier Bridal Makeup & Beauty Parlour in Bijnor",
  address: "Krishna Plaza, Shakti Chowk, near SRS Mall",
  landmark: "Near SRS Mall",
  city: "Bijnor",
  state: "Uttar Pradesh",
  pincode: "246701",
  phone: "8650367876",
  whatsapp: "918650367876",
  email: "contact@dmakeupstudio.com",
  openingHours: [
    { days: "Monday - Saturday", timing: "09:30 AM - 08:30 PM" },
    { days: "Sunday", timing: "10:00 AM - 08:00 PM" }
  ],
  googleMapsEmbedUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3489.102370928924!2d78.1352!3d29.3734!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390c4232f05a901d%3A0x8bd50280b18fa901!2sShakti%20Chowk%2C%20Bijnor%2C%20Uttar%20Pradesh%20246701!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin",
  googleMapsUrl: "https://maps.google.com/?q=D+Makeup+Studio+Krishna+Plaza+Shakti+Chowk+near+SRS+Mall+Bijnor+Uttar+Pradesh+246701"
};

export const SERVICES_DATA: ServiceItem[] = [
  {
    id: "serv-hd-bridal",
    name: "Signature HD Bridal Makeup",
    category: "bridal",
    price: 15000,
    originalPrice: 18000,
    depositAmount: 3000,
    durationMinutes: 180,
    popular: true,
    description: "Flawless HD long-lasting bridal makeover customized to your lehenga, jewelry, and skin undertone with premium international cosmetics.",
    includes: [
      "HD Airbrush Touchup & Foundation Prep",
      "Eyelash Extensions & Custom Eye Makeup",
      "High-end Hair Styling & Dupatta Draping",
      "Lenses & Saree/Lehenga Draping",
      "Pre-makeup Hydration Mask & Gloss"
    ],
    image: "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&w=800&q=80"
  },
  {
    id: "serv-airbrush-bridal",
    name: "Luxury Airbrush Bridal Makeup",
    category: "bridal",
    price: 20000,
    originalPrice: 24000,
    depositAmount: 4000,
    durationMinutes: 210,
    popular: true,
    description: "Ultra-weightless waterproof airbrush finish that stays sweat-proof and tear-proof all night long for flawless 4K high-definition photography.",
    includes: [
      "Complete Silicone/Water-based Airbrush Base",
      "3D Mink Eyelashes & Contour Sculpting",
      "Designer Bridal Hairstyling with Accessories Draping",
      "Body Shimmer & Jewelry Setting",
      "Touchup Kit & Complimentary Refreshment"
    ],
    image: "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?auto=format&fit=crop&w=800&q=80"
  },
  {
    id: "serv-engagement-sangeet",
    name: "Engagement / Sangeet / Reception Glam",
    category: "makeup",
    price: 6500,
    originalPrice: 8000,
    depositAmount: 1500,
    durationMinutes: 120,
    popular: true,
    description: "Elegant, glowing makeover tailored for bride-to-be for engagement, sangeet night, or reception celebrations.",
    includes: [
      "Dewy / Soft Glam Base",
      "Glitter Eye Accent or Smoky Eye",
      "Trending Messy Bun or Hollywood Waves",
      "Outfit Draping"
    ],
    image: "https://images.unsplash.com/photo-1512496015851-a90fb38ba796?auto=format&fit=crop&w=800&q=80"
  },
  {
    id: "serv-party-makeup",
    name: "Celebration Party Glam & Hair",
    category: "makeup",
    price: 3500,
    originalPrice: 4500,
    depositAmount: 1000,
    durationMinutes: 90,
    popular: false,
    description: "Quick, camera-ready glam makeup with hairstyle for wedding guests, anniversaries, and special events.",
    includes: [
      "Flawless Base Makeup",
      "Standard Eyelashes",
      "Hair Styling (Blowdry / Curls / Straightening)",
      "Lipstick & Blush Setting"
    ],
    image: "https://images.unsplash.com/photo-1526045612212-70caf35c14df?auto=format&fit=crop&w=800&q=80"
  },
  {
    id: "serv-keratin-treatment",
    name: "Keratin Smooth Hair Treatment",
    category: "hair",
    price: 5500,
    originalPrice: 7000,
    depositAmount: 1000,
    durationMinutes: 150,
    popular: true,
    description: "Deep protein rebuilding treatment that eliminates frizz, restores glossy shine, and keeps hair silky smooth for up to 5 months.",
    includes: [
      "Clarifying Detox Wash",
      "Protein Keratin Infusion & Nano Seals",
      "Blowout & Ceramic Iron Finish",
      "Aftercare Guidance & Serum Sample"
    ],
    image: "https://images.unsplash.com/photo-1562322140-8baeececf3df?auto=format&fit=crop&w=800&q=80"
  },
  {
    id: "serv-hair-smoothening",
    name: "Permanent Smoothening / Rebonding",
    category: "hair",
    price: 6000,
    originalPrice: 7500,
    depositAmount: 1500,
    durationMinutes: 180,
    popular: false,
    description: "Transform unruly or frizzy locks into pin-straight, sleek, and lustrous hair with long-lasting structural alignment.",
    includes: [
      "Hair Texture Analysis",
      "Bond Resetting Treatment",
      "Neutralizing Lock & Deep Conditioning",
      "Trim & Serum Seal"
    ],
    image: "https://images.unsplash.com/photo-1580618672591-eb180b1a973f?auto=format&fit=crop&w=800&q=80"
  },
  {
    id: "serv-o3-facial",
    name: "O3+ Bridal Glow Facial",
    category: "skincare",
    price: 3800,
    originalPrice: 4500,
    depositAmount: 800,
    durationMinutes: 90,
    popular: true,
    description: "Premium oxygenating micro-dermal facial designed to erase pigmentation, tan, and dullness for luminous bridal radiance.",
    includes: [
      "Deep Pore Cleansing & Ultrasonic Extraction",
      "O3+ Whitening Peel Off Mask",
      "Serum Massager & Cryo Globe Cooling",
      "Neck & Shoulder De-stress Massage"
    ],
    image: "https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?auto=format&fit=crop&w=800&q=80"
  },
  {
    id: "serv-hydrafacial",
    name: "7-Step Advanced HydraFacial",
    category: "skincare",
    price: 4500,
    originalPrice: 5500,
    depositAmount: 1000,
    durationMinutes: 75,
    popular: true,
    description: "Hydro-dermabrasion deep extraction and serum infusion for instant glass-skin hydration, pore contraction, and youth glow.",
    includes: [
      "Vortex Exfoliation & Acid Peel Infusion",
      "Pore Suction Extraction",
      "Hyaluronic Acid & Peptide Infusion",
      "LED Light Therapy Glow Session"
    ],
    image: "https://images.unsplash.com/photo-1512290900676-26c2a6a095ae?auto=format&fit=crop&w=800&q=80"
  },
  {
    id: "serv-nail-extensions",
    name: "Gel & Acrylic Nail Extensions with Art",
    category: "nails",
    price: 2200,
    originalPrice: 2800,
    depositAmount: 500,
    durationMinutes: 90,
    popular: true,
    description: "Custom length nail extensions with long-lasting gel polish, glitter, foil art, or 3D embellishments.",
    includes: [
      "Nail Shaping & Cuticle Care",
      "Gel / Acrylic Extension Tip Application",
      "Custom Nail Art on 4 Accent Nails",
      "UV Gel Top Coat & Cuticle Oil Massage"
    ],
    image: "https://images.unsplash.com/photo-1604654894610-df63bc536371?auto=format&fit=crop&w=800&q=80"
  }
];

export const STYLISTS_DATA: Stylist[] = [
  {
    id: "stylist-deepika",
    name: "Deepika Sharma",
    role: "Founder & Lead Bridal MUA",
    experienceYears: 9,
    specialties: ["HD Bridal Makeup", "Airbrush Makeup", "Traditional & Indo-Western Hairstyling"],
    bio: "Certified international makeup artist trained in Mumbai & Delhi. Deepika has glammed over 1,200+ brides in Western UP with her signature flawless, natural-skin glowing aesthetic.",
    image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=500&q=80",
    rating: 4.9,
    reviewsCount: 380,
    availableDays: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"]
  },
  {
    id: "stylist-ananya",
    name: "Ananya Roy",
    role: "Senior Hair Stylist & Keratin Specialist",
    experienceYears: 7,
    specialties: ["Keratin & Smoothening", "Bridal Hair Braid Architecture", "Balayage Hair Color"],
    bio: "Passionate hair master specialized in hair bond repairs, glass-smooth hair transformations, and elaborate bridal dupattas & floral bun draping.",
    image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=500&q=80",
    rating: 4.8,
    reviewsCount: 210,
    availableDays: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]
  },
  {
    id: "stylist-meera",
    name: "Meera Verma",
    role: "Senior Skin & HydraFacial Aesthetician",
    experienceYears: 6,
    specialties: ["HydraFacial Glow", "O3+ Anti-Tan Peels", "Pre-Bridal Skincare Routines"],
    bio: "Skincare aesthetician focused on clinical glass skin results. Known for non-invasive glow treatments and relaxing face sculpting massages.",
    image: "https://images.unsplash.com/photo-1567532939604-b6b5b0db2604?auto=format&fit=crop&w=500&q=80",
    rating: 4.9,
    reviewsCount: 195,
    availableDays: ["Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"]
  }
];

export const TRANSFORMATIONS_DATA: TransformationItem[] = [
  {
    id: "trans-bridal-1",
    title: "Royal Red Velvet HD Bridal Transformation",
    category: "bridal",
    beforeImage: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=800&q=80",
    afterImage: "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&w=800&q=80",
    description: "Complete royal bridal makeover with HD base to conceal uneven tones, soft smoky eyes with gold foil glitter, and regal dupatta setting.",
    artistName: "Deepika Sharma",
    servicesUsed: ["Signature HD Bridal Makeup", "Bridal Hair Styling", "Lenses & Draping"]
  },
  {
    id: "trans-hair-1",
    title: "Frizzy to Silk Glass Keratin Transformation",
    category: "hair",
    beforeImage: "https://images.unsplash.com/photo-1519699047748-de8e457a634e?auto=format&fit=crop&w=800&q=80",
    afterImage: "https://images.unsplash.com/photo-1562322140-8baeececf3df?auto=format&fit=crop&w=800&q=80",
    description: "Rebuilt damaged chemical curls into ultra-glossy, mirror-shine smooth straight hair with Brazilian Keratin treatment.",
    artistName: "Ananya Roy",
    servicesUsed: ["Keratin Smooth Hair Treatment", "Split End Trim", "Argan Serum Lock"]
  },
  {
    id: "trans-sangeet-1",
    title: "Emerald Sangeet Glam & Hollywood Waves",
    category: "makeup",
    beforeImage: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=800&q=80",
    afterImage: "https://images.unsplash.com/photo-1512496015851-a90fb38ba796?auto=format&fit=crop&w=800&q=80",
    description: "Glitz & glam evening transformation for sangeet dance night, featuring soft glowing skin and open romantic waves.",
    artistName: "Deepika Sharma",
    servicesUsed: ["Engagement / Sangeet Glam", "Hollywood Open Waves"]
  },
  {
    id: "trans-nails-1",
    title: "Ombre Nude & Rose Gold Glitter Nail Art",
    category: "nails",
    beforeImage: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=800&q=80",
    afterImage: "https://images.unsplash.com/photo-1604654894610-df63bc536371?auto=format&fit=crop&w=800&q=80",
    description: "Short damaged nails reshaped into elegant almond shape gel extension with custom bridal ombre and stone embellishments.",
    artistName: "Deepika Sharma",
    servicesUsed: ["Gel Nail Extensions", "Custom Bridal Nail Art"]
  }
];

export const BLOG_POSTS_DATA: BlogPost[] = [
  {
    id: "blog-1",
    title: "Monsoon Beauty Hacks: How to Keep Makeup Sweat-Proof & Humidity-Resistant",
    category: "makeup",
    season: "monsoon",
    author: "Deepika Sharma",
    date: "July 18, 2026",
    readTime: "4 min read",
    summary: "Humidity causing your foundation to melt? Learn professional primer layering, setting spray secrets, and waterproof mascara tips from D Makeup Studio.",
    content: `
Monsoon in Uttar Pradesh brings welcomed rain, but for makeup lovers, high humidity and sudden sweat can ruin a carefully crafted look within minutes.

### 1. Prep with an Oil-Control Gel Moisturizer
Ditch heavy creams during monsoon! Switch to a water-based hyaluronic acid gel moisturizer. Apply it 10 minutes before starting makeup so your skin absorbs the hydration without feeling oily.

### 2. The Matte Pore-Minimizing Primer
Apply a silicone or pore-blurring mattifying primer specifically on your T-zone (forehead, nose, chin). This creates a barrier between natural sebum and your makeup base.

### 3. Switch to Long-Wear Waterproof Formula
Opt for oil-free liquid foundations or HD airbrush formulas. Avoid cream blushes that melt in humidity; powder blushes or tint-stains stay intact much longer.

### 4. Sandwich Setting Spray Technique
D Makeup Studio's secret bridal trick: Spray a light mist of setting spray *before* foundation, and lock everything in with a second mist *after* translucent powder setting!

### 5. Waterproof Eye Accent & Gel Liners
Humidity makes eye makeup smudge easily. Always prime your eyelids with eye primer or concealer set with translucent powder before using gel waterproof eyeliner and waterproof mascara.
    `,
    image: "https://images.unsplash.com/photo-1512496015851-a90fb38ba796?auto=format&fit=crop&w=800&q=80",
    tags: ["Monsoon Makeup", "SweatProof", "HD Foundation", "Bijnor Beauty"]
  },
  {
    id: "blog-2",
    title: "Ultimate 3-Month Pre-Bridal Skincare & Hair Care Checklist",
    category: "bridal",
    season: "all-season",
    author: "Meera Verma",
    date: "June 25, 2026",
    readTime: "6 min read",
    summary: "Planning your wedding? Here is the exact timeline every bride should follow starting 90 days before the big day for glowing skin and healthy hair.",
    content: `
Every bride dreams of a naturally radiant glass skin glow on her wedding day. Skincare takes time—here is your step-by-step pre-bridal routine curated by D Makeup Studio Bijnor!

### Month 3 (90 Days Out): Consult & Correct
- Get a professional skin analysis at D Makeup Studio to identify acne scars, pigmentation, or dryness.
- Start monthly facial sessions (O3+ Whitening or HydraFacial) to detox pores.
- Begin oiling your hair weekly with warm coconut/argan oil and trim split ends.

### Month 2 (60 Days Out): Deep Nourishment & Hair Treatment
- Upgrade to HydraFacial every 3 weeks for pore tightening and intense hydration.
- If you have frizzy locks, book your Keratin Hair Smooth treatment now so it settles naturally before wedding events.
- Drink 3 liters of water daily, include beetroot/pomegranate juice for natural cheek flush.

### Month 1 (30 Days Out): The Final Polish
- Final pre-bridal skin package: Body polishing, gold glow facial, and full body wax.
- Avoid trying new chemical skincare products 3 weeks before wedding day to prevent allergic breakouts.
- Final trial with lead MUA Deepika Sharma at Shakti Chowk studio to finalize lehenga drape and eye makeup style!
    `,
    image: "https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?auto=format&fit=crop&w=800&q=80",
    tags: ["PreBridal", "BridalGlow", "HydraFacial", "WeddingPrep"]
  },
  {
    id: "blog-3",
    title: "Summer Hair Care: Post-Keratin Maintenance Tips for 6-Month Gloss",
    category: "hair",
    season: "summer",
    author: "Ananya Roy",
    date: "May 14, 2026",
    readTime: "5 min read",
    summary: "Just got a Keratin treatment? Learn how to wash, dry, and protect your treated locks to maintain silky frizz-free hair all summer long.",
    content: `
Keratin treatments give you effortlessly sleek hair, but summer heat, UV rays, and hard water can wash away the protein bond if not cared for properly.

### Use Sulfate-Free & Paraben-Free Shampoo Only
Regular shampoos contain sulfates that strip away keratin coating. Always use Keratin-safe sulfate-free shampoo and condition generously from mid-length to tips.

### Cold Water Rinse
Always finish your hair wash with lukewarm or cool water. Heat opens the hair cuticle, causing moisture loss and frizz.

### Protect from UV Rays & Swimming Pool Chlorine
Before stepping into hot sun or swimming pools, apply a leave-in hair serum with UV filters. Chlorine severely breaks down keratin, so wear a protective cap if swimming.

### Blow Dry Hair Downwards
After washing, blast dry your hair using a downward airflow nozzle to lock cuticles flat and maintain that salon smooth shine!
    `,
    image: "https://images.unsplash.com/photo-1562322140-8baeececf3df?auto=format&fit=crop&w=800&q=80",
    tags: ["KeratinCare", "SummerHair", "SmoothHair", "HairSpa"]
  },
  {
    id: "blog-4",
    title: "Winter Hydration Routine: Keeping Skin Soft & Supple in Cold Bijnor Weather",
    category: "skincare",
    season: "winter",
    author: "Meera Verma",
    date: "November 10, 2025",
    readTime: "4 min read",
    summary: "Beat harsh dry winter air with deep barrier repair serums, gentle cleansers, and hydrating face oil massage tips.",
    content: `
Winter in North India brings chilly winds that strip moisture from your face and hands, leaving skin flaky and dull under makeup.

### Switch to Creamy Cleansers
Avoid foaming gel face washes that leave skin squeaky clean and dry. Use gentle cream/milk cleansers that leave skin's moisture barrier intact.

### Layer Ceramides & Hyaluronic Acid
Apply hyaluronic acid serum on damp face skin, followed immediately by a ceramide-rich moisturizer to seal water into skin layers.

### Overnight Hydrating Mask
Apply a thick layer of night cream or vitamin E oil before sleeping to wake up with soft, plump, radiant skin ready for day makeup.
    `,
    image: "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&w=800&q=80",
    tags: ["WinterSkincare", "DrySkinFix", "GlowRoutine"]
  }
];

export const TESTIMONIALS_DATA: Testimonial[] = [
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
  },
  {
    id: "rev-4",
    clientName: "Anjali Malik",
    serviceName: "Sangeet Glam & Nail Extensions",
    date: "July 2026",
    rating: 5,
    comment: "Loved my sangeet makeup and acrylic extensions! Beautiful salon at Krishna Plaza, very easy to find near SRS Mall. 100% recommended for brides and family!",
    verified: true,
    location: "Bijnor"
  }
];
