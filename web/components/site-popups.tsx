"use client"

import { useState } from "react"
import { X } from "lucide-react"

import { Button } from "@/components/ui/button"

const COOKIE_KEY = "be-cookie-consent"
const NEWSLETTER_KEY = "be-newsletter-dismissed"

export function SitePopups() {
  const [showCookies, setShowCookies] = useState(() => typeof window !== "undefined" && !localStorage.getItem(COOKIE_KEY))
  const [showNewsletter, setShowNewsletter] = useState(() => typeof window !== "undefined" && !localStorage.getItem(NEWSLETTER_KEY))
  const [email, setEmail] = useState("")
  const [message, setMessage] = useState("")

  const acceptCookies = () => {
    localStorage.setItem(COOKIE_KEY, "accepted")
    setShowCookies(false)
  }

  const closeNewsletter = () => {
    localStorage.setItem(NEWSLETTER_KEY, "closed")
    setShowNewsletter(false)
  }

  const rejectNewsletter = () => {
    localStorage.setItem(NEWSLETTER_KEY, "rejected")
    setShowNewsletter(false)
  }

  const submitNewsletter = () => {
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setMessage("Informe um email válido para receber novidades.")
      return
    }
    setMessage("Inscrição realizada com sucesso!")
    localStorage.setItem(NEWSLETTER_KEY, "subscribed")
    setTimeout(() => setShowNewsletter(false), 900)
  }

  return (
    <>
      {showNewsletter && (
        <div className="fixed inset-0 z-50 grid place-items-center bg-black/70 p-4">
          <div className="w-full max-w-md border border-white/20 bg-[#0d1117] p-6 text-white shadow-2xl">
            <button className="ml-auto block text-white/50 hover:text-white" onClick={closeNewsletter}>
              <X className="size-4" />
            </button>
            <p className="text-xs uppercase tracking-widest text-[#d4541a]">Newsletter</p>
            <h3 className="mt-2 text-2xl font-bold">Receba ofertas para sua obra</h3>
            <p className="mt-2 text-sm text-white/60">
              Promoções, tendências e novidades para construção civil toda semana.
            </p>
            <input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="seu@email.com"
              className="mt-4 h-11 w-full border border-white/20 bg-white/5 px-3 text-sm outline-none focus:border-[#d4541a]"
            />
            {message ? <p className="mt-2 text-xs text-white/70">{message}</p> : null}
            <div className="mt-4 grid grid-cols-2 gap-2">
              <Button variant="outline" className="border-white/20 bg-transparent text-white hover:bg-white/10" onClick={rejectNewsletter}>
                Rejeitar
              </Button>
              <Button className="bg-[#d4541a] hover:bg-[#e05e1e]" onClick={submitNewsletter}>
                Aceitar
              </Button>
            </div>
          </div>
        </div>
      )}

      {showCookies && (
        <div className="fixed right-4 bottom-4 z-40 max-w-md border border-white/15 bg-[#0d1117] p-4 text-white">
          <p className="text-sm font-semibold">Política de Cookies</p>
          <p className="mt-1 text-xs text-white/60">
            Utilizamos cookies para melhorar a navegação, personalizar ofertas e medir desempenho.
          </p>
          <Button className="mt-3 h-9 bg-[#d4541a] hover:bg-[#e05e1e]" onClick={acceptCookies}>
            Aceitar cookies
          </Button>
        </div>
      )}
    </>
  )
}
