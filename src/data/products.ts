// src/data/products.ts
import type { Product } from '../types';

export const PRODUCTS_MOCK: Product[] = [
  {
    id: "ox-01",
    title: "Oxivos Cyberpunk Oversized Hoodie",
    price: 85,
    description: "Premium heavy-weight cotton oversized hoodie with reflective branding and futuristic cyberpunk aesthetics. Built for high comfort and street performance.",
    category: "Apparel",
    image: "https://images.unsplash.com/photo-1556821840-3a63f95609a7?auto=format&fit=crop&q=80&w=600",
    stock: 15,
    rating: { rate: 4.8, count: 124 },
    sizes: [
      { size: "S", isAvailable: true },
      { size: "M", isAvailable: true },
      { size: "L", isAvailable: false },
      { size: "XL", isAvailable: true }
    ]
  },
  {
    id: "ox-02",
    title: "Oxivos Stealth Tech Cargo Pants",
    price: 95,
    description: "Water-resistant techwear utility cargo pants featuring ergonomic multi-pockets, adjustable ankle straps, and durable nylon-blend fabric.",
    category: "Apparel",
    image: "https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?auto=format&fit=crop&q=80&w=600",
    stock: 8,
    rating: { rate: 4.6, count: 89 },
    sizes: [
      { size: "30", isAvailable: true },
      { size: "32", isAvailable: true },
      { size: "34", isAvailable: true },
      { size: "36", isAvailable: false }
    ]
  },
  {
    id: "ox-03",
    title: "Oxivos Neon Core Windbreaker",
    price: 110,
    description: "Ultra-lightweight neon accented windbreaker shell. Fully windproof and water-repellent, designed for night runners and city wanderers.",
    category: "Apparel",
    image: "https://images.unsplash.com/photo-1548883354-7622d03aca27?auto=format&fit=crop&q=80&w=600",
    stock: 0,
    rating: { rate: 4.9, count: 42 },
    sizes: [
      { size: "S", isAvailable: false },
      { size: "M", isAvailable: false },
      { size: "L", isAvailable: false }
    ]
  },
  {
    id: "ox-04",
    title: "Oxivos Minimalist Leather Wallet",
    price: 45,
    description: "RFID-blocking slim genuine leather cardholder wallet featuring sleek carbon fiber textures and a quick-access pull tab.",
    category: "Accessories",
    image: "https://images.unsplash.com/photo-1627123424574-724758594e93?auto=format&fit=crop&q=80&w=600",
    stock: 20,
    rating: { rate: 4.5, count: 210 }
  },
  {
    id: "ox-05",
    title: "Oxivos Kinetic Tech Running Shoes",
    price: 140,
    description: "Engineered mesh running shoes equipped with responsive nitrogen-infused foam soles and multi-surface high-traction rubber outsoles.",
    category: "Footwear",
    image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&q=80&w=600",
    stock: 5,
    rating: { rate: 4.7, count: 156 },
    sizes: [
      { size: "8", isAvailable: true },
      { size: "9", isAvailable: false },
      { size: "10", isAvailable: true },
      { size: "11", isAvailable: true }
    ]
  },
  {
    id: "ox-06",
    title: "Oxivos Waterproof Urban Backpack",
    price: 75,
    description: "Roll-top 25L commuter backpack with a dedicated padded 16-inch laptop sleeve, waterproof zippers, and ergonomic load-lifter straps.",
    category: "Accessories",
    image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&q=80&w=600",
    stock: 12,
    rating: { rate: 4.4, count: 95 }
  },
  {
    id: "ox-07",
    title: "Oxivos Premium Essential Tee",
    price: 35,
    description: "Preshrunk long-staple organic cotton minimalist tee shirt. Soft touch, crew neck, and breathable weave perfect for warm weather layering.",
    category: "Apparel",
    image: "https://images.unsplash.com/photo-1521572267360-ee0c2909d518?auto=format&fit=crop&q=80&w=600",
    stock: 30,
    rating: { rate: 4.3, count: 320 },
    sizes: [
      { size: "S", isAvailable: true },
      { size: "M", isAvailable: true },
      { size: "L", isAvailable: true },
      { size: "XL", isAvailable: true }
    ]
  },
  {
    id: "ox-08",
    title: "Oxivos Chroma Sport Cap",
    price: 28,
    description: "Breathable moisture-wicking active cap with an adjustable tech-strap clasp and a subtle holographic brand logo on the front panel.",
    category: "Accessories",
    image: "https://images.unsplash.com/photo-1588850561407-ed78c282e89b?auto=format&fit=crop&q=80&w=600",
    stock: 18,
    rating: { rate: 4.2, count: 64 }
  },
  {
    id: "ox-09",
    title: "Oxivos Onyx Stainless Water Bottle",
    price: 32,
    description: "Double-wall vacuum insulated 32oz matte-black stainless steel bottle. Keeps drinks icy cold for 24 hours or steaming hot for 12 hours.",
    category: "Accessories",
    image: "https://images.unsplash.com/photo-1602143407151-7111542de6e8?auto=format&fit=crop&q=80&w=600",
    stock: 25,
    rating: { rate: 4.9, count: 180 }
  },
  {
    id: "ox-10",
    title: "Oxivos Matrix Knit Sock Set",
    price: 18,
    description: "Set of three comfortable mid-calf athletic socks woven with sweat-wicking fiber blends and extra-thick arch compression zones.",
    category: "Apparel",
    image: "https://images.unsplash.com/photo-1582966772680-860e372bb558?auto=format&fit=crop&q=80&w=600",
    stock: 40,
    rating: { rate: 4.6, count: 112 },
    sizes: [
      { size: "M (6-9)", isAvailable: true },
      { size: "L (9-12)", isAvailable: true }
    ]
  },
  {
    id: "ox-11",
    title: "Oxivos Phantom Active Shorts",
    price: 48,
    description: "Lightweight and flexible 2-in-1 workout shorts featuring a supportive built-in liner, phone storage pocket, and high ventilating mesh panels.",
    category: "Apparel",
    image: "https://images.unsplash.com/photo-1539185441755-769473a23570?auto=format&fit=crop&q=80&w=600",
    stock: 6,
    rating: { rate: 4.5, count: 77 },
    sizes: [
      { size: "S", isAvailable: false },
      { size: "M", isAvailable: true },
      { size: "L", isAvailable: true }
    ]
  },
  {
    id: "ox-12",
    title: "Oxivos Cyber Goggle Polarized Glasses",
    price: 125,
    description: "High-performance wrap-around polarized sunglasses with complete UV400 lens filters and shatter-resistant polymer frame builds.",
    category: "Accessories",
    image: "https://images.unsplash.com/photo-1511499767150-a48a237f0083?auto=format&fit=crop&q=80&w=600",
    stock: 3,
    rating: { rate: 4.7, count: 53 }
  },
  {
    id: "ox-13",
    title: "Oxivos Hyper-Weave Joggers",
    price: 79,
    description: "Breathable mechanical stretch knit joggers with ergonomic tapered fit, articulated knees, and zip-locked cargo utility slots.",
    category: "Apparel",
    image: "https://images.unsplash.com/photo-1517438984742-1262db08379e?auto=format&fit=crop&q=80&w=600",
    stock: 14,
    rating: { rate: 4.5, count: 83 },
    sizes: [
      { size: "S", isAvailable: true },
      { size: "M", isAvailable: true },
      { size: "L", isAvailable: true }
    ]
  },
  {
    id: "ox-14",
    title: "Oxivos Carbon Tech Belt",
    price: 39,
    description: "Military-grade tactical belt fitted with a quick-release heavy duty Cobra-style buckle and high-density webbing reinforcement.",
    category: "Accessories",
    image: "https://images.unsplash.com/photo-1614162692292-7ac56d7f7f1e?auto=format&fit=crop&q=80&w=600",
    stock: 22,
    rating: { rate: 4.6, count: 91 }
  },
  {
    id: "ox-15",
    title: "Oxivos Void Knit High-Tops",
    price: 165,
    description: "Sock-like knit sneakers featuring structured wrap ankle support, neon heel pulls, and high-impact energy return foam outsoles.",
    category: "Footwear",
    image: "https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?auto=format&fit=crop&q=80&w=600",
    stock: 4,
    rating: { rate: 4.8, count: 72 },
    sizes: [
      { size: "8", isAvailable: true },
      { size: "9", isAvailable: true },
      { size: "10", isAvailable: false },
      { size: "11", isAvailable: true }
    ]
  },
  {
    id: "ox-16",
    title: "Oxivos Thermal Tech Base-Layer",
    price: 55,
    description: "Moisture-wicking thermal compression shirt designed as a protective skin layer under dynamic outdoor weather environments.",
    category: "Apparel",
    image: "https://images.unsplash.com/photo-1502904585520-fa4510c13101?auto=format&fit=crop&q=80&w=600",
    stock: 11,
    rating: { rate: 4.4, count: 68 },
    sizes: [
      { size: "M", isAvailable: true },
      { size: "L", isAvailable: true },
      { size: "XL", isAvailable: false }
    ]
  },
  {
    id: "ox-17",
    title: "Oxivos Vanguard Modular Chest Rig",
    price: 88,
    description: "Full modular urban tactical harness fitted with modular MOLLE straps, dual waterproof zip pockets, and highly breathable cross-back mesh.",
    category: "Accessories",
    image: "https://images.unsplash.com/photo-1509198397868-475647b2a1e5?auto=format&fit=crop&q=80&w=600",
    stock: 9,
    rating: { rate: 4.9, count: 48 }
  },
  {
    id: "ox-18",
    title: "Oxivos Aegis Utility Vest",
    price: 120,
    description: "Tactical layering utility vest made of ripstop canvas with modular pouch options and adjustment sliders for tailored fit profiles.",
    category: "Apparel",
    image: "https://images.unsplash.com/photo-1551028719-00167b16eac5?auto=format&fit=crop&q=80&w=600",
    stock: 5,
    rating: { rate: 4.3, count: 37 },
    sizes: [
      { size: "S", isAvailable: true },
      { size: "M", isAvailable: false },
      { size: "L", isAvailable: true }
    ]
  },
  {
    id: "ox-19",
    title: "Oxivos Glitch Print Sweatshirt",
    price: 70,
    description: "Mid-weight loopback french terry crewneck with custom holographic digital glitch typography printed on the front profile.",
    category: "Apparel",
    image: "https://images.unsplash.com/photo-1554568218-0f1715e72254?auto=format&fit=crop&q=80&w=600",
    stock: 13,
    rating: { rate: 4.6, count: 59 },
    sizes: [
      { size: "S", isAvailable: true },
      { size: "M", isAvailable: true },
      { size: "L", isAvailable: true }
    ]
  },
  {
    id: "ox-20",
    title: "Oxivos Fusion Leather Gloves",
    price: 65,
    description: "Touchscreen compatible urban cycling and driving gloves fabricated with real leather panels and knuckle defense padding.",
    category: "Accessories",
    image: "https://images.unsplash.com/photo-1516257984-b1b4d707412e?auto=format&fit=crop&q=80&w=600",
    stock: 14,
    rating: { rate: 4.7, count: 32 },
    sizes: [
      { size: "S", isAvailable: true },
      { size: "M", isAvailable: true },
      { size: "L", isAvailable: false }
    ]
  },
  {
    id: "ox-21",
    title: "Oxivos Vector Trainer Shoes",
    price: 130,
    description: "Minimalist urban lifestyle sneakers with water-shedding suede overlays, a retro flat silhouette, and sticky gum rubber treads.",
    category: "Footwear",
    image: "https://images.unsplash.com/photo-1539185441755-769473a23570?auto=format&fit=crop&q=80&w=600",
    stock: 10,
    rating: { rate: 4.4, count: 74 },
    sizes: [
      { size: "8", isAvailable: true },
      { size: "9", isAvailable: true },
      { size: "10", isAvailable: true }
    ]
  },
  {
    id: "ox-22",
    title: "Oxivos Stealth Tech Balaclava",
    price: 25,
    description: "Ergonomic multi-paneled thermal face shield. Breathable windblock fabrics constructed with flatlock anti-friction seams.",
    category: "Accessories",
    image: "https://images.unsplash.com/photo-1571513722275-4b41940f54b8?auto=format&fit=crop&q=80&w=600",
    stock: 30,
    rating: { rate: 4.2, count: 41 }
  },
  {
    id: "ox-23",
    title: "Oxivos Transit Messenger Bag",
    price: 90,
    description: "Deconstructable messenger bag with cross-body stabilizer straps, quick-release main buckles, and custom internal organization blocks.",
    category: "Accessories",
    image: "https://images.unsplash.com/photo-1547949003-9792a18a2601?auto=format&fit=crop&q=80&w=600",
    stock: 8,
    rating: { rate: 4.8, count: 66 }
  },
  {
    id: "ox-24",
    title: "Oxivos Cyber-Print Cargo Shorts",
    price: 58,
    description: "Relaxed drop-crotch cargo shorts made with lightweight tech-nylon, built-in belt adjusters, and reflective typography branding.",
    category: "Apparel",
    image: "https://images.unsplash.com/photo-1591195853828-11db59a44f6b?auto=format&fit=crop&q=80&w=600",
    stock: 12,
    rating: { rate: 4.5, count: 52 },
    sizes: [
      { size: "M", isAvailable: true },
      { size: "L", isAvailable: true },
      { size: "XL", isAvailable: true }
    ]
  },
  {
    id: "ox-25",
    title: "Oxivos Shift Tactical Sling Bag",
    price: 60,
    description: "Compact single-strap EDC sling pack with external compression ties, front-facing loop fields, and an internal RFID mesh wall.",
    category: "Accessories",
    image: "https://images.unsplash.com/photo-1622560480605-d83c853bc5c3?auto=format&fit=crop&q=80&w=600",
    stock: 16,
    rating: { rate: 4.6, count: 118 }
  },
  {
    id: "ox-26",
    title: "Oxivos Helix Anorak Jacket",
    price: 135,
    description: "Half-zip packable anorak jacket. Featuring a multi-panel protective hood, waterproof zip chest pockets, and laser-vented pit zones.",
    category: "Apparel",
    image: "https://images.unsplash.com/photo-1544022613-e87ca75a784a?auto=format&fit=crop&q=80&w=600",
    stock: 7,
    rating: { rate: 4.7, count: 49 },
    sizes: [
      { size: "S", isAvailable: true },
      { size: "M", isAvailable: true },
      { size: "L", isAvailable: false }
    ]
  },
  {
    id: "ox-27",
    title: "Oxivos Matrix Compression Socks",
    price: 22,
    description: "High-performance compression socks designed to reduce lower leg muscle fatigue during long-standing urban commutes.",
    category: "Apparel",
    image: "https://images.unsplash.com/photo-1524148317074-177e13e1130e?auto=format&fit=crop&q=80&w=600",
    stock: 35,
    rating: { rate: 4.5, count: 88 },
    sizes: [
      { size: "S/M", isAvailable: true },
      { size: "L/XL", isAvailable: true }
    ]
  },
  {
    id: "ox-28",
    title: "Oxivos Cyber-Frame Eyewear",
    price: 115,
    description: "Anti-blue light tactical glasses designed for screen and high-glare environments. Featherweight construction for daily durability.",
    category: "Accessories",
    image: "https://images.unsplash.com/photo-1508296695146-257a814070b4?auto=format&fit=crop&q=80&w=600",
    stock: 9,
    rating: { rate: 4.3, count: 47 }
  },
  {
    id: "ox-29",
    title: "Oxivos Atmos Mesh Runners",
    price: 125,
    description: "Ultra-ventilating athletic trainers. Single-piece knit wrap structure offering weightless comfort and dynamic traction.",
    category: "Footwear",
    image: "https://images.unsplash.com/photo-1491553895911-0055eca6402d?auto=format&fit=crop&q=80&w=600",
    stock: 0,
    rating: { rate: 4.6, count: 62 },
    sizes: [
      { size: "8", isAvailable: false },
      { size: "9", isAvailable: false }
    ]
  },
  {
    id: "ox-30",
    title: "Oxivos Carbon Fiber Key Organizer",
    price: 29,
    description: "Quiet and highly compact key stack bar crafted with real grade-A carbon plates and high-grade stainless locking washers.",
    category: "Accessories",
    image: "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&q=80&w=600",
    stock: 45,
    rating: { rate: 4.4, count: 121 }
  },
  {
    id: "ox-31",
    title: "Oxivos Vanguard Tech Trenchcoat",
    price: 195,
    description: "Triple-layer technical trenchcoat featuring fully taped seams, magnetic pocket clasps, and a heavy-duty weather guard collar.",
    category: "Apparel",
    image: "https://images.unsplash.com/photo-1591047139829-d91aecb6caea?auto=format&fit=crop&q=80&w=600",
    stock: 4,
    rating: { rate: 4.9, count: 31 },
    sizes: [
      { size: "M", isAvailable: true },
      { size: "L", isAvailable: true },
      { size: "XL", isAvailable: false }
    ]
  },
  {
    id: "ox-32",
    title: "Oxivos Phantom Reflective Tee",
    price: 42,
    description: "Comfortable organic cotton tee utilizing micro-bead reflective ink printing that glows brightly under flashlights or street lamps.",
    category: "Apparel",
    image: "https://images.unsplash.com/photo-1562157873-818bc0726f68?auto=format&fit=crop&q=80&w=600",
    stock: 25,
    rating: { rate: 4.5, count: 96 },
    sizes: [
      { size: "S", isAvailable: true },
      { size: "M", isAvailable: true },
      { size: "L", isAvailable: true }
    ]
  },
  {
    id: "ox-33",
    title: "Oxivos Kinetic Tech Leggings",
    price: 48,
    description: "High-density elastic workout tights for active support, integrated with side drop-pockets and anti-chafing ergonomic stitch-lines.",
    category: "Apparel",
    image: "https://images.unsplash.com/photo-1506152983158-b4a74a01c721?auto=format&fit=crop&q=80&w=600",
    stock: 14,
    rating: { rate: 4.7, count: 54 },
    sizes: [
      { size: "XS", isAvailable: true },
      { size: "S", isAvailable: true },
      { size: "M", isAvailable: true }
    ]
  },
  {
    id: "ox-34",
    title: "Oxivos Grid Utility Pouch",
    price: 34,
    description: "Heavy nylon gear pack designed with rear straps for attachment to packs and interior loops to keep tech accessories safe.",
    category: "Accessories",
    image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&q=80&w=600",
    stock: 19,
    rating: { rate: 4.4, count: 63 }
  },
  {
    id: "ox-35",
    title: "Oxivos Zenith Carbon Boot",
    price: 180,
    description: "High-top hybrid tactical boot combining flexible lightweight running shoe outsoles with a military combat grade ripstop upper.",
    category: "Footwear",
    image: "https://images.unsplash.com/photo-1608256246200-53e635b5b65f?auto=format&fit=crop&q=80&w=600",
    stock: 6,
    rating: { rate: 4.8, count: 41 },
    sizes: [
      { size: "9", isAvailable: true },
      { size: "10", isAvailable: true },
      { size: "11", isAvailable: false }
    ]
  },
  {
    id: "ox-36",
    title: "Oxivos Liquid-Met Beanie",
    price: 26,
    description: "Dual-layer thermal skull cap knitted with metallic reflective thread weave to combine warmth retention and enhanced street safety.",
    category: "Accessories",
    image: "https://images.unsplash.com/photo-1576871337622-98d48d4aa53e?auto=format&fit=crop&q=80&w=600",
    stock: 28,
    rating: { rate: 4.2, count: 73 }
  },
  {
    id: "ox-37",
    title: "Oxivos Matrix Shield Umbrella",
    price: 49,
    description: "Shatterproof fiberglass ribs with water-repellent nanotech canopy coatings and an ergonomic quick-access automatic handle trigger.",
    category: "Accessories",
    image: "https://images.unsplash.com/photo-1522441815192-d9f04eb0615c?auto=format&fit=crop&q=80&w=600",
    stock: 15,
    rating: { rate: 4.6, count: 82 }
  },
  {
    id: "ox-38",
    title: "Oxivos Techwear Wrap Kimono",
    price: 110,
    description: "Futuristic noragi jacket with a functional multi-strap buckle harness clasp, deep side pocketing, and durable water-shedding canvas.",
    category: "Apparel",
    image: "https://images.unsplash.com/photo-1509631179647-0177331693ae?auto=format&fit=crop&q=80&w=600",
    stock: 7,
    rating: { rate: 4.7, count: 39 },
    sizes: [
      { size: "S/M", isAvailable: true },
      { size: "L/XL", isAvailable: true }
    ]
  },
  {
    id: "ox-39",
    title: "Oxivos Cyber-Strap Wristband",
    price: 18,
    description: "Sweat-wicking micro-weave wrist compression sleeve fitted with a secure stash pocket for keys or extra cash cards.",
    category: "Accessories",
    image: "https://images.unsplash.com/photo-1517438984742-1262db08379e?auto=format&fit=crop&q=80&w=600",
    stock: 50,
    rating: { rate: 4.1, count: 94 }
  },
  {
    id: "ox-40",
    title: "Oxivos Chroma Sport Socks",
    price: 16,
    description: "Vibrant custom neon color athletic socks offering high durability heel protection grids and targeted compression support.",
    category: "Apparel",
    image: "https://images.unsplash.com/photo-1582966772680-860e372bb558?auto=format&fit=crop&q=80&w=600",
    stock: 30,
    rating: { rate: 4.4, count: 48 },
    sizes: [
      { size: "M", isAvailable: true },
      { size: "L", isAvailable: true }
    ]
  },
  {
    id: "ox-41",
    title: "Oxivos Vanguard Tech Pack",
    price: 210,
    description: "Ultimate commuter pack offering complete modular customization with side-pouch clips, laptop drop spaces, and heavy rain proof shells.",
    category: "Accessories",
    image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&q=80&w=600",
    stock: 3,
    rating: { rate: 4.9, count: 27 }
  },
  {
    id: "ox-42",
    title: "Oxivos Neo-Retro Windpants",
    price: 80,
    description: "Nylon utility track pants showcasing colorful grid design highlights, flexible leg openings, and zippered secure back compartments.",
    category: "Apparel",
    image: "https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?auto=format&fit=crop&q=80&w=600",
    stock: 11,
    rating: { rate: 4.5, count: 56 },
    sizes: [
      { size: "M", isAvailable: true },
      { size: "L", isAvailable: true }
    ]
  },
  {
    id: "ox-43",
    title: "Oxivos Cyber-Stitch Cap",
    price: 32,
    description: "Stealthy classic panel dad cap styling elevated with custom digital circuitry embroidery details over premium twill panels.",
    category: "Accessories",
    image: "https://images.unsplash.com/photo-1588850561407-ed78c282e89b?auto=format&fit=crop&q=80&w=600",
    stock: 24,
    rating: { rate: 4.3, count: 61 }
  },
  {
    id: "ox-44",
    title: "Oxivos Orbit Magnetic Wallet",
    price: 50,
    description: "Ultra slim aluminum cardholder engineered with strong magnet lock plates for swift card ejection and secure physical bills carry.",
    category: "Accessories",
    image: "https://images.unsplash.com/photo-1627123424574-724758594e93?auto=format&fit=crop&q=80&w=600",
    stock: 15,
    rating: { rate: 4.6, count: 79 }
  },
  {
    id: "ox-45",
    title: "Oxivos Volt Active Shorts",
    price: 45,
    description: "Extremely breathable lightweight workout shorts including reflective details and side openings to allow full dynamic leg extensions.",
    category: "Apparel",
    image: "https://images.unsplash.com/photo-1539185441755-769473a23570?auto=format&fit=crop&q=80&w=600",
    stock: 16,
    rating: { rate: 4.4, count: 39 },
    sizes: [
      { size: "S", isAvailable: true },
      { size: "M", isAvailable: true },
      { size: "L", isAvailable: false }
    ]
  },
  {
    id: "ox-46",
    title: "Oxivos Cyber-Knit Slip-On",
    price: 110,
    description: "Ultralight technical slip-on shoes engineered with form-fitting elastic weave collars and durable shock absorbing eva outsoles.",
    category: "Footwear",
    image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&q=80&w=600",
    stock: 7,
    rating: { rate: 4.5, count: 68 },
    sizes: [
      { size: "8", isAvailable: true },
      { size: "9", isAvailable: true },
      { size: "10", isAvailable: true }
    ]
  },
  {
    id: "ox-47",
    title: "Oxivos Stealth ID Cardholder",
    price: 24,
    description: "Sleek vertical tactical badge lanyard crafted using tough tearproof canvas and highly durable military grade keyhooks.",
    category: "Accessories",
    image: "https://images.unsplash.com/photo-1627123424574-724758594e93?auto=format&fit=crop&q=80&w=600",
    stock: 35,
    rating: { rate: 4.2, count: 57 }
  },
  {
    id: "ox-48",
    title: "Oxivos Vector Compression Pants",
    price: 52,
    description: "Premium compression base layer tights made using sweat wicking fast dry fabric panels to maximize workout efficiency.",
    category: "Apparel",
    image: "https://images.unsplash.com/photo-1506152983158-b4a74a01c721?auto=format&fit=crop&q=80&w=600",
    stock: 13,
    rating: { rate: 4.6, count: 48 },
    sizes: [
      { size: "S", isAvailable: true },
      { size: "M", isAvailable: true },
      { size: "L", isAvailable: true }
    ]
  },
  {
    id: "ox-49",
    title: "Oxivos Grid Pack Rain Cover",
    price: 19,
    description: "Perfect packable high-vis waterproof cover tailored to shield and secure urban packs during severe unexpected downpours.",
    category: "Accessories",
    image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&q=80&w=600",
    stock: 25,
    rating: { rate: 4.3, count: 33 }
  },
  {
    id: "ox-50",
    title: "Oxivos Cyberpunk Face Shield",
    price: 35,
    description: "Highly protective wind-blocking cycling mask featuring a sleek mirrored front shield plate and breathable cotton lining structures.",
    category: "Accessories",
    image: "https://images.unsplash.com/photo-1571513722275-4b41940f54b8?auto=format&fit=crop&q=80&w=600",
    stock: 8,
    rating: { rate: 4.7, count: 91 }
  }
];