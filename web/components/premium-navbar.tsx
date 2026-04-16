"use client"

import Link from "next/link"
import { Heart, Menu, Search, ShoppingBag, User } from "lucide-react"

import { useCart } from "@/hooks/use-cart"
import { Button } from "@/components/ui/button"

export function PremiumNavbar() {
  const { itemCount } = useCart()

  return (
    <header className="sticky top-0 z-40 border-b border-white/10 bg-[#121212]/85 backdrop-blur-xl">
      <div className="mx-auto flex w-full max-w-7xl items-center gap-3 px-4 py-4 md:px-6">
        <button className="inline-flex size-10 items-center justify-center rounded-full border border-white/15 bg-white/5 md:hidden">
          <Menu className="size-4" />
        </button>

        <Link href="/" className="text-xl font-semibold tracking-wide">
          Cigarre
        </Link>

        <nav className="mx-auto hidden items-center gap-7 text-sm text-white/80 md:flex">
          <Link href="/produtos" className="hover:text-white">Coleção</Link>
          <Link href="/produtos" className="hover:text-white">Novidades</Link>
          <Link href="/perfil" className="hover:text-white">Perfil</Link>
        </nav>

        <div className="ml-auto flex items-center gap-2">
          <Button variant="ghost" size="icon-sm" className="rounded-full border border-white/10 bg-white/5">
            <Search className="size-4" />
          </Button>
          <Link href="/login">
            <Button variant="ghost" size="icon-sm" className="rounded-full border border-white/10 bg-white/5">
              <User className="size-4" />
            </Button>
          </Link>
          <Button variant="ghost" size="icon-sm" className="rounded-full border border-white/10 bg-white/5">
            <Heart className="size-4" />
          </Button>
          <Link href="/carrinho">
            <Button className="rounded-full bg-orange-500 text-black hover:bg-orange-400">
              <ShoppingBag className="size-4" />
              {itemCount}
            </Button>
          </Link>
        </div>
      </div>
    </header>
  )
}
