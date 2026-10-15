export const INITIAL_WEBSITE_CONTENT = {
  key: "main_content",
  hero: {
    badge: "Professional Cleaning in Malabar",
    headline: "Professional Cleaning.\nA Better Space to Live and Work.",
    supportingText:
      "Reliable cleaning solutions for cleaner, healthier, and more welcoming spaces.",
    primaryCta: "Get a Quote",
    secondaryCta: "Explore Services",
    heroImage: "/images/hero.jpg",
  },
  trustStrip: [
    {
      title: "Verified Specialists",
      description: "Thoroughly background-checked and systematically trained cleaners.",
      icon: "ShieldCheck",
    },
    {
      title: "Eco-Safe Solutions",
      description: "Hospital-grade, non-hazardous products safe for families and pets.",
      icon: "Leaf",
    },
    {
      title: "50-Point Quality Checklist",
      description: "Standardized inspection protocols ensuring no corner is missed.",
      icon: "CheckCircle2",
    },
    {
      title: "Flexible Scheduling",
      description: "Scheduled recurring visits or prompt single-day deep cleans.",
      icon: "CalendarCheck",
    },
  ],
  about: {
    badge: "About Malabar Care",
    title: "Dedicated to Higher Standards of Cleanliness & Comfort",
    description:
      "Malabar Care was established to provide dependable, systematically managed cleaning services for residences, workplaces, and commercial venues. We combine trained professionals, modern tools, and eco-friendly products to give you peace of mind.",
    bulletPoints: [
      "Rigorous quality supervision on every project",
      "Specialized equipment for deep extraction and steam sanitization",
      "Punctual, uniformed, and respectful cleaning crews",
      "Custom service packages tailored to your exact property layout",
    ],
    ctaLabel: "Enquire About Our Plans",
    image: "/images/about-team.svg",
  },
  servicesHeading: {
    badge: "Services & Solutions",
    title: "Comprehensive Cleaning Tailored to Your Space",
    subtitle:
      "Choose from individual deep cleaning visits or recurring maintenance plans designed for residences, corporate offices, and retail venues.",
  },
  whyChooseUs: {
    badge: "The Malabar Care Advantage",
    title: "Why Clients Trust Our Hygiene Programs",
    items: [
      {
        title: "Transparent & Upfront Pricing",
        description: "Clear, itemized quotes based on square footage without hidden service fees.",
        icon: "BadgePercent",
      },
      {
        title: "Advanced Sanitizing Tools",
        description: "Industrial HEPA vacuums, rotary scrubbers, and micro-filtration systems.",
        icon: "Sparkles",
      },
      {
        title: "Dedicated On-Site Supervisor",
        description: "Every multi-room clean is audited by an experienced team lead.",
        icon: "UserCheck",
      },
      {
        title: "Complete Satisfaction Assurance",
        description: "Complimentary touch-up rectification if any specified area falls short.",
        icon: "ThumbsUp",
      },
    ],
  },
  galleryHeading: {
    badge: "Visual Showcase",
    title: "Our Work in Focus",
    subtitle:
      "A glimpse of pristine living spaces and executive offices maintained by our dedicated crews.",
  },
  contactInfo: {
    phone: "+91 98765 43210",
    whatsapp: "+91 98765 43210",
    email: "contact@malabarcare.demo",
    address: "Malabar Care Center, Mavoor Road, Calicut, Kerala, India - 673001",
    operatingHours: "Monday – Saturday: 8:00 AM – 7:30 PM",
    mapEmbedUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3913.0!2d75.78!3d11.25!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMTHCsDE1JzAwLjAiTiA3NcKwNDYnNDguMCJF!5e0!3m2!1sen!2sin!4v1",
  },
  footer: {
    brandName: "MALABAR CARE",
    description:
      "Professional residential and commercial cleaning services. Delivering immaculate hygiene, spotless presentation, and dependable service across Malabar.",
    copyrightText: "© 2026 Malabar Care. All rights reserved.",
    socialLinks: [
      { platform: "Instagram", url: "https://instagram.com" },
      { platform: "LinkedIn", url: "https://linkedin.com" },
      { platform: "Facebook", url: "https://facebook.com" },
    ],
  },
};

