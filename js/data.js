const image = (id, w = 900, h = 1100) => `https://images.unsplash.com/${id}?auto=format&fit=crop&w=${w}&h=${h}&q=85`;

export const categories = [
  { name: 'Face', key: 'Face', image: image('photo-1596462502278-27bfdc403348') },
  { name: 'Lips', key: 'Lips', image: image('photo-1586495777744-4413f21062fa') },
  { name: 'Eyes', key: 'Eyes', image: image('photo-1512496015851-a90fb38ba796') },
  { name: 'Tools', key: 'Tools', image: image('photo-1522335789203-aabd1fc54bc9') },
  { name: 'Palettes', key: 'Palettes', image: image('photo-1596704017254-9b121068fb31') },
  { name: 'Essentials', key: 'Essentials', image: image('photo-1556229010-6c3f2c9ca5f8') }
];

const photos = [
  'photo-1631214524020-7e18db9a8f92', 'photo-1625093742435-6fa192b6fb10', 'photo-1619451334792-150fd785ee74',
  'photo-1596462502278-27bfdc403348', 'photo-1586495777744-4413f21062fa', 'photo-1512496015851-a90fb38ba796',
  'photo-1522335789203-aabd1fc54bc9', 'photo-1596704017254-9b121068fb31', 'photo-1556229010-6c3f2c9ca5f8',
  'photo-1608248597279-f99d160bfcbc', 'photo-1571781926291-c477ebfd024b', 'photo-1571875257727-256c39da42af'
];
const names = [
  ['Cloud Kiss Lip Oil','Lips','Lip Oil'], ['Petal Pop Liquid Blush','Face','Liquid Blush'], ['Soft Focus Skin Tint','Face','Foundation'],
  ['Afterglow Highlighter','Face','Highlighter'], ['Velvet Muse Lip Liner','Lips','Lip Liner'], ['Daydream Eyeshadow Palette','Palettes','Eyeshadow Palette'],
  ['Lash Lift Mascara','Eyes','Mascara'], ['Rosewater Setting Mist','Face','Setting Spray'], ['Sugar Rush Lip Balm','Lips','Lip Balm'],
  ['Sculpt & Glow Bronzer','Face','Bronzer'], ['Barely There Concealer','Face','Concealer'], ['Cloud Nine Brush Set','Tools','Brush Set'],
  ['Gloss Boss Lip Gloss','Lips','Lip Gloss'], ['Blush Crush Powder Blush','Face','Powder Blush'], ['Wing It Liquid Liner','Eyes','Eyeliner'],
  ['Brow Mood Gel','Eyes','Brow Gel'], ['Main Character Palette','Palettes','Eyeshadow Palette'], ['Glow Recipe Primer','Face','Primer'],
  ['Pillow Talk Lip Tint','Lips','Lip Tint'], ['Contour Crush Stick','Face','Contour'], ['The Daily Edit Bag','Essentials','Makeup Bag'], ['Magic Eraser Balm','Essentials','Makeup Remover'],
  ['Cherry Cola Lipstick','Lips','Lipstick'], ['Golden Hour Illuminator','Face','Highlighter'], ['Stay Soft Setting Powder','Face','Setting Powder'],
  ['Full Volume Lashes','Eyes','False Lashes'], ['Open Eyes Lash Curler','Tools','Lash Curler'], ['Peach Please Cream Blush','Face','Cream Blush'],
  ['Perfect Match Color Corrector','Face','Color Corrector'], ['Five Minute Face Kit','Essentials','Travel Kit'], ['Mini Lip Love Set','Lips','Gift Set'],
  ['Soft Glam Edit','Palettes','Face Palette'], ['Party Ready Bundle','Essentials','Makeup Bundle'], ['Dew Drop Tinted Moisturizer','Face','Tinted Moisturizer'],
  ['Cocoa Crush Bronzer','Face','Bronzer'], ['Petite Precision Brush','Tools','Makeup Brush'], ['Luna Shimmer Shadow','Eyes','Eyeshadow'],
  ['Berry Nice Lip Stain','Lips','Lip Tint'], ['Fresh Start Primer','Face','Primer'], ['Glow Getter Gift Set','Essentials','Gift Set'],
  ['Cherry Glaze Lip Oil','Lips','Lip Oil'], ['Cloud Veil Blurring Primer','Face','Primer'], ['Petal Party Blush Duo','Face','Blush Duo'],
  ['Velvet Night Eyeshadow','Eyes','Eyeshadow'], ['Studio Skin Foundation','Face','Foundation'], ['Glossed Up Plumper','Lips','Lip Gloss'],
  ['Golden Hour Face Palette','Palettes','Face Palette'], ['Lifted Brow Pencil','Eyes','Brow Pencil'], ['Blush Hour Stick','Face','Cream Blush'],
  ['The Weekend Makeup Case','Essentials','Makeup Bag'], ['Lash Crush Volume Mascara','Eyes','Mascara'], ['Rose Quartz Setting Spray','Face','Setting Spray'],
  ['Everyday Glow Bundle','Essentials','Makeup Bundle']
];

export const products = names.map(([name, category, subcategory], index) => {
  const price = [349, 429, 599, 475, 289, 799, 399, 369, 229, 549][index % 10] + (index % 4) * 25;
  return {
    id: `glowy-${index + 1}`, slug: name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, ''), name, brand: 'Glowy', category, subcategory,
    price, originalPrice: index % 4 === 0 ? price + 100 : null, image: image(photos[index % photos.length]), gallery: [image(photos[index % photos.length]), image(photos[(index + 3) % photos.length])],
    description: `A feel-good ${subcategory.toLowerCase()} designed to make your routine more you. Buildable, blendable, and made for your everyday glow.`, shortDescription: `Your new ${subcategory.toLowerCase()} obsession.`,
    rating: +(4.4 + (index % 6) / 10).toFixed(1), reviewCount: 48 + index * 13, badge: index % 5 === 0 ? 'Bestseller' : index % 7 === 0 ? 'New' : '', isNew: index > 30, isBestSeller: index < 16, stock: 5 + (index % 15),
    colors: ['Rose', 'Petal', 'Cocoa'], variants: ['One size', 'Rose', 'Petal'], tags: [category.toLowerCase(), subcategory.toLowerCase(), index % 2 ? 'everyday' : 'glowy']
  };
});

export const getProduct = (id) => products.find((product) => product.id === id || product.slug === id);
export const money = (value) => `${Number(value).toLocaleString('en-EG')} EGP`;
