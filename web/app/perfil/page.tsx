"use client"

import Link from "next/link"
import { useState } from "react"
import {
  Bell,
  ChevronRight,
  CreditCard,
  Heart,
  Lock,
  LogOut,
  Mail,
  MapPin,
  Package,
  Phone,
  Save,
  Settings,
  User,
} from "lucide-react"
import { useRouter } from "next/navigation"

import { Footer } from "@/components/footer"
import { Header } from "@/components/header"
import { Button } from "@/components/ui/button"
import { useAuth } from "@/hooks/use-auth"
import { mockProducts } from "@/lib/mock-backend"
import { formatMT } from "@/lib/mock-commerce"
import { cn } from "@/lib/utils"

const tabs = [
  { id: "profile", label: "Dados pessoais", icon: User },
  { id: "orders", label: "Meus pedidos", icon: Package },
  { id: "addresses", label: "Endereços", icon: MapPin },
  { id: "payment", label: "Métodos de pagamento", icon: CreditCard },
  { id: "favorites", label: "Favoritos", icon: Heart },
  { id: "notifications", label: "Notificações", icon: Bell },
  { id: "settings", label: "Configurações", icon: Settings },
] as const

const orders = [
  { id: "PED-2026-001", date: "2026-04-10", status: "Entregue", total: 2850, items: 3 },
  { id: "PED-2026-002", date: "2026-04-14", status: "Em trânsito", total: 1450, items: 2 },
  { id: "PED-2026-003", date: "2026-04-15", status: "Processando", total: 3200, items: 5 },
]