export const INITIAL_SERVICES = [
  {
    title: "Home Cleaning",
    slug: "home-cleaning",
    shortDescription:
      "Complete residential sanitization, floor scrubbing, kitchen degreasing, and bedroom dusting.",
    description:
      "Our Home Cleaning service transforms your residence into a fresh, spotless, and germ-free sanctuary. Our team addresses high-traffic living areas, bathroom sanitization, kitchen countertop and grease removal, window frame wiping, and deep floor buffing.",
    imageReference: "/images/home-cleaning.jpg",
    features: [
      "Kitchen grease breakdown & countertop disinfection",
      "Full bathroom scale removal & sanitizing",
      "Under-furniture dusting & vacuuming",
      "Eco-friendly pet-safe cleaning agents",
    ],
    displayOrder: 1,
    published: true,
  },
  {
    title: "Office Cleaning",
    slug: "office-cleaning",
    shortDescription:
      "Custom janitorial care, conference room polishing, workstation sanitization, and clean air care.",
    description:
      "A clean office boosts morale, productivity, and creates an exceptional impression for visiting clients. We offer scheduled evening or morning janitorial passes, carpet vacuuming, IT keyboard dusting, restroom restocking, and trash removal.",
    imageReference: "/images/office-cleaning.jpg",
    features: [
      "Workstation keyboard & monitor sanitizing",
      "Conference room glass wipe-down & table buffing",
      "Pantry & coffee station deep sanitization",
      "Discreet cleaning hours (pre/post-business)",
    ],
    displayOrder: 2,
    published: true,
  },
  {
    title: "Deep Cleaning & Sanitization",
    slug: "deep-cleaning",
    shortDescription:
      "Intensive top-to-bottom scrub, hospital-grade disinfection, tile descaling, and high-touch area sterilizing.",
    description:
      "Designed for move-in/move-out readiness, post-renovation dust clearing, or thorough seasonal hygiene resets. Our deep cleaning team cleans baseboards, interior cabinets, vents, tile grout, and hard-to-reach ceiling fixtures.",
    imageReference: "/images/deep-cleaning.svg",
    features: [
      "Steam cleaning for tile grout and sanitization",
      "Cabinet interiors & appliance exterior detailing",
      "Light fixtures, ceiling fans & vent scrubbing",
      "Intense post-renovation dust elimination",
    ],
    displayOrder: 3,
    published: true,
  },
  {
    title: "Commercial & Facility Care",
    slug: "commercial-cleaning",
    shortDescription:
      "High-traffic floor maintenance, warehouse detailing, retail storefront glass, and post-construction sweeps.",
    description:
      "For retail outlets, clinics, hospitality spaces, and commercial showrooms. We deploy industrial rotary buffers, heavy-duty extraction, and structured compliance checklists meeting municipal health and safety codes.",
    imageReference: "/images/commercial-cleaning.svg",
    features: [
      "Industrial rotary floor scrubbers & sealers",
      "Storefront exterior & interior window cleaning",
      "High-capacity waste handling & disposal",
      "Flexible commercial contract SLA agreements",
    ],
    displayOrder: 4,
    published: true,
  },
];

