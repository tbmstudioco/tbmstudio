export const CALENDLY_URL = "https://calendly.com/tbmstudio603/30min";

export const services = [
  {
    id: 1,
    icon: "📱",
    title: "Social Media Editing",
    description: "Reels, Shorts & TikToks that stop the scroll. We craft content engineered for virality.",
    tag: "Virality-First",
  },
  {
    id: 2,
    icon: "🎬",
    title: "YouTube Editing",
    description: "Story-driven long-form content that builds audiences, boosts watch time, and grows channels.",
    tag: "Retention-Optimized",
  },
  {
    id: 3,
    icon: "✨",
    title: "Motion Graphics",
    description: "Dynamic motion design that elevates your brand and makes your visuals unforgettable.",
    tag: "Designer-Grade",
  },
  {
    id: 4,
    icon: "📢",
    title: "Ads & Commercials",
    description: "High-converting ad creatives for Meta, YouTube, and TikTok that drive real ROI.",
    tag: "Conversion-Driven",
  },
  {
    id: 5,
    icon: "🎯",
    title: "Creative Strategy",
    description: "We don't just edit — we think. Strategy-first content planning for bold, cohesive brands.",
    tag: "Brand-Building",
  },
];

export const stats = [
  { value: 100, suffix: "M+", label: "Views Generated" },
  { value: 50, suffix: "+", label: "Happy Clients" },
  { value: 500, suffix: "+", label: "Videos Delivered" },
  { value: 3, suffix: "X", label: "Avg. Engagement Boost" },
];

export const socialLinks = [
  {
    label: "Instagram",
    handle: "@tbmstudio.co",
    href: "https://www.instagram.com/tbmstudio.co/",
    id: "social-instagram",
  },
  {
    label: "YouTube",
    handle: "@tbmstudioco",
    href: "https://www.youtube.com/@tbmstudioco",
    id: "social-youtube",
  },
  {
    label: "X",
    handle: "@TBMStudioco",
    href: "https://x.com/TBMStudioco",
    id: "social-x",
  },
  {
    label: "LinkedIn",
    handle: "TBM Studio Co",
    href: "https://www.linkedin.com/company/tbm-studio-co/about/?viewAsMember=true",
    id: "social-linkedin",
  },
] as const;

export type TrustBrand = {
  name: string;
  logo: string;
  variant: "logo" | "portrait";
};

export const trustBrands: TrustBrand[] = [
  { name: "Dr. Chaitanya", logo: "/trusted-by/dr-chaitanya.png", variant: "portrait" },
  { name: "Dr. Vaishnavi", logo: "/trusted-by/dr-vaishnavi.png", variant: "portrait" },
  { name: "Mehak Media", logo: "/trusted-by/mehak-media.png", variant: "portrait" },
  { name: "Dr. Breathe", logo: "/trusted-by/dr-breathe.png", variant: "portrait" },
  { name: "Bird Box", logo: "/trusted-by/bird-box.png", variant: "logo" },
  { name: "Wind Chasers", logo: "/trusted-by/windchasers.png", variant: "logo" },
  { name: "SICC", logo: "/trusted-by/sicc.png", variant: "logo" },
  { name: "Bcon Club", logo: "/trusted-by/bcon-club.png", variant: "logo" },
  { name: "Oblum", logo: "/trusted-by/oblum.png", variant: "logo" },
  { name: "Ruchi Fried Chicken", logo: "/trusted-by/rfc.png", variant: "logo" },
  { name: "Chandini Chowdary", logo: "/trusted-by/chandini-chowdary.png", variant: "portrait" },
  { name: "Srinath Maganti", logo: "/trusted-by/srinath-maganti.png", variant: "portrait" },
  { name: "Akshara Gowda", logo: "/trusted-by/akshara-gowda.png", variant: "portrait" },
];

export const pricingPlans = [
  {
    id: "simple",
    name: "Simple",
    badge: null as string | null,
    price: "$49",
    period: "per edit",
    description: "One professional short-form edit (up to 90 sec).",
    features: [
      "36 hour turnaround",
      "2 rounds of revisions",
      "Social-first reel format",
      "Simple briefing form",
      "Frame.io for feedback",
    ],
    cta: "Book a Call",
    highlighted: false,
  },
  {
    id: "complex",
    name: "Complex",
    badge: "Most Popular",
    price: "$109",
    period: "per edit",
    description: "Story-driven edits with motion graphics and retention focus.",
    features: [
      "36 hour turnaround",
      "2 rounds of revisions",
      "Heavy motion graphics",
      "Dedicated project manager",
      "Frame.io for feedback",
    ],
    cta: "Book a Call",
    highlighted: true,
  },
  {
    id: "premium",
    name: "Premium",
    badge: "Best Offering",
    price: "Custom",
    period: "campaign",
    description: "Full-suite campaigns for brands that need extra polish.",
    features: [
      "Multi-video packages",
      "Creative direction included",
      "Priority turnaround",
      "Brand style systems",
      "Dedicated editor team",
    ],
    cta: "Book a call",
    highlighted: false,
  },
];