export default function ProfilePage() {
  const { user, logout } = useAuth()
  const router = useRouter()
  const [activeTab, setActiveTab] = useState<(typeof tabs)[number]["id"]>("orders")
  const [settingsMessage, setSettingsMessage] = useState("")
  const [passwordForm, setPasswordForm] = useState({ current: "", next: "", confirm: "" })

  if (!user) {
    return (
      <main className="min-h-svh bg-[#0a0a0a] text-white">
        <Header />
        <section className="mx-auto max-w-3xl px-6 py-20 text-center">
          <h1 className="text-3xl font-bold">Faça login para ver seu perfil</h1>
          <p className="mt-3 text-white/60">Por segurança, o perfil fica disponível apenas para usuário autenticado.</p>
          <Button asChild className="mt-6 bg-[#d4541a] hover:bg-[#e05e1e]"><Link href="/login">Ir para login</Link></Button>
        </section>
      </main>
    )
  }

  const favoriteProducts = mockProducts.filter((product) => user.favorites.includes(product.id))

  const submitPassword = () => {
    if (!passwordForm.current || !passwordForm.next || !passwordForm.confirm) {
      setSettingsMessage("Preencha todos os campos para alterar a senha.")
      return
    }
    if (passwordForm.next.length < 6) {
      setSettingsMessage("A nova senha deve ter ao menos 6 caracteres.")
      return
    }
    if (passwordForm.next !== passwordForm.confirm) {
      setSettingsMessage("A confirmação da senha não confere.")
      return
    }
    setSettingsMessage("Senha alterada com sucesso (mock).")
    setPasswordForm({ current: "", next: "", confirm: "" })
  }

  return (
    <main className="min-h-svh bg-[#0a0a0a] text-white">
      <Header />

      <div className="border-b border-white/10 bg-[#0d1117]/50">
        <div className="mx-auto w-full max-w-7xl px-4 py-3 md:px-6">
          <nav className="flex items-center gap-1.5 text-xs">
            <Link href="/" className="text-white/50 hover:text-white">Início</Link>
            <ChevronRight className="size-3 text-white/30" />
            <span className="text-white/80">Minha conta</span>
          </nav>
        </div>
      </div>

      <section className="mx-auto w-full max-w-7xl px-4 py-8 md:px-6 md:py-10">
        <div className="grid gap-6 lg:grid-cols-[280px_1fr]">
          <aside className="space-y-4">
            <div className="border border-white/10 bg-[#0d1117] p-5 text-center">
              <div className="mx-auto grid h-20 w-20 place-items-center rounded-full border-2 border-[#d4541a]/50 bg-[#d4541a]/20 text-2xl font-bold">
                {user.name.charAt(0).toUpperCase()}
              </div>
              <p className="mt-3 text-lg font-semibold">{user.name}</p>
              <p className="text-sm text-white/55">{user.email}</p>
            </div>

            <nav className="border border-white/10 bg-[#0d1117] p-2">
              <div className="flex gap-1 overflow-x-auto lg:block">
                {tabs.map((tab) => {
                  const Icon = tab.icon
                  return (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id)}
                      className={cn(
                        "flex min-w-max items-center gap-2 px-3 py-2 text-sm transition",
                        activeTab === tab.id ? "border-l-2 border-[#d4541a] bg-[#d4541a]/10 text-white" : "text-white/60 hover:bg-white/5",
                      )}
                    >
                      <Icon className="size-4" />
                      {tab.label}
                    </button>
                  )
                })}
              </div>
              <div className="my-2 h-px bg-white/10" />
              <button className="flex w-full items-center gap-2 px-3 py-2 text-left text-red-400 hover:bg-red-500/10" onClick={() => { logout(); router.push("/login") }}>
                <LogOut className="size-4" />
                Sair
              </button>
            </nav>
          </aside>

          <div className="space-y-6">
            {activeTab === "profile" && (
              <div className="border border-white/10 bg-[#0d1117] p-6">
                <h2 className="text-xl font-semibold">Dados pessoais</h2>
                <div className="mt-5 grid gap-4 sm:grid-cols-2">
                  <InfoRow icon={User} label="Nome" value={user.name} />
                  <InfoRow icon={Mail} label="Email" value={user.email} />
                  <InfoRow icon={Phone} label="Telefone" value={user.phone} />
                  <InfoRow icon={MapPin} label="Cidade" value={user.city} />
                </div>
              </div>
            )}

            {activeTab === "orders" && (
              <div className="border border-white/10 bg-[#0d1117] p-6">
                <div className="mb-5 flex items-center justify-between">
                  <h2 className="text-xl font-semibold">Meus pedidos</h2>
                  <Link href="/perfil/pedidos" className="text-sm text-[#d4541a] hover:text-[#e05e1e]">Ver todos</Link>
                </div>
                <div className="space-y-3">
                  {orders.map((order) => (
                    <Link key={order.id} href={`/perfil/pedidos/${order.id}`} className="block border border-white/10 bg-white/5 p-4 hover:border-[#d4541a]/40">
                      <div className="flex flex-wrap items-center justify-between gap-2">
                        <p className="font-semibold">{order.id}</p>
                        <p className="text-sm text-white/60">{order.status}</p>
                      </div>
                      <p className="mt-1 text-xs text-white/50">{order.date} · {order.items} itens · {formatMT(order.total)}</p>
                    </Link>
                  ))}
                </div>
              </div>
            )}

            {activeTab === "addresses" && (
              <div className="border border-white/10 bg-[#0d1117] p-6">
                <h2 className="text-xl font-semibold">Endereços</h2>
                <div className="mt-4 space-y-3">
                  {user.addresses.map((address) => (
                    <div key={address.id} className="border border-white/10 bg-white/5 p-4">
                      <p className="font-medium">{address.label} {address.isDefault ? "(Principal)" : ""}</p>
                      <p className="text-sm text-white/60">{address.line1}, {address.district}</p>
                      <p className="text-sm text-white/60">{address.city}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === "payment" && (
              <div className="border border-white/10 bg-[#0d1117] p-6">
                <h2 className="text-xl font-semibold">Métodos de pagamento</h2>
                <div className="mt-4 space-y-3">
                  {user.paymentMethods.map((method) => (
                    <div key={method.id} className="flex items-center justify-between border border-white/10 bg-white/5 p-4">
                      <div>
                        <p className="font-medium">{method.label}</p>
                        <p className="text-sm text-white/60">{method.type.toUpperCase()} {method.lastDigits ? `•••• ${method.lastDigits}` : ""}</p>
                      </div>
                      {method.isDefault ? <span className="text-xs text-green-400">Padrão</span> : null}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === "favorites" && (
              <div className="border border-white/10 bg-[#0d1117] p-6">
                <h2 className="text-xl font-semibold">Favoritos</h2>
                <div className="mt-4 grid gap-3 sm:grid-cols-2">
                  {favoriteProducts.map((product) => (
                    <Link key={product.id} href={`/produtos/${product.id}`} className="border border-white/10 bg-white/5 p-4 hover:border-[#d4541a]/40">
                      <p className="font-medium">{product.name}</p>
                      <p className="text-sm text-white/60">{product.supplierName}</p>
                      <p className="mt-2 text-sm font-semibold">{formatMT(product.price)}</p>
                    </Link>
                  ))}
                </div>
              </div>
            )}

            {activeTab === "notifications" && (
              <div className="border border-white/10 bg-[#0d1117] p-6">
                <h2 className="text-xl font-semibold">Notificações</h2>
                <div className="mt-4 space-y-3">
                  {[
                    "Atualização de pedido por SMS",
                    "Atualização de pedido por email",
                    "Promoções e campanhas",
                    "Alerta de reposição de estoque",
                  ].map((item, idx) => (
                    <label key={item} className="flex items-center justify-between border border-white/10 bg-white/5 p-4 text-sm">
                      <span>{item}</span>
                      <input type="checkbox" defaultChecked={idx < 2} className="h-4 w-4 accent-[#d4541a]" />
                    </label>
                  ))}
                </div>
              </div>
            )}

            {activeTab === "settings" && (
              <div className="space-y-4">
                <div className="border border-white/10 bg-[#0d1117] p-6">
                  <h2 className="text-xl font-semibold">Alterar senha</h2>
                  <div className="mt-4 grid gap-3">
                    <PasswordInput label="Senha atual" value={passwordForm.current} onChange={(value) => setPasswordForm((prev) => ({ ...prev, current: value }))} />
                    <PasswordInput label="Nova senha" value={passwordForm.next} onChange={(value) => setPasswordForm((prev) => ({ ...prev, next: value }))} />
                    <PasswordInput label="Confirmar nova senha" value={passwordForm.confirm} onChange={(value) => setPasswordForm((prev) => ({ ...prev, confirm: value }))} />
                    {settingsMessage ? <p className="text-sm text-white/70">{settingsMessage}</p> : null}
                    <Button className="w-full bg-[#d4541a] hover:bg-[#e05e1e]" onClick={submitPassword}>
                      <Lock className="mr-2 size-4" />
                      Salvar nova senha
                    </Button>
                  </div>
                </div>

                <div className="border border-white/10 bg-[#0d1117] p-6">
                  <h3 className="text-lg font-semibold">Outras configurações</h3>
                  <div className="mt-4 space-y-3 text-sm">
                    <SettingToggle label="Autenticação em dois fatores" defaultChecked />
                    <SettingToggle label="Sessão ativa em apenas um dispositivo" />
                    <SettingToggle label="Receber alertas de segurança" defaultChecked />
                    <SettingToggle label="Exigir confirmação para compras acima de 10.000 MZN" />
                  </div>
                  <Button variant="outline" className="mt-4 w-full border-white/20 bg-transparent text-white hover:bg-white/5">
                    <Save className="mr-2 size-4" />
                    Guardar preferências
                  </Button>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}

function InfoRow({ icon: Icon, label, value }: { icon: typeof User; label: string; value: string }) {
  return (
    <div className="border border-white/10 bg-white/5 p-4">
      <p className="text-xs uppercase tracking-wider text-white/45"><Icon className="mr-1 inline size-3" /> {label}</p>
      <p className="mt-1 text-sm">{value}</p>
    </div>
  )
}

function PasswordInput({ label, value, onChange }: { label: string; value: string; onChange: (value: string) => void }) {
  return (
    <div>
      <label className="mb-1 block text-xs uppercase tracking-wider text-white/55">{label}</label>
      <input
        type="password"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="h-11 w-full border border-white/15 bg-white/5 px-3 text-sm outline-none focus:border-[#d4541a]/60"
      />
    </div>
  )
}

function SettingToggle({ label, defaultChecked = false }: { label: string; defaultChecked?: boolean }) {
  return (
    <label className="flex items-center justify-between border border-white/10 bg-white/5 p-4">
      <span>{label}</span>
      <input type="checkbox" defaultChecked={defaultChecked} className="h-4 w-4 accent-[#d4541a]" />
    </label>
  )
}
