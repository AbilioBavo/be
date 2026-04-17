import Link from "next/link"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"

const empresas = ["Areias Matola, Lda", "Mineração Sul", "Blocos Centro", "Terra Forte Fornecimentos"]

export default function EmpresasPage() {
  return <main className="min-h-svh bg-[#0a0a0a] text-white"><Header /><section className="mx-auto max-w-6xl px-6 py-14"><h1 className="text-4xl font-bold">Empresas parceiras</h1><div className="mt-8 grid gap-4 md:grid-cols-2">{empresas.map((e)=><div key={e} className="border border-white/10 bg-[#0d1117] p-5"><p className="font-semibold">{e}</p><p className="mt-2 text-sm text-white/60">Fornecedor verificado com entregas rápidas.</p></div>)}</div><Link className="mt-8 inline-block text-[#d4541a]" href="/cadastro">Quero cadastrar minha empresa</Link></section><Footer /></main>
}
