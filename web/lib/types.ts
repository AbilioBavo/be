export type StockStatus = "Em stock" | "Poucas unidades"

export interface CatalogProduct {
  id: string
  slug: string
  name: string
  supplierName: string
  category: string
  unitLabel: string
  price: number
  image: string
  imageAlt?: string
  gallery: string[]
  rating: number
  reviews: number
  stock: StockStatus
  description?: string
  location?: string
  delivery?: string
  oldPrice?: number
  badge?: string
}

export interface Address {
  id: string
  label: string
  line1: string
  city: string
  district: string
  isDefault?: boolean
}

export interface PaymentMethod {
  id: string
  type: "card" | "mpesa" | "emola"
  label: string
  lastDigits?: string
  isDefault?: boolean
}

export interface Order {
  id: string
  createdAt: string
  status: "Entregue" | "Em trânsito" | "Processando" | "Cancelado"
  total: number
  itemsCount: number
}

export interface UserProfile {
  id: string
  name: string
  email: string
  phone: string
  city: string
  role: "customer" | "business"
  favorites: string[]
  addresses: Address[]
  paymentMethods: PaymentMethod[]
  notificationsEnabled: boolean
}

export interface AuthUser {
  token: string
  user: UserProfile
}

export type LoginPayload = {
  email: string
  password: string
}

export type RegisterPayload = {
  name: string
  email: string
  phone: string
  password: string
  city: string
}
