import Image from "next/image"
import Link from "next/link"
import { notFound } from "next/navigation"
import { MapPin, Phone, ShieldCheck, Star, Truck } from "lucide-react"

import { MarketplaceHeader } from "@/components/marketplace-header"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { getMockProductDetailById } from "@/lib/mock-product-details"

type ProductDetailsPageProps = {
  params: Promise<{ id: string }>
}

export default async function ProductDetailsPage({
  params,
}: ProductDetailsPageProps) {
  const { id } = await params
  const product = getMockProductDetailById(id)

  if (!product) {
    notFound()
  }

  return (
    <main className="min-h-svh bg-background">
      <MarketplaceHeader />

      <section className="mx-auto w-full max-w-7xl px-4 py-8 md:px-6 md:py-10">
        <nav className="mb-4 flex items-center gap-2 text-xs text-muted-foreground">
          <Link href="/" className="hover:text-foreground">
            Início
          </Link>
          <span>/</span>
          <span className="text-foreground">Produtos</span>
          <span>/</span>
          <span className="truncate">{product.name}</span>
        </nav>

        <div className="grid gap-4 lg:grid-cols-[1.5fr_1fr]">
          <section className="border border-border bg-card p-4 md:p-5">
            <div className="relative h-72 border border-border bg-muted md:h-96">
              <Image
                src={product.images[0].src}
                alt={product.images[0].alt}
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 70vw"
                priority
              />
            </div>

            <div className="mt-3 grid grid-cols-3 gap-2">
              {product.images.map((image, index) => (
                <div
                  key={image.src}
                  className={cn(
                    "relative h-20 border bg-muted md:h-24",
                    index === 0 ? "border-primary/50" : "border-border",
                  )}
                >
                  <Image
                    src={image.src}
                    alt={image.alt}
                    fill
                    className="object-cover"
                    sizes="(max-width: 1024px) 33vw, 20vw"
                  />
                </div>
              ))}
            </div>
          </section>

          <aside className="border border-border bg-card p-4 md:p-5">
            <p className="inline-flex h-6 items-center border border-primary/35 bg-primary/12 px-2 text-[10px] font-semibold uppercase tracking-[0.12em]">
              {product.category}
            </p>

            <h1 className="mt-3 text-2xl font-semibold tracking-tight">
              {product.name}
            </h1>

            <div className="mt-3 flex items-center gap-2 text-sm">
              <Star className="size-4 fill-primary text-primary" />
              <span className="font-semibold">{product.rating.toFixed(1)}</span>
              <span className="text-muted-foreground">
                ({product.reviews} avaliações)
              </span>
            </div>

            <p className="mt-4 text-3xl font-semibold text-primary">
              {product.price}
            </p>
            <p className="mt-1 text-xs text-muted-foreground">
              Preço por {product.unit}
            </p>

            <p
              className={cn(
                "mt-4 inline-flex h-7 items-center border px-2 text-[10px] font-semibold uppercase tracking-[0.12em]",
                product.stockStatus === "Em stock"
                  ? "border-primary/35 bg-primary/12 text-foreground"
                  : "border-border bg-background text-muted-foreground",
              )}
            >
              {product.stockStatus}
            </p>

            <div className="mt-5 space-y-2 text-sm text-muted-foreground">
              <p className="flex items-center gap-2">
                <MapPin className="size-4" />
                {product.location}
              </p>
              <p className="flex items-center gap-2">
                <Truck className="size-4" />
                {product.delivery}
              </p>
            </div>

            <div className="mt-5 grid gap-2">
              <Button className="h-9">Comprar agora</Button>
              <Button variant="outline" className="h-9">
                Contactar fornecedor
              </Button>
            </div>
          </aside>
        </div>

        <div className="mt-4 grid gap-4 lg:grid-cols-[1.5fr_1fr]">
          <section className="border border-border bg-card p-4 md:p-5">
            <h2 className="text-sm font-semibold uppercase tracking-[0.12em] text-muted-foreground">
              Descrição
            </h2>
            <p className="mt-3 text-sm leading-relaxed text-foreground/90">
              {product.description}
            </p>

            <h3 className="mt-5 text-sm font-semibold uppercase tracking-[0.12em] text-muted-foreground">
              Especificações
            </h3>
            <ul className="mt-3 space-y-2 text-sm text-foreground/90">
              {product.specs.map((spec) => (
                <li key={spec} className="flex items-start gap-2">
                  <span className="mt-1 size-1.5 shrink-0 bg-primary" aria-hidden />
                  <span>{spec}</span>
                </li>
              ))}
            </ul>
          </section>

          <section className="border border-border bg-card p-4 md:p-5">
            <h2 className="text-sm font-semibold uppercase tracking-[0.12em] text-muted-foreground">
              Fornecedor
            </h2>

            <p className="mt-3 text-base font-semibold">{product.supplier.name}</p>

            <div className="mt-3 space-y-2 text-sm text-muted-foreground">
              <p className="flex items-center gap-2">
                <MapPin className="size-4" />
                {product.supplier.city}
              </p>
              <p className="flex items-center gap-2">
                <Phone className="size-4" />
                {product.supplier.phone}
              </p>
              <p className="flex items-center gap-2">
                <ShieldCheck className="size-4" />
                {product.supplier.verified
                  ? "Fornecedor verificado"
                  : "Fornecedor em validação"}
              </p>
            </div>

            <Button variant="outline" className="mt-5 h-9 w-full" asChild>
              <Link href="/">Voltar para produtos</Link>
            </Button>
          </section>
        </div>
      </section>
    </main>
  )
}
