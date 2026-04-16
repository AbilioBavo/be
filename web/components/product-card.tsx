"use client"

import Image from "next/image"
import Link from "next/link"
import { Star } from "lucide-react"

import type { CatalogProduct } from "@/lib/mock-commerce"
import { formatMT } from "@/lib/mock-commerce"
import { useCart } from "@/hooks/use-cart"
import { Button } from "@/components/ui/button"

export function ProductCard({ product }: { product: CatalogProduct }) {
  const { addItem } = useCart()

  return (
    <article className="overflow-hidden rounded-3xl border border-white/10 bg-white/5">
      <Link href={`/produtos/${product.id}`}>
        <div className="relative h-56">
          <Image src={product.image} alt={product.name} fill className="object-cover" />
        </div>
      </Link>

      <div className="space-y-3 p-4">
        <div className="flex items-center justify-between text-xs text-white/70">
          <span>{product.category}</span>
          <span>{product.stock}</span>
        </div>
        <h3 className="text-lg font-medium">{product.name}</h3>
        <div className="flex items-center gap-2 text-sm text-white/70">
          <Star className="size-4 fill-orange-400 text-orange-400" /> {product.rating}
          <span>({product.reviews})</span>
        </div>
        <p className="text-xl font-semibold text-orange-400">{formatMT(product.price)}</p>
        <Button
          className="w-full rounded-full bg-orange-500 text-black hover:bg-orange-400"
          onClick={() =>
            addItem({
              id: product.id,
              name: product.name,
              imageSrc: product.image,
              price: product.price,
              unitLabel: "un",
            })
          }
        >
          Adicionar ao carrinho
        </Button>
      </div>
    </article>
  )
}
