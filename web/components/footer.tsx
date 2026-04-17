// components/footer.tsx

import Link from "next/link";
import {
  ArrowUpRight,
  Mail,
  MapPin,
  Phone,
  X,
} from "lucide-react";
import { Input } from "@/components/ui/input";

// SVG para LinkedIn (caso não tenha o ícone)
const LinkedinIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
  </svg>
);

const footerLinks = {
  empresa: {
    title: "Empresa",
    links: [
      { label: "Sobre nós", href: "/sobre" },
      { label: "Carreiras", href: "/carreiras" },
      { label: "Notícias", href: "/noticias" },
    ],
  },
  contacto: {
    title: "Contacto",
    links: [
      { label: "+258 84 123 4567", href: "tel:+258841234567", icon: Phone },
      { label: "contato@buildeasy.co.mz", href: "mailto:contato@buildeasy.co.mz", icon: Mail },
      { label: "Av. 24 de Julho, 1500, Maputo", href: "#", icon: MapPin },
    ],
  },
};

const socialLinks = [
  { icon: X, href: "#", label: "X (Twitter)" },
  { icon: LinkedinIcon, href: "#", label: "LinkedIn" },
];

export function Footer() {
  return (
    <footer className="relative border-t border-white/10 bg-[#0a0e17]">
      {/* Gradiente decorativo superior */}
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#d4541a]/30 to-transparent" />

      {/* Links principais */}
      <div className="mx-auto w-full max-w-7xl px-6 py-16">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-2 lg:grid-cols-4">
          
          {/* Coluna da marca */}
          <div className="col-span-1">
            <Link href="/" className="inline-block">
              <p className="font-[Syne] text-2xl font-bold tracking-tight text-white">
                Build<span className="text-[#d4541a]">Easy</span>
              </p>
              <p className="mt-1 text-xs uppercase tracking-[0.05em] text-white/40">
                Areia · Pedra
              </p>
            </Link>
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-white/60">
              Conectando construtores aos melhores fornecedores de materiais.
            </p>
          </div>

          {/* Coluna Empresa */}
          <div className="col-span-1">
            <h4 className="mb-4 text-sm font-semibold uppercase tracking-wider text-white">
              {footerLinks.empresa.title}
            </h4>
            <ul className="space-y-3">
              {footerLinks.empresa.links.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-sm text-white/55 transition-colors hover:text-white"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Coluna Contacto */}
          <div className="col-span-1">
            <h4 className="mb-4 text-sm font-semibold uppercase tracking-wider text-white">
              {footerLinks.contacto.title}
            </h4>
            <ul className="space-y-3">
              {footerLinks.contacto.links.map((link) => {
                const Icon = link.icon;
                return (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="flex items-start gap-3 text-sm text-white/55 transition-colors hover:text-white"
                    >
                      {Icon && <Icon className="mt-0.5 size-3.5 shrink-0 text-[#d4541a]" />}
                      <span>{link.label}</span>
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>

          {/* Coluna Newsletter - Alinhada com as outras */}
          <div className="col-span-1">
            <h4 className="mb-4 text-sm font-semibold uppercase tracking-wider text-white">
              Newsletter
            </h4>
            <p className="mb-3 text-xs text-white/50">
              Receba ofertas exclusivas e novidades em primeira mão.
            </p>
            <div className="relative">
              <Input
                type="email"
                placeholder="Seu melhor e-mail"
                className="h-10 w-full border-white/15 bg-white/5 pr-10 text-sm text-white placeholder:text-white/40 focus:border-[#d4541a]/50"
              />
              <button
                type="submit"
                className="absolute top-1/2 right-3 -translate-y-1/2 text-white/40 transition-colors hover:text-[#d4541a]"
                aria-label="Inscrever newsletter"
              >
                <ArrowUpRight className="size-4 color-[#d4541a]" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Barra inferior com redes sociais no centro */}
      <div className="border-t border-white/10 bg-black/20">
        <div className="mx-auto flex w-full max-w-7xl flex-col items-center gap-5 px-6 py-6">
          
          {/* Redes sociais centralizadas */}
          <div className="flex gap-3">
            {socialLinks.map(({ icon: Icon, href, label }) => (
              <Link
                key={label}
                href={href}
                className="flex h-9 w-9 items-center justify-center rounded-full border border-white/10 bg-white/5 text-white/60 transition-all hover:border-[#d4541a]/50 hover:bg-[#d4541a]/10 hover:text-white"
                aria-label={label}
              >
                <Icon className="size-4" />
              </Link>
            ))}
          </div>

          {/* Copyright e links legais */}
          <div className="flex w-full flex-col items-center justify-between gap-4 text-center text-sm sm:flex-row sm:text-left">
            <p className="text-white/45">
              © {new Date().getFullYear()} BuildEasy. Todos os direitos reservados.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2">
              <Link href="/termos" className="text-white/45 transition-colors hover:text-white/80">
                Termos
              </Link>
              <Link href="/privacidade" className="text-white/45 transition-colors hover:text-white/80">
                Privacidade
              </Link>
              <Link href="/cookies" className="text-white/45 transition-colors hover:text-white/80">
                Cookies
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}