export const features = [
  {
    title: "Quality Checks",
    description: "Every video is reviewed by a senior editor before delivery. Flawless every time.",
  },
  {
    title: "Lightning Fast Delivery",
    description: "Your professionally edited video is ready within 36 hours. No delays, no drama.",
  },
  {
    title: "Simple, Flat Pricing",
    description: "No hidden fees or surprises — just clear, predictable pricing that works for you.",
  },
  {
    title: "Built by Editors",
    description: "Created by editors who get it, so you never have to over-explain your vision.",
  },
  {
    title: "Compatible Formats",
    description: "Delivered in the exact specs you need for Instagram, YouTube, TikTok, and more.",
  },
  {
    title: "True to You",
    description: "We tailor each edit to match your unique style because your content should feel like you.",
  },
];

export const faqs = [
  {
    question: "Do you provide creative direction?",
    answer: "Yes. On Complex and Premium plans we help shape hooks, pacing, and visual storytelling before the edit begins.",
  },
  {
    question: "How many revisions are included?",
    answer: "Simple and Complex plans include 2 rounds of revisions. Premium packages include extended revision windows.",
  },
  {
    question: "What types of revisions are included?",
    answer: "Pacing, cuts, text, music swaps, color tweaks, and motion graphic adjustments within the original brief.",
  },
  {
    question: "Is my footage secure with TBM STUDIOZ?",
    answer: "Yes. We use Frame.io for secure uploads, review, and delivery. Your files are never shared outside your project.",
  },
  {
    question: "What if I'm not satisfied with the final video?",
    answer: "We work collaboratively through revisions until you're happy. If something's off-brief, we'll fix it at no extra cost.",
  },
  {
    question: "Can I choose the length of the final video?",
    answer: "Absolutely. Share your target length in the brief and we'll edit to fit your platform and goals.",
  },
];

export const processSteps = [
  {
    number: "1",
    title: "Book",
    description: "Pick a plan or request a custom edit. We'll confirm scope, timeline, and deliverables.",
  },
  {
    number: "2",
    title: "Brief",
    description: "Use our guided form to share your vision, references, brand assets, and raw footage via Frame.io.",
  },
  {
    number: "3",
    title: "Review & Finalise",
    description: "Get your first cut in 36 hours, leave feedback on Frame.io, and finalise after revisions.",
  },
];

export const testimonials = [
  {
    id: 1,
    name: "Arjun Sharma",
    role: "YouTube Creator, 500K+",
    avatar: "AS",
    review: "TBM STUDIOZ completely transformed my channel. My watch time doubled in 60 days. They don't just edit — they think like creators.",
    rating: 5,
  },
  {
    id: 2,
    name: "Priya Kapoor",
    role: "Founder, StyleByPriya",
    avatar: "PK",
    review: "We went from 10K to 150K followers in 3 months after switching to TBM. The Reels quality is absolutely A-tier.",
    rating: 5,
  },
  {
    id: 3,
    name: "Vikram Mehta",
    role: "CEO, Mehta Digital",
    avatar: "VM",
    review: "Best investment we made for our brand. The ad creatives from TBM performed 3x better than our previous agency.",
    rating: 5,
  },
  {
    id: 4,
    name: "Zara Khan",
    role: "Lifestyle Influencer, 1M+",
    avatar: "ZK",
    review: "The attention to detail is insane. Every video feels cinematic. My audience keeps asking who edits my content.",
    rating: 5,
  },
];

export const portfolioItems = [
  {
    id: 1,
    title: "Brand Launch Campaign",
    category: "Ads & Commercials",
    accentColor: "#00d2ff",
  },
  {
    id: 2,
    title: "Creator Channel Growth",
    category: "YouTube Editing",
    accentColor: "#a855f7",
  },
  {
    id: 3,
    title: "Viral Reels Series",
    category: "Social Media",
    accentColor: "#f59e0b",
  },
  {
    id: 4,
    title: "Product Commercial",
    category: "Motion Graphics",
    accentColor: "#10b981",
  },
  {
    id: 5,
    title: "Corporate Brand Film",
    category: "Creative Strategy",
    accentColor: "#ef4444",
  },
];
