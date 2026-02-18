export interface Product {
  id: number;
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
  {
    id: 1,
    name: 'EcoFlow Cup',
    category: 'cups',
    price: 499, // ₹45 * 75 (approximate conversion)
    originalPrice: 699, // ₹60 * 75
    rating: 4.8,
    reviews: 1234,
    image: 'https://encrypted-tbn2.gstatic.com/shopping?q=tbn:ANd9GcSHhhLw8RkyPjF-nGtd52lM0y8XgofEPxnNKOiGgQY-Wort52TXMqaIoqfNV08U1PXKJyQmJWVGJr5lzPgmemZe9n8bIAtXMiOnvChkuNaeufLpslpLPRFU4w',
    images: [
      'https://encrypted-tbn2.gstatic.com/shopping?q=tbn:ANd9GcSHhhLw8RkyPjF-nGtd52lM0y8XgofEPxnNKOiGgQY-Wort52TXMqaIoqfNV08U1PXKJyQmJWVGJr5lzPgmemZe9n8bIAtXMiOnvChkuNaeufLpslpLPRFU4w',
      'https://encrypted-tbn3.gstatic.com/shopping?q=tbn:ANd9GcSg_uJU2IpPOfYthwuroav_CgrvsGRGEzG-Ldepfi7rMlv-jUs1nH2Vg7KJID7UujIofvBsYn-70_vf-ea47iFMzg3XqrKey99DubTnfirdPSGDLHRw1M6SAw',
      'https://encrypted-tbn3.gstatic.com/shopping?q=tbn:ANd9GcQjdMGyNIB7oLMQE6SIlGgAJaHUjTsbEYDmbvBYwYR3cXgptfsBdWSuxYju0QJQNzRcrDmvqRTzdKUZxUjAOQNkat9Ljmot7TfPzhvM8ZaEnHSleE06VQ'
    ],
    description: 'Our flagship menstrual cup made from premium medical-grade silicone. Designed for comfort and reliability, the EcoFlow Cup provides up to 12 hours of protection.',
    features: ['12hr Protection', 'Medical Grade Silicone', '10 Year Lifespan', 'Eco-Friendly', 'Easy to Clean'],
    sizes: ['Small', 'Medium', 'Large'],
    colors: ['Clear', 'Pink', 'Purple'],
    inStock: true,
    isBestseller: true
  },
  {
    id: 2,
    name: 'Reusable Sanitary Pads',
    category: 'underwear',
    price: 259, // ₹32 * 75
    originalPrice: 399, // ₹40 * 75
    rating: 4.9,
    reviews: 892,
    image: 'https://5.imimg.com/data5/SELLER/Default/2024/1/377286315/GV/IE/YY/78215961/4-piece-pink-reusable-pads.jpg',
    images: [
      'https://5.imimg.com/data5/SELLER/Default/2024/1/377286315/GV/IE/YY/78215961/4-piece-pink-reusable-pads.jpg',
      'https://fabpad.in/cdn/shop/products/81eDZD_6J3S._SL1500.jpg?v=1750922735&width=1100'
    ],
    description: 'Ultra-absorbent period underwear that feels just like regular underwear. Perfect for light to heavy flow days with leak-proof protection.',
    features: ['Ultra Absorbent', 'Leak-Proof', 'Machine Washable', 'Comfortable Fit', 'Odor Control'],
    sizes: ['XS', 'S', 'M', 'L', 'XL', 'XXL'],
    colors: ['Black', 'Nude', 'Navy'],
    inStock: true,
    isNew: true
  },
  {
    id: 3,
    name: 'Travel Kit Pro',
    category: 'accessories',
    price: 999, // ₹25 * 75
    originalPrice: 1199, // ₹35 * 75
    rating: 4.7,
    reviews: 456,
    image: 'https://caresakhi-testing.vercel.app/travel%20kit.png',
    images: [
      'https://caresakhi-testing.vercel.app/travel%20kit.png'
    ],
    description: 'Complete travel kit with sterilizer, storage pouch, and cleaning tablets. Perfect for maintaining hygiene on the go.',
    features: ['Sterilizer Included', 'Compact Design', 'Travel Friendly', 'Cleaning Tablets', 'Storage Pouch'],
    sizes: ['One Size'],
    colors: ['Pink', 'Blue', 'Green'],
    inStock: true
  },
  {
    id: 4,
    name: 'PureFlex Cup',
    category: 'cups',
    price: 699, // ₹52 * 75
    originalPrice: 899, // ₹65 * 75
    rating: 4.9,
    reviews: 2156,
    image: 'https://images-cdn.ubuy.co.in/6485afaa57c23d51673dbebb-dutchess-menstrual-cup-reusable-soft.jpg',
    images: [
      'https://images-cdn.ubuy.co.in/6485afaa57c23d51673dbebb-dutchess-menstrual-cup-reusable-soft.jpg',
      'https://rukminim2.flixcart.com/image/704/844/xif0q/menstrual-cup/u/v/d/large-1-menstrual-cup-h5486-hiniva-beauty-25-original-imah2zhzhjg4xjme.jpeg?q=90&crop=false'
    ],
    description: 'Premium platinum silicone cup with extra-soft material for sensitive users. Features easy-grip stem and smooth removal.',
    features: ['Extra Soft', 'Easy Removal', 'Platinum Silicone', 'Hypoallergenic', 'Long-lasting'],
    sizes: ['Small', 'Medium', 'Large'],
    colors: ['Clear', 'Teal', 'Rose'],
    inStock: true,
    isBestseller: true
  },
  {
    id: 5,
    name: 'ActiveFlow Brief',
    category: 'underwear',
    price: 359, // ₹38 * 75
    originalPrice: 559, // ₹65 * 75
    rating: 4.8,
    reviews: 567,
    image: 'https://m.media-amazon.com/images/I/6125KisEScL._UF1000,1000_QL80_.jpg',
    images: [
      'https://m.media-amazon.com/images/I/6125KisEScL._UF1000,1000_QL80_.jpg',
      'https://m.media-amazon.com/images/I/61PP5BiDSeL._UF350,350_QL80_.jpg'
    ],
    description: 'High-performance period underwear designed for active lifestyles. Moisture-wicking and breathable fabric.',
    features: ['Moisture-Wicking', 'Breathable', 'Athletic Fit', 'Quick-Dry', 'Anti-Microbial'],
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    colors: ['Black', 'Gray', 'Navy'],
    inStock: true
  },
  {
    id: 6,
    name: 'Period Disc',
    category: 'kits',
    price: 459, // ₹89 * 75
    originalPrice: 899, // ₹120 * 75
    rating: 4.9,
    reviews: 234,
    image: 'https://encrypted-tbn2.gstatic.com/shopping?q=tbn:ANd9GcSZTIBV6b1bsNkZ65RoGHZC9XBtcnFintdT2qT5Ot3fAXt39A2g8ta_pANQTNnL1GtJzMgEV4C4UOfDP-lWcJz3I4xkeCdlk8FznZD5YNRI-52mDFJbqqBb',
    images: [
      'https://encrypted-tbn2.gstatic.com/shopping?q=tbn:ANd9GcRXzq9sHebRimTNiOZhakRJiTjjnWxUPa8Oh4qU6QqBf--fjnN0JeKtB-4qWiPIQzaFMx8T34mkMFuYZzHx2H2SHaeLkyLUOKfxix24od4FSPpMP6srKJMS',
      'https://encrypted-tbn0.gstatic.com/shopping?q=tbn:ANd9GcTiyntqgSe-Mt6Xy2My3YElFsW4USVN0SgWDJKJmt2rf2g2jpee6D7R3u4UY1r0k_fNac20VG8DUCmt_SIWNXAnqz5XVwFs72sqPSOnNwvZj9IArAclGqY0',
      'https://encrypted-tbn0.gstatic.com/shopping?q=tbn:ANd9GcQ6Nmptwk64bBllifiMZASxwrkaP9YqeTmXYox4yooUrpG6zq442euamjWH840optSknOZ2_tlB7_P7KwS6QHO3_vOoLjArebc6Bs16fBBBtUJ2Y1Gi9vHz'
    ],
    description: 'Complete starter kit with cup, period underwear, and travel accessories. Perfect for first-time users.',
    features: ['8 hours Protection', 'Beginner Friendly', 'Educational Guide', 'Multiple Products', 'Great Value'],
    sizes: ['Small', 'Medium', 'Large'],
    colors: ['Mixed'],
    inStock: true,
    isNew: true
  }
];

export const categories = [
  { id: 'all', name: 'All Products', count: products.length },
  { id: 'cups', name: 'Menstrual Cups', count: products.filter(p => p.category === 'cups').length },
  { id: 'underwear', name: 'Period Underwear', count: products.filter(p => p.category === 'underwear').length },
  { id: 'accessories', name: 'Accessories', count: products.filter(p => p.category === 'accessories').length },
  { id: 'kits', name: 'Starter Kits', count: products.filter(p => p.category === 'kits').length }
];
