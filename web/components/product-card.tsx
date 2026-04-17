"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, Box, Star, TrendingUp, Truck } from "lucide-react";
import { useState } from "react";

import type { CatalogProduct } from "@/lib/types";
import { formatMT } from "@/lib/mock-commerce";
import { useCart } from "@/hooks/use-cart";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export function ProductCard({ product }: { product: CatalogProduct }) {
  const { addItem } = useCart();
  const [isHovered, setIsHovered] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addItem({
      id: product.id,
      name: product.name,
      imageSrc: product.image,
      price: product.price,
      unitLabel: product.unitLabel,
    });
  };

  const discount = product.rating >= 4.5 ? 15 : product.rating >= 4.0 ? 10 : 0;
  const originalPrice = discount > 0 ? product.price * (1 + discount / 100) : null;

  return (
    <article
      className="group relative bg-[#0d1117] border border-white/8 transition-all duration-500 hover:border-[#d4541a]/40"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Linhas de destaque */}
      <div className="absolute top-0 left-0 h-0.5 w-0 bg-gradient-to-r from-[#d4541a] to-[#f07a3e] transition-all duration-500 group-hover:w-full" />
      <div className="absolute top-0 left-0 h-0 w-0.5 bg-gradient-to-b from-[#d4541a] to-[#f07a3e] transition-all duration-500 group-hover:h-full" />

      <Link href={`/produtos/${product.id}`} className="block">
        {/* Container da imagem com overlay de conteúdo */}
        <div className="relative aspect-[4/3] overflow-hidden bg-[#0a0e14]">
          {/* Skeleton loader */}
          {!imageLoaded && (
            <div className="absolute inset-0 animate-pulse bg-white/5">
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent animate-shimmer" />
            </div>
          )}
          
          <Image
            src={product.image}
            alt={product.name}
            fill
            className={cn(
              "object-cover transition-all duration-700",
              isHovered ? "scale-110" : "scale-100",
              imageLoaded ? "opacity-100" : "opacity-0"
            )}
            onLoadingComplete={() => setImageLoaded(true)}
          />
          
          {/* Gradiente para legibilidade do texto sobreposto */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#0d1117] via-[#0d1117]/60 to-transparent" />
          
          {/* Overlay hover com padrão de grade */}
          <div 
            className={cn(
              "absolute inset-0 bg-[#d4541a]/10 opacity-0 transition-opacity duration-500",
              isHovered && "opacity-100"
            )}
            style={{
              backgroundImage: `
                linear-gradient(rgba(212, 84, 26, 0.1) 1px, transparent 1px),
                linear-gradient(90deg, rgba(212, 84, 26, 0.1) 1px, transparent 1px)
              `,
              backgroundSize: '20px 20px',
            }}
          />

          {/* Badges superiores */}
          <div className="absolute top-3 left-3 flex gap-2">
            {discount > 0 && (
              <div className="relative">
                <div className="absolute inset-0 bg-[#d4541a] blur-sm opacity-50" />
                <div className="relative bg-[#d4541a] px-2.5 py-1">
                  <p className="text-xs font-bold uppercase tracking-wider text-white">
                    -{discount}%
                  </p>
                </div>
              </div>
            )}
          </div>

          <div className="absolute top-3 right-3 flex gap-2">
            {product.rating >= 4.5 && (
              <div className="flex items-center gap-1 bg-black/80 backdrop-blur-sm border border-[#d4541a]/30 px-2.5 py-1">
                <Star className="size-3 fill-[#d4541a] text-[#d4541a]" />
                <span className="text-[10px] font-bold uppercase tracking-wider text-[#d4541a]">
                  Premium
                </span>
              </div>
            )}
            {product.stock === "Em stock" && (
              <div className="flex items-center gap-1.5 bg-black/80 backdrop-blur-sm border border-white/10 px-2.5 py-1">
                <Truck className="size-3 text-green-400" />
                <span className="text-[10px] font-medium uppercase tracking-wider text-white/80">
                  24h
                </span>
              </div>
            )}
          </div>

          {/* Conteúdo sobreposto na imagem */}
          <div className="absolute bottom-0 left-0 right-0 p-4">
            {/* Categoria */}
            <div className="flex items-center gap-2 mb-2">
              <div className="w-1 h-3 bg-[#d4541a]" />
              <span className="text-[10px] font-medium uppercase tracking-[0.15em] text-white/60">
                {product.category}
              </span>
              <span className="text-[10px] text-white/45">Fornecedor: {product.supplierName}</span>
            </div>
            
            {/* Nome do produto */}
            <h3 className="text-lg font-bold leading-tight text-white transition-colors duration-300 group-hover:text-[#d4541a]">
              {product.name}
            </h3>

            {/* Avaliação compacta */}
            <div className="flex items-center gap-2 mt-1.5">
              <div className="flex items-center gap-0.5">
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
              <span className="text-xs font-medium text-white/80">
                {product.rating}
              </span>
              <span className="text-[10px] text-white/40">
                ({product.reviews})
              </span>
            </div>
          </div>

          {/* Botão Quick View (hover) */}
          <div 
            className={cn(
              "absolute bottom-4 right-4 transition-all duration-300",
              isHovered ? "translate-x-0 opacity-100" : "translate-x-full opacity-0"
            )}
          >
            <div className="flex items-center gap-1.5 bg-black/90 backdrop-blur-sm border border-white/10 px-3 py-1.5">
              <Box className="size-3.5 text-white/70" />
              <span className="text-[10px] font-medium uppercase tracking-wider text-white/90">
                Detalhes
              </span>
              <ArrowUpRight className="size-3 text-[#d4541a]" />
            </div>
          </div>
        </div>

        {/* Conteúdo inferior reduzido */}
        <div className="p-4 space-y-3">
          {/* Preço e unidade */}
          <div className="flex items-end justify-between">
            <div className="space-y-0.5">
              {originalPrice && (
                <span className="text-xs text-white/30 line-through block">
                  {formatMT(originalPrice)}
                </span>
              )}
              <div className="flex items-baseline gap-1">
                <span className="text-xl font-bold text-white">
                  {formatMT(product.price).replace('MT', '').trim()}
                </span>
                <span className="text-xs text-white/40">MT</span>
              </div>
            </div>
            <span className="text-xs text-white/40">/ {product.unitLabel}</span>
          </div>
        </div>
      </Link>

      {/* Botão de ação */}
      <div className="border-t border-white/8 p-3">
        <Button
          onClick={handleAddToCart}
          className="group/btn relative w-full h-11 bg-transparent border border-white/15 text-xs font-semibold uppercase tracking-wider text-white overflow-hidden transition-all duration-500 hover:border-[#d4541a]"
        >
          <div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-[#d4541a] to-[#e86a2e] transition-transform duration-500 group-hover/btn:translate-x-0" />
          <span className="relative z-10 flex items-center justify-center gap-2">
            Adicionar
            <TrendingUp className="size-3.5 transition-all duration-300 group-hover/btn:translate-x-1 group-hover/btn:-translate-y-0.5" />
          </span>
        </Button>
      </div>
    </article>
  );
}