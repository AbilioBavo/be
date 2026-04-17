import Image from "next/image"
import Link from "next/link"
import {
  ArrowUpRight,
  BadgeCheck,
  Clock3,
  Filter,
  MapPin,
  Repeat,
  Search,
  ShieldCheck,
  Star,
  Truck,
} from "lucide-react"

import { Header } from "@/components/header"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { Footer } from "@/components/footer"
import { ProductCard } from "@/components/product-card"
import { catalogProducts } from "@/lib/mock-commerce"

const heroMetrics = [
  { value: "120+", label: "fornecedores verificados" },
  { value: "24h", label: "janela média de entrega" },
  { value: "98%", label: "pedidos acompanhados ao vivo" },
]

const heroHighlights = [
  "Cotação rápida para obras residenciais e comerciais",
  "Entrega coordenada por bairro, distrito e província",
  "Confirmação imediata via M-Pesa, cartão ou transferência",
]

const platformFeatures = [
  {
    title: "Pesquisa e filtra produtos",
    description:
      "Encontre materiais por categoria, preço, localização e prazo de entrega.",
    icon: Search,
  },
  {
    title: "Faz encomendas com entrega",
    description:
      "Crie pedidos em poucos passos com cálculo de frete por bairro e província.",
    icon: Truck,
  },
  {
    title: "Rastreia o caminhão ao vivo",
    description: "Acompanhe o camião em tempo real com atualização contínua no mapa.",
    icon: MapPin,
  },
  {
    title: "Paga via M-Pesa / cartão",
    description: "Checkout com opções locais e confirmação imediata de pagamento.",
    icon: ShieldCheck,
  },
  {
    title: "Avalia fornecedor e motorista",
    description: "Depois da entrega, classifique o serviço e veja feedback de outros clientes.",
    icon: Star,
  },
  {
    title: "Repete pedidos anteriores",
    description: "Reutilize encomendas frequentes com um clique e acelere as compras da obra.",
    icon: Repeat,
  },
]

export default function HomePage() {
  return (
    <main className="page-shell min-h-svh bg-background">
      <Header />

      <section className="relative isolate overflow-hidden border-b border-white/10">
        {/* Background layers */}
        <div className="absolute inset-0">
          <Image
            src="/hero-canteiro.jpg"
            alt="Canteiro de obras com equipamento de construção"
            width={1920}
            height={1080}
            className="h-full w-full object-cover object-center"
            priority
          />
          {/* Overlay gradients mais suaves e elegantes */}
          <div className="absolute inset-0 bg-gradient-to-br from-[#0a0e17] via-[#0a0e17]/85 to-[#0a0e17]/60" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0a0e17] via-transparent to-transparent" />
          {/* Efeitos de luz sutis */}
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(251,146,60,0.15),transparent_50%),radial-gradient(ellipse_at_bottom_left,rgba(245,158,11,0.08),transparent_60%)]" />
          {/* Textura sutil */}
          <div className="absolute inset-0 bg-[url('/noise.png')] opacity-[0.02] mix-blend-overlay" />
        </div>

        {/* Conteúdo centralizado */}
        <div className="relative mx-auto flex min-h-[calc(100svh-5rem)] w-full max-w-7xl flex-col items-center justify-center px-6 py-12 text-center md:py-10 lg:min-h-[calc(100svh-6rem)] lg:py-10">

          {/* Headline impactante - TAMANHO REDUZIDO */}
          <h1 className="max-w-5xl font-heading text-3xl leading-[1.2] font-bold tracking-tight text-balance text-white sm:text-4xl md:text-5xl lg:text-6xl">
            Materiais para construção
            <br />
            <span className="bg-gradient-to-r from-[#f0ebe4] via-white to-[#f0ebe4] bg-clip-text text-transparent">
              com entrega coordenada
            </span>
            <br />
            <span className="relative inline-block">
              e rastreio em tempo real
              <svg
                className="absolute -bottom-2 left-0 w-full"
                viewBox="0 0 358 12"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M3 9C58 3.5 155.5 1.5 355 3"
                  stroke="#d4541a"
                  strokeWidth="4"
                  strokeLinecap="round"
                />
              </svg>
            </span>
          </h1>

          {/* CTA Buttons */}
          <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
            <Button
              size="lg"
              className="group h-12 min-w-[180px] bg-[#d4541a] px-6 text-sm font-medium text-white shadow-[0_10px_30px_-10px_rgba(212,84,26,0.5)] transition-all hover:bg-[#e05e1e] hover:shadow-[0_15px_40px_-10px_rgba(212,84,26,0.6)]"
              asChild
            >
              <Link href="/produtos">
                Explorar produtos
                <ArrowUpRight className="ml-2 size-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </Link>
            </Button>
            <Button
              variant="outline"
              size="lg"
              className="h-12 min-w-[180px] border-white/20 bg-white/5 px-6 text-sm font-medium text-white backdrop-blur-sm transition-all hover:border-white/35 hover:bg-white/10"
              asChild
            >
              <Link href="/cadastro">
                Criar conta empresarial
              </Link>
            </Button>
          </div>

          {/* Métricas */}
          <div className="mt-12 grid w-full max-w-3xl grid-cols-1 gap-0.5 overflow-hidden rounded-xl border border-white/10 bg-white/5 p-0.5 backdrop-blur-sm sm:grid-cols-3">
            {heroMetrics.map((item, index) => (
              <div
                key={item.label}
                className={cn(
                  "relative bg-black/30 px-4 py-3 backdrop-blur-sm transition-all hover:bg-black/40",
                  "first:rounded-l-xl last:rounded-r-xl",
                  index !== 0 && "border-l border-white/10"
                )}
              >
                <p className="text-2xl font-bold tracking-tight text-white sm:text-3xl">
                  {item.value}
                </p>
                <p className="mt-1 text-xs font-medium uppercase tracking-wider text-white/50">
                  {item.label}
                </p>
              </div>
            ))}
          </div>


        </div>
      </section>

      <section className="mx-auto w-full max-w-7xl px-4 py-16 md:px-6 lg:py-20">
      {/* Header da seção */}
      <div className="mb-10 flex flex-col gap-4 border-b border-white/10 pb-8 md:flex-row md:items-end md:justify-between">
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <div className="h-5 w-1 rounded-full bg-[#d4541a]" />
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-white/50">
              Destaques da semana
            </p>
          </div>
          <h2 className="font-heading text-3xl font-bold tracking-tight text-white md:text-4xl lg:text-5xl">
            Produtos em{" "}
            <span className="relative inline-block">
              destaque
              <svg
                className="absolute -bottom-1 left-0 w-full"
                viewBox="0 0 120 6"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M3 3C20 1.5 80 1 117 3"
                  stroke="#d4541a"
                  strokeWidth="3"
                  strokeLinecap="round"
                />
              </svg>
            </span>
          </h2>
        </div>

        <Button
          variant="outline"
          className="group h-11 border-white/15 bg-white/5 px-5 text-sm text-white/80 backdrop-blur-sm transition-all hover:border-[#d4541a]/50 hover:bg-white/10 hover:text-white"
          asChild
        >
          <Link href="/produtos">
            Ver catálogo completo
            <ArrowUpRight className="ml-2 size-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </Link>
        </Button>
      </div>

      {/* Grid de produtos */}
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 ">
        {catalogProducts.slice(0, 3).map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </section>


      <Footer />
    </main>
  )
}
