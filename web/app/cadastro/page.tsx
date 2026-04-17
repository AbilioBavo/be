"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import {
  ArrowRight,
  Eye,
  EyeOff,
  Mail,
  Lock,
  User,
  Phone,
  Building2,
  MapPin,
  ChevronLeft,
  Check,
  Shield,
  Truck,
  Package,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const ACCOUNT_TYPES = [
  { value: "personal", label: "Pessoa Física", icon: User },
  { value: "business", label: "Empresa", icon: Building2 },
] as const;

export default function SignupPage() {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [accountType, setAccountType] = useState<"personal" | "business">("personal");
  const [step, setStep] = useState(1);
  
  // Form state
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    password: "",
    companyName: "",
    nuit: "",
    address: "",
    city: "Maputo",
  });

  const [acceptTerms, setAcceptTerms] = useState(false);
  const [acceptNewsletter, setAcceptNewsletter] = useState(true);

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (step === 1) {
      setStep(2);
      return;
    }
    
    setIsLoading(true);
    
    // Simular cadastro
    setTimeout(() => {
      setIsLoading(false);
      router.push("/");
    }, 1500);
  };

  const passwordStrength = () => {
    const { password } = formData;
    if (password.length === 0) return 0;
    if (password.length < 6) return 1;
    if (password.match(/[A-Z]/) && password.match(/[0-9]/)) return 3;
    if (password.match(/[A-Z]/) || password.match(/[0-9]/)) return 2;
    return 2;
  };

  const strengthLabel = ["", "Fraca", "Média", "Forte"];
  const strengthColor = ["", "bg-red-500", "bg-yellow-500", "bg-green-500"];

  return (
    <main className="relative grid min-h-svh bg-[#0a0a0a] text-white lg:grid-cols-2">
      {/* Botão Voltar */}
      <button
        onClick={() => step === 2 ? setStep(1) : router.back()}
        className="absolute top-6 left-6 z-20 flex items-center gap-1.5 text-sm text-white/50 transition-colors hover:text-white"
      >
        <ChevronLeft className="size-4" />
        {step === 2 ? "Voltar ao passo 1" : "Voltar"}
      </button>

      {/* Coluna do Formulário */}
      <section className="relative flex items-center justify-center p-6 lg:p-10">
        <div className="absolute top-0 left-0 h-px w-full bg-gradient-to-r from-transparent via-[#d4541a]/30 to-transparent lg:hidden" />
        
        <div className="w-full max-w-md">
          {/* Logo Mobile */}
          <Link href="/" className="mb-8 inline-block lg:hidden">
            <p className="font-[Syne] text-2xl font-bold tracking-tight text-white">
              Build<span className="text-[#d4541a]">Easy</span>
            </p>
          </Link>

          {/* Indicador de progresso */}
          <div className="mb-8 flex items-center gap-4">
            <div className="flex items-center gap-2">
              <div className={cn(
                "flex h-8 w-8 items-center justify-center border text-xs font-bold",
                step >= 1 ? "border-[#d4541a] bg-[#d4541a] text-white" : "border-white/20 bg-transparent text-white/40"
              )}>
                {step > 1 ? <Check className="size-4" /> : "1"}
              </div>
              <span className={cn(
                "text-xs font-medium uppercase tracking-wider",
                step >= 1 ? "text-white" : "text-white/40"
              )}>
                Conta
              </span>
            </div>
            <div className={cn(
              "h-0.5 w-12 transition-all",
              step >= 2 ? "bg-[#d4541a]" : "bg-white/20"
            )} />
            <div className="flex items-center gap-2">
              <div className={cn(
                "flex h-8 w-8 items-center justify-center border text-xs font-bold",
                step >= 2 ? "border-[#d4541a] bg-[#d4541a] text-white" : "border-white/20 bg-transparent text-white/40"
              )}>
                2
              </div>
              <span className={cn(
                "text-xs font-medium uppercase tracking-wider",
                step >= 2 ? "text-white" : "text-white/40"
              )}>
                Detalhes
              </span>
            </div>
          </div>

          <div className="space-y-6">
            {/* Cabeçalho */}
            <div>
              <div className="mb-3 flex items-center gap-2">
                <div className="h-5 w-0.5 bg-[#d4541a]" />
                <span className="text-xs font-semibold uppercase tracking-[0.2em] text-white/50">
                  {step === 1 ? "Comece agora" : "Quase lá"}
                </span>
              </div>
              <h1 className="text-4xl font-bold tracking-tight text-white">
                {step === 1 ? "Criar conta" : "Complete seu perfil"}
              </h1>
              <p className="mt-2 text-sm text-white/50">
                {step === 1 
                  ? "Junte-se a milhares de construtores e fornecedores."
                  : "Conte-nos mais sobre você para personalizarmos sua experiência."
                }
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              {step === 1 ? (
                <>
                  {/* Tipo de conta */}
                  <div className="space-y-2">
                    <label className="text-xs font-medium uppercase tracking-wider text-white/60">
                      Tipo de conta
                    </label>
                    <div className="grid grid-cols-2 gap-2">
                      {ACCOUNT_TYPES.map(({ value, label, icon: Icon }) => (
                        <button
                          key={value}
                          type="button"
                          onClick={() => setAccountType(value)}
                          className={cn(
                            "flex items-center justify-center gap-2 h-11 border text-xs font-medium uppercase tracking-wider transition-all",
                            accountType === value
                              ? "border-[#d4541a] bg-[#d4541a]/20 text-white"
                              : "border-white/10 bg-white/5 text-white/50 hover:border-white/20 hover:bg-white/10"
                          )}
                        >
                          <Icon className="size-3.5" />
                          {label}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Nome */}
                  <div className="space-y-1.5">
                    <label htmlFor="fullName" className="text-xs font-medium uppercase tracking-wider text-white/60">
                      {accountType === "business" ? "Nome da empresa" : "Nome completo"}
                    </label>
                    <div className="relative">
                      <User className="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-white/30" />
                      <input
                        id="fullName"
                        type="text"
                        value={accountType === "business" ? formData.companyName : formData.fullName}
                        onChange={(e) => handleInputChange(
                          accountType === "business" ? "companyName" : "fullName",
                          e.target.value
                        )}
                        placeholder={accountType === "business" ? "BuildEasy Lda." : "Seu nome completo"}
                        required
                        className="h-12 w-full border border-white/10 bg-white/5 pl-10 pr-4 text-sm text-white placeholder:text-white/30 outline-none transition-all focus:border-[#d4541a]/50 focus:bg-white/[0.07]"
                      />
                    </div>
                  </div>

                  {/* Email */}
                  <div className="space-y-1.5">
                    <label htmlFor="email" className="text-xs font-medium uppercase tracking-wider text-white/60">
                      Email
                    </label>
                    <div className="relative">
                      <Mail className="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-white/30" />
                      <input
                        id="email"
                        type="email"
                        value={formData.email}
                        onChange={(e) => handleInputChange("email", e.target.value)}
                        placeholder="contato@email.com"
                        required
                        className="h-12 w-full border border-white/10 bg-white/5 pl-10 pr-4 text-sm text-white placeholder:text-white/30 outline-none transition-all focus:border-[#d4541a]/50 focus:bg-white/[0.07]"
                      />
                    </div>
                  </div>

                  {/* Telefone */}
                  <div className="space-y-1.5">
                    <label htmlFor="phone" className="text-xs font-medium uppercase tracking-wider text-white/60">
                      Telefone
                    </label>
                    <div className="relative">
                      <Phone className="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-white/30" />
                      <input
                        id="phone"
                        type="tel"
                        value={formData.phone}
                        onChange={(e) => handleInputChange("phone", e.target.value)}
                        placeholder="84 123 4567"
                        required
                        className="h-12 w-full border border-white/10 bg-white/5 pl-10 pr-4 text-sm text-white placeholder:text-white/30 outline-none transition-all focus:border-[#d4541a]/50 focus:bg-white/[0.07]"
                      />
                    </div>
                  </div>

                  {/* Senha */}
                  <div className="space-y-1.5">
                    <label htmlFor="password" className="text-xs font-medium uppercase tracking-wider text-white/60">
                      Senha
                    </label>
                    <div className="relative">
                      <Lock className="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-white/30" />
                      <input
                        id="password"
                        type={showPassword ? "text" : "password"}
                        value={formData.password}
                        onChange={(e) => handleInputChange("password", e.target.value)}
                        placeholder="Mínimo 6 caracteres"
                        required
                        minLength={6}
                        className="h-12 w-full border border-white/10 bg-white/5 pl-10 pr-12 text-sm text-white placeholder:text-white/30 outline-none transition-all focus:border-[#d4541a]/50 focus:bg-white/[0.07]"
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute top-1/2 right-3 -translate-y-1/2 text-white/30 transition-colors hover:text-white/60"
                      >
                        {showPassword ? (
                          <EyeOff className="size-4" />
                        ) : (
                          <Eye className="size-4" />
                        )}
                      </button>
                    </div>
                    
                    {/* Indicador de força da senha */}
                    {formData.password && (
                      <div className="mt-2 space-y-1">
                        <div className="flex gap-1">
                          {[1, 2, 3].map((level) => (
                            <div
                              key={level}
                              className={cn(
                                "h-1 flex-1 transition-all",
                                passwordStrength() >= level
                                  ? strengthColor[passwordStrength()]
                                  : "bg-white/10"
                              )}
                            />
                          ))}
                        </div>
                        <p className={cn(
                          "text-[10px]",
                          passwordStrength() === 3 ? "text-green-400" : "text-white/40"
                        )}>
                          {strengthLabel[passwordStrength()]}
                        </p>
                      </div>
                    )}
                  </div>
                </>
              ) : (
                <>
                  {/* Passo 2 - Informações adicionais */}
                  {accountType === "business" && (
                    <div className="space-y-1.5">
                      <label htmlFor="nuit" className="text-xs font-medium uppercase tracking-wider text-white/60">
                        NUIT
                      </label>
                      <input
                        id="nuit"
                        type="text"
                        value={formData.nuit}
                        onChange={(e) => handleInputChange("nuit", e.target.value)}
                        placeholder="123456789"
                        className="h-12 w-full border border-white/10 bg-white/5 px-4 text-sm text-white placeholder:text-white/30 outline-none transition-all focus:border-[#d4541a]/50 focus:bg-white/[0.07]"
                      />
                    </div>
                  )}

                  <div className="space-y-1.5">
                    <label htmlFor="address" className="text-xs font-medium uppercase tracking-wider text-white/60">
                      Endereço
                    </label>
                    <div className="relative">
                      <MapPin className="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-white/30" />
                      <input
                        id="address"
                        type="text"
                        value={formData.address}
                        onChange={(e) => handleInputChange("address", e.target.value)}
                        placeholder="Av. 24 de Julho, 1500"
                        className="h-12 w-full border border-white/10 bg-white/5 pl-10 pr-4 text-sm text-white placeholder:text-white/30 outline-none transition-all focus:border-[#d4541a]/50 focus:bg-white/[0.07]"
                      />
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <label htmlFor="city" className="text-xs font-medium uppercase tracking-wider text-white/60">
                      Cidade
                    </label>
                    <select
                      id="city"
                      value={formData.city}
                      onChange={(e) => handleInputChange("city", e.target.value)}
                      className="h-12 w-full border border-white/10 bg-white/5 px-4 text-sm text-white outline-none transition-all focus:border-[#d4541a]/50"
                    >
                      <option value="Maputo" className="bg-[#0a0a0a]">Maputo</option>
                      <option value="Matola" className="bg-[#0a0a0a]">Matola</option>
                      <option value="Boane" className="bg-[#0a0a0a]">Boane</option>
                      <option value="Marracuene" className="bg-[#0a0a0a]">Marracuene</option>
                    </select>
                  </div>

                  {/* Termos */}
                  <div className="space-y-3 pt-2">
                    <label className="flex items-start gap-3 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={acceptTerms}
                        onChange={(e) => setAcceptTerms(e.target.checked)}
                        className="mt-0.5 h-4 w-4 border-white/20 bg-white/5 text-[#d4541a] focus:ring-[#d4541a]/30"
                      />
                      <span className="text-xs text-white/60">
                        Eu li e concordo com os{" "}
                        <Link href="/termos" className="text-[#d4541a] hover:underline">
                          Termos de Uso
                        </Link>{" "}
                        e{" "}
                        <Link href="/privacidade" className="text-[#d4541a] hover:underline">
                          Política de Privacidade
                        </Link>
                      </span>
                    </label>

                    <label className="flex items-start gap-3 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={acceptNewsletter}
                        onChange={(e) => setAcceptNewsletter(e.target.checked)}
                        className="mt-0.5 h-4 w-4 border-white/20 bg-white/5 text-[#d4541a] focus:ring-[#d4541a]/30"
                      />
                      <span className="text-xs text-white/60">
                        Desejo receber ofertas exclusivas e novidades por email
                      </span>
                    </label>
                  </div>
                </>
              )}

              {/* Botão */}
              <Button
                type="submit"
                disabled={step === 2 && !acceptTerms}
                className="group relative w-full h-12 bg-[#d4541a] text-sm font-semibold uppercase tracking-wider text-white overflow-hidden transition-all hover:bg-[#e05e1e] disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isLoading ? (
                  <span className="flex items-center gap-2">
                    <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white" />
                    Criando conta...
                  </span>
                ) : (
                  <span className="flex items-center justify-center gap-2">
                    {step === 1 ? "Continuar" : "Finalizar cadastro"}
                    <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
                  </span>
                )}
              </Button>
            </form>

            {/* Link para login */}
            <p className="text-center text-sm text-white/50">
              Já tem uma conta?{" "}
              <Link
                href="/login"
                className="font-medium text-[#d4541a] transition-colors hover:text-[#e05e1e]"
              >
                Entrar
              </Link>
            </p>
          </div>
        </div>
      </section>

      {/* Coluna da Imagem */}
      <section className="relative hidden bg-[url('/hero-canteiro.jpg')] bg-cover bg-center lg:block">
        <div className="absolute inset-0 bg-gradient-to-br from-[#0a0e17]/90 via-[#0a0e17]/60 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
        
        <div className="relative flex h-full flex-col justify-between p-10">
          <Link href="/" className="inline-block">
            <p className="font-[Syne] text-3xl font-bold tracking-tight text-white">
              Build<span className="text-[#d4541a]">Easy</span>
            </p>
            <p className="mt-1 text-xs uppercase tracking-[0.1em] text-white/40">
              Areia · Pedra · Cimento
            </p>
          </Link>

          <div className="max-w-lg space-y-6">
            <h2 className="text-5xl font-bold leading-tight text-white">
              Comece a construir
              <span className="block text-3xl font-normal text-white/70 mt-2">
                com a BuildEasy
              </span>
            </h2>
            
            <div className="space-y-3">
              {[
                { icon: Truck, text: "Entrega rápida em 24h" },
                { icon: Shield, text: "Produtos de qualidade garantida" },
                { icon: Package, text: "Mais de 100 produtos disponíveis" },
              ].map(({ icon: Icon, text }) => (
                <div key={text} className="flex items-center gap-3">
                  <div className="flex h-8 w-8 items-center justify-center border border-[#d4541a]/30 bg-[#d4541a]/10">
                    <Icon className="size-4 text-[#d4541a]" />
                  </div>
                  <span className="text-sm text-white/70">{text}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="border-l-2 border-[#d4541a] pl-4">
            <p className="text-sm italic text-white/60">
              "Cadastro simples e rápido. Já fiz várias compras 
              e sempre fui bem atendido."
            </p>
            <p className="mt-2 text-xs font-medium text-white/80">
              — João S., Cliente desde 2025
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}