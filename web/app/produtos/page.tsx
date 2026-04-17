// app/produtos/page.tsx
"use client";

import { useState, useMemo } from "react";
import { Footer } from "@/components/footer";
import { Header } from "@/components/header";
import { ProductCard } from "@/components/product-card";
import { categories, catalogProducts } from "@/lib/mock-commerce";
import {
  ChevronLeft,
  ChevronRight,
  Filter,
  Package,
  SlidersHorizontal,
  Star,
  Truck,
  X,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const ITEMS_PER_PAGE = 10;
const SORT_OPTIONS = [
  { value: "featured", label: "Destaques" },
  { value: "price-asc", label: "Menor preço" },
  { value: "price-desc", label: "Maior preço" },
  { value: "rating", label: "Melhor avaliados" },
  { value: "newest", label: "Mais recentes" },
];

const FEATURES = [
  { icon: Truck, label: "Entrega rápida", desc: "Em até 24h" },
  { icon: Package, label: "Retirada", desc: "Em loja física" },
  { icon: Star, label: "Qualidade", desc: "Garantida" },
];

export default function ProductsPage() {
  const [selectedCategory, setSelectedCategory] = useState("Todos");
  const [currentPage, setCurrentPage] = useState(1);
  const [sortBy, setSortBy] = useState("featured");
  const [showFilters, setShowFilters] = useState(false);
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 10000]);
  const [showMobileFilters, setShowMobileFilters] = useState(false);

  // Filtrar produtos
  const filteredProducts = useMemo(() => {
    let products = catalogProducts;
    
    if (selectedCategory !== "Todos") {
      products = products.filter(p => p.category === selectedCategory);
    }
    
    products = products.filter(p => p.price >= priceRange[0] && p.price <= priceRange[1]);
    
    switch (sortBy) {
      case "price-asc":
        products = [...products].sort((a, b) => a.price - b.price);
        break;
      case "price-desc":
        products = [...products].sort((a, b) => b.price - a.price);
        break;
      case "rating":
        products = [...products].sort((a, b) => b.rating - a.rating);
        break;
      case "newest":
        products = [...products].sort((a, b) => parseInt(b.id) - parseInt(a.id));
        break;
      default:
        products = [...products].sort((a, b) => b.rating - a.rating);
    }
    
    return products;
  }, [selectedCategory, sortBy, priceRange]);

  // Paginação
  const totalPages = Math.ceil(filteredProducts.length / ITEMS_PER_PAGE);
  const paginatedProducts = filteredProducts.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category);
    setCurrentPage(1);
  };

  const handleSortChange = (sort: string) => {
    setSortBy(sort);
    setCurrentPage(1);
  };

  const getPageNumbers = () => {
    const pages: (number | string)[] = [];
    const maxVisible = 5;
    
    if (totalPages <= maxVisible) {
      return Array.from({ length: totalPages }, (_, i) => i + 1);
    }
    
    if (currentPage <= 3) {
      pages.push(1, 2, 3, 4, "...", totalPages);
    } else if (currentPage >= totalPages - 2) {
      pages.push(1, "...", totalPages - 3, totalPages - 2, totalPages - 1, totalPages);
    } else {
      pages.push(1, "...", currentPage - 1, currentPage, currentPage + 1, "...", totalPages);
    }
    
    return pages;
  };

  return (
    <main className="min-h-svh bg-[#0a0a0a] text-white">
      <Header />
      
      {/* Hero Section Melhorada */}
      <section className="relative overflow-hidden border-b border-white/10">
        {/* Background Elements */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#0d1117] via-[#0a0a0a] to-[#0a0a0a]" />
        <div className="absolute inset-0 bg-[url('/grid-pattern.svg')] opacity-[0.03]" />
        
        {/* Linhas decorativas */}
        <div className="absolute top-0 left-0 h-px w-full bg-gradient-to-r from-transparent via-[#d4541a]/30 to-transparent" />
        <div className="absolute -top-40 -right-40 h-80 w-80 rounded-full bg-[#d4541a]/5 blur-3xl" />
        <div className="absolute -bottom-40 -left-40 h-80 w-80 rounded-full bg-[#d4541a]/3 blur-3xl" />
        
        <div className="relative mx-auto w-full max-w-7xl px-4 py-12 md:px-6 lg:py-16">
          <div className="grid gap-10 lg:grid-cols-[1fr_300px] lg:items-center">
            {/* Conteúdo Principal */}
            <div>
              {/* Badge */}
              <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-1.5 backdrop-blur-sm">
                <span className="relative flex h-2 w-2">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#d4541a]/60" />
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-[#d4541a]" />
                </span>
                <span className="text-[10px] font-semibold uppercase tracking-[0.15em] text-white/60">
                  Catálogo atualizado
                </span>
              </div>

              {/* Título */}
              <h1 className="max-w-3xl font-heading text-4xl font-bold tracking-tight text-white sm:text-5xl lg:text-6xl">
                Materiais de{" "}
                <span className="relative inline-block">
                  construção
                  <svg
                    className="absolute -bottom-2 left-0 w-full"
                    viewBox="0 0 180 8"
                    fill="none"
                  >
                    <path
                      d="M4 5C30 2 120 1.5 176 4"
                      stroke="#d4541a"
                      strokeWidth="3"
                      strokeLinecap="round"
                    />
                  </svg>
                </span>
                <br />
                <span className="bg-gradient-to-r from-[#f0ebe4] via-white to-[#f0ebe4] bg-clip-text text-transparent">
                  para sua obra
                </span>
              </h1>

              {/* Descrição */}
              <p className="mt-4 max-w-xl text-base text-white/50 sm:text-lg">
                Areia, brita, blocos, cimento e outros materiais de alta qualidade 
                com entrega rápida em Maputo e arredores.
              </p>

              {/* Features */}
              <div className="mt-8 flex flex-wrap gap-6">
                {FEATURES.map(({ icon: Icon, label, desc }) => (
                  <div key={label} className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center border border-white/10 bg-white/5">
                      <Icon className="size-4 text-[#d4541a]" />
                    </div>
                    <div>
                      <p className="text-xs font-semibold uppercase tracking-wider text-white">
                        {label}
                      </p>
                      <p className="text-[10px] text-white/40">{desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Stats Card */}
            <div className="border border-white/10 bg-white/[0.02] p-6 backdrop-blur-sm lg:p-8">
              <div className="space-y-6">
                <div className="text-center">
                  <p className="text-4xl font-bold text-white">{catalogProducts.length}</p>
                  <p className="mt-1 text-xs uppercase tracking-wider text-white/40">
                    Produtos disponíveis
                  </p>
                </div>
                
                <div className="h-px bg-white/10" />
                
                <div className="grid grid-cols-2 gap-4">
                  <div className="text-center">
                    <p className="text-2xl font-bold text-white">{categories.length - 1}</p>
                    <p className="mt-1 text-[10px] uppercase tracking-wider text-white/40">
                      Categorias
                    </p>
                  </div>
                  <div className="text-center">
                    <p className="text-2xl font-bold text-[#d4541a]">24h</p>
                    <p className="mt-1 text-[10px] uppercase tracking-wider text-white/40">
                      Entrega
                    </p>
                  </div>
                </div>

                <div className="h-px bg-white/10" />

                <Button 
                  className="w-full bg-[#d4541a] text-white hover:bg-[#e05e1e]"
                  onClick={() => {
                    const productsSection = document.getElementById('products-grid');
                    productsSection?.scrollIntoView({ behavior: 'smooth' });
                  }}
                >
                  Explorar catálogo
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Barra de filtros e ordenação */}
      <section className="sticky top-[72px] z-30 border-b border-white/10 bg-[#0a0a0a]/95 backdrop-blur-sm">
        <div className="mx-auto w-full max-w-7xl px-4 py-3 md:px-6">
          <div className="flex items-center justify-between gap-4">
            {/* Categorias - Desktop */}
            <div className="hidden lg:flex lg:flex-wrap lg:gap-1">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => handleCategoryChange(category)}
                  className={cn(
                    "relative px-4 py-2 text-xs font-medium uppercase tracking-wider transition-all",
                    selectedCategory === category
                      ? "text-white"
                      : "text-white/40 hover:text-white/70"
                  )}
                >
                  {selectedCategory === category && (
                    <div className="absolute bottom-0 left-0 h-0.5 w-full bg-[#d4541a]" />
                  )}
                  {category}
                </button>
              ))}
            </div>

            {/* Botão Filtros Mobile */}
            <Button
              variant="outline"
              size="sm"
              className="lg:hidden border-white/15 bg-white/5 text-white/80"
              onClick={() => setShowMobileFilters(!showMobileFilters)}
            >
              <Filter className="size-3.5 mr-2" />
              Filtros
              {selectedCategory !== "Todos" && (
                <span className="ml-2 flex h-4 w-4 items-center justify-center rounded-full bg-[#d4541a] text-[10px] text-white">
                  1
                </span>
              )}
            </Button>

            {/* Resultados e Ordenação */}
            <div className="flex items-center gap-3">
              <p className="hidden text-xs text-white/30 sm:block">
                {filteredProducts.length} produtos
              </p>
              
              <select
                value={sortBy}
                onChange={(e) => handleSortChange(e.target.value)}
                className="h-8 border border-white/10 bg-white/5 px-2.5 text-xs text-white/70 outline-none focus:border-[#d4541a]/50"
              >
                {SORT_OPTIONS.map((option) => (
                  <option key={option.value} value={option.value} className="bg-[#0a0a0a]">
                    {option.label}
                  </option>
                ))}
              </select>

              <Button
                variant="ghost"
                size="icon-sm"
                className="hidden lg:flex text-white/40 hover:text-white"
                onClick={() => setShowFilters(!showFilters)}
              >
                <SlidersHorizontal className="size-3.5" />
              </Button>
            </div>
          </div>

          {/* Filtros Mobile */}
          {showMobileFilters && (
            <div className="mt-3 border-t border-white/10 pt-3 lg:hidden">
              <div className="flex flex-wrap gap-1.5">
                {categories.map((category) => (
                  <button
                    key={category}
                    onClick={() => {
                      handleCategoryChange(category);
                      setShowMobileFilters(false);
                    }}
                    className={cn(
                      "px-3 py-1.5 text-[10px] font-medium uppercase tracking-wider border transition-all",
                      selectedCategory === category
                        ? "border-[#d4541a] bg-[#d4541a]/20 text-white"
                        : "border-white/10 bg-white/5 text-white/50"
                    )}
                  >
                    {category}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Painel de Filtros Avançados */}
          {showFilters && (
            <div className="mt-3 hidden border-t border-white/10 pt-3 lg:block">
              <div className="flex items-center gap-6">
                <div className="flex items-center gap-4">
                  <p className="text-xs font-medium uppercase tracking-wider text-white/50">
                    Preço (MT)
                  </p>
                  <div className="flex items-center gap-2">
                    <input
                      type="number"
                      value={priceRange[0]}
                      onChange={(e) => setPriceRange([Number(e.target.value), priceRange[1]])}
                      className="h-8 w-20 border border-white/10 bg-white/5 px-2 text-xs text-white/70"
                      placeholder="Min"
                    />
                    <span className="text-white/20">-</span>
                    <input
                      type="number"
                      value={priceRange[1]}
                      onChange={(e) => setPriceRange([priceRange[0], Number(e.target.value)])}
                      className="h-8 w-20 border border-white/10 bg-white/5 px-2 text-xs text-white/70"
                      placeholder="Max"
                    />
                  </div>
                </div>
                <Button
                  size="sm"
                  className="h-8 bg-[#d4541a] px-4 text-xs text-white hover:bg-[#e05e1e]"
                  onClick={() => setShowFilters(false)}
                >
                  Aplicar
                </Button>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Grid de Produtos */}
      <section id="products-grid" className="mx-auto w-full max-w-7xl px-4 py-8 md:px-6 md:py-10">
        {paginatedProducts.length > 0 ? (
          <>
            {/* Grid: 2 colunas mobile, 3 tablet, 4 desktop */}
            <div className="grid grid-cols-2 gap-3 sm:gap-4 md:grid-cols-3 xl:grid-cols-4">
              {paginatedProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>

            {/* Paginação */}
            {totalPages > 1 && (
              <div className="mt-10 flex items-center justify-center gap-1.5">
                <Button
                  variant="outline"
                  size="icon-sm"
                  className="h-8 w-8 border-white/10 bg-white/5 text-white/50 hover:bg-white/10 hover:text-white disabled:opacity-20"
                  onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                  disabled={currentPage === 1}
                >
                  <ChevronLeft className="size-3.5" />
                </Button>

                <div className="flex items-center gap-1">
                  {getPageNumbers().map((page, index) => (
                    <button
                      key={index}
                      onClick={() => typeof page === "number" && setCurrentPage(page)}
                      className={cn(
                        "flex h-8 w-8 items-center justify-center text-xs font-medium transition-all",
                        currentPage === page
                          ? "bg-[#d4541a] text-white"
                          : page === "..."
                          ? "text-white/30"
                          : "text-white/50 hover:bg-white/10 hover:text-white"
                      )}
                      disabled={page === "..."}
                    >
                      {page}
                    </button>
                  ))}
                </div>

                <Button
                  variant="outline"
                  size="icon-sm"
                  className="h-8 w-8 border-white/10 bg-white/5 text-white/50 hover:bg-white/10 hover:text-white disabled:opacity-20"
                  onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                  disabled={currentPage === totalPages}
                >
                  <ChevronRight className="size-3.5" />
                </Button>
              </div>
            )}

            {/* Contador de resultados */}
            <p className="mt-4 text-center text-[10px] uppercase tracking-wider text-white/25">
              Página {currentPage} de {totalPages || 1} • {" "}
              {((currentPage - 1) * ITEMS_PER_PAGE) + 1}-
              {Math.min(currentPage * ITEMS_PER_PAGE, filteredProducts.length)} de {filteredProducts.length} produtos
            </p>
          </>
        ) : (
          <div className="flex flex-col items-center justify-center py-16">
            <div className="mb-4 flex h-16 w-16 items-center justify-center border border-white/10 bg-white/5">
              <X className="size-6 text-white/30" />
            </div>
            <h3 className="text-base font-medium text-white">Nenhum produto encontrado</h3>
            <p className="mt-1 text-xs text-white/40">
              Tente ajustar os filtros selecionados
            </p>
            <Button
              variant="outline"
              size="sm"
              className="mt-5 h-8 border-white/10 bg-white/5 text-xs text-white/70"
              onClick={() => {
                setSelectedCategory("Todos");
                setPriceRange([0, 10000]);
                setSortBy("featured");
              }}
            >
              Limpar filtros
            </Button>
          </div>
        )}
      </section>

      <Footer />
    </main>
  );
}