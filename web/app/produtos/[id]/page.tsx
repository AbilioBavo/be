"use client";

import Image from "next/image";
import Link from "next/link";
import { notFound, useParams } from "next/navigation";
import { useState } from "react";
import {
  Star,
  Truck,
  Shield,
  RotateCcw,
  ChevronRight,
  Minus,
  Plus,
  Heart,
  Share2,
  Check,
  AlertCircle,
  Home,
  Package,
} from "lucide-react";

import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { ProductCard } from "@/components/product-card";
import { Button } from "@/components/ui/button";
import { useCart } from "@/hooks/use-cart";
import { catalogProducts, formatMT, getProductById } from "@/lib/mock-commerce";
import { cn } from "@/lib/utils";

// Breadcrumbs - Reconhecimento em vez de recordação
const Breadcrumbs = ({ items }: { items: { label: string; href?: string }[] }) => (
  <nav className="flex items-center gap-1.5 text-xs">
    {items.map((item, index) => (
      <div key={index} className="flex items-center gap-1.5">
        {index > 0 && <ChevronRight className="size-3 text-white/30" />}
        {item.href ? (
          <Link
            href={item.href}
            className="text-white/50 transition-colors hover:text-white"
          >
            {item.label}
          </Link>
        ) : (
          <span className="text-white/80">{item.label}</span>
        )}
      </div>
    ))}
  </nav>
);

