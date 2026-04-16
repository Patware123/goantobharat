export const heroData = {
  badge: "THE MISSION GAON",
  headline: ["Fresh from ", "Gaon,", " Delivered to ", "Bharat"],
  subtext:
    "Pure. Raw. Direct from Farmers. Bringing the soul of the village back to your modern kitchen table.",
  cta: { primary: "Shop Fresh Food", secondary: "Our Mission" },
  image: "https://images.unsplash.com/photo-1500937386664-56d1dfef3854?w=600&q=80",
  badge2: { label: "100% Fresh", sub: "Your purchase is 1% of our total farm" },
};

export const statsData = [
  { icon: "👨‍🌾", title: "Direct from Farmers", sub: "Pure. Raw. Direct from Farmers." },
  { icon: "🚫", title: "No Middlemen", sub: "Fair pricing for everyone." },
  { icon: "🌿", title: "100% Natural", sub: "Direct from farmers" },
  { icon: "🚚", title: "Fast & Safe Delivery", sub: "Door to door Delivery" },
];

export const categoriesData = {
  heading: "Heritage Categories",
  sub: "Explore the rich biodiversity of Indian agriculture, curated for the modern household.",
  items: [
    { id: 1, name: "Heritage Grains", sub: "Ancient wheat, red rice, and heirloom varieties.", image: "https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?w=600&q=80", large: true },
    { id: 2, name: "Protein Pulses", image: "https://images.unsplash.com/photo-1515543904379-3d757afe72e4?w=400&q=80", large: false },
    { id: 3, name: "Stone-Ground Spices", image: "https://images.unsplash.com/photo-1596040033229-a9821ebd058d?w=400&q=80", large: false },
    { id: 4, name: "Cold-Pressed Oils", image: "https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?w=400&q=80", large: false },
    { id: 5, name: "Artisanal Jaggery", image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&q=80", large: false },
  ],
};

export const farmerData = {
  badge: "TRANSPARENCY IN EVERY GRAIN",
  heading: "Your Food has a Name, a Village, and a Story.",
  sub: "Every purchase you make is a vote for small-scale sustainable farming. Scan the QR code on your pack to see the journey of your food — from the day it was sown to the day it reached your door.",
  cta: "Know Your Farmer",
  farmer: {
    name: "Ramrao",
    location: "SANGLI, MAHARASHTRA",
    quote: "I grow Tur Dal the same way my grandfather did. No chemicals, just ancient labor and the blessing of the soil.",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&q=80",
  },
  bg: "https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=1200&q=80",
};

export const harvestData = {
  heading: "Harvest of the Week",
  sub: "Our most popular staples, curated based on seasonality and peak freshness.",
  products: [
    { id: 1, badge: "IN STOCK", name: "Unpolished Sona Masoori Rice", rating: 4.5, reviews: 128, price: 145, unit: "kg", image: "https://images.unsplash.com/photo-1586201375761-83865001e31c?w=400&q=80" },
    { id: 2, badge: "NEW ARRIVAL", name: "Wood-Pressed Groundnut Oil", rating: 4.8, reviews: 94, price: 320, unit: "L", image: "https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?w=400&q=80" },
    { id: 3, badge: "BESTSELLER", name: "A-Grade Organic Tur Dal", rating: 4.7, reviews: 210, price: 185, unit: "kg", image: "https://images.unsplash.com/photo-1515543904379-3d757afe72e4?w=400&q=80" },
  ],
};

export const testimonialsData = {
  heading: "Voices of the Bharat Movement",
  items: [
    { id: 1, text: "The aroma of the Sona Masoori rice took me straight back to my grandmother's kitchen in Kolhapur. You can actually taste the difference in stone-ground flour.", name: "Ananya K.", location: "Mumbai, India", avatar: "AK", color: "bg-orange-400" },
    { id: 2, text: "Finally a brand that cares about the farmers as much as the customers. Knowing Ramrao grew my lentils makes me feel more connected to my food.", name: "Rahul Sharma", location: "Bangalore, India", avatar: "RS", color: "bg-green-500" },
    { id: 3, text: "I switched to GaonToBharat for my children's health. Their cold-pressed oils are exceptional and much better than the refined ones.", name: "Dr. Megha Rao", location: "Pune, India", avatar: "MR", color: "bg-blue-400" },
  ],
};

export const newsletterData = {
  heading: "Join the Fresh Food Movement",
  sub: "Subscribe to get seasonal harvest alerts, farmer stories, and traditional recipes delivered to your inbox.",
  placeholder: "Your email address",
  cta: "Subscribe",
  disclaimer: "By subscribing, you agree to our Privacy Policy and Terms of Service.",
};

export const footerData = {
  brand: "GaonToBharat",
  tagline: "Connecting the modern Indian to the roots of Indian agriculture. Bringing the soul of the village to your table.",
  socials: ["𝕏", "📘", "📸"],
  contact: {
    email: "sanskar.patware@gmail.com",
    phone: "+91 86021 77475",
    address: "GaonToBharat Foods, Harda Madhya Pradesh, India",
  },
  columns: [
    {
      heading: "COMPANY",
      links: [
        { label: "About", href: "/about" },
        { label: "Contact", href: "/contact" }
      ],
    },
    {
      heading: "LEGAL",
      links: [
        { label: "Privacy Policy", href: "/legal/privacy-policy" },
        { label: "Terms & Conditions", href: "/legal/terms" },
        { label: "Refund Policy", href: "/legal/refund" },
        { label: "Shipping Policy", href: "/legal/shipping" }
      ],
    },
  ],
};
