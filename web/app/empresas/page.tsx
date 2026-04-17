import Image from "next/image"
import Link from "next/link"

import { Footer } from "@/components/footer"
import { Header } from "@/components/header"
import { mockCompanies } from "@/lib/mock-backend"

export default function EmpresasPage() {
  return (
    <main className="min-h-svh bg-[#0a0a0a] text-white">
      <Header />
      <section className="mx-auto w-full max-w-7xl px-4 py-14 md:px-6">
        <div className="mb-8">
          <p className="text-xs uppercase tracking-widest text-[#d4541a]">Fornecedores</p>
          <h1 className="mt-2 text-4xl font-bold">Empresas parceiras</h1>
          <p className="mt-2 max-w-3xl text-white/60">
            Explore fornecedores verificados, conheça capacidade operacional e veja os produtos de cada empresa.
          </p>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {mockCompanies.map((company) => (
            <article key={company.id} className="overflow-hidden border border-white/10 bg-[#0d1117]">
              <div className="relative h-48 w-full">
                <Image src={company.image} alt={company.name} fill className="object-cover" />
              </div>
              <div className="space-y-3 p-5">
                <h2 className="text-xl font-semibold">{company.name}</h2>
                <p className="text-sm text-white/60">{company.shortDescription}</p>
                <div className="flex items-center justify-between text-xs text-white/45">
                  <span>{company.clientCount.toLocaleString("pt-PT")} clientes</span>
                  <span>{company.yearsInMarket} anos de mercado</span>
                </div>
                <Link
                  href={`/empresas/${company.id}`}
                  className="inline-block text-sm font-medium text-[#d4541a] transition hover:text-[#e05e1e]"
                >
                  Ver detalhes da empresa
                </Link>
              </div>
            </article>
          ))}
        </div>
      </section>
      <Footer />
    </main>
  )
}
