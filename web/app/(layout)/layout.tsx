// app/layout.tsx

import type { Metadata, Viewport } from "next";
import { Geist_Mono, Inter, Syne } from "next/font/google";

import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { CartProvider } from "@/hooks/use-cart";
import { cn } from "@/lib/utils";

// Fontes
const fontSans = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
  weight: ["300", "400", "500", "600", "700"],
});

const fontHeading = Syne({
  subsets: ["latin"],
  variable: "--font-heading",
  display: "swap",
  weight: ["400", "500", "600", "700", "800"],
});

const fontMono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  display: "swap",
  weight: ["400", "500", "600"],
});

// Metadados
export const metadata: Metadata = {
  title: {
    default: "BuildEasy - Materiais de Construção",
    template: "%s | BuildEasy",
  },
  description:
    "Areia, brita, blocos, cimento e outros materiais de construção com entrega rápida em Maputo e arredores.",
  keywords: [
    "materiais de construção",
    "areia",
    "brita",
    "cimento",
    "blocos",
    "construção civil",
    "Maputo",
    "Moçambique",
  ],
  authors: [{ name: "BuildEasy" }],
  creator: "BuildEasy",
  publisher: "BuildEasy",
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL || "https://buildeasy.co.mz"
  ),
  openGraph: {
    title: "BuildEasy - Materiais de Construção",
    description: "Entrega rápida em Maputo e arredores",
    url: "/",
    siteName: "BuildEasy",
    locale: "pt_MZ",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "BuildEasy - Materiais de Construção",
    description: "Entrega rápida em Maputo e arredores",
  },
  robots: {
    index: true,
    follow: true,
  },
  icons: {
    icon: "/favicon.ico",
    apple: "/apple-touch-icon.png",
  },
};

export const viewport: Viewport = {
  themeColor: "#0a0a0a",
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="pt-MZ"
      suppressHydrationWarning
      className={cn(
        "scroll-smooth antialiased",
        fontSans.variable,
        fontHeading.variable,
        fontMono.variable
      )}
    >
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
      </head>
      <body className="min-h-svh bg-[#0a0a0a] font-sans text-white antialiased">
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem={false}
          disableTransitionOnChange
        >
          <CartProvider>
            {/* Skip link para acessibilidade */}
            <a
              href="#main-content"
              className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 z-50 bg-[#d4541a] px-4 py-2 text-sm font-medium text-white"
            >
              Pular para o conteúdo
            </a>

            {/* Conteúdo principal */}
            <div id="main-content" className="relative flex min-h-svh flex-col">
              {children}
            </div>

            {/* Toaster para notificações (opcional) */}
            {/* <Toaster position="bottom-right" /> */}
          </CartProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}