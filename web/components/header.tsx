"use client"

import Link from "next/link"
import { Menu, Search, ShoppingCart, User, X } from "lucide-react"
import { useState } from "react"

import { Button } from "@/components/ui/button"
import { useAuth } from "@/hooks/use-auth"
import { useCart } from "@/hooks/use-cart"
import { cn } from "@/lib/utils"

const mainNav = [
  { label: "Início", href: "/" },
  { label: "Produtos", href: "/produtos" },
  { label: "Empresas", href: "/empresas" },
  { label: "Notícias", href: "/noticias" },
]

export function Header() {
  const [isSearchOpen, setIsSearchOpen] = useState(false)
  const [profileOpen, setProfileOpen] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const { user, logout } = useAuth()
  const { itemCount } = useCart()

  return (
    <header className="sticky top-0 z-40 border-b border-white/[0.06] bg-[#0a0e17]">
      <div className="mx-auto flex w-full max-w-7xl items-center gap-3 px-4 py-3 md:px-6 md:py-4">
        <button
          onClick={() => setMobileOpen(true)}
          className="grid h-10 w-10 place-items-center rounded-full border border-white/15 text-white/70 lg:hidden"
          aria-label="Abrir menu"
        >
          <Menu className="size-4" />
        </button>

        <Link href="/" className="shrink-0">
          <p className="font-[Syne] text-xl font-bold leading-none tracking-tight text-[#f0ebe4] md:text-[22px]">
            Build<span className="text-[#d4541a]">Easy</span>
          </p>
          <p className="mt-1 text-[10px] uppercase tracking-[0.05em] text-white/30">Areia · Pedra</p>
        </Link>

        <nav className="hidden shrink-0 lg:flex lg:flex-1 lg:justify-center">
          {mainNav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="flex h-[42px] items-center px-4 text-[11px] font-medium uppercase tracking-[0.07em] text-white/45 transition-colors hover:text-white/80"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="ml-auto flex items-center gap-2 md:gap-3">
          <Link
            href="/carrinho"
            className="relative grid h-10 w-10 place-items-center rounded-full border border-white/[0.1] bg-white/[0.03] text-white/60 hover:text-white"
          >
            <ShoppingCart className="size-4" />
            {itemCount > 0 ? (
              <span className="absolute -top-1 -right-1 grid h-5 w-5 place-items-center rounded-full bg-[#d4541a] text-[10px] font-bold">
                {itemCount}
              </span>
            ) : null}
          </Link>

          <div className="relative hidden sm:flex sm:items-center">
            <div className={cn("overflow-hidden transition-all duration-300 ease-in-out", isSearchOpen ? "w-[190px] opacity-100" : "w-0 opacity-0")}>
              <div className="relative">
                <Search className="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-white/30" />
                <input type="search" placeholder="Pesquisar..." className="h-10 w-[190px] border border-white/[0.1] bg-white/[0.03] pl-9 pr-8 text-sm text-white/80 outline-none" />
                <button onClick={() => setIsSearchOpen(false)} className="absolute top-1/2 right-2 -translate-y-1/2 text-white/40 hover:text-white/80" aria-label="Fechar busca">
                  <X className="size-3.5" />
                </button>
              </div>
            </div>

            {!isSearchOpen && (
              <button onClick={() => setIsSearchOpen(true)} className="grid h-10 w-10 place-items-center rounded-full border border-white/[0.1] bg-white/[0.03] text-white/60">
                <Search className="size-4" />
              </button>
            )}
          </div>

          {!user ? (
            <Button className="h-10 bg-[#d4541a] px-3 text-[11px] uppercase tracking-[0.05em] md:px-5" asChild>
              <Link href="/login">Entrar</Link>
            </Button>
          ) : (
            <div className="relative">
              <button onClick={() => setProfileOpen((v) => !v)} className="grid h-10 w-10 place-items-center rounded-full border border-[#d4541a]/40 text-[#d4541a]">
                <User className="size-4" />
              </button>
              {profileOpen ? (
                <div className="absolute right-0 mt-2 w-44 border border-white/10 bg-[#0d1117] p-1 text-sm">
                  <Link className="block px-3 py-2 text-white/80 hover:bg-white/5" href="/perfil" onClick={() => setProfileOpen(false)}>
                    Minha conta
                  </Link>
                  <button
                    className="block w-full px-3 py-2 text-left text-red-400 hover:bg-red-500/10"
                    onClick={() => {
                      logout()
                      setProfileOpen(false)
                    }}
                  >
                    Sair
                  </button>
                </div>
              ) : null}
            </div>
          )}
        </div>
      </div>

      {mobileOpen ? (
        <div className="fixed inset-0 z-50 bg-black/70 lg:hidden" onClick={() => setMobileOpen(false)}>
          <aside className="h-full w-72 border-r border-white/10 bg-[#0d1117] p-5" onClick={(e) => e.stopPropagation()}>
            <div className="mb-6 flex items-center justify-between">
              <p className="text-lg font-semibold">Menu</p>
              <button onClick={() => setMobileOpen(false)} className="text-white/70">
                <X className="size-4" />
              </button>
            </div>
            <nav className="space-y-1">
              {mainNav.map((item) => (
                <Link key={item.href} href={item.href} className="block rounded-md px-3 py-2 text-white/80 hover:bg-white/5" onClick={() => setMobileOpen(false)}>
                  {item.label}
                </Link>
              ))}
              <Link href="/carrinho" className="block rounded-md px-3 py-2 text-white/80 hover:bg-white/5" onClick={() => setMobileOpen(false)}>
                Carrinho ({itemCount})
              </Link>
              {!user ? (
                <Link href="/login" className="block rounded-md px-3 py-2 text-[#d4541a]" onClick={() => setMobileOpen(false)}>
                  Entrar
                </Link>
              ) : (
                <>
                  <Link href="/perfil" className="block rounded-md px-3 py-2 text-white/80 hover:bg-white/5" onClick={() => setMobileOpen(false)}>
                    Minha conta
                  </Link>
                  <button
                    className="block w-full rounded-md px-3 py-2 text-left text-red-400 hover:bg-red-500/10"
                    onClick={() => {
                      logout()
                      setMobileOpen(false)
                    }}
                  >
                    Sair
                  </button>
                </>
              )}
            </nav>
          </aside>
        </div>
      ) : null}
    </header>
  )
}
