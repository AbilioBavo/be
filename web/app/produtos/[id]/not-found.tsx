"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import {
  ArrowLeft,
  ArrowRight,
  Home,
  Package,
  Search,
  TrendingUp,
  Box,
  Hammer,
  Truck,
} from "lucide-react";

import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { Button } from "@/components/ui/button";
import { catalogProducts, categories } from "@/lib/mock-commerce";
import { ProductCard } from "@/components/product-card";

export default function ProductNotFound() {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState("");
  const suggestedProducts = catalogProducts.slice(0, 4);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/produtos?q=${encodeURIComponent(searchQuery)}`);
    }
  };

  const popularCategories = categories.slice(0, 4);
  const quickLinks = [
    { label: "Página inicial", href: "/", icon: Home },
    { label: "Catálogo completo", href: "/produtos", icon: Package },
    { label: "Mais vendidos", href: "/produtos?sort=popular", icon: TrendingUp },
    { label: "Contato", href: "/contato", icon: Truck },
  ];

  return (
    <main className="min-h-svh bg-[#0a0a0a] text-white">
      <Header />

      {/* Breadcrumbs */}
      <div className="border-b border-white/10 bg-[#0d1117]/50">
        <div className="mx-auto w-full max-w-7xl px-4 py-3 md:px-6">
          <nav className="flex items-center gap-1.5 text-xs">
            <Link href="/" className="text-white/50 transition-colors hover:text-white">
              Início
            </Link>
            <span className="text-white/30">/</span>
            <Link href="/produtos" className="text-white/50 transition-colors hover:text-white">
              Produtos
            </Link>
            <span className="text-white/30">/</span>
            <span className="text-white/80">Não encontrado</span>
          </nav>
        </div>
      </div>

      {/* Conteúdo principal */}
      <section className="mx-auto w-full max-w-7xl px-4 py-12 md:px-6 lg:py-16">
        <div className="grid gap-10 lg:grid-cols-2 lg:items-center">
          {/* Lado esquerdo - Mensagem */}
          <div>
            {/* Código 404 decorativo */}
            <div className="mb-6 flex items-center gap-4">
              <div className="flex items-center gap-1">
                <Box className="size-12 text-[#d4541a]/30" />
                <Hammer className="size-8 text-white/20 -ml-2" />
              </div>
              <div>
                <p className="text-7xl font-bold text-white/10">404</p>
              </div>
            </div>

            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <div className="h-5 w-0.5 bg-[#d4541a]" />
                <span className="text-xs font-semibold uppercase tracking-[0.2em] text-[#d4541a]">
                  Produto não encontrado
                </span>
              </div>

              <h1 className="text-4xl font-bold tracking-tight text-white sm:text-5xl">
                Ops! Este produto
                <br />
                <span className="text-[#d4541a]">não está disponível</span>
              </h1>

              <p className="max-w-lg text-white/60">
                O item que você está procurando pode ter sido removido, 
                estar temporariamente indisponível ou o link pode estar incorreto.
              </p>
            </div>

            {/* Busca rápida */}
            <form onSubmit={handleSearch} className="mt-6 max-w-md">
              <label className="mb-2 block text-xs font-medium uppercase tracking-wider text-white/50">
                Procurar outro produto
              </label>
              <div className="relative">
                <Search className="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-white/30" />
                <input
                  type="search"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Ex: Cimento, Areia, Brita..."
                  className="h-12 w-full border border-white/10 bg-white/5 pl-10 pr-20 text-sm text-white placeholder:text-white/30 outline-none transition-all focus:border-[#d4541a]/50"
                />
                <button
                  type="submit"
                  className="absolute top-1/2 right-1 -translate-y-1/2 bg-[#d4541a] px-4 py-1.5 text-xs font-medium text-white hover:bg-[#e05e1e] transition-colors"
                >
                  Buscar
                </button>
              </div>
            </form>

            {/* Links rápidos */}
            <div className="mt-8 flex flex-wrap gap-3">
              {quickLinks.map(({ label, href, icon: Icon }) => (
                <Link
                  key={href}
                  href={href}
                  className="group flex items-center gap-2 border border-white/10 bg-white/5 px-4 py-2 text-xs font-medium uppercase tracking-wider text-white/70 transition-all hover:border-[#d4541a]/50 hover:bg-white/10 hover:text-white"
                >
                  <Icon className="size-3.5 text-[#d4541a]" />
                  {label}
                  <ArrowRight className="size-3 transition-transform group-hover:translate-x-0.5" />
                </Link>
              ))}
            </div>
          </div>

          {/* Lado direito - Visual decorativo */}
          <div className="relative hidden lg:block">
            <div className="relative aspect-square">
              {/* Elementos decorativos */}
              <div className="absolute inset-0 bg-gradient-to-br from-[#d4541a]/10 via-transparent to-transparent" />
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                <div className="relative">
                  <Package className="size-32 text-white/10" />
                  <Search className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 size-12 text-[#d4541a]/30" />
                </div>
              </div>
              
              {/* Grid decorativo */}
              <div 
                className="absolute inset-0 opacity-20"
                style={{
                  backgroundImage: `
                    linear-gradient(rgba(212, 84, 26, 0.1) 1px, transparent 1px),
                    linear-gradient(90deg, rgba(212, 84, 26, 0.1) 1px, transparent 1px)
                  `,
                  backgroundSize: '30px 30px',
                }}
              />
            </div>

            {/* Dica */}
            <div className="mt-6 border-l-2 border-[#d4541a] pl-4">
              <p className="text-sm text-white/60">
                Dica: Use termos mais genéricos na busca ou navegue pelas categorias.
              </p>
            </div>
          </div>
        </div>

        {/* Categorias populares */}
        <div className="mt-16 border-t border-white/10 pt-12">
          <div className="mb-6 flex items-center justify-between">
            <div>
              <h2 className="text-xl font-semibold text-white">Categorias populares</h2>
              <p className="mt-1 text-sm text-white/50">
                Explore nossas principais categorias de produtos
              </p>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
            {popularCategories.map((category) => (
              <Link
                key={category}
                href={`/produtos?categoria=${category}`}
                className="group flex flex-col items-center border border-white/10 bg-[#0d1117] p-6 text-center transition-all hover:border-[#d4541a]/50 hover:bg-white/[0.07]"
              >
                <div className="mb-3 flex h-12 w-12 items-center justify-center border border-white/10 bg-white/5 group-hover:border-[#d4541a]/30">
                  <Package className="size-5 text-white/60 group-hover:text-[#d4541a]" />
                </div>
                <span className="text-sm font-medium text-white group-hover:text-[#d4541a]">
                  {category}
                </span>
                <span className="mt-1 text-[10px] text-white/40">
                  Ver produtos
                </span>
              </Link>
            ))}
          </div>
        </div>

        {/* Produtos sugeridos */}
        {suggestedProducts.length > 0 && (
          <div className="mt-12">
            <div className="mb-6 flex items-center justify-between">
              <div>
                <h2 className="text-xl font-semibold text-white">Você pode gostar</h2>
                <p className="mt-1 text-sm text-white/50">
                  Produtos que podem te interessar
                </p>
              </div>
              <Link
                href="/produtos"
                className="group flex items-center gap-1 text-xs font-medium uppercase tracking-wider text-white/50 transition-colors hover:text-white"
              >
                Ver todos
                <ArrowRight className="size-3 transition-transform group-hover:translate-x-0.5" />
              </Link>
            </div>

            <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
              {suggestedProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          </div>
        )}

        {/* Botões de ação principais */}
        <div className="mt-12 flex flex-col items-center justify-center gap-3 border-t border-white/10 pt-8 sm:flex-row">
          <Button
            onClick={() => router.push("/")}
            className="group h-12 min-w-[200px] bg-[#d4541a] text-sm font-semibold uppercase tracking-wider text-white hover:bg-[#e05e1e]"
          >
            <ArrowLeft className="mr-2 size-4 transition-transform group-hover:-translate-x-0.5" />
            Voltar à home
          </Button>
          <Button
            variant="outline"
            onClick={() => router.push("/produtos")}
            className="h-12 min-w-[200px] border-white/15 bg-transparent text-sm font-semibold uppercase tracking-wider text-white hover:bg-white/5"
          >
            Ver catálogo
            <ArrowRight className="ml-2 size-4" />
          </Button>
        </div>
      </section>

      <Footer />
    </main>
  );
}