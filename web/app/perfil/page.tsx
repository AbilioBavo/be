"use client";

import { useState } from "react";
import Link from "next/link";
import {
  User,
  Package,
  Settings,
  Heart,
  MapPin,
  CreditCard,
  Bell,
  LogOut,
  Edit,
  Camera,
  ChevronRight,
  Clock,
  CheckCircle,
  Truck,
  XCircle,
  Eye,
  HelpCircle,
  Shield,
  Mail,
  Phone,
  Home,
  Calendar,
  Save,
  AlertCircle,
  Navigation,
  PackageCheck,
  MapPinned,
} from "lucide-react";

import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { Button } from "@/components/ui/button";
import { mockUser } from "@/lib/mock-commerce";
import { cn } from "@/lib/utils";
import { formatMT } from "@/lib/mock-commerce";
import { useAuth } from "@/hooks/use-auth";
import { useRouter } from "next/navigation";

// Mock de pedidos
const mockOrders = [
  {
    id: "PED-2025-001",
    date: "2025-04-10",
    status: "Entregue",
    total: 2850,
    items: 3,
    tracking: null,
  },
  {
    id: "PED-2025-002",
    date: "2025-04-14",
    status: "Em trânsito",
    total: 1450,
    items: 2,
    tracking: {
      id: "TRK-24016",
      vehicle: "Camião Iveco - MPT-45-23",
      driver: "João Mucavele",
      currentLocation: "Matola",
      destination: "Maputo - Av. 24 de Julho, 1500",
      eta: "11:45",
      events: [
        { time: "09:10", description: "Saiu do fornecedor", location: "Armazém Central - Boane", completed: true },
        { time: "10:02", description: "Passou no ponto de controlo", location: "Matola", completed: true },
        { time: "11:15", description: "Em rota para entrega", location: "Estrada Nacional N4", completed: false },
        { time: "11:45", description: "Previsão de chegada", location: "Maputo", completed: false },
      ],
    },
  },
  {
    id: "PED-2025-003",
    date: "2025-04-15",
    status: "Processando",
    total: 3200,
    items: 5,
    tracking: null,
  },
  {
    id: "PED-2025-004",
    date: "2025-03-28",
    status: "Entregue",
    total: 980,
    items: 1,
    tracking: null,
  },
];

const statusConfig = {
  Entregue: { icon: CheckCircle, color: "text-green-400", bg: "bg-green-500/10" },
  "Em trânsito": { icon: Truck, color: "text-blue-400", bg: "bg-blue-500/10" },
  Processando: { icon: Clock, color: "text-yellow-400", bg: "bg-yellow-500/10" },
  Cancelado: { icon: XCircle, color: "text-red-400", bg: "bg-red-500/10" },
};

const menuItems = [
  { id: "profile", label: "Dados pessoais", icon: User },
  { id: "orders", label: "Meus pedidos", icon: Package },
  { id: "addresses", label: "Endereços", icon: MapPin },
  { id: "payment", label: "Métodos de pagamento", icon: CreditCard },
  { id: "favorites", label: "Favoritos", icon: Heart },
  { id: "notifications", label: "Notificações", icon: Bell },
  { id: "settings", label: "Configurações", icon: Settings },
];

