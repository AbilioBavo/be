import Link from "next/link"
import { Check, Shield, Truck } from "lucide-react"

import { PremiumNavbar } from "@/components/premium-navbar"
import { ProductCard } from "@/components/product-card"
import { Button } from "@/components/ui/button"
import { catalogProducts } from "@/lib/mock-commerce"

export default function HomePage() {
  return (
    <main className="min-h-svh bg-[#0a0a0a] text-white">
      <PremiumNavbar />

      <section className="relative isolate h-[78svh] overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: "url('/hero-canteiro.jpg')" }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/40 to-black/60" />

        <div className="relative mx-auto flex h-full w-full max-w-7xl items-center px-4 md:px-6">
          <div className="max-w-2xl space-y-6">
            <p className="text-sm uppercase tracking-[0.25em] text-orange-300">Nova temporada</p>
            <h1 className="text-5xl leading-tight font-semibold md:text-7xl">Brilhe com elegância.</h1>
            <p className="max-w-xl text-lg text-white/80">
              Semijoias sofisticadas com acabamento premium, entrega rápida e experiência de compra de alto nível.
            </p>
            <div className="flex flex-wrap gap-3">
              <Link href="/produtos">
                <Button className="rounded-full bg-orange-500 px-8 text-black hover:bg-orange-400">Explorar coleção</Button>
              </Link>
              <Link href="/cadastro">
                <Button variant="outline" className="rounded-full border-white/40 bg-black/30 px-8">Criar conta</Button>
              </Link>
            </div>
            <div className="flex flex-wrap gap-5 pt-3 text-sm text-white/75">
              <span className="inline-flex items-center gap-2"><Check className="size-4 text-orange-300" /> Qualidade premium</span>
              <span className="inline-flex items-center gap-2"><Truck className="size-4 text-orange-300" /> Entrega nacional</span>
              <span className="inline-flex items-center gap-2"><Shield className="size-4 text-orange-300" /> Checkout seguro</span>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto w-full max-w-7xl px-4 py-12 md:px-6">
        <div className="mb-8 flex items-end justify-between">
          <div>
            <p className="text-sm uppercase tracking-[0.2em] text-orange-300">Selecionados para si</p>
            <h2 className="mt-2 text-3xl font-semibold">Destaques da coleção</h2>
          </div>
          <Link href="/produtos" className="text-sm text-orange-300 hover:text-orange-200">Ver todos</Link>
        </div>

        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
          {catalogProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>
    </main>
  )
}
