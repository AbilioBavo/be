export interface CatalogProduct {
  id: string
  slug: string
  name: string
  category: string
  unitLabel: string
  price: number
  image: string
  imageAlt?: string
  gallery: string[]
  rating: number
  reviews: number
  stock: "Em stock" | "Poucas unidades"
  description?: string
  location?: string
  delivery?: string
  oldPrice?: number
  badge?: string
}

export const catalogProducts: CatalogProduct[] = [
  {
    id: "1",
    slug: "areia-media-lavada",
    name: "Areia média lavada",
    category: "Areia",
    unitLabel: "m3",
    price: 2350,
    image: "/orange_sand.jpg",
    imageAlt: "Areia média lavada para construção",
    gallery: ["/orange_sand.jpg", "/white_sand.jpg", "/hero-canteiro.jpg"],
    rating: 4.8,
    reviews: 126,
    stock: "Em stock",
    description: "Areia lavada com granulometria equilibrada para betão, reboco e alvenaria.",
    location: "Maputo",
    delivery: "Entrega em 24h",
    oldPrice: 2550,
    badge: "Mais pedido",
  },
  {
    id: "2",
    slug: "pedra-brita-3-4",
    name: "Pedra brita 3/4",
    category: "Brita",
    unitLabel: "m3",
    price: 2900,
    image: "/stones.jpg",
    imageAlt: "Pedra brita para concreto e fundações",
    gallery: ["/stones.jpg", "/hero-canteiro.jpg", "/orange_sand.jpg"],
    rating: 4.7,
    reviews: 88,
    stock: "Em stock",
    description: "Brita resistente e uniforme, ideal para lajes, pilares e fundações.",
    location: "Matola",
    delivery: "Entrega em 24h",
  },
  {
    id: "3",
    slug: "bloco-de-cimento-15",
    name: "Bloco de cimento 15",
    category: "Blocos",
    unitLabel: "un",
    price: 45,
    image: "/white_sand.jpg",
    imageAlt: "Blocos e materiais de construção",
    gallery: ["/white_sand.jpg", "/hero-canteiro.jpg", "/stones.jpg"],
    rating: 4.5,
    reviews: 54,
    stock: "Poucas unidades",
    description: "Bloco de 15 cm com boa regularidade dimensional para vedação e divisórias.",
    location: "Boane",
    delivery: "Entrega em 48h",
    oldPrice: 50,
    badge: "Stock limitado",
  },
  {
    id: "4",
    slug: "saibro-para-compactacao",
    name: "Saibro para compactacao",
    category: "Aterro",
    unitLabel: "m3",
    price: 1800,
    image: "/hero-canteiro.jpg",
    imageAlt: "Saibro para nivelamento e compactação",
    gallery: ["/hero-canteiro.jpg", "/orange_sand.jpg", "/white_sand.jpg"],
    rating: 4.6,
    reviews: 39,
    stock: "Em stock",
    description: "Saibro selecionado para nivelamento, aterro e preparação de base.",
    location: "Maputo",
    delivery: "Entrega em 24h",
  },
]

export const categories = ["Todos", "Areia", "Brita", "Blocos", "Aterro"]

export const mockUser = {
  name: "BuildEasy Cliente",
  email: "cliente@buildeasy.mz",
  phone: "+258 84 000 0000",
  city: "Maputo",
}

export function formatMT(value: number) {
  return new Intl.NumberFormat("pt-MZ", {
    style: "currency",
    currency: "MZN",
    maximumFractionDigits: 0,
  }).format(value)
}

export function getProductById(id: string) {
  return catalogProducts.find((product) => product.id === id)
}
