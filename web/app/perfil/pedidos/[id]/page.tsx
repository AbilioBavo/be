import Link from "next/link"
import { ChevronRight } from "lucide-react"

import { Footer } from "@/components/footer"
import { Header } from "@/components/header"
import { formatMT } from "@/lib/mock-commerce"

const details = {
  "PED-2026-001": {
    status: "Entregue",
    date: "2026-04-10",
    address: "Av. 24 de Julho, 1500",
    items: ["Areia média lavada", "Bloco de cimento 15"],
    total: 2850,
  },
  "PED-2026-002": {
    status: "Em trânsito",
    date: "2026-04-14",
    address: "Matola, Bairro Tchumene",
    items: ["Pedra brita 3/4"],
    total: 1450,
  },
  "PED-2026-003": {
    status: "Processando",
    date: "2026-04-15",
    address: "Maputo, Polana",
    items: ["Saibro para compactacao"],
    total: 3200,
  },
} as const

export default async function OrderDetailsPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const order = details[id as keyof typeof details]

  return (
    <main className="min-h-svh bg-[#0a0a0a] text-white">
      <Header />
      <div className="border-b border-white/10 bg-[#0d1117]/40">
        <div className="mx-auto flex w-full max-w-7xl items-center gap-1.5 px-4 py-3 text-xs text-white/60 md:px-6">
          <Link href="/" className="hover:text-white">Início</Link>
          <ChevronRight className="size-3" />
          <Link href="/perfil/pedidos" className="hover:text-white">Pedidos</Link>
          <ChevronRight className="size-3" />
          <span className="text-white/85">{id}</span>
        </div>
      </div>

      <section className="mx-auto w-full max-w-6xl px-4 py-10 md:px-6">
        <h1 className="text-3xl font-bold">Detalhes do pedido {id}</h1>
        {!order ? (
          <p className="mt-4 text-white/60">Pedido não encontrado.</p>
        ) : (
          <div className="mt-6 space-y-4">
            <div className="border border-white/10 bg-[#0d1117] p-5">
              <p className="text-sm text-white/60">Status</p>
              <p className="text-lg font-semibold">{order.status}</p>
            </div>
            <div className="border border-white/10 bg-[#0d1117] p-5">
              <p className="text-sm text-white/60">Data</p>
              <p className="text-lg font-semibold">{order.date}</p>
            </div>
            <div className="border border-white/10 bg-[#0d1117] p-5">
              <p className="text-sm text-white/60">Endereço de entrega</p>
              <p className="text-lg font-semibold">{order.address}</p>
            </div>
            <div className="border border-white/10 bg-[#0d1117] p-5">
              <p className="text-sm text-white/60">Itens</p>
              <ul className="mt-2 list-disc pl-5 text-sm text-white/80">
                {order.items.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
              <p className="mt-4 text-lg font-semibold">Total: {formatMT(order.total)}</p>
            </div>
          </div>
        )}
      </section>
      <Footer />
    </main>
  )
}
