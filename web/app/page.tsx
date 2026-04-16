import Image from "next/image"
import Link from "next/link"
import { ArrowUpRight, MapPin, Star, Truck } from "lucide-react"

import { MarketplaceHeader } from "@/components/marketplace-header"
import { SupplierAvatarCarousel } from "@/components/supplier-avatar-carousel"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

type Product = {
  id: string
  name: string
  location: string
  unit: string
  price: string
  category: string
  stockStatus: "Em stock" | "Stock limitado"
  rating: number
  reviews: number
  delivery: string
  imageSrc: string
  imageAlt: string
}

const products: Product[] = [
  {
    id: "1",
    name: "Areia média lavada",
    location: "Maputo",
    unit: "m3",
    price: "2 350,00 MT",
    category: "Areia",
    stockStatus: "Em stock",
    rating: 4.8,
    reviews: 126,
    delivery: "Entrega em 24h para Maputo",
    imageSrc: "/orange_sand.jpg",
    imageAlt: "Areia para construção",
  },
  {
    id: "2",
    name: "Pedra brita 3/4",
    location: "Matola",
    unit: "m3",
    price: "2 900,00 MT",
    category: "Brita",
    stockStatus: "Em stock",
    rating: 4.7,
    reviews: 88,
    delivery: "Entrega em 24h para Matola",
    imageSrc: "/stones.jpg",
    imageAlt: "Pedras britadas para construção",
  },
  {
    id: "3",
    name: "Bloco de cimento 15",
    location: "Boane",
    unit: "unidade",
    price: "45,00 MT",
    category: "Blocos",
    stockStatus: "Stock limitado",
    rating: 4.5,
    reviews: 54,
    delivery: "Entrega em 48h para Boane",
    imageSrc: "/white_sand.jpg",
    imageAlt: "Areia branca para construção",
  },
]

const featuredChips = [
  "Areia lavada",
  "Brita 3/4",
  "Agregados",
  "Blocos",
  "Entrega rápida",
]

export default function Page() {
  return (
    <main className="min-h-svh bg-background">
      <MarketplaceHeader />

      <section className="relative isolate overflow-hidden">
        <Image
          src="/hero-canteiro.jpg"
          alt="Canteiro de obras com equipamento de construção"
          width={1920}
          height={1080}
          className="h-105 w-full object-cover"
          priority
        />
        <div className="absolute inset-0 bg-black/55" />

        <div className="absolute inset-0 flex items-center justify-center px-4">
          <div className="mx-auto max-w-3xl text-center text-white">
            <div className="mx-auto mb-4 h-1 w-12 bg-primary" />
            <h1 className="text-4xl font-bold tracking-tight md:text-6xl">
              Build Easy Moçambique
            </h1>
            <p className="mx-auto mt-4 max-w-2xl text-sm leading-relaxed text-white/90 md:text-xl">
              Encontre pedras, areias e materiais de construção com entrega em
              todo o país e pagamento em MT.
            </p>
            <Button className="mt-8" size="lg">
              Ver produtos
            </Button>
          </div>
        </div>
      </section>
      <SupplierAvatarCarousel />

      <section className="mx-auto w-full max-w-7xl px-4 py-10 md:px-6 md:py-12">
        <div className="border border-border bg-card">
          <div className="border-b border-border px-5 py-5 md:px-7 md:py-6">
            <div className="flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
              <div className="max-w-2xl">
                <p className="inline-flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.16em] text-muted-foreground">
                  <span className="size-2 bg-primary" aria-hidden />
                  Mercado em movimento
                </p>
                <h2 className="mt-2 font-heading text-2xl tracking-tight md:text-3xl">
                  Produtos em destaque
                </h2>
                <p className="mt-2 text-sm text-muted-foreground md:text-base">
                  Materiais pesados para obra com fornecedores verificados,
                  preços em MT e logística local.
                </p>
              </div>

              <Button variant="outline" className="h-9 w-full sm:w-auto">
                Ver catálogo completo
                <ArrowUpRight className="size-4" />
              </Button>
            </div>

            <div className="mt-5 flex flex-wrap gap-2 border-y border-border/70 py-3">
              {featuredChips.map((chip) => (
                <span
                  key={chip}
                  className="inline-flex h-7 items-center border border-border bg-background px-3 text-[11px] font-semibold uppercase tracking-widest text-muted-foreground"
                >
                  {chip}
                </span>
              ))}
            </div>
          </div>

          <div className="p-5 md:p-7">
            <div className="mt-6 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
              {products.map((product) => (
                <article
                  key={product.id}
                  className="overflow-hidden border border-border bg-background hover:border-primary/40"
                >
                  <Link href={`/produtos/${product.id}`} className="block">
                    <div className="relative h-36 border-b border-border bg-muted">
                      <Image
                        src={product.imageSrc}
                        alt={product.imageAlt}
                        fill
                        className="object-cover"
                        sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw"
                      />
                    </div>

                    <div className="bg-muted/35 p-3">
                      <div className="flex items-center justify-between gap-2">
                        <span className="inline-flex h-6 items-center border border-primary/35 bg-primary/12 px-2 text-[10px] font-semibold uppercase tracking-[0.12em]">
                          {product.category}
                        </span>

                        <span
                          className={cn(
                            "inline-flex h-6 items-center border px-2 text-[10px] font-semibold uppercase tracking-[0.12em]",
                            product.stockStatus === "Em stock"
                              ? "border-primary/35 bg-primary/12 text-foreground"
                              : "border-border bg-background text-muted-foreground",
                          )}
                        >
                          {product.stockStatus}
                        </span>
                      </div>

                      <p className="mt-3 text-[11px] font-medium text-muted-foreground">
                        Qualidade para betão e alvenaria
                      </p>
                    </div>

                    <div className="p-4">
                      <div className="flex items-start justify-between gap-3">
                        <h3 className="text-sm font-semibold leading-snug">
                          {product.name}
                        </h3>
                        <p className="shrink-0 text-sm font-semibold text-primary">
                          {product.price}
                        </p>
                      </div>

                      <p className="mt-1 text-xs text-muted-foreground">
                        Preço por {product.unit}
                      </p>

                      <div className="mt-2 flex items-center gap-1.5 text-xs">
                        <Star className="size-3.5 fill-primary text-primary" />
                        <span className="font-semibold text-foreground">
                          {product.rating.toFixed(1)}
                        </span>
                        <span className="text-muted-foreground">
                          ({product.reviews} avaliações)
                        </span>
                      </div>

                      <div className="mt-3 space-y-1.5 text-xs text-muted-foreground">
                        <p className="flex items-center gap-1.5">
                          <MapPin className="size-3.5" />
                          Entrega em {product.location}
                        </p>
                        <p className="flex items-center gap-1.5">
                          <Truck className="size-3.5" />
                          {product.delivery}
                        </p>
                      </div>
                    </div>
                  </Link>

                  <div className="px-4 pb-4">
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm" className="flex-1" asChild>
                        <Link href={`/produtos/${product.id}`}>Detalhes</Link>
                      </Button>
                      <Button size="sm" className="flex-1">
                        Adicionar
                      </Button>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}
