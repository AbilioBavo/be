import { mockBackend } from "@/lib/mock-backend"
import type { AuthUser, CatalogProduct, LoginPayload, Order, RegisterPayload, UserProfile } from "@/lib/types"

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL ?? "mock://local"

export const endpoints = {
  auth: {
    login: "/auth/login",
    register: "/auth/register",
    profile: "/auth/profile",
  },
  products: {
    list: "/products",
  },
  orders: {
    list: "/orders",
    checkout: "/checkout",
  },
} as const

type ApiOptions = {
  method?: "GET" | "POST" | "PATCH" | "DELETE"
  body?: unknown
  token?: string
}

async function mockRouter<T>(url: string, options: ApiOptions): Promise<T> {
  const body = (options.body ?? {}) as Record<string, string>
  switch (url) {
    case endpoints.products.list:
      return (await mockBackend.getProducts()) as T
    case endpoints.auth.login:
      return (await mockBackend.login(body as LoginPayload)) as T
    case endpoints.auth.register:
      return (await mockBackend.register(body as RegisterPayload)) as T
    case endpoints.auth.profile:
      return (await mockBackend.getProfile(body.userId)) as T
    case endpoints.orders.list:
      return (await mockBackend.getOrders(body.userId)) as T
    case endpoints.orders.checkout:
      return (await mockBackend.checkout({ userId: body.userId })) as T
    default:
      throw new Error(`Endpoint mock não configurado: ${url}`)
  }
}

export async function apiFetch<T>(url: string, options: ApiOptions = {}): Promise<T> {
  if (API_BASE_URL.startsWith("mock://")) {
    return mockRouter<T>(url, options)
  }

  const response = await fetch(`${API_BASE_URL}${url}`, {
    method: options.method ?? "GET",
    headers: {
      "Content-Type": "application/json",
      ...(options.token ? { Authorization: `Bearer ${options.token}` } : {}),
    },
    body: options.body ? JSON.stringify(options.body) : undefined,
  })

  if (!response.ok) {
    const data = await response.json().catch(() => null)
    throw new Error(data?.message || "Erro inesperado ao comunicar com a API.")
  }

  return response.json() as Promise<T>
}

export const api = {
  login: (payload: LoginPayload) => apiFetch<AuthUser>(endpoints.auth.login, { method: "POST", body: payload }),
  register: (payload: RegisterPayload) =>
    apiFetch<AuthUser>(endpoints.auth.register, { method: "POST", body: payload }),
  getProducts: () => apiFetch<CatalogProduct[]>(endpoints.products.list),
  getProfile: (userId: string) =>
    apiFetch<UserProfile>(endpoints.auth.profile, { method: "POST", body: { userId } }),
  getOrders: (userId: string) =>
    apiFetch<Order[]>(endpoints.orders.list, { method: "POST", body: { userId } }),
  checkout: (userId: string) =>
    apiFetch<{ ok: boolean; orderId: string }>(endpoints.orders.checkout, {
      method: "POST",
      body: { userId },
    }),
}
