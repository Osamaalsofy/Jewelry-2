export interface Product {
  id: string;
  name: string;
  price: number;
  category: 'Rings' | 'Earrings' | 'Necklaces' | 'Bracelets';
  material: string;
  image: string;
  description: string;
  specifications: string[];
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export const PRODUCTS: Product[] = [
  {
    id: 'eternal-band-ring',
    name: 'ETERNAL BAND RING',
    price: 320,
    category: 'Rings',
    material: '14k yellow gold',
    image: 'https://images.unsplash.com/photo-1603561591411-07134e71a2a9?q=80&w=800',
    description: 'A timeless silhouette designed for effortless elegance. This solid gold band represents continuous grace, beautifully finished with high polish by our master jewelers.',
    specifications: ['Width: 2.5mm', 'Solid 14k Yellow Gold', 'Highly polished ergonomic interior', 'Handcrafted in Antwerp']
  },
  {
    id: 'spire-chain-necklace',
    name: 'SPIRE CHAIN NECKLACE',
    price: 1250,
    category: 'Necklaces',
    material: '14k yellow gold',
    image: 'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?q=80&w=800',
    description: 'A striking structural masterpiece. Featuring precision-carved links that catch and refract the light, creating a celestial shimmer with every movement.',
    specifications: ['Length: 18 inches', 'Solid 14k Yellow Gold', 'Secure custom lobster clasp closure', 'Weight: 8.4 grams']
  },
  {
    id: 'celestial-spark-pendant',
    name: 'CELESTIAL SPARK PENDANT',
    price: 1250,
    category: 'Necklaces',
    material: '14k yellow gold with cubic zirconia',
    image: 'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?q=80&w=800',
    description: 'A central brilliant-cut stone cradled inside an intricate cosmic halo of micro-pave zirconia. A radiant piece designed to emulate the brightness of northern stars.',
    specifications: ['Pendant Size: 12mm', '14k Yellow Gold', 'Premium hand-set cubic zirconia stones', 'Includes adjustable 16-18" fine chain']
  },
  {
    id: 'pearl-halo-pendant',
    name: 'PEARL HALO PENDANT',
    price: 480,
    category: 'Necklaces',
    material: '14k yellow gold',
    image: 'https://images.unsplash.com/photo-1617038260897-41a1f14a8ca0?q=80&w=800',
    description: 'Glistening organic symmetry. A perfectly round freshwater pearl nestled within a hand-carved golden halo, blending classism with avant-garde fashion.',
    specifications: ['Lustrous 8mm Freshwater Pearl', '14k Yellow Gold halo and bale', 'Every pearl is uniquely selected', 'Handmade in-house']
  },
  {
    id: 'hexa-gold-ring',
    name: 'HEXA GOLD RING',
    price: 450,
    category: 'Rings',
    material: '18k yellow gold',
    image: 'https://images.unsplash.com/photo-1605100804763-247f67b3557e?q=80&w=800',
    description: 'A bold, avant-garde design exploring architectural geometries. Elegant hexagonal lines create structural facets that highlight the luxury of dense solid 18k gold.',
    specifications: ['Width: 3.2mm', 'Solid 18k Yellow Gold', 'Geometric faceted exterior', 'Comfort-fit silhouette']
  },
  {
    id: 'solar-radiance-earrings',
    name: 'SOLAR RADIANCE EARRINGS',
    price: 680,
    category: 'Earrings',
    material: '18k yellow gold',
    image: 'https://images.unsplash.com/photo-1635767798638-3e25273a8236?q=80&w=800',
    description: 'Intricately textured solar ripples that cast stunning radial shadows. Captures the warmth of celestial radiation inside a pair of stunning timeless hoops.',
    specifications: ['Diameter: 22mm', 'Solid 18k Yellow Gold', 'Textured celestial radial grooves', 'Click-lock gold French wire backing']
  },
  {
    id: 'golden-raindrop-necklace',
    name: 'GOLDEN RAINDROP NECKLACE',
    price: 920,
    category: 'Necklaces',
    material: '14k yellow gold',
    image: 'https://images.unsplash.com/photo-1602751584552-8ba73aad10e1?q=80&w=800',
    description: 'Drape yourself in liquid starlight. Beautifully structured spearhead droplets fall elegantly across a delicate neckline wire, dancing gracefully with every breath.',
    specifications: ['Length: 16 inches', '14k Yellow Gold', 'Staggered drop design charms', 'Polished mirrored facings']
  },
  {
    id: 'ornate-twist-ring',
    name: 'ORNATE TWIST RING',
    price: 520,
    category: 'Rings',
    material: '14k yellow gold',
    image: 'https://images.unsplash.com/photo-1598560917505-59a3ad559071?q=80&w=800',
    description: 'Two strands representing converging paths, hand-twisted into a seamless loop of eternal devotion. A comfortable, poetic piece designed to go with any campaign silhouette.',
    specifications: ['Width: 4mm', '14k Yellow Gold', 'Intricately entwined double-strand design', 'Polished details with textured contrasting inner channels']
  }
];

export const CATEGORIES_DATA = [
  {
    name: 'RINGS',
    image: 'https://images.unsplash.com/photo-1605100804763-247f67b3557e?q=80&w=800',
    description: 'Faceted bands and celestial statement rings.'
  },
  {
    name: 'EARRINGS',
    image: 'https://images.unsplash.com/photo-1635767798638-3e25273a8236?q=80&w=800',
    description: 'Radial hoops and delicate celestial drops.'
  },
  {
    name: 'NECKLACES',
    image: 'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?q=80&w=800',
    description: 'Diamond strand chokers and striking statement links.'
  },
  {
    name: 'BRACELETS',
    image: 'https://images.unsplash.com/photo-1611591437281-460bfbe1220a?q=80&w=800',
    description: 'Minimal gold wires and heavy geometric bangles.'
  }
];
