export interface Product {
  id: number;
  slug: string;
  name: string;
  category: string;
  price: number;
  originalPrice?: number;
  rating: number;
  reviews: number;
  image: string;
  images: string[];
  description: string;
  features: string[];
  sizes: string[];
  colors: string[];
  inStock: boolean;
  isNew?: boolean;
  isBestseller?: boolean;
}

export const products: Product[] = [
  // ─── MENSTRUAL CUPS ───────────────────────────────────────────────
  {
    id: 1,
    slug: 'ecoflow-cup',
    name: 'EcoFlow Cup',
    category: 'cups',
    price: 499,
    originalPrice: 699,
    rating: 4.8,
    reviews: 124,
    image: 'https://images-cdn.ubuy.co.in/6485afaa57c23d51673dbebb-dutchess-menstrual-cup-reusable-soft.jpg',
    images: [
      'https://images-cdn.ubuy.co.in/6485afaa57c23d51673dbebb-dutchess-menstrual-cup-reusable-soft.jpg',
      'https://rukminim2.flixcart.com/image/704/844/xif0q/menstrual-cup/u/v/d/large-1-menstrual-cup-h5486-hiniva-beauty-25-original-imah2zhzhjg4xjme.jpeg?q=90&crop=false'
    ],
    description: 'Our flagship menstrual cup made from 100% medical-grade silicone. Designed for all-day comfort and leak-free confidence, the EcoFlow Cup provides up to 12 hours of protection — perfect for work, sleep, and travel.',
    features: ['12hr Protection', 'Medical Grade Silicone', '10 Year Lifespan', 'BPA & Latex Free', 'Easy to Clean'],
    sizes: ['Small', 'Medium', 'Large'],
    colors: ['Clear', 'Pink', 'Purple'],
    inStock: true,
    isBestseller: true
  },
  {
    id: 2,
    slug: 'pureflex-cup',
    name: 'PureFlex Cup',
    category: 'cups',
    price: 699,
    originalPrice: 899,
    rating: 4.9,
    reviews: 216,
    image: 'https://encrypted-tbn2.gstatic.com/shopping?q=tbn:ANd9GcSHhhLw8RkyPjF-nGtd52lM0y8XgofEPxnNKOiGgQY-Wort52TXMqaIoqfNV08U1PXKJyQmJWVGJr5lzPgmemZe9n8bIAtXMiOnvChkuNaeufLpslpLPRFU4w',
    images: [
      'https://encrypted-tbn2.gstatic.com/shopping?q=tbn:ANd9GcSHhhLw8RkyPjF-nGtd52lM0y8XgofEPxnNKOiGgQY-Wort52TXMqaIoqfNV08U1PXKJyQmJWVGJr5lzPgmemZe9n8bIAtXMiOnvChkuNaeufLpslpLPRFU4w',
      'https://encrypted-tbn3.gstatic.com/shopping?q=tbn:ANd9GcSg_uJU2IpPOfYthwuroav_CgrvsGRGEzG-Ldepfi7rMlv-jUs1nH2Vg7KJID7UujIofvBsYn-70_vf-ea47iFMzg3XqrKey99DubTnfirdPSGDLHRw1M6SAw'
    ],
    description: 'Premium platinum silicone cup with extra-soft material designed for first-time users and those with sensitive anatomy. Features an easy-grip stem for effortless removal.',
    features: ['Extra Soft', 'Easy Removal', 'Platinum Silicone', 'Hypoallergenic', 'Beginner Friendly'],
    sizes: ['Small', 'Medium', 'Large'],
    colors: ['Clear', 'Teal', 'Rose'],
    inStock: true,
    isBestseller: true
  },
  {
    id: 3,
    slug: 'teen-comfort-cup',
    name: 'Teen Comfort Cup',
    category: 'cups',
    price: 399,
    rating: 3.9,
    reviews: 87,
    image: 'https://encrypted-tbn3.gstatic.com/shopping?q=tbn:ANd9GcQjdMGyNIB7oLMQE6SIlGgAJaHUjTsbEYDmbvBYwYR3cXgptfsBdWSuxYju0QJQNzRcrDmvqRTzdKUZxUjAOQNkat9Ljmot7TfPzhvM8ZaEnHSleE06VQ',
    images: [
      'https://encrypted-tbn3.gstatic.com/shopping?q=tbn:ANd9GcQjdMGyNIB7oLMQE6SIlGgAJaHUjTsbEYDmbvBYwYR3cXgptfsBdWSuxYju0QJQNzRcrDmvqRTzdKUZxUjAOQNkat9Ljmot7TfPzhvM8ZaEnHSleE06VQ'
    ],
    description: 'Specially designed for teens and first-time cup users. Smaller, softer, and easier to insert. Comes with an illustrated step-by-step guide to make the transition smooth.',
    features: ['Teen-Sized', 'Ultra Soft', 'Step-by-Step Guide', 'BPA Free', '8hr Protection'],
    sizes: ['Teen', 'Small'],
    colors: ['Pink', 'Lavender'],
    inStock: true,
    isNew: true
  },

  // ─── REUSABLE PADS ────────────────────────────────────────────────
  {
    id: 4,
    slug: 'everyday-reusable-pad',
    name: 'Everyday Reusable Pad',
    category: 'pads',
    price: 259,
    originalPrice: 399,
    rating: 4.9,
    reviews: 189,
    image: 'https://5.imimg.com/data5/SELLER/Default/2024/1/377286315/GV/IE/YY/78215961/4-piece-pink-reusable-pads.jpg',
    images: [
      'https://5.imimg.com/data5/SELLER/Default/2024/1/377286315/GV/IE/YY/78215961/4-piece-pink-reusable-pads.jpg',
      'https://fabpad.in/cdn/shop/products/81eDZD_6J3S._SL1500.jpg?v=1750922735&width=1100'
    ],
    description: 'Ultra-absorbent reusable cloth pads in a convenient 4-piece set. Soft bamboo top layer, leak-proof waterproof backing, and snap-on wings for a secure fit. Machine washable up to 300+ cycles.',
    features: ['Ultra Absorbent', 'Leak-Proof Backing', 'Machine Washable', 'Snap-On Wings', '300+ Washes'],
    sizes: ['Regular', 'Large', 'Overnight'],
    colors: ['Pink', 'Floral', 'Charcoal'],
    inStock: true,
    isBestseller: true
  },
  {
    id: 5,
    slug: 'overnight-maxi-pad',
    name: 'Overnight Maxi Pad',
    category: 'pads',
    price: 349,
    originalPrice: 499,
    rating: 4.8,
    reviews: 94,
    image: 'https://m.media-amazon.com/images/I/6125KisEScL._UF1000,1000_QL80_.jpg',
    images: [
      'https://m.media-amazon.com/images/I/6125KisEScL._UF1000,1000_QL80_.jpg'
    ],
    description: 'Extra-long 14" reusable pad built for heavy overnight flow. Triple-layer absorbency core with charcoal bamboo for odor control. Sleep worry-free all night long.',
    features: ['14" Extra Long', 'Triple-Layer Core', 'Charcoal Bamboo', 'Odor Control', 'Heavy Flow'],
    sizes: ['Overnight'],
    colors: ['Black', 'Navy'],
    inStock: true
  },

  // ─── PERIOD UNDERWEAR ─────────────────────────────────────────────
  {
    id: 6,
    slug: 'activeflow-brief',
    name: 'ActiveFlow Brief',
    category: 'underwear',
    price: 599,
    originalPrice: 799,
    rating: 4.8,
    reviews: 57,
    image: 'https://m.media-amazon.com/images/I/61PP5BiDSeL._UF350,350_QL80_.jpg',
    images: [
      'https://m.media-amazon.com/images/I/61PP5BiDSeL._UF350,350_QL80_.jpg'
    ],
    description: 'High-performance period underwear designed for active lifestyles. 4-layer technology with moisture-wicking, breathable mesh, absorbent core, and leak-proof barrier. Holds up to 3 tampons worth of flow.',
    features: ['Moisture-Wicking', 'Breathable Mesh', '4-Layer Technology', 'Anti-Microbial', 'Quick-Dry'],
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    colors: ['Black', 'Nude', 'Navy'],
    inStock: true,
    isNew: true
  },
  {
    id: 7,
    slug: 'comfort-hipster',
    name: 'Comfort Hipster',
    category: 'underwear',
    price: 549,
    rating: 4.0,
    reviews: 42,
    image: 'https://m.media-amazon.com/images/I/6125KisEScL._UF1000,1000_QL80_.jpg',
    images: [
      'https://m.media-amazon.com/images/I/6125KisEScL._UF1000,1000_QL80_.jpg'
    ],
    description: 'Mid-rise hipster cut period underwear that feels just like your favorite everyday pair. Seamless design with invisible leak protection for light to moderate flow days.',
    features: ['Seamless Design', 'Mid-Rise Fit', 'Invisible Protection', 'All-Day Comfort', 'Machine Washable'],
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    colors: ['Black', 'Blush', 'Gray'],
    inStock: true
  },

  // ─── PERIOD DISCS ─────────────────────────────────────────────────
  {
    id: 8,
    slug: 'flexdisc-reusable',
    name: 'FlexDisc Reusable',
    category: 'discs',
    price: 459,
    originalPrice: 649,
    rating: 3.5,
    reviews: 68,
    image: 'https://encrypted-tbn2.gstatic.com/shopping?q=tbn:ANd9GcSZTIBV6b1bsNkZ65RoGHZC9XBtcnFintdT2qT5Ot3fAXt39A2g8ta_pANQTNnL1GtJzMgEV4C4UOfDP-lWcJz3I4xkeCdlk8FznZD5YNRI-52mDFJbqqBb',
    images: [
      'https://encrypted-tbn2.gstatic.com/shopping?q=tbn:ANd9GcSZTIBV6b1bsNkZ65RoGHZC9XBtcnFintdT2qT5Ot3fAXt39A2g8ta_pANQTNnL1GtJzMgEV4C4UOfDP-lWcJz3I4xkeCdlk8FznZD5YNRI-52mDFJbqqBb',
      'https://encrypted-tbn2.gstatic.com/shopping?q=tbn:ANd9GcRXzq9sHebRimTNiOZhakRJiTjjnWxUPa8Oh4qU6QqBf--fjnN0JeKtB-4qWiPIQzaFMx8T34mkMFuYZzHx2H2SHaeLkyLUOKfxix24od4FSPpMP6srKJMS',
      'https://encrypted-tbn0.gstatic.com/shopping?q=tbn:ANd9GcTiyntqgSe-Mt6Xy2My3YElFsW4USVN0SgWDJKJmt2rf2g2jpee6D7R3u4UY1r0k_fNac20VG8DUCmt_SIWNXAnqz5XVwFs72sqPSOnNwvZj9IArAclGqY0'
    ],
    description: 'Reusable menstrual disc that sits at the base of the cervix for a secure, comfortable fit. Can be worn during intimacy. Made from body-safe silicone with a flexible rim.',
    features: ['12hr Protection', 'Intimacy-Safe', 'Auto-Emptying', 'Flexible Rim', 'Body-Safe Silicone'],
    sizes: ['Regular', 'Large'],
    colors: ['Clear', 'Pink'],
    inStock: true,
    isNew: true
  },

  // ─── STARTER KITS ─────────────────────────────────────────────────
  {
    id: 9,
    slug: 'beginners-kit',
    name: 'Beginners Kit',
    category: 'kits',
    price: 799,
    originalPrice: 1099,
    rating: 4.9,
    reviews: 156,
    image: '/beginners kit.png',
    images: [
      '/beginners kit.png'
    ],
    description: 'Everything a first-time user needs in one box. Includes an EcoFlow Cup (Small), 2 reusable pads, a sterilizer cup, storage pouch, and an illustrated how-to guide. The perfect starter bundle.',
    features: ['Cup + Pads + Sterilizer', 'Illustrated Guide', 'Storage Pouch', 'Great Value', 'Gift Ready'],
    sizes: ['One Size'],
    colors: ['Mixed'],
    inStock: true,
    isBestseller: true
  },
  {
    id: 10,
    slug: 'under-18-kit',
    name: 'Under-18 Kit',
    category: 'kits',
    price: 649,
    originalPrice: 899,
    rating: 4.8,
    reviews: 73,
    image: '/under 18 kit.png',
    images: [
      '/under 18 kit.png'
    ],
    description: 'Age-appropriate period starter kit curated for teens. Includes a Teen Comfort Cup, 3 reusable pantyliners, a discreet carry pouch, and a friendly period education booklet for young users.',
    features: ['Teen-Sized Cup', '3 Pantyliners', 'Education Booklet', 'Carry Pouch', 'Parent-Approved'],
    sizes: ['One Size'],
    colors: ['Mixed'],
    inStock: true,
    isNew: true
  },
  {
    id: 11,
    slug: 'heavy-flow-kit',
    name: 'Heavy Flow Kit',
    category: 'kits',
    price: 999,
    originalPrice: 1399,
    rating: 4.9,
    reviews: 112,
    image: '/heavy flow kit.png',
    images: [
      '/heavy flow kit.png',
      '/heavy flow kit.jpg'
    ],
    description: 'Built for heavy flow days with maximum protection. Includes a Large EcoFlow Cup, 2 Overnight Maxi Pads, ActiveFlow Brief, and a sterilizer cup. Total confidence, zero compromises.',
    features: ['Large Cup', '2 Overnight Pads', 'Period Underwear', 'Sterilizer Cup', 'Max Protection'],
    sizes: ['One Size'],
    colors: ['Mixed'],
    inStock: true,
    isBestseller: true
  },
  {
    id: 12,
    slug: 'light-flow-kit',
    name: 'Light Flow Kit',
    category: 'kits',
    price: 599,
    originalPrice: 849,
    rating: 4.2,
    reviews: 64,
    image: '/light flow kit.png',
    images: [
      '/light flow kit.png',
      '/light flow kit.jpg'
    ],
    description: 'Perfect for light flow days, spotting, or as backup protection. Includes a Small EcoFlow Cup, 2 regular reusable pads, and a cotton carry bag. Lightweight and discreet.',
    features: ['Small Cup', '2 Regular Pads', 'Cotton Bag', 'Discreet', 'Travel Friendly'],
    sizes: ['One Size'],
    colors: ['Mixed'],
    inStock: true
  },
  {
    id: 13,
    slug: 'postpartum-kit',
    name: 'Postpartum Recovery Kit',
    category: 'kits',
    price: 1099,
    originalPrice: 1499,
    rating: 4.8,
    reviews: 41,
    image: '/postpartum kit.png',
    images: [
      '/postpartum kit.png'
    ],
    description: 'Specially designed for new mothers during postpartum recovery. Includes 4 extra-absorbent reusable pads, 2 period underwear, and a soothing perineal care spray. Gentle, comfortable, and safe.',
    features: ['4 Extra-Absorbent Pads', '2 Period Underwear', 'Perineal Care Spray', 'Postpartum Safe', 'Hospital Bag Ready'],
    sizes: ['One Size'],
    colors: ['Mixed'],
    inStock: true,
    isNew: true
  },
  {
    id: 14,
    slug: 'menopause-comfort-kit',
    name: 'Menopause Comfort Kit',
    category: 'kits',
    price: 899,
    originalPrice: 1199,
    rating: 3.8,
    reviews: 29,
    image: '/menopause kit.jpg',
    images: [
      '/menopause kit.jpg'
    ],
    description: 'Curated for women experiencing perimenopause and menopause with unpredictable flow. Includes multi-absorbency pads (light, regular, heavy), 1 period underwear, and a wellness guide.',
    features: ['Multi-Absorbency Pads', 'Period Underwear', 'Wellness Guide', 'For Irregular Flow', 'Soft Bamboo Fabric'],
    sizes: ['One Size'],
    colors: ['Mixed'],
    inStock: true
  },

  // ─── ACCESSORIES ──────────────────────────────────────────────────
  {
    id: 15,
    slug: 'travel-kit-pro',
    name: 'Travel Kit Pro',
    category: 'accessories',
    price: 349,
    originalPrice: 499,
    rating: 4.7,
    reviews: 88,
    image: '/travel kit.png',
    images: [
      '/travel kit.png'
    ],
    description: 'Compact travel-friendly kit with a collapsible sterilizer cup, cleaning tablets (30-pack), leak-proof storage pouch, and wet wipes. Everything you need for maintaining hygiene on the go.',
    features: ['Collapsible Sterilizer', '30 Cleaning Tablets', 'Leak-Proof Pouch', 'Wet Wipes', 'TSA Friendly'],
    sizes: ['One Size'],
    colors: ['Pink', 'Teal', 'Black'],
    inStock: true
  },
  {
    id: 16,
    slug: 'sterilizer-cup',
    name: 'Sterilizer Cup',
    category: 'accessories',
    price: 199,
    rating: 4.1,
    reviews: 132,
    image: 'https://encrypted-tbn0.gstatic.com/shopping?q=tbn:ANd9GcQ6Nmptwk64bBllifiMZASxwrkaP9YqeTmXYox4yooUrpG6zq442euamjWH840optSknOZ2_tlB7_P7KwS6QHO3_vOoLjArebc6Bs16fBBBtUJ2Y1Gi9vHz',
    images: [
      'https://encrypted-tbn0.gstatic.com/shopping?q=tbn:ANd9GcQ6Nmptwk64bBllifiMZASxwrkaP9YqeTmXYox4yooUrpG6zq442euamjWH840optSknOZ2_tlB7_P7KwS6QHO3_vOoLjArebc6Bs16fBBBtUJ2Y1Gi9vHz'
    ],
    description: 'Microwave-safe collapsible silicone sterilizer cup. Simply fill with water, add your menstrual cup, and microwave for 3 minutes. Collapses flat for easy storage and travel.',
    features: ['Microwave-Safe', 'Collapsible', 'Food-Grade Silicone', '3-Min Sterilization', 'Travel Compact'],
    sizes: ['One Size'],
    colors: ['Pink', 'Blue', 'Green'],
    inStock: true
  },
  {
    id: 17,
    slug: 'carry-pouch-set',
    name: 'Carry Pouch Set',
    category: 'accessories',
    price: 149,
    rating: 3.6,
    reviews: 56,
    image: '/unnamed.png',
    images: [
      '/unnamed.png'
    ],
    description: 'Set of 3 breathable cotton carry pouches in different sizes for storing menstrual cups, pads, or period underwear. Printed with discreet floral patterns. Machine washable.',
    features: ['Set of 3 Sizes', 'Breathable Cotton', 'Machine Washable', 'Discreet Design', 'Drawstring Closure'],
    sizes: ['One Size'],
    colors: ['Floral Mix'],
    inStock: true
  }
];

export const categories = [
  { id: 'all', name: 'All Products', count: products.length },
  { id: 'cups', name: 'Menstrual Cups', count: products.filter(p => p.category === 'cups').length },
  { id: 'pads', name: 'Reusable Pads', count: products.filter(p => p.category === 'pads').length },
  { id: 'underwear', name: 'Period Underwear', count: products.filter(p => p.category === 'underwear').length },
  { id: 'discs', name: 'Period Discs', count: products.filter(p => p.category === 'discs').length },
  { id: 'kits', name: 'Starter Kits', count: products.filter(p => p.category === 'kits').length },
  { id: 'accessories', name: 'Accessories', count: products.filter(p => p.category === 'accessories').length }
];
