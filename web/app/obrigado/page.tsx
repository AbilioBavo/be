import Link from "next/link"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"

export default function ObrigadoPage() {
  return <main className="min-h-svh bg-[#0a0a0a] text-white"><Header /><section className="mx-auto max-w-3xl px-6 py-20 text-center"><h1 className="text-4xl font-bold">Pedido confirmado!</h1><p className="mt-3 text-white/60">Seu checkout foi processado com sucesso.</p><Button className="mt-6 bg-[#d4541a]" asChild><Link href="/perfil/pedidos">Ver meus pedidos</Link></Button></section><Footer /></main>
}
