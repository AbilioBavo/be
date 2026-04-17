"use client"

import Link from "next/link"
import { ChevronRight } from "lucide-react"
import { useEffect, useState } from "react"

import { Footer } from "@/components/footer"
import { Header } from "@/components/header"
import { useAuth } from "@/hooks/use-auth"
import { api } from "@/lib/api"
import { formatMT } from "@/lib/mock-commerce"
import type { Order } from "@/lib/types"

export default function AllOrdersPage() {
  const { user } = useAuth()
  const [orders, setOrders] = useState<Order[]>([])

  useEffect(() => {
    if (!user) return
    api.getOrders(user.id).then(setOrders)
  }, [user])

  return (
    <main className="min-h-svh bg-[#0a0a0a] text-white">
      <Header />
      <div className="border-b border-white/10 bg-[#0d1117]/40">
        <div className="mx-auto flex w-full max-w-7xl items-center gap-1.5 px-4 py-3 text-xs text-white/60 md:px-6">
          <Link href="/" className="hover:text-white">Início</Link>
          <ChevronRight className="size-3" />
          <span className="text-white/85">Pedidos</span>
        </div>
      </div>

      <section className="mx-auto w-full max-w-6xl px-4 py-10 md:px-6">
        <h1 className="text-3xl font-bold">Todos os pedidos</h1>
        <div className="mt-6 space-y-3">
          {orders.map((order) => (
            <Link key={order.id} href={`/perfil/pedidos/${order.id}`} className="block border border-white/10 bg-[#0d1117] p-4 hover:border-[#d4541a]/40">
              <div className="flex items-center justify-between gap-3">
                <p className="font-semibold">{order.id}</p>
                <p className="text-sm text-white/60">{order.status}</p>
              </div>
              <p className="mt-1 text-sm text-white/60">{order.createdAt} · {order.itemsCount} itens · {formatMT(order.total)}</p>
            </Link>
          ))}
        </div>
      </section>
      <Footer />
    </main>
  )
}
