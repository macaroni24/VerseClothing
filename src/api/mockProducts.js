export const MOCK_CATEGORIES = ['women', 'men', 'kids-girls', 'kids-boys']

function price(n) {
  return Math.round(n * 100) / 100
}

export const MOCK_PRODUCTS = [
  // -------------------------
  // WOMEN
  // -------------------------
  { id: 1001, title: 'Black Blazer', price: price(79.9), category: 'women', description: 'Simple black blazer.', image: 'https://img.freepik.com/free-photo/young-woman-portrait-outdoor-black-wear_624325-3415.jpg?semt=ais_hybrid&w=740&q=80' },
  { id: 1002, title: 'Slip Dress', price: price(59.9), category: 'women', description: 'Light satin dress.', image: 'https://media2.newlookassets.com/i/newlook/892680810/womens/clothing/lingerie/white-strappy-slip-dress.jpg?strip=true&qlt=50&w=720' },
  { id: 1003, title: 'Baggy Pants', price: price(49.9), category: 'women', description: 'Loose fit pants.', image: 'https://m.media-amazon.com/images/I/810cMul4pVL._AC_UY1000_.jpg' },
  { id: 1004, title: 'White Top', price: price(24.9), category: 'women', description: 'Basic white top.', image: 'https://cdn-img.prettylittlething.com/8/b/6/5/8b65c8fc04a17bc77796c758a3ae399948539fbf_CNF0736_1_white_basic_slinky_short_sleeve_crop_top.jpg' },
  { id: 1005, title: 'Blue Shirt', price: price(34.9), category: 'women', description: 'Oversized shirt.', image: 'https://dtcralphlauren.scene7.com/is/image/PoloGSI/s7-1432681_alternate1?$rl_4x5_pdp$' },
  { id: 1006, title: 'Denim Skirt', price: price(44.9), category: 'women', description: 'Classic denim skirt.', image: 'https://media2.newlookassets.com/i/newlook/906734740/womens/clothing/skirts/blue-vintage-tint-midi-denim-skirt.jpg?strip=true&qlt=50&w=720' },
  { id: 1007, title: 'Short Jacket', price: price(69.9), category: 'women', description: 'Cropped jacket.', image: 'https://i5.walmartimages.com/asr/cc9681e4-a645-45bd-b935-10ef7b7a1e6c.d115233c32ec4461be1c228be64cd3ac.jpeg?odnHeight=768&odnWidth=768&odnBg=FFFFFF' },
  { id: 1008, title: ' Sneakers', price: price(54.9), category: 'women', description: 'Clean sneakers.', image: 'https://www.instyle.com/thmb/AUbfwONfHm2429-czJjk7wVMUb4=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/nike-sneakers-3864e69265d5417687e751c7ba30fc1c.jpg' },

  // -------------------------
  // MEN
  // -------------------------
  { id: 2001, title: 'Overshirt', price: price(49.9), category: 'men', description: 'Light overshirt.', image: 'https://icon-amsterdam.com/cdn/shop/files/1_5986866c-7669-4ec9-baef-419eb21795d1_large.webp?v=1730122587' },
  { id: 2002, title: 'Blue Jeans', price: price(44.9), category: 'men', description: 'Straight jeans.', image: 'https://m.media-amazon.com/images/I/81jO8l9TkiL._AC_UF894,1000_QL80_.jpg' },
  { id: 2003, title: 'Grey Sweater', price: price(34.9), category: 'men', description: 'Soft knit sweater.', image: 'https://images-static.nykaa.com/media/catalog/product/b/a/babcc29268310_1.jpg?tr=w-500' },
  { id: 2004, title: 'Black Pants', price: price(54.9), category: 'men', description: 'Tailored pants.', image: 'https://www.hollomen.com/cdn/shop/files/Men_sTailoredGraySlim-FitDressPants_3.jpg?v=1736125641&width=1445' },
  { id: 2005, title: 'Hoodie', price: price(39.9), category: 'men', description: 'Simple hoodie.', image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRJbWYl1l0lhyJu18LPcFbos4oiWYXWqIcCCg&s' },
  { id: 2006, title: 'White Shirt', price: price(29.9), category: 'men', description: 'Classic shirt.', image: 'https://www.henbury.com/wp-content/uploads/2018/04/Untitled-design-2.png' },
  { id: 2007, title: 'Light Jacket', price: price(79.9), category: 'men', description: 'Everyday jacket.', image: 'https://vstyleformen.com/wp-content/uploads/2021/07/PETER-MILLAR-Suffolk-Quilted-Car-Coat-.jpg' },
  { id: 2008, title: 'White T-shirt', price: price(19.9), category: 'men', description: 'Basic tee.', image: 'https://us.mavi.com/cdn/shop/products/16f72a23b4da1d09b449d2d22447d85ae11eb7d0836762af99ca6ad2609bfac1.jpg?v=1745342012' },

  // -------------------------
  // KIDS - GIRLS
  // -------------------------
  { id: 3001, title: ' Sweatshirt', price: price(19.9), category: 'kids-girls', description: 'Soft sweatshirt.', image: 'https://target.scene7.com/is/image/Target/GUEST_c47f00af-ef9f-44ff-90a7-95a1d082a21a' },
  { id: 3002, title: ' Leggings', price: price(12.9), category: 'kids-girls', description: 'Stretch leggings.', image: 'https://cdn.accentuate.io/7305192177708/1723752810571/ParisianIcons_Legging_2.jpg?v=1723752810571?odnHeight=117&odnWidth=117&odnBg=FFFFFF' },
  { id: 3003, title: ' Dress', price: price(24.9), category: 'kids-girls', description: 'Light dress.', image: 'https://i5.walmartimages.com/seo/Girl-Dresses-New-Long-Sleeve-Solid-Ruffled-High-Waist-Swing-Dresses-Girls-Dress-Light-Blue-10-11-Years_3d508b33-49a3-425a-aeb1-7c5915ccff04.422daf7d020917dac1350beb3e7bdbcd.jpeg?odnHeight=768&odnWidth=768&odnBg=FFFFFF' },
  { id: 3004, title: 'Denim Jacket', price: price(29.9), category: 'kids-girls', description: 'Blue denim jacket.', image: 'https://img01.ztat.net/article/spp-media-p1/fb0b3ad7ed574468bfe0bc5631b6f0e6/ab8bf61995bd41fbb417c521a9b68e2f.jpg?imwidth=1800' },
  { id: 3005, title: ' T-shirt', price: price(9.9), category: 'kids-girls', description: 'Everyday tee.', image: 'https://dfcdn.defacto.com.tr/7/E1034A8_25SM_ER85_01_01.jpg' },
  { id: 3006, title: 'Sneakers', price: price(24.9), category: 'kids-girls', description: 'Comfort shoes.', image: 'https://img.kwcdn.com/product/fancy/3ce39bdf-0d1f-4709-8c8e-4cd76ed2cabb.jpg?imageMogr2/auto-orient%7CimageView2/2/w/800/q/70/format/webp' },
  { id: 3007, title: 'Hoodie', price: price(22.9), category: 'kids-girls', description: 'Warm hoodie.', image: 'https://m.media-amazon.com/images/I/41p3KWaNmEL.jpg' },

  // -------------------------
  // KIDS - BOYS
  // -------------------------
  { id: 4001, title: 'Sweatshirt', price: price(19.9), category: 'kids-boys', description: 'Soft sweatshirt.', image: 'https://i5.walmartimages.com/seo/Kids-Boys-Hoodies-Kids-White-Zipper-Hoodie-Long-Sleeve-Soft-Sweatshirts-Top-Fall-Clothes-Girls-Size-7-8-Years-Clothes-Cute-nbsp-Boy-Girl-nbsp-Clothin_60fe58fd-e9d6-481b-bcfd-e5c8bfe3e4b9.41fc9abf32e1476deae2a62abeaf1820.jpeg' },
  { id: 4002, title: 'Joggers', price: price(16.9), category: 'kids-boys', description: 'Comfort pants.', image: 'https://oldnavy.gap.com/webcontent/0055/771/624/cn55771624.jpg' },
  { id: 4003, title: 'Denim Jeans', price: price(22.9), category: 'kids-boys', description: 'Daily jeans.', image: 'https://assets.theplace.com/image/upload/v1/ecom/assets/products/gym/3058241/3058241_33PN.jpg' },
  { id: 4004, title: 'Black Hoodie', price: price(22.9), category: 'kids-boys', description: 'Simple hoodie.', image: 'https://n.nordstrommedia.com/it/f3682cc9-14bd-45f4-9eb4-880a441a918c.jpeg?h=368&w=240&dpr=2' },
  { id: 4005, title: 'T-shirt', price: price(9.9), category: 'kids-boys', description: 'Basic tee.', image: 'https://www.bellacanvas.com/bella/product/large/3010y_2.jpg' },
  { id: 4006, title: 'Blue Shirt', price: price(18.9), category: 'kids-boys', description: 'Button shirt.', image: 'https://cdn.shopify.com/s/files/1/0550/5767/8581/files/black-dress-shirt_1.jpg?v=1725380629' },
  { id: 4007, title: 'Sneakers', price: price(24.9), category: 'kids-boys', description: 'Daily sneakers.', image: 'https://static.nike.com/a/images/t_web_pw_592_v2/f_auto/b8464c8b-944d-442e-92be-988ad46e1a87/NIKE+V5+RNR+%28GS%29.png' },
]
