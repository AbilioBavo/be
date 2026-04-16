import type { ReactNode } from "react"
import Link from "next/link"
import {
  ChevronRight,
  Heart,
  HelpCircle,
  MapPin,
  Menu,
  Search,
  ShieldCheck,
  ShoppingCart,
  Truck,
  User,
  Wrench,
} from "lucide-react"

import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

const navItems = [
  "Produtos",
  "Promoções",
  "Cimento e argamassas",
  "Pedras e britas",
  "Areias",
  "Ferramentas",
]

export function MarketplaceHeader() {
  return (
    <header className="sticky top-0 z-40 border-b border-border/80 bg-background/95 backdrop-blur supports-backdrop-filter:bg-background/80">
      <div className="border-b border-border/70 bg-primary text-black">
        <div className="mx-auto flex w-full max-w-7xl items-center justify-between gap-3 px-4 py-2 text-xs md:px-6">
          <div className="flex min-w-0 items-center gap-1.5 atext-foreground/85">
            <MapPin className="size-3.5 shrink-0" />
            <span className="truncate">
              Entregamos em <span className="font-semibold atext-foreground">Maputo</span> e arredores
            </span>
          </div>

          <div className="hidden items-center gap-4 atext-muted-foreground lg:flex">
            <span className="inline-flex items-center gap-1.5 whitespace-nowrap">
              <Truck className="size-3.5" />
              Entrega em 24h
            </span>
            <span className="inline-flex items-center gap-1.5 whitespace-nowrap">
              <ShieldCheck className="size-3.5" />
              Pagamento seguro em MT
            </span>
          </div>

          <div className="hidden items-center gap-4 atext-muted-foreground md:flex">
            <TopLink href="#">
              <HelpCircle className="size-3.5" />
              Ajuda
            </TopLink>
            <TopLink href="#">
              <User className="size-3.5" />
              Iniciar sessão
            </TopLink>
            <TopLink href="#">
              <Heart className="size-3.5" />
              Favoritos
            </TopLink>
          </div>
        </div>
      </div>

      <div className="mx-auto w-full max-w-7xl px-4 py-3 md:px-6 md:py-4">
        <div className="flex items-center gap-3">
          <Button
            variant="outline"
            size="icon-sm"
            className="md:hidden"
            aria-label="Abrir menu"
          >
            <Menu className="size-4" />
          </Button>

          <Link href="/" className="shrink-0">
            <div className="flex items-center gap-2">
              <div className="text-lg font-semibold tracking-tight md:text-2xl">
                Build
                <span className="text-primary">Easy</span>
              </div>
            </div>
            <p className="text-[11px] text-muted-foreground md:text-xs">
              Areia, pedra e agregados para obra
            </p>
          </Link>

          <div className="ml-auto hidden items-center gap-2 md:flex">
            <Button className="h-9 min-w-37 px-3">
              <ShoppingCart className="size-4" />
              0,00 MT
            </Button>
          </div>

          <Button
            variant="outline"
            size="icon-sm"
            className="ml-auto md:hidden"
            aria-label="Carrinho"
          >
            <ShoppingCart className="size-4" />
          </Button>
        </div>

        <div className="mt-3">
          <form className="relative flex-1">
            <label htmlFor="header-search" className="sr-only">
              Pesquisar produtos
            </label>
            <Search className="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-muted-foreground" />
            <input
              id="header-search"
              type="search"
              placeholder="Pesquisar areia lavada, brita 3/4, blocos, cimento..."
              className="h-10 w-full border-2 border-border bg-background/90 pl-10 pr-3 text-sm shadow-[inset_0_1px_0_rgba(255,255,255,0.2)] outline-none transition-colors placeholder:text-muted-foreground focus-visible:border-primary/60 focus-visible:ring-2 focus-visible:ring-primary/20"
            />
          </form>
        </div>
      </div>

      <nav className="border-t border-border/70 bg-muted/25">
        <div className="mx-auto flex w-full max-w-7xl items-center gap-2 overflow-x-auto px-4 py-2 md:px-6">
          {navItems.map((item, index) => (
            <Link
              key={item}
              href="#"
              className={cn(
                "inline-flex h-8 shrink-0 items-center border px-3 text-[11px] font-semibold uppercase tracking-[0.08em] transition-colors",
                index === 0
                  ? "border-primary/60 bg-primary/15 text-foreground"
                  : "border-transparent text-muted-foreground hover:border-border hover:bg-background hover:text-foreground",
              )}
            >
              {item}
            </Link>
          ))}

          <Link
            href="#"
            className="ml-auto hidden items-center gap-1.5 text-xs font-medium text-muted-foreground transition-colors hover:text-foreground lg:inline-flex"
          >
            Ver catálogo completo
            <ChevronRight className="size-3.5" />
          </Link>
        </div>
      </nav>
    </header>
  )
}

function TopLink({
  href,
  children,
}: {
  href: string
  children: ReactNode
}) {
  return (
    <Link
      href={href}
      className="inline-flex items-center gap-1.5 whitespace-nowrap transition-colors hover:text-foreground"
    >
      {children}
    </Link>
  )
}
