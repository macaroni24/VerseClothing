// 40 local products (Adults + Kids) with a clean category taxonomy.
// Categories:
// - "women"
// - "men"
// - "kids-girls"
// - "kids-boys"

export const MOCK_CATEGORIES = ['women', 'men', 'kids-girls', 'kids-boys']

function img(seed) {
  // Stable placeholder image per seed (no local assets required)
  return `https://picsum.photos/seed/${seed}/800/1000`
}

function price(n) {
  // Keep prices realistic; ensure two decimals
  return Math.round(n * 100) / 100
}

export const MOCK_PRODUCTS = [
  // -------------------------
  // WOMEN (10)
  // -------------------------
  {
    id: 1001,
    title: 'Women Tailored Blazer - Black',
    price: price(79.9),
    category: 'women',
    description: 'Structured blazer with clean lapels and a modern fit. Designed for day-to-night styling.',
    image: img('women-1001'),
  },
  {
    id: 1002,
    title: 'Women Satin Slip Dress - Sand',
    price: price(59.9),
    category: 'women',
    description: 'Minimal slip dress in satin finish. Adjustable straps and a fluid silhouette.',
    image: img('women-1002'),
  },
  {
    id: 1003,
    title: 'Women Wide-Leg Trousers - Charcoal',
    price: price(49.9),
    category: 'women',
    description: 'High-rise wide-leg trousers with pressed creases for a polished look.',
    image: img('women-1003'),
  },
  {
    id: 1004,
    title: 'Women Ribbed Knit Top - Off White',
    price: price(24.9),
    category: 'women',
    description: 'Rib-knit long-sleeve top with a fitted cut. Soft hand feel and clean finish.',
    image: img('women-1004'),
  },
  {
    id: 1005,
    title: 'Women Oversized Shirt - Blue Stripe',
    price: price(34.9),
    category: 'women',
    description: 'Oversized cotton shirt with subtle stripes. Easy to layer or wear alone.',
    image: img('women-1005'),
  },
  {
    id: 1006,
    title: 'Women Denim Midi Skirt - Indigo',
    price: price(44.9),
    category: 'women',
    description: 'Denim midi skirt with a front slit. Classic wash with modern proportions.',
    image: img('women-1006'),
  },
  {
    id: 1007,
    title: 'Women Cropped Jacket - Ecru',
    price: price(69.9),
    category: 'women',
    description: 'Cropped jacket with clean seams and structured shoulders. Minimal and versatile.',
    image: img('women-1007'),
  },
  {
    id: 1008,
    title: 'Women Pleated Skirt - Black',
    price: price(39.9),
    category: 'women',
    description: 'Pleated skirt with a crisp drape and comfortable waistband. Easy movement.',
    image: img('women-1008'),
  },
  {
    id: 1009,
    title: 'Women Trench Coat - Beige',
    price: price(99.9),
    category: 'women',
    description: 'Classic trench with belt and storm flap details. Lightweight layering essential.',
    image: img('women-1009'),
  },
  {
    id: 1010,
    title: 'Women Minimal Sneakers - White',
    price: price(54.9),
    category: 'women',
    description: 'Clean low-profile sneakers with a minimal upper and everyday comfort.',
    image: img('women-1010'),
  },

  // -------------------------
  // MEN (10)
  // -------------------------
  {
    id: 2001,
    title: 'Men Utility Overshirt - Olive',
    price: price(49.9),
    category: 'men',
    description: 'Utility overshirt with chest pockets and a structured feel. Perfect for layering.',
    image: img('men-2001'),
  },
  {
    id: 2002,
    title: 'Men Straight Jeans - Dark Blue',
    price: price(44.9),
    category: 'men',
    description: 'Straight-leg denim with a clean dark wash. Everyday fit with modern finish.',
    image: img('men-2002'),
  },
  {
    id: 2003,
    title: 'Men Knit Crewneck - Grey',
    price: price(34.9),
    category: 'men',
    description: 'Soft crewneck knit with ribbed trims. Minimal look for daily wear.',
    image: img('men-2003'),
  },
  {
    id: 2004,
    title: 'Men Tailored Trousers - Black',
    price: price(54.9),
    category: 'men',
    description: 'Tailored trousers with a tapered leg and clean front. Smart-casual essential.',
    image: img('men-2004'),
  },
  {
    id: 2005,
    title: 'Men Minimal Hoodie - Sand',
    price: price(39.9),
    category: 'men',
    description: 'Minimal hoodie with a structured hood and soft interior. Clean branding-free look.',
    image: img('men-2005'),
  },
  {
    id: 2006,
    title: 'Men Oxford Shirt - White',
    price: price(29.9),
    category: 'men',
    description: 'Crisp oxford shirt with a classic collar. Versatile for office or weekend.',
    image: img('men-2006'),
  },
  {
    id: 2007,
    title: 'Men Lightweight Jacket - Navy',
    price: price(79.9),
    category: 'men',
    description: 'Lightweight jacket with a minimal silhouette. Ideal transitional layer.',
    image: img('men-2007'),
  },
  {
    id: 2008,
    title: 'Men Relaxed Tee - Black',
    price: price(19.9),
    category: 'men',
    description: 'Relaxed-fit tee in soft cotton. Clean neckline and modern proportions.',
    image: img('men-2008'),
  },
  {
    id: 2009,
    title: 'Men Chinos - Stone',
    price: price(39.9),
    category: 'men',
    description: 'Slim chinos with a clean finish. Comfortable stretch for all-day wear.',
    image: img('men-2009'),
  },
  {
    id: 2010,
    title: 'Men Minimal Sneakers - Black',
    price: price(54.9),
    category: 'men',
    description: 'Low-profile sneakers with a minimal upper and everyday comfort.',
    image: img('men-2010'),
  },

  // -------------------------
  // KIDS - GIRLS (10)
  // -------------------------
  {
    id: 3001,
    title: 'Kids Girls Sweatshirt - Pink',
    price: price(19.9),
    category: 'kids-girls',
    description: 'Soft sweatshirt for everyday play. Comfortable fit with clean finish.',
    image: img('kids-girls-3001'),
  },
  {
    id: 3002,
    title: 'Kids Girls Leggings - Black',
    price: price(12.9),
    category: 'kids-girls',
    description: 'Stretch leggings designed for movement. Easy to pair with tees and sweatshirts.',
    image: img('kids-girls-3002'),
  },
  {
    id: 3003,
    title: 'Kids Girls Dress - Floral',
    price: price(24.9),
    category: 'kids-girls',
    description: 'Light dress with a comfortable shape for daily wear and special moments.',
    image: img('kids-girls-3003'),
  },
  {
    id: 3004,
    title: 'Kids Girls Denim Jacket - Light Blue',
    price: price(29.9),
    category: 'kids-girls',
    description: 'Classic denim jacket in a light wash. Durable layer for changing weather.',
    image: img('kids-girls-3004'),
  },
  {
    id: 3005,
    title: 'Kids Girls Cardigan - Cream',
    price: price(21.9),
    category: 'kids-girls',
    description: 'Soft cardigan with ribbed trims. Ideal for layering in cooler days.',
    image: img('kids-girls-3005'),
  },
  {
    id: 3006,
    title: 'Kids Girls Skirt - Navy',
    price: price(16.9),
    category: 'kids-girls',
    description: 'Simple skirt with an elastic waistband. Easy movement and styling.',
    image: img('kids-girls-3006'),
  },
  {
    id: 3007,
    title: 'Kids Girls T-shirt - White',
    price: price(9.9),
    category: 'kids-girls',
    description: 'Everyday tee in soft cotton. Clean shape and comfortable neckline.',
    image: img('kids-girls-3007'),
  },
  {
    id: 3008,
    title: 'Kids Girls Puffer Vest - Lilac',
    price: price(34.9),
    category: 'kids-girls',
    description: 'Light puffer vest for warmth without bulk. Perfect for layering.',
    image: img('kids-girls-3008'),
  },
  {
    id: 3009,
    title: 'Kids Girls Sneakers - White',
    price: price(24.9),
    category: 'kids-girls',
    description: 'Comfort sneakers for daily use. Easy fit for active days.',
    image: img('kids-girls-3009'),
  },
  {
    id: 3010,
    title: 'Kids Girls Hoodie - Grey',
    price: price(22.9),
    category: 'kids-girls',
    description: 'Soft hoodie with a simple, clean look. Ideal for school and weekends.',
    image: img('kids-girls-3010'),
  },

  // -------------------------
  // KIDS - BOYS (10)
  // -------------------------
  {
    id: 4001,
    title: 'Kids Boys Sweatshirt - Blue',
    price: price(19.9),
    category: 'kids-boys',
    description: 'Soft sweatshirt for everyday play. Comfortable fit with clean finish.',
    image: img('kids-boys-4001'),
  },
  {
    id: 4002,
    title: 'Kids Boys Joggers - Grey',
    price: price(16.9),
    category: 'kids-boys',
    description: 'Comfort joggers with elastic waistband. Designed for movement and comfort.',
    image: img('kids-boys-4002'),
  },
  {
    id: 4003,
    title: 'Kids Boys Denim Jeans - Dark Blue',
    price: price(22.9),
    category: 'kids-boys',
    description: 'Durable denim jeans for daily wear. Comfortable fit with modern look.',
    image: img('kids-boys-4003'),
  },
  {
    id: 4004,
    title: 'Kids Boys Hoodie - Black',
    price: price(22.9),
    category: 'kids-boys',
    description: 'Soft hoodie with a clean silhouette. Great for school and weekends.',
    image: img('kids-boys-4004'),
  },
  {
    id: 4005,
    title: 'Kids Boys T-shirt - White',
    price: price(9.9),
    category: 'kids-boys',
    description: 'Everyday tee in soft cotton. Clean neckline and comfortable fit.',
    image: img('kids-boys-4005'),
  },
  {
    id: 4006,
    title: 'Kids Boys Shirt - Light Blue',
    price: price(18.9),
    category: 'kids-boys',
    description: 'Light button-up shirt for a smart-casual look. Comfortable and breathable.',
    image: img('kids-boys-4006'),
  },
  {
    id: 4007,
    title: 'Kids Boys Puffer Jacket - Navy',
    price: price(39.9),
    category: 'kids-boys',
    description: 'Warm puffer jacket for colder days. Lightweight feel with comfortable fit.',
    image: img('kids-boys-4007'),
  },
  {
    id: 4008,
    title: 'Kids Boys Shorts - Sand',
    price: price(14.9),
    category: 'kids-boys',
    description: 'Casual shorts for warmer days. Easy to wear, easy to move in.',
    image: img('kids-boys-4008'),
  },
  {
    id: 4009,
    title: 'Kids Boys Sneakers - Black',
    price: price(24.9),
    category: 'kids-boys',
    description: 'Comfort sneakers for daily use. Easy fit for active days.',
    image: img('kids-boys-4009'),
  },
  {
    id: 4010,
    title: 'Kids Boys Overshirt - Olive',
    price: price(26.9),
    category: 'kids-boys',
    description: 'Light overshirt with pockets. A simple layer for transitional weather.',
    image: img('kids-boys-4010'),
  },
]
