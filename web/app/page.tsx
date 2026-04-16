import Image from "next/image"
import Link from "next/link"
import {
  ArrowUpRight,
  Filter,
  MapPin,
  Repeat,
  Search,
  ShieldCheck,
  Star,
  Truck,
} from "lucide-react"

import { MarketplaceHeader } from "@/components/marketplace-header"
import { Button } from "@/components/ui/button"

const featuredProducts = [
  {
    id: "1",
    name: "Areia média lavada",
    location: "Maputo",
    unit: "m³",
    price: "2 350 MT",
    delivery: "Entrega em 24h",
    imageSrc: "/orange_sand.jpg",
    imageAlt: "Areia lavada para construção",
  },
  {
    id: "2",
    name: "Pedra brita 3/4",
    location: "Matola",
    unit: "m³",
    price: "2 900 MT",
    delivery: "Entrega em 24h",
    imageSrc: "/stones.jpg",
    imageAlt: "Pedra britada para obra",
  },
  {
    id: "3",
    name: "Bloco de cimento 15",
    location: "Boane",
    unit: "Unidade",
    price: "45 MT",
    delivery: "Entrega em 48h",
    imageSrc: "/white_sand.jpg",
    imageAlt: "Materiais para construção",
  },
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
    <main className="min-h-svh bg-background">
      <MarketplaceHeader />

      <section className="relative isolate overflow-hidden border-b border-border">
        <Image
          src="/hero-canteiro.jpg"
          alt="Canteiro de obras com equipamento de construção"
          width={1920}
          height={1080}
          className="h-[72svh] w-full object-cover"
          priority
        />
        <div className="absolute inset-0 bg-black/55" />

        <div className="absolute inset-0 flex items-center justify-center px-4">
          <div className="mx-auto max-w-3xl text-center text-white">
            <div className="mx-auto mb-4 h-1 w-12 bg-primary" />
            <h1 className="text-4xl font-bold tracking-tight md:text-6xl">Build Easy Moçambique</h1>
            <p className="mx-auto mt-4 max-w-2xl text-sm leading-relaxed text-white/90 md:text-xl">
              Compre areia, brita e blocos com entrega para todo o país e acompanhe cada encomenda do pedido até a descarga.
            </p>
            <div className="mt-8 flex flex-wrap items-center justify-center gap-2">
              <Button size="lg" asChild>
                <Link href="/produtos">Ver produtos</Link>
              </Button>
              <Button variant="outline" size="lg" className="border-white/60 bg-black/20 text-white hover:bg-black/35" asChild>
                <Link href="/cadastro">Criar conta</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto w-full max-w-7xl border-x border-border px-4 py-10 md:px-6">
        <div className="border border-border bg-card">
          <div className="border-b border-border px-5 py-5 md:px-7 md:py-6">
            <p className="inline-flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.16em] text-muted-foreground">
              <span className="size-2 bg-primary" aria-hidden />
              Funcionalidades da plataforma
            </p>
            <h2 className="mt-2 text-2xl font-semibold tracking-tight md:text-3xl">Tudo para gerir compra, entrega e rastreio</h2>
          </div>
          <div className="grid gap-px bg-border md:grid-cols-2 xl:grid-cols-3">
            {platformFeatures.map((feature) => (
              <article key={feature.title} className="border border-border bg-background p-5 md:p-6">
                <feature.icon className="size-5 text-primary" />
                <h3 className="mt-3 text-base font-semibold">{feature.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{feature.description}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto w-full max-w-7xl border-x border-b border-border px-4 py-10 md:px-6">
        <div className="border border-border bg-card">
          <div className="flex flex-col gap-4 border-b border-border px-5 py-5 md:flex-row md:items-end md:justify-between md:px-7 md:py-6">
            <div>
              <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-muted-foreground">Mercado em movimento</p>
              <h2 className="mt-2 text-2xl font-semibold tracking-tight md:text-3xl">Produtos em destaque</h2>
            </div>
            <Button variant="outline" asChild>
              <Link href="/produtos">
                Ver catálogo completo
                <ArrowUpRight className="size-4" />
              </Link>
            </Button>
          </div>

          <div className="grid gap-px bg-border md:grid-cols-3">
            {featuredProducts.map((product) => (
              <article key={product.id} className="border border-border bg-background">
                <div className="relative h-48 border-b border-border bg-muted">
                  <Image src={product.imageSrc} alt={product.imageAlt} fill className="object-cover" />
                </div>
                <div className="space-y-2 p-5">
                  <h3 className="text-base font-semibold">{product.name}</h3>
                  <p className="text-sm text-muted-foreground">{product.location} • Preço por {product.unit}</p>
                  <p className="text-lg font-semibold text-primary">{product.price}</p>
                  <p className="text-sm text-muted-foreground">{product.delivery}</p>
                  <Button className="w-full" asChild>
                    <Link href="/produtos">Comprar agora</Link>
                  </Button>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto w-full max-w-7xl border-x border-b border-border px-4 py-10 md:px-6">
        <div className="border border-border bg-card">
          <div className="border-b border-border px-5 py-5 md:px-7 md:py-6">
            <h2 className="text-2xl font-semibold tracking-tight md:text-3xl">Rastreio ao vivo</h2>
            <p className="mt-2 text-sm text-muted-foreground">
              O cliente acompanha a rota em tempo real até ao ponto de entrega.
            </p>
          </div>
          <div className="grid gap-px bg-border lg:grid-cols-[2fr_1fr]">
            <div className="border border-border bg-background p-4">
              <iframe
                title="Mapa de rastreio da entrega"
                src="https://www.openstreetmap.org/export/embed.html?bbox=32.40%2C-26.00%2C33.35%2C-25.60&layer=mapnik&marker=-25.88%2C32.57"
                className="h-[360px] w-full border border-border"
              />
            </div>
            <aside className="border border-border bg-background p-5">
              <p className="text-xs font-semibold uppercase tracking-[0.12em] text-muted-foreground">Entrega BE-24016</p>
              <p className="mt-2 text-lg font-semibold">Camião em rota para Maputo</p>
              <ul className="mt-4 space-y-3 text-sm text-muted-foreground">
                <li className="border-l-2 border-primary pl-3">Saiu do fornecedor às 09:10</li>
                <li className="border-l-2 border-primary pl-3">Passou no ponto de controlo da Matola às 10:02</li>
                <li className="border-l-2 border-border pl-3">Previsão de chegada: 11:25</li>
              </ul>
              <Button variant="outline" className="mt-5 w-full" asChild>
                <Link href="/perfil">
                  <Filter className="size-4" />
                  Ver histórico de rastreios
                </Link>
              </Button>
            </aside>
          </div>
        </div>
      </section>

      <footer className="border-t border-border bg-muted/30">
        <div className="mx-auto grid w-full max-w-7xl gap-8 px-4 py-10 text-sm md:grid-cols-3 md:px-6">
          <div>
            <p className="text-lg font-semibold">BuildEasy</p>
            <p className="mt-2 text-muted-foreground">
              Plataforma de materiais de construção com fornecedores verificados em Moçambique.
            </p>
          </div>
          <div>
            <p className="font-semibold">Links úteis</p>
            <ul className="mt-3 space-y-2 text-muted-foreground">
              <li><Link href="/produtos">Produtos</Link></li>
              <li><Link href="/checkout">Checkout</Link></li>
              <li><Link href="/perfil">Minha conta</Link></li>
            </ul>
          </div>
          <div>
            <p className="font-semibold">Suporte</p>
            <ul className="mt-3 space-y-2 text-muted-foreground">
              <li>+258 84 000 0000</li>
              <li>suporte@buildeasy.co.mz</li>
              <li>Seg - Sáb, 07:00 às 19:00</li>
            </ul>
          </div>
        </div>
      </footer>
    </main>
  )
}
