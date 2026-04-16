"use client"

import { PremiumNavbar } from "@/components/premium-navbar"
import { Button } from "@/components/ui/button"
import { useCart } from "@/hooks/use-cart"
import { formatMT } from "@/lib/mock-commerce"

export default function CheckoutPage() {
  const { items, subtotal } = useCart()
  const shipping = items.length > 0 ? 250 : 0
  const total = subtotal + shipping

  return (
    <main className="min-h-svh bg-[#0a0a0a] text-white">
      <PremiumNavbar />
      <section className="mx-auto grid w-full max-w-7xl gap-8 px-4 py-10 md:px-6 lg:grid-cols-[1.25fr_1fr]">
        <form className="space-y-4 rounded-3xl border border-white/10 bg-white/5 p-6">
          <h1 className="text-3xl font-semibold">Checkout</h1>
          <p className="text-sm text-white/70">Fluxo funcional com dados mockados.</p>
          <input className="h-11 w-full rounded-xl border border-white/15 bg-black/30 px-4" placeholder="Nome completo" />
          <input className="h-11 w-full rounded-xl border border-white/15 bg-black/30 px-4" placeholder="Email" />
          <input className="h-11 w-full rounded-xl border border-white/15 bg-black/30 px-4" placeholder="Telefone" />
          <input className="h-11 w-full rounded-xl border border-white/15 bg-black/30 px-4" placeholder="Endereço de entrega" />
          <select className="h-11 w-full rounded-xl border border-white/15 bg-black/30 px-4">
            <option>M-Pesa</option>
            <option>EMola</option>
            <option>Cartão</option>
          </select>
          <Button className="w-full rounded-full bg-orange-500 text-black hover:bg-orange-400">Confirmar pedido</Button>
        </form>

        <aside className="h-fit rounded-3xl border border-white/10 bg-white/5 p-6">
          <h2 className="text-xl font-semibold">Resumo do pedido</h2>
          <div className="mt-4 space-y-2 text-sm text-white/75">
            {items.map((item) => (
              <p key={item.id} className="flex justify-between">
                <span>{item.name} x{item.quantity}</span>
                <span>{formatMT(item.price * item.quantity)}</span>
              </p>
            ))}
            <hr className="my-2 border-white/15" />
            <p className="flex justify-between"><span>Subtotal</span><span>{formatMT(subtotal)}</span></p>
            <p className="flex justify-between"><span>Entrega</span><span>{formatMT(shipping)}</span></p>
            <p className="flex justify-between text-lg font-semibold text-orange-300"><span>Total</span><span>{formatMT(total)}</span></p>
          </div>
        </aside>
      </section>
    </main>
  )
}
