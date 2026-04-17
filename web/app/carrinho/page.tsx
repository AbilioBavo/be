"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  Minus,
  Plus,
  Trash2,
  Truck,
  Shield,
  ArrowRight,
  ChevronRight,
  ShoppingBag,
  AlertCircle,
  X,
} from "lucide-react";

import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { Button } from "@/components/ui/button";
import { useCart } from "@/hooks/use-cart";
import { formatMT } from "@/lib/mock-commerce";
import { cn } from "@/lib/utils";

// Breadcrumbs
const Breadcrumbs = () => (
  <nav className="flex items-center gap-1.5 text-xs">
    <Link href="/" className="text-white/50 transition-colors hover:text-white">
      Início
    </Link>
    <ChevronRight className="size-3 text-white/30" />
    <Link href="/produtos" className="text-white/50 transition-colors hover:text-white">
      Produtos
    </Link>
    <ChevronRight className="size-3 text-white/30" />
    <span className="text-white/80">Carrinho</span>
  </nav>
);

export default function CartPage() {
  const router = useRouter();
  const { items, subtotal, updateQuantity, removeItem, clearCart } = useCart();
  
  const shipping = items.length > 0 ? 250 : 0;
  const TAX_RATE = 0.17;
  const tax = subtotal * TAX_RATE;
  const total = subtotal + shipping;
  
  const freeShippingThreshold = 5000;
  const remainingForFreeShipping = Math.max(0, freeShippingThreshold - subtotal);
  const freeShippingProgress = Math.min((subtotal / freeShippingThreshold) * 100, 100);

  const handleQuantityChange = (id: string, newQuantity: number) => {
    if (newQuantity >= 1) {
      updateQuantity(id, newQuantity);
    }
  };

  if (items.length === 0) {
    return (
      <main className="min-h-svh bg-[#0a0a0a] text-white">
        <Header />
        
        <div className="border-b border-white/10 bg-[#0d1117]/50">
          <div className="mx-auto w-full max-w-7xl px-4 py-3 md:px-6">
            <Breadcrumbs />
          </div>
        </div>

        <section className="mx-auto w-full max-w-7xl px-4 py-16 md:px-6">
          <div className="flex flex-col items-center justify-center text-center">
            <div className="mb-6 flex h-24 w-24 items-center justify-center border border-white/10 bg-white/5">
              <ShoppingBag className="size-10 text-white/30" />
            </div>
            
            <h1 className="text-3xl font-bold text-white">Seu carrinho está vazio</h1>
            <p className="mt-2 text-white/50">
              Parece que você ainda não adicionou produtos ao seu carrinho.
            </p>
            
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Button
                onClick={() => router.push("/produtos")}
                className="h-12 bg-[#d4541a] px-8 text-sm font-semibold uppercase tracking-wider text-white hover:bg-[#e05e1e]"
              >
                Explorar produtos
                <ArrowRight className="ml-2 size-4" />
              </Button>
              <Button
                variant="outline"
                onClick={() => router.back()}
                className="h-12 border-white/15 bg-transparent px-8 text-sm font-semibold uppercase tracking-wider text-white hover:bg-white/5"
              >
                Voltar
              </Button>
            </div>

            {/* Sugestões rápidas */}
            <div className="mt-12 w-full max-w-2xl border-t border-white/10 pt-8">
              <p className="text-sm font-medium uppercase tracking-wider text-white/40">
                Categorias populares
              </p>
              <div className="mt-4 flex flex-wrap justify-center gap-2">
                {["Cimento", "Areia", "Brita", "Blocos", "Ferramentas"].map((cat) => (
                  <Link
                    key={cat}
                    href={`/produtos?categoria=${cat}`}
                    className="border border-white/15 bg-white/5 px-4 py-2 text-xs uppercase tracking-wider text-white/70 transition-all hover:border-[#d4541a]/50 hover:bg-white/10 hover:text-white"
                  >
                    {cat}
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </section>

        <Footer />
      </main>
    );
  }

  return (
    <main className="min-h-svh bg-[#0a0a0a] text-white">
      <Header />

      {/* Breadcrumbs */}
      <div className="border-b border-white/10 bg-[#0d1117]/50">
        <div className="mx-auto w-full max-w-7xl px-4 py-3 md:px-6">
          <Breadcrumbs />
        </div>
      </div>

      <section className="mx-auto w-full max-w-7xl px-4 py-8 md:px-6 md:py-10">
        {/* Cabeçalho */}
        <div className="mb-6 flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight text-white">
              Meu carrinho
            </h1>
            <p className="mt-1 text-sm text-white/50">
              {items.length} {items.length === 1 ? "item" : "itens"}
            </p>
          </div>
          
          <button
            onClick={clearCart}
            className="flex items-center gap-1.5 text-xs font-medium uppercase tracking-wider text-white/40 transition-colors hover:text-red-400"
          >
            <Trash2 className="size-3.5" />
            Limpar carrinho
          </button>
        </div>

        {/* Barra de frete grátis */}
        {remainingForFreeShipping > 0 ? (
          <div className="mb-6 border border-white/10 bg-white/5 p-4">
            <div className="flex items-center gap-3">
              <Truck className="size-5 text-[#d4541a]" />
              <div className="flex-1">
                <p className="text-sm font-medium text-white">
                  Faltam {formatMT(remainingForFreeShipping)} para frete grátis!
                </p>
                <div className="mt-2 h-1.5 w-full bg-white/10">
                  <div
                    className="h-full bg-gradient-to-r from-[#d4541a] to-[#f07a3e] transition-all duration-500"
                    style={{ width: `${freeShippingProgress}%` }}
                  />
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="mb-6 border border-green-500/30 bg-green-500/10 p-4">
            <div className="flex items-center gap-3">
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-green-500/20">
                <Truck className="size-4 text-green-400" />
              </div>
              <div>
                <p className="font-medium text-green-400">Frete grátis qualificado!</p>
                <p className="text-xs text-green-400/70">Sua entrega será gratuita.</p>
              </div>
            </div>
          </div>
        )}

        <div className="grid gap-8 lg:grid-cols-[1.5fr_1fr]">
          {/* Lista de itens */}
          <div className="space-y-3">
            {items.map((item) => (
              <article
                key={item.id}
                className="group relative flex gap-4 border border-white/10 bg-[#0d1117] p-4 transition-all hover:border-white/20"
              >
                {/* Imagem */}
                <Link href={`/produtos/${item.id}`} className="relative h-28 w-28 shrink-0 overflow-hidden bg-[#0a0e14]">
                  <Image
                    src={item.imageSrc}
                    alt={item.name}
                    fill
                    className="object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                </Link>

                {/* Informações */}
                <div className="flex flex-1 flex-col justify-between">
                  <div className="flex items-start justify-between">
                    <div>
                      <Link
                        href={`/produtos/${item.id}`}
                        className="font-semibold text-white transition-colors hover:text-[#d4541a]"
                      >
                        {item.name}
                      </Link>
                      <p className="mt-0.5 text-xs text-white/40">
                        {item.unitLabel}
                      </p>
                    </div>
                    
                    <button
                      onClick={() => removeItem(item.id)}
                      className="text-white/30 transition-colors hover:text-red-400"
                      aria-label="Remover item"
                    >
                      <X className="size-4" />
                    </button>
                  </div>

                  <div className="flex items-end justify-between">
                    <div className="flex items-center border border-white/15">
                      <button
                        onClick={() => handleQuantityChange(item.id, item.quantity - 1)}
                        className="flex h-8 w-8 items-center justify-center border-r border-white/15 text-white/60 transition-colors hover:bg-white/5 hover:text-white disabled:opacity-30"
                        disabled={item.quantity <= 1}
                      >
                        <Minus className="size-3" />
                      </button>
                      <span className="flex h-8 w-10 items-center justify-center text-sm font-medium text-white">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => handleQuantityChange(item.id, item.quantity + 1)}
                        className="flex h-8 w-8 items-center justify-center border-l border-white/15 text-white/60 transition-colors hover:bg-white/5 hover:text-white"
                      >
                        <Plus className="size-3" />
                      </button>
                    </div>

                    <div className="text-right">
                      <p className="text-lg font-bold text-white">
                        {formatMT(item.price * item.quantity)}
                      </p>
                      {item.quantity > 1 && (
                        <p className="text-xs text-white/40">
                          {formatMT(item.price)} / un.
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              </article>
            ))}
          </div>

          {/* Resumo */}
          <aside className="h-fit space-y-4">
            <div className="border border-white/10 bg-[#0d1117] p-6">
              <h2 className="mb-4 text-lg font-semibold text-white">Resumo do pedido</h2>
              
              <div className="space-y-3">
                <div className="flex justify-between text-sm">
                  <span className="text-white/60">Subtotal ({items.length} itens)</span>
                  <span className="text-white">{formatMT(subtotal)}</span>
                </div>
                
                <div className="flex justify-between text-sm">
                  <span className="text-white/60">Frete</span>
                  {shipping === 0 ? (
                    <span className="text-green-400">Grátis</span>
                  ) : (
                    <span className="text-white">{formatMT(shipping)}</span>
                  )}
                </div>
                
                <div className="flex justify-between text-sm">
                  <span className="text-white/60">IVA (17%)</span>
                  <span className="text-white/40">{formatMT(tax)}</span>
                </div>
                
                <div className="border-t border-white/10 pt-3">
                  <div className="flex justify-between">
                    <span className="font-semibold text-white">Total</span>
                    <span className="text-xl font-bold text-[#d4541a]">
                      {formatMT(total)}
                    </span>
                  </div>
                  <p className="mt-1 text-right text-[10px] text-white/30">
                    IVA incluído
                  </p>
                </div>
              </div>

              <Link href="/checkout" className="mt-6 block">
                <Button className="group w-full h-12 bg-[#d4541a] text-sm font-semibold uppercase tracking-wider text-white hover:bg-[#e05e1e]">
                  Finalizar compra
                  <ArrowRight className="ml-2 size-4 transition-transform group-hover:translate-x-1" />
                </Button>
              </Link>

              <button
                onClick={() => router.push("/produtos")}
                className="mt-3 flex w-full items-center justify-center gap-1 text-xs text-white/50 transition-colors hover:text-white"
              >
                Continuar comprando
                <ChevronRight className="size-3" />
              </button>
            </div>

            {/* Garantias */}
            <div className="border border-white/10 bg-[#0d1117] p-5">
              <div className="space-y-3">
                <div className="flex items-start gap-3">
                  <Truck className="size-4 text-[#d4541a] mt-0.5 shrink-0" />
                  <div>
                    <p className="text-xs font-medium text-white">Entrega rápida</p>
                    <p className="text-[10px] text-white/40">24h para Maputo e Matola</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Shield className="size-4 text-[#d4541a] mt-0.5 shrink-0" />
                  <div>
                    <p className="text-xs font-medium text-white">Compra segura</p>
                    <p className="text-[10px] text-white/40">Pagamento 100% seguro</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <AlertCircle className="size-4 text-[#d4541a] mt-0.5 shrink-0" />
                  <div>
                    <p className="text-xs font-medium text-white">Suporte</p>
                    <p className="text-[10px] text-white/40">+258 84 123 4567</p>
                  </div>
                </div>
              </div>
            </div>
          </aside>
        </div>
      </section>

      <Footer />
    </main>
  );
}