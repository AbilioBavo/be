import { PremiumNavbar } from "@/components/premium-navbar"
import { ProductCard } from "@/components/product-card"
import { categories, catalogProducts } from "@/lib/mock-commerce"

export default function ProductsPage() {
  return (
    <main className="min-h-svh bg-[#0a0a0a] text-white">
      <PremiumNavbar />
      <section className="mx-auto w-full max-w-7xl space-y-8 px-4 py-10 md:px-6">
        <header className="space-y-3">
          <h1 className="text-4xl font-semibold">Catálogo premium</h1>
          <p className="text-white/70">Explore peças por categoria, novas coleções e ofertas especiais.</p>
        </header>

        <div className="flex flex-wrap gap-2">
          {categories.map((category, index) => (
            <button
              key={category}
              className={`rounded-full border px-5 py-2 text-sm ${
                index === 0
                  ? "border-orange-400 bg-orange-500/20 text-orange-200"
                  : "border-white/15 bg-white/5 text-white/70"
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
          {catalogProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>
    </main>
  )
}
