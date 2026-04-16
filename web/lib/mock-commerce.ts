export type CatalogProduct = {
  id: string
  name: string
  slug: string
  category: string
  price: number
  oldPrice?: number
  rating: number
  reviews: number
  description: string
  image: string
  gallery: string[]
  stock: "Em stock" | "Poucas unidades"
  badge?: string
}

export const catalogProducts: CatalogProduct[] = [
  {
    id: "p-01",
    name: "Brinco Aurora Dourado",
    slug: "brinco-aurora-dourado",
    category: "Brincos",
    price: 1899,
    oldPrice: 2299,
    rating: 4.9,
    reviews: 124,
    description: "Par premium com banho de ouro 18k e fecho hipoalergénico.",
    image: "/orange_sand.jpg",
    gallery: ["/orange_sand.jpg", "/white_sand.jpg", "/stones.jpg"],
    stock: "Em stock",
    badge: "Best seller",
  },
  {
    id: "p-02",
    name: "Pulseira Signature",
    slug: "pulseira-signature",
    category: "Pulseiras",
    price: 2450,
    rating: 4.8,
    reviews: 88,
    description: "Pulseira elegante com acabamento polido e ajuste confortável.",
    image: "/stones.jpg",
    gallery: ["/stones.jpg", "/hero-canteiro.jpg", "/white_sand.jpg"],
    stock: "Em stock",
  },
  {
    id: "p-03",
    name: "Colar Essence Minimal",
    slug: "colar-essence-minimal",
    category: "Colares",
    price: 3290,
    oldPrice: 3690,
    rating: 4.7,
    reviews: 51,
    description: "Design fino para layering com brilho sofisticado.",
    image: "/white_sand.jpg",
    gallery: ["/white_sand.jpg", "/orange_sand.jpg", "/stones.jpg"],
    stock: "Poucas unidades",
    badge: "Edição limitada",
  },
  {
    id: "p-04",
    name: "Anel Luna",
    slug: "anel-luna",
    category: "Anéis",
    price: 1590,
    rating: 4.8,
    reviews: 73,
    description: "Anel versátil para uso diário com toque luxuoso.",
    image: "/hero-canteiro.jpg",
    gallery: ["/hero-canteiro.jpg", "/orange_sand.jpg", "/white_sand.jpg"],
    stock: "Em stock",
  },
]

export const categories = ["Todos", "Brincos", "Pulseiras", "Colares", "Anéis"]

export const mockUser = {
  name: "Cigarre Cliente",
  email: "cliente@cigarre.mz",
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
