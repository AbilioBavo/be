import { Header } from "@/components/header"
import { Footer } from "@/components/footer"

const noticias = [
  { t: "Alta de demanda por brita em Maputo", d: "O setor residencial impulsiona compras para fundações e lajes." },
  { t: "Como reduzir perdas na obra", d: "Boas práticas de armazenamento de areia e cimento." },
]

export default function NoticiasPage() {
  return <main className="min-h-svh bg-[#0a0a0a] text-white"><Header /><section className="mx-auto max-w-6xl px-6 py-14"><h1 className="text-4xl font-bold">Notícias e conteúdos</h1><div className="mt-8 space-y-4">{noticias.map((n)=><article key={n.t} className="border border-white/10 bg-[#0d1117] p-5"><h2 className="text-xl font-semibold">{n.t}</h2><p className="mt-2 text-white/60">{n.d}</p></article>)}</div></section><Footer /></main>
}