export default function ProfilePage() {
  const { user, logout } = useAuth();
  const router = useRouter();
  const [activeTab, setActiveTab] = useState("orders");
  const [isEditing, setIsEditing] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState<string | null>("PED-2025-002");
  const [formData, setFormData] = useState({
    name: user?.name ?? mockUser.name,
    email: user?.email ?? mockUser.email,
    phone: user?.phone ?? mockUser.phone,
    city: user?.city ?? mockUser.city,
    address: "Av. 24 de Julho, 1500",
  });
  const [saveSuccess, setSaveSuccess] = useState(false);

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSave = () => {
    setSaveSuccess(true);
    setIsEditing(false);
    setTimeout(() => setSaveSuccess(false), 3000);
  };

  const getStatusIcon = (status: string) => {
    const config = statusConfig[status as keyof typeof statusConfig] || statusConfig.Processando;
    const Icon = config.icon;
    return <Icon className={cn("size-4", config.color)} />;
  };

  const getStatusClass = (status: string) => {
    const config = statusConfig[status as keyof typeof statusConfig] || statusConfig.Processando;
    return cn("text-xs font-medium", config.color);
  };

  const activeTrackingOrder = mockOrders.find(o => o.id === selectedOrder && o.tracking);
  if (!user) {
    return (
      <main className="min-h-svh bg-[#0a0a0a] text-white">
        <Header />
        <section className="mx-auto max-w-3xl px-6 py-20 text-center">
          <h1 className="text-3xl font-bold">Faça login para ver seu perfil</h1>
          <p className="mt-3 text-white/60">Por segurança, os dados do perfil e pedidos são exibidos apenas para usuários autenticados.</p>
          <Button asChild className="mt-6 bg-[#d4541a] hover:bg-[#e05e1e]"><Link href="/login">Ir para login</Link></Button>
        </section>
      </main>
    )
  }

  return (
    <main className="min-h-svh bg-[#0a0a0a] text-white">
      <Header />

      {/* Breadcrumbs */}
      <div className="border-b border-white/10 bg-[#0d1117]/50">
        <div className="mx-auto w-full max-w-7xl px-4 py-3 md:px-6">
          <nav className="flex items-center gap-1.5 text-xs">
            <Link href="/" className="text-white/50 transition-colors hover:text-white">
              Início
            </Link>
            <ChevronRight className="size-3 text-white/30" />
            <span className="text-white/80">Minha conta</span>
          </nav>
        </div>
      </div>

      <section className="mx-auto w-full max-w-7xl px-4 py-8 md:px-6 md:py-10">
        <div className="grid gap-6 lg:grid-cols-[300px_1fr]">
          {/* Sidebar */}
          <aside className="h-fit space-y-4">
            {/* Perfil do usuário */}
            <div className="border border-white/10 bg-[#0d1117] p-6">
              <div className="flex flex-col items-center text-center">
                <div className="relative">
                  <div className="flex h-24 w-24 items-center justify-center rounded-full bg-gradient-to-br from-[#d4541a]/30 to-[#d4541a]/10 border-2 border-[#d4541a]/50">
                    <span className="text-3xl font-bold text-white">
                      {formData.name.charAt(0).toUpperCase()}
                    </span>
                  </div>
                  <button className="absolute -bottom-1 -right-1 flex h-8 w-8 items-center justify-center rounded-full border-2 border-[#0d1117] bg-[#d4541a] text-white transition-all hover:bg-[#e05e1e]">
                    <Camera className="size-3.5" />
                  </button>
                </div>
                
                <h2 className="mt-4 text-lg font-semibold text-white">{formData.name}</h2>
                <p className="text-sm text-white/50">{formData.email}</p>
                
                <div className="mt-4 flex items-center gap-1 text-xs text-white/40">
                  <MapPin className="size-3" />
                  <span>{formData.city}</span>
                </div>
              </div>
            </div>

            {/* Menu de navegação */}
            <nav className="border border-white/10 bg-[#0d1117] p-2">
              {menuItems.map((item) => {
                const Icon = item.icon;
                return (
                  <button
                    key={item.id}
                    onClick={() => setActiveTab(item.id)}
                    className={cn(
                      "flex w-full items-center gap-3 px-4 py-3 text-sm transition-all",
                      activeTab === item.id
                        ? "border-l-2 border-[#d4541a] bg-[#d4541a]/10 text-white"
                        : "text-white/60 hover:bg-white/5 hover:text-white"
                    )}
                  >
                    <Icon className="size-4" />
                    {item.label}
                    {activeTab === item.id && (
                      <ChevronRight className="ml-auto size-3 text-[#d4541a]" />
                    )}
                  </button>
                );
              })}

              <div className="my-2 h-px bg-white/10" />

              <button className="flex w-full items-center gap-3 px-4 py-3 text-sm text-red-400 transition-all hover:bg-red-500/10" onClick={() => { logout(); router.push("/login"); }}>
                <LogOut className="size-4" />
                Sair da conta
              </button>
            </nav>

            {/* Ajuda */}
            <div className="border border-white/10 bg-[#0d1117] p-4">
              <div className="flex items-start gap-3">
                <HelpCircle className="size-4 text-[#d4541a] mt-0.5" />
                <div>
                  <p className="text-xs font-medium text-white">Precisa de ajuda?</p>
                  <p className="mt-1 text-[10px] text-white/50">
                    Entre em contato com nosso suporte
                  </p>
                  <Link
                    href="/contato"
                    className="mt-2 inline-block text-[10px] font-medium uppercase tracking-wider text-[#d4541a] hover:underline"
                  >
                    Central de ajuda
                  </Link>
                </div>
              </div>
            </div>
          </aside>

          {/* Conteúdo principal */}
          <div className="space-y-6">
            {/* Mensagem de sucesso */}
            {saveSuccess && (
              <div className="flex items-center gap-3 border border-green-500/30 bg-green-500/10 p-4">
                <CheckCircle className="size-5 text-green-400" />
                <div>
                  <p className="text-sm font-medium text-green-400">Alterações salvas com sucesso!</p>
                  <p className="text-xs text-green-400/70">Seus dados foram atualizados.</p>
                </div>
              </div>
            )}

            {/* Tab: Dados pessoais */}
            {activeTab === "profile" && (
              <div className="border border-white/10 bg-[#0d1117] p-6">
                <div className="mb-6 flex items-center justify-between">
                  <div>
                    <h2 className="text-xl font-semibold text-white">Dados pessoais</h2>
                    <p className="mt-1 text-sm text-white/50">
                      Gerencie suas informações pessoais
                    </p>
                  </div>
                  {!isEditing ? (
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setIsEditing(true)}
                      className="border-white/15 bg-transparent text-white hover:bg-white/5"
                    >
                      <Edit className="mr-2 size-3.5" />
                      Editar
                    </Button>
                  ) : (
                    <Button
                      size="sm"
                      onClick={() => setIsEditing(false)}
                      variant="outline"
                      className="border-white/15 bg-transparent text-white hover:bg-white/5"
                    >
                      Cancelar
                    </Button>
                  )}
                </div>

                <div className="grid gap-4 md:grid-cols-2">
                  <div>
                    <label className="mb-1.5 block text-xs font-medium uppercase tracking-wider text-white/50">
                      <User className="mr-1 inline size-3" />
                      Nome completo
                    </label>
                    <input
                      type="text"
                      value={formData.name}
                      onChange={(e) => handleInputChange("name", e.target.value)}
                      disabled={!isEditing}
                      className={cn(
                        "h-11 w-full border bg-white/5 px-4 text-sm text-white outline-none transition-all",
                        isEditing
                          ? "border-white/20 focus:border-[#d4541a]/50"
                          : "border-white/10 cursor-not-allowed opacity-60"
                      )}
                    />
                  </div>

                  <div>
                    <label className="mb-1.5 block text-xs font-medium uppercase tracking-wider text-white/50">
                      <Mail className="mr-1 inline size-3" />
                      Email
                    </label>
                    <input
                      type="email"
                      value={formData.email}
                      onChange={(e) => handleInputChange("email", e.target.value)}
                      disabled={!isEditing}
                      className={cn(
                        "h-11 w-full border bg-white/5 px-4 text-sm text-white outline-none transition-all",
                        isEditing
                          ? "border-white/20 focus:border-[#d4541a]/50"
                          : "border-white/10 cursor-not-allowed opacity-60"
                      )}
                    />
                  </div>

                  <div>
                    <label className="mb-1.5 block text-xs font-medium uppercase tracking-wider text-white/50">
                      <Phone className="mr-1 inline size-3" />
                      Telefone
                    </label>
                    <input
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => handleInputChange("phone", e.target.value)}
                      disabled={!isEditing}
                      className={cn(
                        "h-11 w-full border bg-white/5 px-4 text-sm text-white outline-none transition-all",
                        isEditing
                          ? "border-white/20 focus:border-[#d4541a]/50"
                          : "border-white/10 cursor-not-allowed opacity-60"
                      )}
                    />
                  </div>

                  <div>
                    <label className="mb-1.5 block text-xs font-medium uppercase tracking-wider text-white/50">
                      <MapPin className="mr-1 inline size-3" />
                      Cidade
                    </label>
                    <input
                      type="text"
                      value={formData.city}
                      onChange={(e) => handleInputChange("city", e.target.value)}
                      disabled={!isEditing}
                      className={cn(
                        "h-11 w-full border bg-white/5 px-4 text-sm text-white outline-none transition-all",
                        isEditing
                          ? "border-white/20 focus:border-[#d4541a]/50"
                          : "border-white/10 cursor-not-allowed opacity-60"
                      )}
                    />
                  </div>

                  <div className="md:col-span-2">
                    <label className="mb-1.5 block text-xs font-medium uppercase tracking-wider text-white/50">
                      <Home className="mr-1 inline size-3" />
                      Endereço
                    </label>
                    <input
                      type="text"
                      value={formData.address}
                      onChange={(e) => handleInputChange("address", e.target.value)}
                      disabled={!isEditing}
                      className={cn(
                        "h-11 w-full border bg-white/5 px-4 text-sm text-white outline-none transition-all",
                        isEditing
                          ? "border-white/20 focus:border-[#d4541a]/50"
                          : "border-white/10 cursor-not-allowed opacity-60"
                      )}
                    />
                  </div>
                </div>

                {isEditing && (
                  <div className="mt-6 flex gap-3">
                    <Button
                      onClick={handleSave}
                      className="h-11 bg-[#d4541a] px-6 text-sm font-semibold text-white hover:bg-[#e05e1e]"
                    >
                      <Save className="mr-2 size-4" />
                      Salvar alterações
                    </Button>
                    <Button
                      variant="outline"
                      onClick={() => setIsEditing(false)}
                      className="h-11 border-white/15 bg-transparent text-sm text-white hover:bg-white/5"
                    >
                      Cancelar
                    </Button>
                  </div>
                )}

                <div className="mt-8 border-t border-white/10 pt-6">
                  <h3 className="mb-4 text-sm font-semibold text-white">Informações da conta</h3>
                  <div className="grid gap-3 text-sm sm:grid-cols-2">
                    <div className="flex items-center gap-3">
                      <Calendar className="size-4 text-white/40" />
                      <span className="text-white/60">Membro desde:</span>
                      <span className="text-white">Janeiro 2025</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <Shield className="size-4 text-white/40" />
                      <span className="text-white/60">Tipo de conta:</span>
                      <span className="text-white">Pessoa Física</span>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Tab: Meus pedidos */}
            {activeTab === "orders" && (
              <div className="space-y-6">
                {/* Lista de pedidos */}
                <div className="border border-white/10 bg-[#0d1117] p-6">
                  <div className="mb-6">
                    <h2 className="text-xl font-semibold text-white">Meus pedidos</h2>
                    <p className="mt-1 text-sm text-white/50">
                      Acompanhe o status dos seus pedidos
                    </p>
                  </div>

                  <div className="space-y-3">
                    {mockOrders.map((order) => (
                      <div
                        key={order.id}
                        className={cn(
                          "flex flex-col gap-3 border p-4 transition-all cursor-pointer",
                          selectedOrder === order.id
                            ? "border-[#d4541a] bg-[#d4541a]/5"
                            : "border-white/10 bg-white/5 hover:border-white/20"
                        )}
                        onClick={() => setSelectedOrder(order.id)}
                      >
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-4">
                            <div className={cn(
                              "flex h-10 w-10 items-center justify-center",
                              statusConfig[order.status as keyof typeof statusConfig]?.bg || "bg-white/5"
                            )}>
                              {getStatusIcon(order.status)}
                            </div>
                            <div>
                              <p className="font-medium text-white">{order.id}</p>
                              <p className="text-xs text-white/40">
                                {new Date(order.date).toLocaleDateString("pt-BR")} • {order.items} itens
                              </p>
                            </div>
                          </div>

                          <div className="flex items-center gap-4">
                            <div className="text-right">
                              <p className="font-semibold text-white">{formatMT(order.total)}</p>
                              <p className={getStatusClass(order.status)}>{order.status}</p>
                            </div>
                            
                            <div className="flex items-center gap-1">
                              {order.tracking && (
                                <Button
                                  variant="ghost"
                                  size="icon-sm"
                                  className="text-[#d4541a] hover:text-[#e05e1e]"
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    setSelectedOrder(order.id);
                                  }}
                                >
                                  <Navigation className="size-4" />
                                </Button>
                              )}
                              <Button
                                variant="ghost"
                                size="icon-sm"
                                className="text-white/50 hover:text-white"
                              >
                                <Eye className="size-4" />
                              </Button>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>

                  <Link
                    href="/pedidos"
                    className="mt-4 inline-flex items-center gap-1 text-xs font-medium uppercase tracking-wider text-[#d4541a] hover:underline"
                  >
                    Ver todos os pedidos
                    <ChevronRight className="size-3" />
                  </Link>
                </div>

                {/* Seção de Rastreio */}
                {activeTrackingOrder && (
                  <div className="border border-white/10 bg-[#0d1117] overflow-hidden">
                    <div className="border-b border-white/10 px-6 py-5">
                      <div className="flex items-center gap-2 mb-1">
                        <Truck className="size-5 text-[#d4541a]" />
                        <h2 className="text-xl font-semibold text-white">Rastreio ao vivo</h2>
                      </div>
                      <p className="text-sm text-white/50">
                        Acompanhe a rota em tempo real até ao ponto de entrega
                      </p>
                    </div>

                    <div className="grid gap-px bg-white/10 lg:grid-cols-[2fr_1fr]">
                      {/* Mapa */}
                      <div className="bg-[#0a0e14] p-4">
                        <div className="relative h-[360px] w-full border border-white/10 bg-white/5 overflow-hidden">
                          <iframe
                            title="Mapa de rastreio da entrega"
                            src="https://www.openstreetmap.org/export/embed.html?bbox=32.40%2C-26.00%2C33.35%2C-25.60&layer=mapnik&marker=-25.88%2C32.57"
                            className="h-full w-full border-0"
                            loading="lazy"
                          />
                          <div className="absolute bottom-3 left-3 bg-black/80 backdrop-blur-sm border border-white/10 px-3 py-1.5">
                            <p className="text-xs text-white/70">
                              📍 Localização atual: {activeTrackingOrder.tracking?.currentLocation}
                            </p>
                          </div>
                        </div>
                      </div>

                      {/* Painel de informações */}
                      <aside className="bg-[#0d1117] p-5">
                        <div className="mb-4">
                          <p className="text-xs font-semibold uppercase tracking-[0.12em] text-[#d4541a]">
                            Entrega {activeTrackingOrder.tracking?.id}
                          </p>
                          <p className="mt-1 text-lg font-semibold text-white">
                            {activeTrackingOrder.tracking?.vehicle}
                          </p>
                          <p className="text-sm text-white/50">
                            Motorista: {activeTrackingOrder.tracking?.driver}
                          </p>
                        </div>

                        <div className="space-y-4">
                          <div className="flex items-start gap-3 p-3 border border-white/10 bg-white/5">
                            <MapPinned className="size-4 text-[#d4541a] mt-0.5 shrink-0" />
                            <div>
                              <p className="text-xs font-medium text-white/60">Destino</p>
                              <p className="text-sm text-white">{activeTrackingOrder.tracking?.destination}</p>
                            </div>
                          </div>

                          <div className="flex items-start gap-3 p-3 border border-white/10 bg-white/5">
                            <Clock className="size-4 text-[#d4541a] mt-0.5 shrink-0" />
                            <div>
                              <p className="text-xs font-medium text-white/60">Previsão de chegada</p>
                              <p className="text-2xl font-bold text-white">{activeTrackingOrder.tracking?.eta}</p>
                            </div>
                          </div>
                        </div>

                        {/* Timeline de eventos */}
                        <div className="mt-6">
                          <p className="mb-3 text-xs font-semibold uppercase tracking-wider text-white/50">
                            Histórico de rastreio
                          </p>
                          <ul className="space-y-1">
                            {activeTrackingOrder.tracking?.events.map((event, index) => (
                              <li key={index} className="relative pl-6 pb-4 last:pb-0">
                                <div className={cn(
                                  "absolute left-0 top-1.5 h-2.5 w-2.5 rounded-full border-2",
                                  event.completed
                                    ? "border-green-400 bg-green-400"
                                    : index === activeTrackingOrder.tracking!.events.length - 1
                                    ? "border-[#d4541a] bg-[#d4541a] animate-pulse"
                                    : "border-white/30 bg-transparent"
                                )} />
                                {index < activeTrackingOrder.tracking!.events.length - 1 && (
                                  <div className={cn(
                                    "absolute left-[4px] top-4 h-full w-0.5",
                                    event.completed ? "bg-green-400/50" : "bg-white/20"
                                  )} />
                                )}
                                <div>
                                  <p className={cn(
                                    "text-sm font-medium",
                                    event.completed ? "text-white" : "text-white/60"
                                  )}>
                                    {event.description}
                                  </p>
                                  <p className="text-xs text-white/40">
                                    {event.time} • {event.location}
                                  </p>
                                </div>
                              </li>
                            ))}
                          </ul>
                        </div>

                        <div className="mt-6 flex gap-2">
                          <Button variant="outline" className="flex-1 border-white/15 bg-transparent text-white hover:bg-white/5" asChild>
                            <Link href="/perfil/rastreios">
                              <PackageCheck className="mr-2 size-3.5" />
                              Histórico completo
                            </Link>
                          </Button>
                          <Button className="flex-1 bg-[#d4541a] text-white hover:bg-[#e05e1e]">
                            <Navigation className="mr-2 size-3.5" />
                            Atualizar
                          </Button>
                        </div>
                      </aside>
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* Tab: Favoritos */}
            {activeTab === "favorites" && (
              <div className="border border-white/10 bg-[#0d1117] p-6">
                <div className="mb-6">
                  <h2 className="text-xl font-semibold text-white">Produtos favoritos</h2>
                  <p className="mt-1 text-sm text-white/50">
                    Itens que você salvou para depois
                  </p>
                </div>

                <div className="flex flex-col items-center justify-center py-12 text-center">
                  <Heart className="size-16 text-white/20 mb-4" />
                  <p className="text-white/60">Você ainda não tem produtos favoritos</p>
                  <Link
                    href="/produtos"
                    className="mt-4 inline-block text-sm font-medium text-[#d4541a] hover:underline"
                  >
                    Explorar produtos
                  </Link>
                </div>
              </div>
            )}

            {/* Outras tabs (placeholder) */}
            {!["profile", "orders", "favorites"].includes(activeTab) && (
              <div className="border border-white/10 bg-[#0d1117] p-6">
                <div className="flex flex-col items-center justify-center py-12 text-center">
                  <AlertCircle className="size-16 text-white/20 mb-4" />
                  <p className="text-white/60">
                    Esta seção estará disponível em breve
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}