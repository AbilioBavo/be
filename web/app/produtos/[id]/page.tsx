"use client"

import Image from "next/image"
import Link from "next/link"
import { notFound, useParams } from "next/navigation"
import { Star, Truck } from "lucide-react"

import { PremiumNavbar } from "@/components/premium-navbar"
import { ProductCard } from "@/components/product-card"
import { Button } from "@/components/ui/button"
import { useCart } from "@/hooks/use-cart"
import { catalogProducts, formatMT, getProductById } from "@/lib/mock-commerce"

export default function ProductPage() {
  const params = useParams<{ id: string }>()
  const product = getProductById(params.id)
  const { addItem } = useCart()

  if (!product) {
    notFound()
  }

  const related = catalogProducts.filter((item) => item.id !== product.id).slice(0, 3)

  return (
    <main className="min-h-svh bg-[#0a0a0a] text-white">
      <PremiumNavbar />
      <section className="mx-auto grid w-full max-w-7xl gap-10 px-4 py-10 md:px-6 lg:grid-cols-[1.2fr_1fr]">
        <div>
          <div className="relative h-[460px] overflow-hidden rounded-3xl border border-white/10">
            <Image src={product.image} alt={product.name} fill className="object-cover" />
          </div>
          <div className="mt-4 grid grid-cols-3 gap-3">
            {product.gallery.map((image) => (
              <div key={image} className="relative h-32 overflow-hidden rounded-2xl border border-white/10">
                <Image src={image} alt={product.name} fill className="object-cover" />
              </div>
            ))}
          </div>
        </div>

        <aside className="space-y-5 rounded-3xl border border-white/10 bg-white/5 p-6">
          <p className="text-sm text-orange-300">{product.category}</p>
          <h1 className="text-4xl font-semibold">{product.name}</h1>
          <div className="flex items-center gap-2 text-white/70">
            <Star className="size-4 fill-orange-400 text-orange-400" />
            {product.rating} ({product.reviews} avaliações)
          </div>
          <p className="text-white/70">{product.description}</p>
          <p className="text-3xl font-bold text-orange-400">{formatMT(product.price)}</p>
          <p className="inline-flex items-center gap-2 text-sm text-white/70">
            <Truck className="size-4 text-orange-300" /> Entrega em 24h para Maputo e Matola
          </p>

          <div className="grid gap-3">
            <Button
              className="rounded-full bg-orange-500 text-black hover:bg-orange-400"
              onClick={() =>
                addItem({
                  id: product.id,
                  name: product.name,
                  price: product.price,
                  imageSrc: product.image,
                  unitLabel: "un",
                })
              }
            >
              Adicionar ao carrinho
            </Button>
            <Link href="/checkout">
              <Button variant="outline" className="w-full rounded-full border-white/25 bg-transparent">Comprar agora</Button>
            </Link>
          </div>
        </aside>
      </section>

      <section className="mx-auto w-full max-w-7xl px-4 pb-14 md:px-6">
        <div className="mb-6 flex items-center justify-between">
          <h2 className="text-2xl font-semibold">Você também pode gostar</h2>
          <Link href="/produtos" className="text-sm text-orange-300">Ver mais</Link>
        </div>
        <div className="grid gap-5 md:grid-cols-3">
          {related.map((productItem) => (
            <ProductCard key={productItem.id} product={productItem} />
          ))}
        </div>
      </section>
    </main>
  )
}
