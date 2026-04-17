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
  ChevronLeft,
  Shield,
  Truck,
  Package,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export default function LoginPage() {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Simular login
    setTimeout(() => {
      setIsLoading(false);
      router.push("/");
    }, 1500);
  };

  return (
    <main className="relative grid min-h-svh bg-[#0a0a0a] text-white lg:grid-cols-2">
      {/* Botão Voltar */}
      <button
        onClick={() => router.back()}
        className="absolute top-6 left-6 z-20 flex items-center gap-1.5 text-sm text-white/50 transition-colors hover:text-white lg:hidden"
      >
        <ChevronLeft className="size-4" />
        Voltar
      </button>

      {/* Coluna do Formulário */}
      <section className="relative flex items-center justify-center p-6 lg:p-10">
        {/* Elementos decorativos */}
        <div className="absolute top-0 left-0 h-px w-full bg-gradient-to-r from-transparent via-[#d4541a]/30 to-transparent lg:hidden" />
        
        <div className="w-full max-w-md">
          {/* Logo Mobile */}
          <Link href="/" className="mb-8 inline-block lg:hidden">
            <p className="font-[Syne] text-2xl font-bold tracking-tight text-white">
              Build<span className="text-[#d4541a]">Easy</span>
            </p>
          </Link>

          <div className="space-y-6">
            {/* Cabeçalho */}
            <div>
              <div className="mb-3 flex items-center gap-2">
                <div className="h-5 w-0.5 bg-[#d4541a]" />
                <span className="text-xs font-semibold uppercase tracking-[0.2em] text-white/50">
                  Bem-vindo de volta
                </span>
              </div>
              <h1 className="text-4xl font-bold tracking-tight text-white">
                Entrar na conta
              </h1>
              <p className="mt-2 text-sm text-white/50">
                Acesse sua conta para acompanhar pedidos, favoritos e muito mais.
              </p>
            </div>

            {/* Formulário */}
            <form onSubmit={handleSubmit} className="space-y-4">
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
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="seu@email.com"
                    required
                    className="h-12 w-full border border-white/10 bg-white/5 pl-10 pr-4 text-sm text-white placeholder:text-white/30 outline-none transition-all focus:border-[#d4541a]/50 focus:bg-white/[0.07]"
                  />
                </div>
              </div>

              {/* Senha */}
              <div className="space-y-1.5">
                <div className="flex items-center justify-between">
                  <label htmlFor="password" className="text-xs font-medium uppercase tracking-wider text-white/60">
                    Senha
                  </label>
                  <Link
                    href="/recuperar-senha"
                    className="text-[10px] font-medium uppercase tracking-wider text-[#d4541a] transition-colors hover:text-[#e05e1e]"
                  >
                    Esqueceu?
                  </Link>
                </div>
                <div className="relative">
                  <Lock className="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-white/30" />
                  <input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    required
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
              </div>

              {/* Lembrar-me */}
              <div className="flex items-center justify-between">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={rememberMe}
                    onChange={(e) => setRememberMe(e.target.checked)}
                    className="h-4 w-4 border-white/20 bg-white/5 text-[#d4541a] focus:ring-[#d4541a]/30"
                  />
                  <span className="text-xs text-white/60">Lembrar-me</span>
                </label>
              </div>

              {/* Botão */}
              <Button
                type="submit"
                disabled={isLoading}
                className="group relative w-full h-12 bg-[#d4541a] text-sm font-semibold uppercase tracking-wider text-white overflow-hidden transition-all hover:bg-[#e05e1e] disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isLoading ? (
                  <span className="flex items-center gap-2">
                    <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white" />
                    Entrando...
                  </span>
                ) : (
                  <span className="flex items-center justify-center gap-2">
                    Entrar
                    <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
                  </span>
                )}
              </Button>
            </form>

            {/* Separador */}
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-white/10" />
              </div>
              <div className="relative flex justify-center text-xs">
                <span className="bg-[#0a0a0a] px-3 text-white/40">ou continue com</span>
              </div>
            </div>

            {/* Login Social */}
            <div className="grid grid-cols-2 gap-3">
              <button className="flex h-11 items-center justify-center gap-2 border border-white/10 bg-white/5 text-sm text-white/70 transition-all hover:border-white/20 hover:bg-white/10">
                <svg className="size-4" viewBox="0 0 24 24">
                  <path
                    fill="currentColor"
                    d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                  />
                  <path
                    fill="currentColor"
                    d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                  />
                  <path
                    fill="currentColor"
                    d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                  />
                  <path
                    fill="currentColor"
                    d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                  />
                </svg>
                Google
              </button>
              <button className="flex h-11 items-center justify-center gap-2 border border-white/10 bg-white/5 text-sm text-white/70 transition-all hover:border-white/20 hover:bg-white/10">
                <svg className="size-4" viewBox="0 0 24 24">
                  <path
                    fill="currentColor"
                    d="M12 2C6.477 2 2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.879V14.89h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.989C18.343 21.129 22 16.99 22 12c0-5.523-4.477-10-10-10z"
                  />
                </svg>
                Facebook
              </button>
            </div>

            {/* Link para cadastro */}
            <p className="text-center text-sm text-white/50">
              Ainda não tem conta?{" "}
              <Link
                href="/cadastro"
                className="font-medium text-[#d4541a] transition-colors hover:text-[#e05e1e]"
              >
                Criar conta gratuita
              </Link>
            </p>
          </div>

          {/* Termos */}
          <p className="mt-8 text-center text-[10px] text-white/30">
            Ao entrar, você concorda com nossos{" "}
            <Link href="/termos" className="underline transition-colors hover:text-white/50">
              Termos de Uso
            </Link>{" "}
            e{" "}
            <Link href="/privacidade" className="underline transition-colors hover:text-white/50">
              Política de Privacidade
            </Link>
          </p>
        </div>
      </section>

      {/* Coluna da Imagem */}
      <section className="relative hidden bg-[url('/hero-canteiro.jpg')] bg-cover bg-center lg:block">
        {/* Overlay gradiente */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#0a0e17]/90 via-[#0a0e17]/60 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
        
        {/* Conteúdo */}
        <div className="relative flex h-full flex-col justify-between p-10">
          {/* Logo */}
          <Link href="/" className="inline-block">
            <p className="font-[Syne] text-3xl font-bold tracking-tight text-white">
              Build<span className="text-[#d4541a]">Easy</span>
            </p>
            <p className="mt-1 text-xs uppercase tracking-[0.1em] text-white/40">
              Areia · Pedra · Cimento
            </p>
          </Link>

          {/* Texto principal */}
          <div className="max-w-lg space-y-6">
            <h2 className="text-5xl font-bold leading-tight text-white">
              Materiais de qualidade
              <span className="block text-3xl font-normal text-white/70 mt-2">
                para sua construção
              </span>
            </h2>
            
            {/* Features */}
            <div className="flex gap-8">
              <div className="flex items-center gap-2">
                <Truck className="size-5 text-[#d4541a]" />
                <span className="text-sm text-white/70">Entrega 24h</span>
              </div>
              <div className="flex items-center gap-2">
                <Shield className="size-5 text-[#d4541a]" />
                <span className="text-sm text-white/70">Qualidade garantida</span>
              </div>
              <div className="flex items-center gap-2">
                <Package className="size-5 text-[#d4541a]" />
                <span className="text-sm text-white/70">+100 produtos</span>
              </div>
            </div>
          </div>

          {/* Depoimento */}
          <div className="max-w-md border-l-2 border-[#d4541a] pl-4">
            <p className="text-sm italic text-white/60">
              "A BuildEasy transformou a forma como compramos materiais. 
              Entrega rápida e preços justos."
            </p>
            <p className="mt-2 text-xs font-medium text-white/80">
              — Carlos M., Construtor
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}