import { mockProducts } from "@/lib/mock-backend"
import type { CatalogProduct } from "@/lib/types"

export const catalogProducts: CatalogProduct[] = mockProducts

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
