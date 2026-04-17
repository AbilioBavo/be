import type {
  AuthUser,
  CatalogProduct,
  Company,
  LoginPayload,
  Order,
  RegisterPayload,
  UserProfile,
} from "@/lib/types"

const users: Array<UserProfile & { password: string }> = [
  {
    id: "u-1",
    name: "BuildEasy Cliente",
    email: "cliente@buildeasy.mz",
    phone: "+258 84 000 0000",
    city: "Maputo",
    role: "customer",
    password: "123456",
    favorites: ["1", "3"],
    notificationsEnabled: true,
    addresses: [
      {
        id: "a-1",
        label: "Casa",
        line1: "Av. 24 de Julho, 1500",
        city: "Maputo",
        district: "Polana",
        isDefault: true,
      },
    ],
    paymentMethods: [
      { id: "p-1", type: "mpesa", label: "M-Pesa", lastDigits: "4567", isDefault: true },
    ],
  },
]

export const mockProducts: CatalogProduct[] = [
  {
    id: "1",
    slug: "areia-media-lavada",
    name: "Areia média lavada",
    supplierName: "Areias Matola, Lda",
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
    supplierName: "Mineração Sul",
    category: "Brita",
    unitLabel: "m3",
    price: 2900,
    image: "/stones.jpg",
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
    supplierName: "Blocos Centro",
    category: "Blocos",
    unitLabel: "un",
    price: 45,
    image: "/white_sand.jpg",
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
    supplierName: "Terra Forte Fornecimentos",
    category: "Aterro",
    unitLabel: "m3",
    price: 1800,
    image: "/hero-canteiro.jpg",
    gallery: ["/hero-canteiro.jpg", "/orange_sand.jpg", "/white_sand.jpg"],
    rating: 4.6,
    reviews: 39,
    stock: "Em stock",
    description: "Saibro selecionado para nivelamento, aterro e preparação de base.",
    location: "Maputo",
    delivery: "Entrega em 24h",
  },
]


export const mockCompanies: Company[] = [
  {
    id: "c-1",
    name: "Areias Matola, Lda",
    shortDescription: "Areias selecionadas, lavadas e prontas para concreto e reboco.",
    longDescription:
      "A Areias Matola atua há mais de uma década no fornecimento de areia média, fina e lavada para obras residenciais, comerciais e industriais. Opera com controle de qualidade por lote, logística dedicada e atendimento B2B para obras de médio e grande porte.",
    clientCount: 1240,
    image: "/orange_sand.jpg",
    gallery: ["/orange_sand.jpg", "/hero-canteiro.jpg", "/white_sand.jpg"],
    city: "Matola",
    yearsInMarket: 12,
  },
  {
    id: "c-2",
    name: "Mineração Sul",
    shortDescription: "Brita graduada para fundações, lajes e pavimentação.",
    longDescription:
      "A Mineração Sul é especializada em brita 3/4, pó de pedra e agregados para concreto estrutural. Com frota própria e operação contínua, garante previsibilidade de entrega, rastreio de caminhões e suporte técnico para compras recorrentes.",
    clientCount: 980,
    image: "/stones.jpg",
    gallery: ["/stones.jpg", "/hero-canteiro.jpg", "/orange_sand.jpg"],
    city: "Boane",
    yearsInMarket: 9,
  },
  {
    id: "c-3",
    name: "Blocos Centro",
    shortDescription: "Blocos de cimento com padronização e alto rendimento na obra.",
    longDescription:
      "A Blocos Centro fornece blocos de vedação e estruturais para construtoras e revendedores. O foco está na regularidade dimensional, baixa perda em obra e capacidade de atendimento sob demanda para cronogramas apertados.",
    clientCount: 730,
    image: "/white_sand.jpg",
    gallery: ["/white_sand.jpg", "/hero-canteiro.jpg", "/stones.jpg"],
    city: "Maputo",
    yearsInMarket: 7,
  },
  {
    id: "c-4",
    name: "Terra Forte Fornecimentos",
    shortDescription: "Soluções para aterro, compactação e preparação de base.",
    longDescription:
      "A Terra Forte entrega saibro e materiais de base com foco em regularização de terreno, compactação e infraestrutura urbana. A empresa também presta orientação técnica para escolha do tipo de material por etapa da obra.",
    clientCount: 560,
    image: "/hero-canteiro.jpg",
    gallery: ["/hero-canteiro.jpg", "/orange_sand.jpg", "/white_sand.jpg"],
    city: "Maputo",
    yearsInMarket: 6,
  },
]

const userOrders: Record<string, Order[]> = {
  "u-1": [
    { id: "PED-2026-001", createdAt: "2026-04-10", status: "Entregue", total: 2850, itemsCount: 3 },
    { id: "PED-2026-002", createdAt: "2026-04-14", status: "Em trânsito", total: 1450, itemsCount: 2 },
    { id: "PED-2026-003", createdAt: "2026-04-15", status: "Processando", total: 3200, itemsCount: 5 },
  ],
}

const simulate = async <T>(payload: T, delay = 350) =>
  new Promise<T>((resolve) => setTimeout(() => resolve(payload), delay))

const fail = async (message: string) => {
  await simulate(null)
  throw new Error(message)
}

export const mockBackend = {
  getProducts: async () => simulate(mockProducts),
  getCompanies: async () => simulate(mockCompanies),
  getCompanyById: async (companyId: string) => simulate(mockCompanies.find((company) => company.id === companyId) ?? null),
  login: async ({ email, password }: LoginPayload): Promise<AuthUser> => {
    const user = users.find((u) => u.email.toLowerCase() === email.toLowerCase())
    if (!user || user.password !== password) return fail("Email ou senha inválidos.")
    const { password: userPassword, ...safeUser } = user
    void userPassword
    return simulate({ token: `mock-token-${user.id}`, user: safeUser })
  },
  register: async (payload: RegisterPayload): Promise<AuthUser> => {
    if (users.some((u) => u.email.toLowerCase() === payload.email.toLowerCase())) {
      return fail("Este email já está cadastrado.")
    }
    const newUser: UserProfile & { password: string } = {
      id: `u-${users.length + 1}`,
      name: payload.name,
      email: payload.email,
      phone: payload.phone,
      city: payload.city,
      role: "customer",
      password: payload.password,
      favorites: [],
      notificationsEnabled: true,
      addresses: [],
      paymentMethods: [],
    }
    users.push(newUser)
    userOrders[newUser.id] = []
    const { password: newUserPassword, ...safeUser } = newUser
    void newUserPassword
    return simulate({ token: `mock-token-${newUser.id}`, user: safeUser })
  },
  getProfile: async (userId: string) => {
    const user = users.find((u) => u.id === userId)
    if (!user) return fail("Sessão inválida. Faça login novamente.")
    const { password: userPassword, ...safeUser } = user
    void userPassword
    return simulate(safeUser)
  },
  getOrders: async (userId: string) => simulate(userOrders[userId] ?? []),
  checkout: async ({ userId }: { userId: string }) => {
    if (!userId) return fail("Usuário não autenticado para checkout.")
    const newOrder: Order = {
      id: `PED-2026-${String((userOrders[userId]?.length ?? 0) + 1).padStart(3, "0")}`,
      createdAt: new Date().toISOString().slice(0, 10),
      status: "Processando",
      total: 0,
      itemsCount: 0,
    }
    userOrders[userId] = [newOrder, ...(userOrders[userId] ?? [])]
    return simulate({ ok: true, orderId: newOrder.id })
  },
}
