"use client"

import Image from "next/image"
import Link from "next/link"
import { useEffect, useRef } from "react"

import { cn } from "@/lib/utils"

const suppliers = [
  {
    id: "areias-matola",
    name: "Areias do Sul",
    city: "Matola",
    seed: "AreiasSulMZ",
  },
  {
    id: "pedreira-maputo",
    name: "Pedreira Central",
    city: "Maputo",
    seed: "PedreiraCentral",
  },
  {
    id: "britas-beira",
    name: "Britas da Beira",
    city: "Beira",
    seed: "BritasBeira",
  },
  {
    id: "areia-nampula",
    name: "Areia Nampula",
    city: "Nampula",
    seed: "AreiaNampula",
  },
  {
    id: "pedras-tete",
    name: "Pedras do Zambeze",
    city: "Tete",
    seed: "PedrasTete",
  },
  {
    id: "agregados-chimoio",
    name: "Agregados Manica",
    city: "Chimoio",
    seed: "AgregadosManica",
  },
  {
    id: "cimento-express",
    name: "Cimento Express",
    city: "Maputo",
    seed: "CimentoExpress",
  },
  {
    id: "brita-quelimane",
    name: "Brita Zambézia",
    city: "Quelimane",
    seed: "BritaZambezia",
  },
] as const

function avatarUrl(seed: string) {
  const params = new URLSearchParams({
    seed,
    size: "128",
  })
  return `https://api.dicebear.com/7.x/notionists/png?${params.toString()}`
}

export function SupplierAvatarCarousel({ className }: { className?: string }) {
  const scrollerRef = useRef<HTMLUListElement>(null)

  useEffect(() => {
    const list = scrollerRef.current
    if (!list) {
      return
    }

    function onWheel(event: WheelEvent) {
      const root = scrollerRef.current
      if (!root) {
        return
      }

      if (event.defaultPrevented) {
        return
      }

      const dominantVertical =
        Math.abs(event.deltaY) > Math.abs(event.deltaX) &&
        Math.abs(event.deltaY) > 0

      if (!dominantVertical) {
        return
      }

      const { scrollWidth, clientWidth, scrollLeft } = root
      const canScrollX = scrollWidth > clientWidth + 1
      if (!canScrollX) {
        return
      }

      const atStart = scrollLeft <= 0 && event.deltaY < 0
      const atEnd =
        scrollLeft + clientWidth >= scrollWidth - 1 && event.deltaY > 0
      if (atStart || atEnd) {
        return
      }

      root.scrollLeft += event.deltaY
      event.preventDefault()
    }

    list.addEventListener("wheel", onWheel, { passive: false })

    return () => {
      list.removeEventListener("wheel", onWheel)
    }
  }, [])

  return (
    <section
      className={cn(
        "border-b border-border bg-background py-6 md:py-7",
        className,
      )}
      aria-labelledby="supplier-carousel-heading"
    >
      <div className="mx-auto mb-4 max-w-7xl px-4 md:px-6">
        <p className="mb-2 inline-flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.14em] text-muted-foreground">
          <span className="size-2 bg-primary" aria-hidden />
          Fornecedores verificados
        </p>
        <h2
          id="supplier-carousel-heading"
          className="text-sm font-semibold tracking-tight md:text-base"
        >
          Fornecedores
        </h2>
        <p className="mt-0.5 text-xs text-muted-foreground">
          Parceiros locais para areia, brita e agregados.
        </p>
      </div>

      <ul
        ref={scrollerRef}
        className="mx-auto flex max-w-7xl snap-x snap-mandatory list-none gap-3 overflow-x-auto px-4 pb-1 [scrollbar-width:none] md:gap-4 md:px-6 [&::-webkit-scrollbar]:hidden"
        tabIndex={0}
        aria-label="Lista de fornecedores"
      >
        {suppliers.map((supplier) => (
          <li key={supplier.id} className="w-44 shrink-0 snap-center">
            <Link
              href="#"
              className="flex h-full items-center gap-3 border border-border bg-card p-3 outline-none hover:border-primary/40 focus-visible:ring-2 focus-visible:ring-primary/30 focus-visible:ring-offset-2 focus-visible:ring-offset-background"
            >
              <div className="size-12 shrink-0 overflow-hidden rounded-full border border-primary/30 bg-muted">
                <Image
                  src={avatarUrl(supplier.seed)}
                  alt={supplier.name}
                  width={96}
                  height={96}
                  className="size-full object-cover"
                  sizes="48px"
                />
              </div>

              <div className="min-w-0">
                <p className="truncate text-xs font-semibold leading-tight">
                  {supplier.name}
                </p>
                <p className="mt-1 text-[11px] text-muted-foreground">
                  {supplier.city}
                </p>
                <p className="mt-1 text-[11px] font-medium text-primary">
                  Ver loja
                </p>
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </section>
  )
}