export const INITIAL_VLOGS = [
  {
    title: "Simple Ways to Maintain a Cleaner Workspace",
    slug: "maintain-cleaner-workspace",
    excerpt:
      "Discover practical daily habits and decluttering protocols that keep shared commercial offices organized, fresh, and productive between scheduled cleanings.",
    content: `A clean office environment directly correlates with higher employee focus, fewer sick days, and a significantly better atmosphere for clients.

### 1. The Clean-Desk End-of-Day Habit
Encouraging employees to clear desks before leaving takes less than three minutes, yet allows night-shift cleaning teams to properly disinfect desk surfaces without shifting private papers.

### 2. High-Touch Tech Sanitation
Keyboards, computer mice, desk phones, and light switches harbour up to 400 times more bacteria than a standard toilet seat. Lightly dampening a microfiber cloth with 70% isopropyl alcohol twice weekly keeps peripherals sanitary.

### 3. Kitchen & Pantry Accountability
Shared refrigerators and microwave handles are prime cross-contamination spots. Establishing a Friday afternoon clean-out rule prevents expired food buildup and bacterial growth.

By combining these simple workplace habits with professional bi-weekly cleaning from Malabar Care, your workspace remains a hygienic, welcoming environment.`,
    coverImageReference: "/images/vlog-1.svg",
    externalVideoUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
    contentType: "video" as const,
    status: "published" as const,
    publishedAt: new Date("2026-09-20"),
    readTimeMinutes: 4,
  },
  {
    title: "Why Regular Commercial Cleaning Matters for Business",
    slug: "why-regular-commercial-cleaning-matters",
    excerpt:
      "Explore the business and health returns of routine commercial cleaning, from prolonging asset lifespan to creating an unforgettable customer first impression.",
    content: `When prospective clients enter your office or commercial facility, the cleanliness of the air, the gleam of the floors, and the clarity of glass panels speak volumes before a word is spoken.

### First Impressions Dictate Professional Trust
In modern business, attention to hygiene reflects your operational discipline. Smudged entrance doors or dusty conference tables create an impression of negligence.

### Protecting Your Capital Investments
Carpeting, hardwood, and marble flooring suffer micro-abrasions from trapped dirt. Regular extraction and proper pH-balanced cleaning prevent expensive premature floor replacement.

### Reduced Airborne Allergens
Commercial HVAC systems circulate dust mites and indoor pollutants. Routine HEPA vacuuming and surface wiping measurably improve indoor air quality.

Malabar Care provides structured commercial cleaning contracts tailored around your enterprise operating hours.`,
    coverImageReference: "/images/vlog-2.svg",
    externalVideoUrl: "",
    contentType: "article" as const,
    status: "published" as const,
    publishedAt: new Date("2026-10-02"),
    readTimeMinutes: 5,
  },
  {
    title: "Preparing Your Space for Professional Deep Cleaning",
    slug: "preparing-space-for-deep-cleaning",
    excerpt:
      "A quick guide to maximizing your deep cleaning visit: simple preparation steps that let technicians focus on intensive detailing and high-grade disinfection.",
    content: `To ensure our professional cleaning crew can focus their full time on intensive descaling, grout buffing, and sterilization, here are four quick preparation steps:

1. **Secure Valuables and Sensitive Documents:** Stash jewelry, cash, and personal identification in a locked drawer.
2. **Clear Floor Clutter:** Picking up children's toys, loose shoes, and charging cables allows our team to begin floor scrubbing immediately.
3. **Point Out Special Attention Areas:** If you have pet stain concerns or stubborn limescale on bathroom glass, flag it during the opening walkthrough.
4. **Plan for Pets:** Ensure dogs or cats have a comfortable, quiet room away from loud vacuum equipment.

Our team brings all required hospital-grade sanitizers, microfiber pads, and heavy-duty steam tools so you can relax while we restore your space.`,
    coverImageReference: "/images/vlog-3.svg",
    externalVideoUrl: "",
    contentType: "article" as const,
    status: "published" as const,
    publishedAt: new Date("2026-10-10"),
    readTimeMinutes: 3,
  },
];

export const GALLERY_ITEMS = [
  {
    id: "g1",
    title: "Executive Residence Polishing",
    category: "Residential",
    image: "/images/hero.jpg",
    description: "Full living room floor buffing and glass wall detailing.",
  },
  {
    id: "g2",
    title: "Corporate Headquarters Suite",
    category: "Commercial",
    image: "/images/office-cleaning.jpg",
    description: "Spotless conference room and open-plan workplace sanitation.",
  },
  {
    id: "g3",
    title: "Luxury Kitchen Restoration",
    category: "Residential",
    image: "/images/home-cleaning.jpg",
    description: "Marble island degreasing and cabinet face polishing.",
  },
  {
    id: "g4",
    title: "Clinical Restroom Sanitization",
    category: "Deep Clean",
    image: "/images/deep-cleaning.svg",
    description: "Tile grout steam cleaning and hospital-grade fixture disinfection.",
  },
];
