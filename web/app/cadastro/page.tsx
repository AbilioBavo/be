import Link from "next/link"

import { Button } from "@/components/ui/button"

export default function SignupPage() {
  return (
    <main className="flex min-h-svh items-center justify-center bg-[#0a0a0a] px-4 text-white">
      <section className="w-full max-w-lg rounded-3xl border border-white/10 bg-white/5 p-7">
        <p className="text-sm uppercase tracking-[0.2em] text-orange-300">Criar conta</p>
        <h1 className="mt-3 text-3xl font-semibold">Cadastro</h1>
        <form className="mt-6 grid gap-3">
          <input className="h-11 rounded-xl border border-white/15 bg-black/30 px-4" placeholder="Nome completo" />
          <input className="h-11 rounded-xl border border-white/15 bg-black/30 px-4" placeholder="Email" />
          <input className="h-11 rounded-xl border border-white/15 bg-black/30 px-4" placeholder="Telefone" />
          <input type="password" className="h-11 rounded-xl border border-white/15 bg-black/30 px-4" placeholder="Senha" />
          <Button className="mt-2 rounded-full bg-orange-500 text-black hover:bg-orange-400">Finalizar cadastro</Button>
        </form>
        <p className="mt-5 text-sm text-white/70">Já tem conta? <Link href="/login" className="text-orange-300">Entrar</Link></p>
      </section>
    </main>
  )
}
