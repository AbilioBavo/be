"use client"

import Image from "next/image"
import Link from "next/link"

import { PremiumNavbar } from "@/components/premium-navbar"
import { Button } from "@/components/ui/button"
import { useCart } from "@/hooks/use-cart"
import { formatMT } from "@/lib/mock-commerce"

export default function CartPage() {
  const { items, subtotal, updateQuantity, removeItem } = useCart()
  const shipping = items.length > 0 ? 250 : 0
  const total = subtotal + shipping

  return (
    <main className="min-h-svh bg-[#0a0a0a] text-white">
      <PremiumNavbar />
      <section className="mx-auto grid w-full max-w-7xl gap-8 px-4 py-10 md:px-6 lg:grid-cols-[1.5fr_1fr]">
        <div className="space-y-4">
          <h1 className="text-3xl font-semibold">Meu carrinho</h1>
          {items.length === 0 ? (
            <div className="rounded-3xl border border-white/10 bg-white/5 p-8">
              <p className="text-white/75">Seu carrinho está vazio.</p>
              <Link href="/produtos" className="mt-4 inline-block text-orange-300">Explorar produtos</Link>
            </div>
          ) : (
            items.map((item) => (
              <article key={item.id} className="flex gap-4 rounded-3xl border border-white/10 bg-white/5 p-4">
                <div className="relative h-24 w-24 overflow-hidden rounded-2xl">
                  <Image src={item.imageSrc} alt={item.name} fill className="object-cover" />
                </div>
                <div className="flex-1">
                  <h2 className="font-medium">{item.name}</h2>
                  <p className="text-sm text-white/70">{formatMT(item.price)}</p>
                  <div className="mt-3 flex items-center gap-2">
                    <button className="rounded-full border border-white/20 px-3" onClick={() => updateQuantity(item.id, item.quantity - 1)}>-</button>
                    <span>{item.quantity}</span>
                    <button className="rounded-full border border-white/20 px-3" onClick={() => updateQuantity(item.id, item.quantity + 1)}>+</button>
                    <button className="ml-auto text-sm text-red-300" onClick={() => removeItem(item.id)}>Remover</button>
                  </div>
                </div>
              </article>
            ))
          )}
        </div>

        <aside className="h-fit rounded-3xl border border-white/10 bg-white/5 p-6">
          <h2 className="text-xl font-semibold">Resumo</h2>
          <div className="mt-4 space-y-2 text-sm">
            <p className="flex justify-between text-white/70"><span>Subtotal</span><span>{formatMT(subtotal)}</span></p>
            <p className="flex justify-between text-white/70"><span>Entrega</span><span>{formatMT(shipping)}</span></p>
            <p className="mt-4 flex justify-between text-lg font-semibold"><span>Total</span><span className="text-orange-300">{formatMT(total)}</span></p>
          </div>
          <Link href="/checkout" className="mt-6 block">
            <Button className="w-full rounded-full bg-orange-500 text-black hover:bg-orange-400">Finalizar checkout</Button>
          </Link>
        </aside>
      </section>
    </main>
  )
}
