"use client"

import Image from "next/image"
import Link from "next/link"
import { useMemo, useState } from "react"

import { Footer } from "@/components/footer"
import { Header } from "@/components/header"
import { Button } from "@/components/ui/button"
import { mockCompanies } from "@/lib/mock-backend"

const ITEMS_PER_PAGE = 8

export default function EmpresasPage() {
  const [currentPage, setCurrentPage] = useState(1)
  const totalPages = Math.ceil(mockCompanies.length / ITEMS_PER_PAGE)

  const currentItems = useMemo(() => {
    const start = (currentPage - 1) * ITEMS_PER_PAGE
    return mockCompanies.slice(start, start + ITEMS_PER_PAGE)
  }, [currentPage])

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

        <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
          {currentItems.map((company) => (
            <article key={company.id} className="overflow-hidden border border-white/10 bg-[#0d1117]">
              <div className="relative h-36 w-full sm:h-44">
                <Image src={company.image} alt={company.name} fill className="object-cover" />
              </div>
              <div className="space-y-2 p-4">
                <h2 className="text-base font-semibold">{company.name}</h2>
                <p className="line-clamp-3 text-xs text-white/60 sm:text-sm">{company.shortDescription}</p>
                <div className="flex items-center justify-between text-[11px] text-white/45">
                  <span>{company.clientCount.toLocaleString("pt-PT")} clientes</span>
                  <span>{company.yearsInMarket} anos</span>
                </div>
                <Link
                  href={`/empresas/${company.id}`}
                  className="inline-block text-xs font-medium text-[#d4541a] transition hover:text-[#e05e1e] sm:text-sm"
                >
                  Ver detalhes
                </Link>
              </div>
            </article>
          ))}
        </div>

        {totalPages > 1 ? (
          <div className="mt-8 flex items-center justify-center gap-2">
            <Button
              variant="outline"
              className="border-white/20 bg-transparent text-white hover:bg-white/10"
              onClick={() => setCurrentPage((page) => Math.max(1, page - 1))}
              disabled={currentPage === 1}
            >
              Anterior
            </Button>
            <span className="text-sm text-white/60">
              Página {currentPage} de {totalPages}
            </span>
            <Button
              variant="outline"
              className="border-white/20 bg-transparent text-white hover:bg-white/10"
              onClick={() => setCurrentPage((page) => Math.min(totalPages, page + 1))}
              disabled={currentPage === totalPages}
            >
              Próxima
            </Button>
          </div>
        ) : null}
      </section>
      <Footer />
    </main>
  )
}
