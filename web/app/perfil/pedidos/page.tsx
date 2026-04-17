"use client"

import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { useAuth } from "@/hooks/use-auth"
import { api } from "@/lib/api"
import { useEffect, useState } from "react"
import { formatMT } from "@/lib/mock-commerce"
import type { Order } from "@/lib/types"

export default function AllOrdersPage() {
  const { user } = useAuth()
  const [orders, setOrders] = useState<Order[]>([])

  useEffect(() => {
    if (!user) return
    api.getOrders(user.id).then(setOrders)
  }, [user])

  return <main className="min-h-svh bg-[#0a0a0a] text-white"><Header /><section className="mx-auto max-w-6xl px-6 py-14"><h1 className="text-4xl font-bold">Todos os pedidos</h1><div className="mt-6 space-y-3">{orders.map((o)=><div key={o.id} className="border border-white/10 bg-[#0d1117] p-4"><p className="font-semibold">{o.id}</p><p className="text-sm text-white/60">{o.createdAt} · {o.status} · {o.itemsCount} itens · {formatMT(o.total)}</p></div>)}</div></section><Footer /></main>
}
