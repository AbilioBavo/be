"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import {
  ArrowRight,
  ChevronRight,
  Truck,
  Shield,
  CreditCard,
  Smartphone,
  Banknote,
  MapPin,
  User,
  Mail,
  Phone,
  Check,
  Clock,
  Package,
  AlertCircle,
  Lock,
} from "lucide-react";

import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { Button } from "@/components/ui/button";
import { useCart } from "@/hooks/use-cart";
import { formatMT } from "@/lib/mock-commerce";
import { cn } from "@/lib/utils";
import { useAuth } from "@/hooks/use-auth";
import { api } from "@/lib/api";

// Breadcrumbs
const Breadcrumbs = () => (
  <nav className="flex items-center gap-1.5 text-xs">
    <Link href="/" className="text-white/50 transition-colors hover:text-white">
      Início
    </Link>
    <ChevronRight className="size-3 text-white/30" />
    <Link href="/carrinho" className="text-white/50 transition-colors hover:text-white">
      Carrinho
    </Link>
    <ChevronRight className="size-3 text-white/30" />
    <span className="text-white/80">Checkout</span>
  </nav>
);

const PAYMENT_METHODS = [
  { value: "mpesa", label: "M-Pesa", icon: Smartphone, description: "Pagamento móvel instantâneo" },
  { value: "emola", label: "e-Mola", icon: Smartphone, description: "Carteira digital" },
  { value: "card", label: "Cartão", icon: CreditCard, description: "Visa, Mastercard" },
  { value: "cash", label: "Dinheiro", icon: Banknote, description: "Pagamento na entrega" },
];

const DELIVERY_OPTIONS = [
  { value: "standard", label: "Entrega Standard", time: "2-3 dias úteis", price: 250 },
  { value: "express", label: "Entrega Expressa", time: "24 horas", price: 500 },
  { value: "pickup", label: "Retirada em loja", time: "Hoje", price: 0 },
];

