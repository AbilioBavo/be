import { Package, Settings, User } from "lucide-react"

import { PremiumNavbar } from "@/components/premium-navbar"
import { mockUser } from "@/lib/mock-commerce"

export default function ProfilePage() {
  return (
    <main className="min-h-svh bg-[#0a0a0a] text-white">
      <PremiumNavbar />
      <section className="mx-auto grid w-full max-w-7xl gap-6 px-4 py-10 md:px-6 lg:grid-cols-[280px_1fr]">
        <aside className="rounded-3xl border border-white/10 bg-white/5 p-5">
          <div className="inline-flex size-12 items-center justify-center rounded-full bg-orange-500/20 text-orange-300">
            <User className="size-6" />
          </div>
          <h1 className="mt-4 text-xl font-semibold">{mockUser.name}</h1>
          <p className="text-sm text-white/70">{mockUser.email}</p>
          <nav className="mt-6 space-y-2 text-sm">
            <button className="flex w-full items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-3 py-2"><User className="size-4" /> Dados pessoais</button>
            <button className="flex w-full items-center gap-2 rounded-xl border border-white/10 px-3 py-2 text-white/70"><Package className="size-4" /> Pedidos</button>
            <button className="flex w-full items-center gap-2 rounded-xl border border-white/10 px-3 py-2 text-white/70"><Settings className="size-4" /> Preferências</button>
          </nav>
        </aside>

        <section className="space-y-4 rounded-3xl border border-white/10 bg-white/5 p-6">
          <h2 className="text-2xl font-semibold">Perfil</h2>
          <div className="grid gap-3 md:grid-cols-2">
            <input defaultValue={mockUser.name} className="h-11 rounded-xl border border-white/15 bg-black/30 px-4" />
            <input defaultValue={mockUser.email} className="h-11 rounded-xl border border-white/15 bg-black/30 px-4" />
            <input defaultValue={mockUser.phone} className="h-11 rounded-xl border border-white/15 bg-black/30 px-4" />
            <input defaultValue={mockUser.city} className="h-11 rounded-xl border border-white/15 bg-black/30 px-4" />
          </div>
          <button className="rounded-full bg-orange-500 px-6 py-2 font-medium text-black">Salvar alterações</button>
        </section>
      </section>
    </main>
  )
}
