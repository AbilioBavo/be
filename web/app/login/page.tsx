import Link from "next/link"

import { Button } from "@/components/ui/button"

export default function LoginPage() {
  return (
    <main className="grid min-h-svh bg-[#0a0a0a] text-white lg:grid-cols-2">
      <section className="flex items-center justify-center p-6">
        <div className="w-full max-w-md rounded-3xl border border-white/10 bg-white/5 p-7">
          <p className="text-sm uppercase tracking-[0.2em] text-orange-300">Cigarre</p>
          <h1 className="mt-3 text-3xl font-semibold">Entrar</h1>
          <p className="mt-2 text-sm text-white/70">Acesse sua conta para acompanhar pedidos e favoritos.</p>
          <form className="mt-6 space-y-3">
            <input placeholder="Email" className="h-11 w-full rounded-xl border border-white/15 bg-black/30 px-4" />
            <input placeholder="Senha" type="password" className="h-11 w-full rounded-xl border border-white/15 bg-black/30 px-4" />
            <Button className="w-full rounded-full bg-orange-500 text-black hover:bg-orange-400">Continuar</Button>
          </form>
          <p className="mt-5 text-sm text-white/70">Ainda não tem conta? <Link href="/cadastro" className="text-orange-300">Criar conta</Link></p>
        </div>
      </section>

      <section className="hidden bg-[url('/hero-canteiro.jpg')] bg-cover bg-center lg:block">
        <div className="flex h-full items-end bg-gradient-to-t from-black/70 to-transparent p-10">
          <h2 className="max-w-lg text-5xl leading-tight font-semibold">Design premium e checkout fluido.</h2>
        </div>
      </section>
    </main>
  )
}