export default function ProductPage() {
  const params = useParams<{ id: string }>();
  const product = getProductById(params.id);
  const { addItem } = useCart();
  
  const [quantity, setQuantity] = useState(1);
  const [selectedImage, setSelectedImage] = useState(0);
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [activeTab, setActiveTab] = useState<"details" | "delivery" | "reviews">("details");

  if (!product) {
    notFound();
  }

  const related = catalogProducts
    .filter((item) => item.id !== product.id && item.category === product.category)
    .slice(0, 4);

  const handleAddToCart = () => {
    for (let i = 0; i < quantity; i++) {
      addItem({
        id: product.id,
        name: product.name,
        imageSrc: product.image,
        price: product.price,
        unitLabel: product.unitLabel,
      });
    }
  };

  const breadcrumbItems = [
    { label: "Início", href: "/", icon: Home },
    { label: "Produtos", href: "/produtos", icon: Package },
    { label: product.category, href: `/produtos?categoria=${product.category}` },
    { label: product.name },
  ];

  return (
    <main className="min-h-svh bg-[#0a0a0a] text-white">
      <Header />

      {/* Breadcrumbs - Visível e reconhecível */}
      <div className="border-b border-white/10 bg-[#0d1117]/50">
        <div className="mx-auto w-full max-w-7xl px-4 py-3 md:px-6">
          <Breadcrumbs items={breadcrumbItems} />
        </div>
      </div>

      {/* Produto Principal */}
      <section className="mx-auto w-full max-w-7xl px-4 py-8 md:px-6 md:py-10">
        <div className="grid gap-8 lg:grid-cols-[1fr_1fr] lg:gap-12">
          
          {/* Galeria de Imagens */}
          <div className="space-y-4">
            {/* Imagem Principal */}
            <div className="relative aspect-square overflow-hidden border border-white/10 bg-[#0d1117]">
              <Image
                src={product.gallery?.[selectedImage] || product.image}
                alt={product.name}
                fill
                className="object-cover"
                priority
              />
              
              {/* Badges */}
              <div className="absolute top-3 left-3 flex gap-2">
                {product.rating >= 4.5 && (
                  <span className="bg-[#d4541a] px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-white">
                    Mais vendido
                  </span>
                )}
              </div>

              {/* Ações */}
              <div className="absolute top-3 right-3 flex gap-2">
                <button
                  onClick={() => setIsWishlisted(!isWishlisted)}
                  className={cn(
                    "flex h-9 w-9 items-center justify-center border backdrop-blur-sm transition-all",
                    isWishlisted
                      ? "border-[#d4541a] bg-[#d4541a]/20 text-[#d4541a]"
                      : "border-white/20 bg-black/50 text-white/70 hover:bg-black/70"
                  )}
                >
                  <Heart className={cn("size-4", isWishlisted && "fill-current")} />
                </button>
                <button className="flex h-9 w-9 items-center justify-center border border-white/20 bg-black/50 text-white/70 backdrop-blur-sm transition-all hover:bg-black/70">
                  <Share2 className="size-4" />
                </button>
              </div>
            </div>

            {/* Thumbnails */}
            {product.gallery && product.gallery.length > 0 && (
              <div className="grid grid-cols-4 gap-2">
                {product.gallery.map((image, index) => (
                  <button
                    key={image}
                    onClick={() => setSelectedImage(index)}
                    className={cn(
                      "relative aspect-square overflow-hidden border transition-all",
                      selectedImage === index
                        ? "border-[#d4541a]"
                        : "border-white/10 opacity-60 hover:opacity-100"
                    )}
                  >
                    <Image
                      src={image}
                      alt={`${product.name} - ${index + 1}`}
                      fill
                      className="object-cover"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Informações do Produto */}
          <div className="space-y-6">
            {/* Cabeçalho */}
            <div>
              <div className="mb-2 flex items-center gap-2">
                <div className="h-4 w-0.5 bg-[#d4541a]" />
                <span className="text-xs font-medium uppercase tracking-wider text-white/50">
                  {product.category}
                </span>
              </div>
              
              <h1 className="text-3xl font-bold tracking-tight text-white lg:text-4xl">
                {product.name}
              </h1>

              {/* Avaliação rápida */}
              <div className="mt-3 flex items-center gap-4">
                <div className="flex items-center gap-1.5">
                  <div className="flex items-center gap-0.5">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={cn(
                          "size-4",
                          i < Math.floor(product.rating)
                            ? "fill-[#d4541a] text-[#d4541a]"
                            : "fill-white/20 text-white/20"
                        )}
                      />
                    ))}
                  </div>
                  <span className="text-sm font-medium text-white">
                    {product.rating}
                  </span>
                </div>
                <span className="text-sm text-white/40">
                  {product.reviews} avaliações
                </span>
                <span className="text-xs text-green-400 flex items-center gap-1">
                  <Check className="size-3" />
                  {product.stock}
                </span>
              </div>
            </div>

            {/* Preço */}
            <div className="border-y border-white/10 py-5">
              <div className="flex items-baseline gap-3">
                <span className="text-4xl font-bold text-white">
                  {formatMT(product.price)}
                </span>
                <span className="text-sm text-white/40">
                  / {product.unitLabel}
                </span>
              </div>
              <p className="mt-2 text-xs text-white/40">
                Preço com IVA incluído
              </p>
            </div>

            {/* Descrição curta */}
            <p className="text-white/60 leading-relaxed">
              {product.description}
            </p>

            {/* Seletor de Quantidade */}
            <div className="flex items-center gap-4">
              <span className="text-xs font-medium uppercase tracking-wider text-white/50">
                Quantidade
              </span>
              <div className="flex items-center border border-white/15">
                <button
                  onClick={() => setQuantity(q => Math.max(1, q - 1))}
                  className="flex h-10 w-10 items-center justify-center border-r border-white/15 text-white/60 transition-colors hover:bg-white/5 hover:text-white"
                >
                  <Minus className="size-3.5" />
                </button>
                <span className="flex h-10 w-12 items-center justify-center text-sm font-medium text-white">
                  {quantity}
                </span>
                <button
                  onClick={() => setQuantity(q => q + 1)}
                  className="flex h-10 w-10 items-center justify-center border-l border-white/15 text-white/60 transition-colors hover:bg-white/5 hover:text-white"
                >
                  <Plus className="size-3.5" />
                </button>
              </div>
              <span className="text-xs text-white/40">
                {product.unitLabel}(s)
              </span>
            </div>

            {/* Botões de Ação */}
            <div className="flex flex-col gap-3 sm:flex-row">
              <Button
                onClick={handleAddToCart}
                className="h-12 flex-1 bg-[#d4541a] text-sm font-semibold uppercase tracking-wider text-white hover:bg-[#e05e1e]"
              >
                Adicionar ao carrinho
              </Button>
              <Link href="/checkout" className="flex-1">
                <Button
                  variant="outline"
                  className="h-12 w-full border-white/15 bg-transparent text-sm font-semibold uppercase tracking-wider text-white hover:bg-white/5"
                >
                  Comprar agora
                </Button>
              </Link>
            </div>

            {/* Garantias */}
            <div className="grid grid-cols-3 gap-2 pt-4">
              <div className="flex flex-col items-center gap-1 text-center">
                <Truck className="size-4 text-[#d4541a]" />
                <span className="text-[10px] font-medium uppercase tracking-wider text-white/60">
                  Entrega 24h
                </span>
              </div>
              <div className="flex flex-col items-center gap-1 text-center">
                <Shield className="size-4 text-[#d4541a]" />
                <span className="text-[10px] font-medium uppercase tracking-wider text-white/60">
                  Garantia
                </span>
              </div>
              <div className="flex flex-col items-center gap-1 text-center">
                <RotateCcw className="size-4 text-[#d4541a]" />
                <span className="text-[10px] font-medium uppercase tracking-wider text-white/60">
                  Devolução
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Tabs de Informações */}
        <div className="mt-12 border-t border-white/10 pt-8">
          <div className="flex gap-6 border-b border-white/10">
            {(["details", "delivery", "reviews"] as const).map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={cn(
                  "relative pb-3 text-xs font-semibold uppercase tracking-wider transition-colors",
                  activeTab === tab
                    ? "text-white"
                    : "text-white/40 hover:text-white/70"
                )}
              >
                {tab === "details" && "Detalhes"}
                {tab === "delivery" && "Entrega"}
                {tab === "reviews" && "Avaliações"}
                {activeTab === tab && (
                  <div className="absolute bottom-0 left-0 h-0.5 w-full bg-[#d4541a]" />
                )}
              </button>
            ))}
          </div>

          <div className="py-6">
            {activeTab === "details" && (
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-white">Especificações</h3>
                <div className="grid gap-3 sm:grid-cols-2">
                  <div className="flex justify-between border-b border-white/10 py-2">
                    <span className="text-sm text-white/50">Categoria</span>
                    <span className="text-sm text-white">{product.category}</span>
                  </div>
                  <div className="flex justify-between border-b border-white/10 py-2">
                    <span className="text-sm text-white/50">Unidade</span>
                    <span className="text-sm text-white">{product.unitLabel}</span>
                  </div>
                  <div className="flex justify-between border-b border-white/10 py-2">
                    <span className="text-sm text-white/50">Disponibilidade</span>
                    <span className="text-sm text-green-400">{product.stock}</span>
                  </div>
                </div>
                <p className="text-white/60">{product.longDescription || product.description}</p>
              </div>
            )}

            {activeTab === "delivery" && (
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-white">Informações de Entrega</h3>
                <div className="space-y-3">
                  <div className="flex items-start gap-3">
                    <Truck className="size-5 text-[#d4541a] mt-0.5" />
                    <div>
                      <p className="font-medium text-white">Entrega Expressa</p>
                      <p className="text-sm text-white/50">
                        Entrega em até 24h para Maputo e Matola. Demais regiões em até 72h.
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <AlertCircle className="size-5 text-[#d4541a] mt-0.5" />
                    <div>
                      <p className="font-medium text-white">Frete calculado no checkout</p>
                      <p className="text-sm text-white/50">
                        O valor do frete varia conforme a distância e quantidade de produtos.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === "reviews" && (
              <div className="space-y-4">
                <div className="flex items-center gap-4">
                  <div className="text-center">
                    <p className="text-4xl font-bold text-white">{product.rating}</p>
                    <div className="flex items-center gap-0.5 mt-1">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={cn(
                            "size-3",
                            i < Math.floor(product.rating)
                              ? "fill-[#d4541a] text-[#d4541a]"
                              : "fill-white/20 text-white/20"
                          )}
                        />
                      ))}
                    </div>
                    <p className="text-xs text-white/40 mt-1">{product.reviews} avaliações</p>
                  </div>
                  <div className="flex-1">
                    {[5, 4, 3, 2, 1].map((star) => (
                      <div key={star} className="flex items-center gap-2">
                        <span className="text-xs text-white/50 w-3">{star}</span>
                        <div className="h-1.5 flex-1 bg-white/10">
                          <div
                            className="h-full bg-[#d4541a]"
                            style={{
                              width: star === 5 ? "70%" : star === 4 ? "20%" : star === 3 ? "7%" : "3%",
                            }}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Produtos Relacionados */}
      {related.length > 0 && (
        <section className="mx-auto w-full max-w-7xl px-4 pb-16 md:px-6">
          <div className="mb-6 flex items-center justify-between border-b border-white/10 pb-4">
            <div className="flex items-center gap-3">
              <div className="h-5 w-0.5 bg-[#d4541a]" />
              <h2 className="text-xl font-semibold text-white">Produtos relacionados</h2>
            </div>
            <Link
              href="/produtos"
              className="text-xs font-medium uppercase tracking-wider text-white/50 transition-colors hover:text-white"
            >
              Ver todos
              <ChevronRight className="ml-1 inline size-3" />
            </Link>
          </div>
          
          <div className="grid grid-cols-2 gap-3 sm:gap-4 md:grid-cols-4">
            {related.map((productItem) => (
              <ProductCard key={productItem.id} product={productItem} />
            ))}
          </div>
        </section>
      )}

      <Footer />
    </main>
  );
}