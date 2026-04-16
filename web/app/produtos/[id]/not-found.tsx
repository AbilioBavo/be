import Link from "next/link"

import { MarketplaceHeader } from "@/components/marketplace-header"
import { Button } from "@/components/ui/button"

export default function ProductNotFound() {
  return (
    <main className="min-h-svh bg-background">
      <MarketplaceHeader />

      <section className="mx-auto flex w-full max-w-3xl flex-col items-center justify-center px-4 py-16 text-center md:px-6">
        <p className="inline-flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.14em] text-muted-foreground">
          <span className="size-2 bg-primary" aria-hidden />
          Produto não encontrado
        </p>

        <h1 className="mt-3 text-3xl font-semibold tracking-tight md:text-4xl">
          Este produto não existe
        </h1>

        <p className="mt-3 max-w-xl text-sm text-muted-foreground md:text-base">
          O produto que procuras pode ter sido removido ou o identificador não é
          válido.
        </p>

        <div className="mt-6 flex w-full max-w-sm gap-2">
          <Button className="flex-1" asChild>
            <Link href="/">Voltar à homepage</Link>
          </Button>
          <Button variant="outline" className="flex-1" asChild>
            <Link href="/">Ver produtos</Link>
          </Button>
        </div>
      </section>
    </main>
  )
}
