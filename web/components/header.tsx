"use client";

import Link from "next/link";
import { Search, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { cn } from "@/lib/utils";

const mainNav = ["Início", "Produtos", "Empresas", "Notícias"];

export function Header() {
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 border-b border-white/[0.06] bg-[#0a0e17]">
      {/* Barra principal */}
      <div className="mx-auto flex w-full max-w-7xl items-center gap-6 px-6 py-4">
        {/* Logo - Esquerda */}
        <Link href="/" className="shrink-0">
          <p className="font-[Syne] text-[22px] font-bold leading-none tracking-tight text-[#f0ebe4]">
            Build<span className="text-[#d4541a]">Easy</span>
          </p>
          <p className="mt-1 text-[10px] uppercase tracking-[0.05em] text-white/30">
            Areia · Pedra
          </p>
        </Link>

        <nav className="hidden shrink-0 lg:flex lg:flex-1 lg:justify-center">
          {mainNav.map((item) => (
            <Link
              key={item}
              href="#"
              className="flex h-[42px] items-center px-4 text-[11px] font-medium uppercase tracking-[0.07em] text-white/45 transition-colors hover:text-white/80"
            >
              {item}
            </Link>
          ))}
        </nav>

        <div className="flex shrink-0 items-center gap-3">
          <div className="relative flex items-center">
            <div
              className={cn(
                "overflow-hidden transition-all duration-300 ease-in-out",
                isSearchOpen ? "w-[200px] opacity-100" : "w-0 opacity-0"
              )}
            >
              <div className="relative">
                <Search className="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-white/30" />
                <input
                  type="search"
                  placeholder="Pesquisar..."
                  className="h-[42px] w-[200px] border border-white/[0.1] bg-white/[0.03] pl-9 pr-8 text-sm text-white/80 outline-none transition-colors placeholder:text-white/25 focus:border-white/30 focus:bg-white/[0.05]"
                  autoFocus={isSearchOpen}
                />
                {isSearchOpen && (
                  <button
                    onClick={() => setIsSearchOpen(false)}
                    className="absolute top-1/2 right-2 -translate-y-1/2 text-white/40 transition-colors hover:text-white/80"
                    aria-label="Fechar busca"
                  >
                    <X className="size-3.5" />
                  </button>
                )}
              </div>
            </div>

            {!isSearchOpen && (
              <button
                onClick={() => setIsSearchOpen(true)}
                className="flex h-[42px] w-[42px] items-center justify-center rounded-full border border-white/[0.1] bg-white/[0.03] text-white/60 transition-all hover:border-white/30 hover:bg-white/[0.08] hover:text-white"
                aria-label="Abrir busca"
              >
                <Search className="size-4" />
              </button>
            )}
          </div>

          <Button
            className="h-[42px] shrink-0 bg-[#d4541a] px-5 text-[11px] font-medium uppercase tracking-[0.05em] text-white shadow-[0_4px_12px_rgba(212,84,26,0.25)] transition-all hover:bg-[#e05e1e] hover:shadow-[0_6px_16px_rgba(212,84,26,0.35)]"
          >
            Entrar
          </Button>
        </div>
      </div>

      {isSearchOpen && (
        <div
          className="fixed inset-0 z-30 bg-black/20 backdrop-blur-sm lg:hidden"
          onClick={() => setIsSearchOpen(false)}
        />
      )}
    </header>
  );
}