import Image from "next/image"
import { notFound } from "next/navigation"

import { Footer } from "@/components/footer"
import { Header } from "@/components/header"
import { ProductCard } from "@/components/product-card"
import { mockCompanies, mockProducts } from "@/lib/mock-backend"

export default async function CompanyDetailsPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const company = mockCompanies.find((item) => item.id === id)

  if (!company) {
    notFound()
  }

  const companyProducts = mockProducts.filter((product) => product.supplierName === company.name)

  return (
    <main className="min-h-svh bg-[#0a0a0a] text-white">
      <Header />

      <section className="mx-auto w-full max-w-7xl px-4 py-14 md:px-6">
        <div className="grid gap-8 lg:grid-cols-[1.2fr_1fr]">
          <div>
            <p className="text-xs uppercase tracking-widest text-[#d4541a]">Empresa parceira</p>
            <h1 className="mt-2 text-4xl font-bold">{company.name}</h1>
            <p className="mt-4 text-white/65">{company.longDescription}</p>
            <div className="mt-6 grid gap-3 sm:grid-cols-3">
              <div className="border border-white/10 bg-[#0d1117] p-4 text-center">
                <p className="text-2xl font-bold">{company.clientCount.toLocaleString("pt-PT")}</p>
                <p className="text-xs text-white/50">Clientes atendidos</p>
              </div>
              <div className="border border-white/10 bg-[#0d1117] p-4 text-center">
                <p className="text-2xl font-bold">{company.yearsInMarket}</p>
                <p className="text-xs text-white/50">Anos de mercado</p>
              </div>
              <div className="border border-white/10 bg-[#0d1117] p-4 text-center">
                <p className="text-2xl font-bold">{company.city}</p>
                <p className="text-xs text-white/50">Base operacional</p>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            {company.gallery.map((image) => (
              <div key={image} className="relative h-36 overflow-hidden border border-white/10">
                <Image src={image} alt={company.name} fill className="object-cover" />
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto w-full max-w-7xl px-4 pb-14 md:px-6">
        <h2 className="mb-6 text-2xl font-semibold">Produtos da empresa</h2>
        {companyProducts.length ? (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {companyProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <p className="text-white/60">Ainda não há produtos publicados para esta empresa.</p>
        )}
      </section>

      <Footer />
    </main>
  )
}
