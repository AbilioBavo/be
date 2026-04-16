export type ProductDetail = {
  id: string
  name: string
  category: string
  price: string
  unit: string
  stockStatus: "Em stock" | "Stock limitado"
  rating: number
  reviews: number
  location: string
  delivery: string
  description: string
  supplier: {
    name: string
    phone: string
    city: string
    verified: boolean
  }
  images: Array<{
    src: string
    alt: string
  }>
  specs: string[]
}

export const mockProductDetails: ProductDetail[] = [
  {
    id: "1",
    name: "Areia média lavada",
    category: "Areia",
    price: "2 350,00 MT",
    unit: "m3",
    stockStatus: "Em stock",
    rating: 4.8,
    reviews: 126,
    location: "Maputo",
    delivery: "Entrega em 24h para Maputo",
    description:
      "Areia lavada com granulometria equilibrada, indicada para betão, reboco e alvenaria em obras residenciais e comerciais.",
    supplier: {
      name: "Areias do Sul",
      phone: "+258 84 000 1122",
      city: "Maputo",
      verified: true,
    },
    images: [
      {
        src: "/orange_sand.jpg",
        alt: "Pilhas de areia lavada para construção",
      },
      {
        src: "/white_sand.jpg",
        alt: "Areia branca pronta para obra",
      },
      {
        src: "/hero-canteiro.jpg",
        alt: "Canteiro com equipamentos de construção",
      },
    ],
    specs: [
      "Granulometria média para aplicações gerais",
      "Material lavado e peneirado",
      "Indicado para betão e reboco",
      "Venda por metro cúbico",
    ],
  },
  {
    id: "2",
    name: "Pedra brita 3/4",
    category: "Brita",
    price: "2 900,00 MT",
    unit: "m3",
    stockStatus: "Em stock",
    rating: 4.7,
    reviews: 88,
    location: "Matola",
    delivery: "Entrega em 24h para Matola",
    description:
      "Brita 3/4 resistente e uniforme, ideal para lajes, pilares e fundações com boa compactação e durabilidade estrutural.",
    supplier: {
      name: "Pedreira Central",
      phone: "+258 84 000 2233",
      city: "Matola",
      verified: true,
    },
    images: [
      {
        src: "/stones.jpg",
        alt: "Pedra brita para concreto",
      },
      {
        src: "/hero-canteiro.jpg",
        alt: "Equipamentos em área de extração",
      },
      {
        src: "/orange_sand.jpg",
        alt: "Área de materiais agregados",
      },
    ],
    specs: [
      "Bitola 3/4 com boa consistência",
      "Recomendada para elementos estruturais",
      "Alta resistência mecânica",
      "Venda por metro cúbico",
    ],
  },
  {
    id: "3",
    name: "Bloco de cimento 15",
    category: "Blocos",
    price: "45,00 MT",
    unit: "unidade",
    stockStatus: "Stock limitado",
    rating: 4.5,
    reviews: 54,
    location: "Boane",
    delivery: "Entrega em 48h para Boane",
    description:
      "Bloco de cimento de 15 cm para alvenaria de vedação e divisórias, com boa regularidade dimensional para assentamento.",
    supplier: {
      name: "Cimento Express",
      phone: "+258 84 000 3344",
      city: "Boane",
      verified: false,
    },
    images: [
      {
        src: "/white_sand.jpg",
        alt: "Pátio de materiais de construção",
      },
      {
        src: "/hero-canteiro.jpg",
        alt: "Frente de obra para alvenaria",
      },
      {
        src: "/stones.jpg",
        alt: "Agregados e materiais no fornecedor",
      },
    ],
    specs: [
      "Espessura nominal de 15 cm",
      "Boa estabilidade para paredes internas",
      "Uso em alvenaria de vedação",
      "Venda por unidade",
    ],
  },
]

export function getMockProductDetailById(id: string) {
  return mockProductDetails.find((product) => product.id === id)
}