export default function CheckoutPage() {
  const router = useRouter();
  const { items, subtotal, clearCart } = useCart();
  const { user } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);
  const [selectedPayment, setSelectedPayment] = useState("mpesa");
  const [selectedDelivery, setSelectedDelivery] = useState("standard");
  const [couponCode, setCouponCode] = useState("");
  const [couponApplied, setCouponApplied] = useState(false);
  const [discount, setDiscount] = useState(0);
  
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    address: "",
    city: "Maputo",
    notes: "",
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitError, setSubmitError] = useState("");

  const shipping = DELIVERY_OPTIONS.find(o => o.value === selectedDelivery)?.price || 250;
  const total = subtotal + shipping - discount;

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: "" }));
    }
  };

  const validateStep = () => {
    const newErrors: Record<string, string> = {};
    
    if (currentStep === 1) {
      if (!formData.fullName) newErrors.fullName = "Nome é obrigatório";
      if (!formData.email) newErrors.email = "Email é obrigatório";
      else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
        newErrors.email = "Email inválido";
      }
      if (!formData.phone) newErrors.phone = "Telefone é obrigatório";
    }
    
    if (currentStep === 2) {
      if (!formData.address) newErrors.address = "Endereço é obrigatório";
      if (!formData.city) newErrors.city = "Cidade é obrigatória";
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNextStep = () => {
    if (validateStep()) {
      setCurrentStep(prev => Math.min(prev + 1, 3));
    }
  };

  const handleApplyCoupon = () => {
    if (couponCode.toUpperCase() === "BUILD10") {
      setDiscount(subtotal * 0.1);
      setCouponApplied(true);
    } else if (couponCode.toUpperCase() === "FRETE") {
      setDiscount(shipping);
      setCouponApplied(true);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitError("");
    if (!validateStep()) return;
    if (!user) {
      setSubmitError("Você precisa estar logado para finalizar o checkout.");
      return;
    }

    setIsLoading(true);
    try {
      await api.checkout(user.id);
      clearCart();
      router.push("/obrigado");
    } catch (err) {
      setSubmitError(err instanceof Error ? err.message : "Falha ao finalizar pedido.");
    } finally {
      setIsLoading(false);
    }
  };

  if (items.length === 0) {
    return (
      <main className="min-h-svh bg-[#0a0a0a] text-white">
        <Header />
        <div className="border-b border-white/10 bg-[#0d1117]/50">
          <div className="mx-auto w-full max-w-7xl px-4 py-3 md:px-6">
            <Breadcrumbs />
          </div>
        </div>
        <section className="mx-auto w-full max-w-7xl px-4 py-16 text-center md:px-6">
          <div className="flex flex-col items-center justify-center">
            <div className="mb-6 flex h-24 w-24 items-center justify-center border border-white/10 bg-white/5">
              <Package className="size-10 text-white/30" />
            </div>
            <h1 className="text-3xl font-bold text-white">Seu carrinho está vazio</h1>
            <p className="mt-2 text-white/50">
              Adicione produtos ao carrinho para continuar.
            </p>
            <Button
              onClick={() => router.push("/produtos")}
              className="mt-6 h-12 bg-[#d4541a] px-8 text-sm font-semibold uppercase tracking-wider text-white hover:bg-[#e05e1e]"
            >
              Explorar produtos
              <ArrowRight className="ml-2 size-4" />
            </Button>
          </div>
        </section>
        <Footer />
      </main>
    );
  }

  return (
    <main className="min-h-svh bg-[#0a0a0a] text-white">
      <Header />

      {/* Breadcrumbs */}
      <div className="border-b border-white/10 bg-[#0d1117]/50">
        <div className="mx-auto w-full max-w-7xl px-4 py-3 md:px-6">
          <Breadcrumbs />
        </div>
      </div>

      <section className="mx-auto w-full max-w-7xl px-4 py-6 md:px-6 md:py-10">
        {/* Steps */}
        <div className="mb-8 flex items-center justify-center">
          <div className="flex items-center gap-2 sm:gap-4">
            {[1, 2, 3].map((step) => (
              <div key={step} className="flex items-center gap-2 sm:gap-4">
                <div className="flex items-center gap-2">
                  <div className={cn(
                    "flex h-8 w-8 items-center justify-center border text-xs font-bold transition-all",
                    currentStep >= step
                      ? "border-[#d4541a] bg-[#d4541a] text-white"
                      : "border-white/20 bg-transparent text-white/40"
                  )}>
                    {currentStep > step ? <Check className="size-3.5" /> : step}
                  </div>
                  <span className={cn(
                    "text-xs font-medium uppercase tracking-wider hidden sm:block",
                    currentStep >= step ? "text-white" : "text-white/40"
                  )}>
                    {step === 1 ? "Informações" : step === 2 ? "Entrega" : "Pagamento"}
                  </span>
                </div>
                {step < 3 && (
                  <div className={cn(
                    "h-0.5 w-8 sm:w-12 transition-all",
                    currentStep > step ? "bg-[#d4541a]" : "bg-white/20"
                  )} />
                )}
              </div>
            ))}
          </div>
        </div>

        <div className="grid gap-6 lg:grid-cols-[1.25fr_1fr]">
          {/* Formulário */}
          <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
            {submitError ? <p className="text-sm text-red-400">{submitError}</p> : null}
            {/* Step 1 - Informações Pessoais */}
            <div className={cn(
              "border border-white/10 bg-[#0d1117] p-4 sm:p-6 transition-all",
              currentStep === 1 ? "opacity-100" : "opacity-60"
            )}>
              <h2 className="mb-4 flex items-center gap-2 text-lg font-semibold text-white">
                <User className="size-5 text-[#d4541a]" />
                Informações de contato
              </h2>
              
              <div className="space-y-4">
                <div>
                  <label className="mb-1.5 block text-xs font-medium uppercase tracking-wider text-white/60">
                    Nome completo *
                  </label>
                  <input
                    type="text"
                    value={formData.fullName}
                    onChange={(e) => handleInputChange("fullName", e.target.value)}
                    placeholder="Seu nome completo"
                    disabled={currentStep !== 1}
                    className={cn(
                      "h-12 w-full border bg-white/5 px-4 text-sm text-white placeholder:text-white/30 outline-none transition-all",
                      errors.fullName ? "border-red-500/50" : "border-white/10 focus:border-[#d4541a]/50",
                      currentStep !== 1 && "cursor-not-allowed"
                    )}
                  />
                  {errors.fullName && (
                    <p className="mt-1 text-xs text-red-400">{errors.fullName}</p>
                  )}
                </div>

                <div className="grid gap-4 sm:grid-cols-2">
                  <div>
                    <label className="mb-1.5 block text-xs font-medium uppercase tracking-wider text-white/60">
                      Email *
                    </label>
                    <div className="relative">
                      <Mail className="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-white/30" />
                      <input
                        type="email"
                        value={formData.email}
                        onChange={(e) => handleInputChange("email", e.target.value)}
                        placeholder="seu@email.com"
                        disabled={currentStep !== 1}
                        className={cn(
                          "h-12 w-full border bg-white/5 pl-10 pr-4 text-sm text-white placeholder:text-white/30 outline-none transition-all",
                          errors.email ? "border-red-500/50" : "border-white/10 focus:border-[#d4541a]/50",
                          currentStep !== 1 && "cursor-not-allowed"
                        )}
                      />
                    </div>
                    {errors.email && (
                      <p className="mt-1 text-xs text-red-400">{errors.email}</p>
                    )}
                  </div>

                  <div>
                    <label className="mb-1.5 block text-xs font-medium uppercase tracking-wider text-white/60">
                      Telefone *
                    </label>
                    <div className="relative">
                      <Phone className="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-white/30" />
                      <input
                        type="tel"
                        value={formData.phone}
                        onChange={(e) => handleInputChange("phone", e.target.value)}
                        placeholder="84 123 4567"
                        disabled={currentStep !== 1}
                        className={cn(
                          "h-12 w-full border bg-white/5 pl-10 pr-4 text-sm text-white placeholder:text-white/30 outline-none transition-all",
                          errors.phone ? "border-red-500/50" : "border-white/10 focus:border-[#d4541a]/50",
                          currentStep !== 1 && "cursor-not-allowed"
                        )}
                      />
                    </div>
                    {errors.phone && (
                      <p className="mt-1 text-xs text-red-400">{errors.phone}</p>
                    )}
                  </div>
                </div>

                {currentStep === 1 && (
                  <Button
                    type="button"
                    onClick={handleNextStep}
                    className="w-full h-12 bg-[#d4541a] text-sm font-semibold uppercase tracking-wider text-white hover:bg-[#e05e1e]"
                  >
                    Continuar para entrega
                    <ArrowRight className="ml-2 size-4" />
                  </Button>
                )}
              </div>
            </div>

            {/* Step 2 - Entrega */}
            <div className={cn(
              "border border-white/10 bg-[#0d1117] p-4 sm:p-6 transition-all",
              currentStep === 2 ? "opacity-100" : "opacity-60"
            )}>
              <h2 className="mb-4 flex items-center gap-2 text-lg font-semibold text-white">
                <Truck className="size-5 text-[#d4541a]" />
                Endereço de entrega
              </h2>
              
              <div className="space-y-4">
                <div>
                  <label className="mb-1.5 block text-xs font-medium uppercase tracking-wider text-white/60">
                    Endereço *
                  </label>
                  <div className="relative">
                    <MapPin className="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-white/30" />
                    <input
                      type="text"
                      value={formData.address}
                      onChange={(e) => handleInputChange("address", e.target.value)}
                      placeholder="Av. 24 de Julho, 1500"
                      disabled={currentStep !== 2}
                      className={cn(
                        "h-12 w-full border bg-white/5 pl-10 pr-4 text-sm text-white placeholder:text-white/30 outline-none transition-all",
                        errors.address ? "border-red-500/50" : "border-white/10 focus:border-[#d4541a]/50",
                        currentStep !== 2 && "cursor-not-allowed"
                      )}
                    />
                  </div>
                  {errors.address && (
                    <p className="mt-1 text-xs text-red-400">{errors.address}</p>
                  )}
                </div>

                <div className="grid gap-4 sm:grid-cols-2">
                  <div>
                    <label className="mb-1.5 block text-xs font-medium uppercase tracking-wider text-white/60">
                      Cidade *
                    </label>
                    <select
                      value={formData.city}
                      onChange={(e) => handleInputChange("city", e.target.value)}
                      disabled={currentStep !== 2}
                      className={cn(
                        "h-12 w-full border bg-white/5 px-4 text-sm text-white outline-none transition-all",
                        currentStep !== 2 && "cursor-not-allowed"
                      )}
                    >
                      <option value="Maputo" className="bg-[#0a0a0a]">Maputo</option>
                      <option value="Matola" className="bg-[#0a0a0a]">Matola</option>
                      <option value="Boane" className="bg-[#0a0a0a]">Boane</option>
                      <option value="Marracuene" className="bg-[#0a0a0a]">Marracuene</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="mb-1.5 block text-xs font-medium uppercase tracking-wider text-white/60">
                    Observações (opcional)
                  </label>
                  <textarea
                    value={formData.notes}
                    onChange={(e) => handleInputChange("notes", e.target.value)}
                    placeholder="Ponto de referência, instruções..."
                    disabled={currentStep !== 2}
                    className="h-20 w-full border border-white/10 bg-white/5 px-4 py-3 text-sm text-white placeholder:text-white/30 outline-none transition-all focus:border-[#d4541a]/50 resize-none"
                  />
                </div>

                {/* Opções de entrega */}
                <div className="space-y-2">
                  <label className="text-xs font-medium uppercase tracking-wider text-white/60">
                    Opção de entrega
                  </label>
                  <div className="space-y-2">
                    {DELIVERY_OPTIONS.map((option) => (
                      <label
                        key={option.value}
                        className={cn(
                          "flex items-center justify-between border p-3 cursor-pointer transition-all",
                          selectedDelivery === option.value
                            ? "border-[#d4541a] bg-[#d4541a]/10"
                            : "border-white/10 bg-white/5 hover:border-white/20",
                          currentStep !== 2 && "cursor-not-allowed opacity-60"
                        )}
                      >
                        <div className="flex items-center gap-3">
                          <input
                            type="radio"
                            name="delivery"
                            value={option.value}
                            checked={selectedDelivery === option.value}
                            onChange={() => setSelectedDelivery(option.value)}
                            disabled={currentStep !== 2}
                            className="h-4 w-4 border-white/20 bg-white/5 text-[#d4541a] focus:ring-[#d4541a]/30"
                          />
                          <div>
                            <p className="text-sm font-medium text-white">{option.label}</p>
                            <p className="text-xs text-white/50">{option.time}</p>
                          </div>
                        </div>
                        <span className="text-sm font-semibold text-white">
                          {option.price === 0 ? "Grátis" : formatMT(option.price)}
                        </span>
                      </label>
                    ))}
                  </div>
                </div>

                {currentStep === 2 && (
                  <div className="flex gap-3">
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => setCurrentStep(1)}
                      className="flex-1 h-12 border-white/15 bg-transparent text-sm font-semibold uppercase tracking-wider text-white hover:bg-white/5"
                    >
                      Voltar
                    </Button>
                    <Button
                      type="button"
                      onClick={handleNextStep}
                      className="flex-1 h-12 bg-[#d4541a] text-sm font-semibold uppercase tracking-wider text-white hover:bg-[#e05e1e]"
                    >
                      Continuar para pagamento
                    </Button>
                  </div>
                )}
              </div>
            </div>

            {/* Step 3 - Pagamento */}
            <div className={cn(
              "border border-white/10 bg-[#0d1117] p-4 sm:p-6 transition-all",
              currentStep === 3 ? "opacity-100" : "opacity-60"
            )}>
              <h2 className="mb-4 flex items-center gap-2 text-lg font-semibold text-white">
                <Lock className="size-5 text-[#d4541a]" />
                Método de pagamento
              </h2>
              
              <div className="space-y-3">
                {PAYMENT_METHODS.map((method) => {
                  const Icon = method.icon;
                  return (
                    <label
                      key={method.value}
                      className={cn(
                        "flex items-center border p-4 cursor-pointer transition-all",
                        selectedPayment === method.value
                          ? "border-[#d4541a] bg-[#d4541a]/10"
                          : "border-white/10 bg-white/5 hover:border-white/20",
                        currentStep !== 3 && "cursor-not-allowed opacity-60"
                      )}
                    >
                      <input
                        type="radio"
                        name="payment"
                        value={method.value}
                        checked={selectedPayment === method.value}
                        onChange={() => setSelectedPayment(method.value)}
                        disabled={currentStep !== 3}
                        className="h-4 w-4 border-white/20 bg-white/5 text-[#d4541a] focus:ring-[#d4541a]/30"
                      />
                      <div className="ml-3 flex items-center gap-3">
                        <div className="flex h-8 w-8 items-center justify-center border border-white/10 bg-white/5">
                          <Icon className="size-4 text-[#d4541a]" />
                        </div>
                        <div>
                          <p className="text-sm font-medium text-white">{method.label}</p>
                          <p className="text-xs text-white/50">{method.description}</p>
                        </div>
                      </div>
                    </label>
                  );
                })}
              </div>

              {/* Cupom de desconto */}
              <div className="mt-6 border-t border-white/10 pt-4">
                <label className="mb-2 block text-xs font-medium uppercase tracking-wider text-white/60">
                  Cupom de desconto
                </label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={couponCode}
                    onChange={(e) => setCouponCode(e.target.value)}
                    placeholder="BUILD10"
                    disabled={couponApplied || currentStep !== 3}
                    className="h-12 flex-1 border border-white/10 bg-white/5 px-4 text-sm text-white placeholder:text-white/30 outline-none focus:border-[#d4541a]/50 disabled:opacity-50"
                  />
                  <Button
                    type="button"
                    onClick={handleApplyCoupon}
                    disabled={!couponCode || couponApplied || currentStep !== 3}
                    className="h-12 px-6 bg-white/5 border border-white/10 text-sm font-medium text-white hover:bg-white/10 disabled:opacity-50"
                  >
                    Aplicar
                  </Button>
                </div>
                {couponApplied && (
                  <p className="mt-2 flex items-center gap-1 text-xs text-green-400">
                    <Check className="size-3" />
                    Cupom aplicado com sucesso!
                  </p>
                )}
                <p className="mt-2 text-[10px] text-white/30">
                  Use BUILD10 para 10% off ou FRETE para frete grátis
                </p>
              </div>

              {currentStep === 3 && (
                <div className="mt-6 flex gap-3">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => setCurrentStep(2)}
                    className="flex-1 h-12 border-white/15 bg-transparent text-sm font-semibold uppercase tracking-wider text-white hover:bg-white/5"
                  >
                    Voltar
                  </Button>
                  <Button
                    type="submit"
                    disabled={isLoading}
                    className="flex-1 h-12 bg-[#d4541a] text-sm font-semibold uppercase tracking-wider text-white hover:bg-[#e05e1e] disabled:opacity-50"
                  >
                    {isLoading ? (
                      <span className="flex items-center gap-2">
                        <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white" />
                        Processando...
                      </span>
                    ) : (
                      "Finalizar pedido"
                    )}
                  </Button>
                </div>
              )}
            </div>

            <div className="flex items-center gap-2 text-xs text-white/40">
              <Shield className="size-3" />
              Seus dados estão protegidos e seguros
            </div>
          </form>

          {/* Resumo do pedido */}
          <aside className="h-fit space-y-4">
            <div className="border border-white/10 bg-[#0d1117] p-6">
              <h2 className="mb-4 text-lg font-semibold text-white">Resumo do pedido</h2>
              
              <div className="max-h-80 space-y-3 overflow-y-auto">
                {items.map((item) => (
                  <div key={item.id} className="flex gap-3 border-b border-white/10 pb-3">
                    <div className="relative h-14 w-14 shrink-0 overflow-hidden bg-[#0a0e14]">
                      <Image
                        src={item.imageSrc}
                        alt={item.name}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-medium text-white">{item.name}</p>
                      <p className="text-xs text-white/50">{item.quantity} x {formatMT(item.price)}</p>
                    </div>
                    <p className="text-sm font-semibold text-white">
                      {formatMT(item.price * item.quantity)}
                    </p>
                  </div>
                ))}
              </div>

              <div className="mt-4 space-y-2 border-t border-white/10 pt-4">
                <div className="flex justify-between text-sm">
                  <span className="text-white/60">Subtotal</span>
                  <span className="text-white">{formatMT(subtotal)}</span>
                </div>
                
                <div className="flex justify-between text-sm">
                  <span className="text-white/60">Frete</span>
                  <span className="text-white">{shipping === 0 ? "Grátis" : formatMT(shipping)}</span>
                </div>

                {discount > 0 && (
                  <div className="flex justify-between text-sm">
                    <span className="text-green-400">Desconto</span>
                    <span className="text-green-400">-{formatMT(discount)}</span>
                  </div>
                )}

                <div className="flex justify-between border-t border-white/10 pt-3">
                  <span className="text-base font-semibold text-white">Total</span>
                  <span className="text-xl font-bold text-[#d4541a]">
                    {formatMT(total)}
                  </span>
                </div>
              </div>
            </div>

            {/* Informações adicionais */}
            <div className="border border-white/10 bg-[#0d1117] p-5">
              <div className="space-y-3">
                <div className="flex items-start gap-3">
                  <Truck className="size-4 text-[#d4541a] mt-0.5 shrink-0" />
                  <div>
                    <p className="text-xs font-medium text-white">Entrega estimada</p>
                    <p className="text-[10px] text-white/40">
                      {selectedDelivery === "express" ? "Amanhã" : "2-3 dias úteis"}
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Clock className="size-4 text-[#d4541a] mt-0.5 shrink-0" />
                  <div>
                    <p className="text-xs font-medium text-white">Processamento</p>
                    <p className="text-[10px] text-white/40">Pedidos são processados em até 2h</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <AlertCircle className="size-4 text-[#d4541a] mt-0.5 shrink-0" />
                  <div>
                    <p className="text-xs font-medium text-white">Precisa de ajuda?</p>
                    <p className="text-[10px] text-white/40">+258 84 123 4567</p>
                  </div>
                </div>
              </div>
            </div>
          </aside>
        </div>
      </section>

      <Footer />
    </main>
  );
}