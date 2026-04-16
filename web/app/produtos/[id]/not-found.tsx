import Link from "next/link"

import { PremiumNavbar } from "@/components/premium-navbar"
import { Button } from "@/components/ui/button"

export default function ProductNotFound() {
  return (
    <main className="min-h-svh bg-[#0a0a0a] text-white">
      <PremiumNavbar />

      <section className="mx-auto flex w-full max-w-3xl flex-col items-center justify-center px-4 py-20 text-center md:px-6">
        <p className="text-sm uppercase tracking-[0.2em] text-orange-300">Produto não encontrado</p>
        <h1 className="mt-4 text-4xl font-semibold">Este produto não existe</h1>
        <p className="mt-3 max-w-xl text-white/70">
          O item pode ter sido removido da coleção ou o link está incorreto.
        </p>

        <div className="mt-8 flex w-full max-w-sm gap-3">
          <Button className="flex-1 rounded-full bg-orange-500 text-black hover:bg-orange-400" asChild>
            <Link href="/">Voltar à home</Link>
          </Button>
          <Button variant="outline" className="flex-1 rounded-full border-white/30 bg-transparent" asChild>
            <Link href="/produtos">Ver catálogo</Link>
          </Button>
        </div>
      </section>
    </main>
  )
}
