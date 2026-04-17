import type { Metadata, Viewport } from "next";
import { Geist_Mono, Inter } from "next/font/google";

import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { CartProvider } from "@/hooks/use-cart";
import { cn } from "@/lib/utils";

// Configuração das fontes
const fontHeading = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-heading",
  display: "swap",
  weight: ["400", "500", "600", "700"],
});

const fontSans = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
  weight: ["300", "400", "500", "600", "700"],
});

const fontMono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  display: "swap",
  weight: ["400", "500", "600"],
});

// Metadados da aplicação
export const metadata: Metadata = {
  title: {
    default: "BuildEasy - Materiais de Construção",
    template: "%s | BuildEasy",
  },
  description:
    "Areia, brita, blocos, cimento e outros materiais de construção com entrega rápida em Maputo e arredores. Qualidade garantida e os melhores preços.",
  keywords: [
    "materiais de construção",
    "areia",
    "brita",
    "cimento",
    "blocos",
    "construção civil",
    "Maputo",
    "Moçambique",
    "BuildEasy",
  ],
  authors: [{ name: "BuildEasy", url: "https://buildeasy.co.mz" }],
  creator: "BuildEasy",
  publisher: "BuildEasy",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL("https://buildeasy.co.mz"),
  alternates: {
    canonical: "/",
    languages: {
      "pt-MZ": "/",
    },
  },
  openGraph: {
    title: "BuildEasy - Materiais de Construção",
    description:
      "Areia, brita, blocos, cimento e outros materiais de construção com entrega rápida em Maputo e arredores.",
    url: "https://buildeasy.co.mz",
    siteName: "BuildEasy",
    locale: "pt_MZ",
    type: "website",
    images: [
      {
        url: "https://buildeasy.co.mz/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "BuildEasy - Materiais de Construção",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "BuildEasy - Materiais de Construção",
    description:
      "Areia, brita, blocos, cimento e outros materiais de construção com entrega rápida.",
    images: ["https://buildeasy.co.mz/og-image.jpg"],
    creator: "@buildeasy",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  icons: {
    icon: [
      { url: "/favicon.ico" },
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
    ],
    apple: [
      { url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" },
    ],
    other: [
      {
        rel: "mask-icon",
        url: "/safari-pinned-tab.svg",
        color: "#d4541a",
      },
    ],
  },
  manifest: "/site.webmanifest",
  category: "e-commerce",
};

// Configuração do viewport
export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#0a0a0a" },
  ],
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  userScalable: true,
  viewportFit: "cover",
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
        "antialiased",
        fontSans.variable,
        fontHeading.variable,
        fontMono.variable,
        "scroll-smooth"
      )}
    >
      <head>
        {/* Preconnect para domínios externos */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        
        {/* Meta tags adicionais */}
        <meta name="theme-color" content="#0a0a0a" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
        <meta name="format-detection" content="telephone=no" />
        <meta name="msapplication-TileColor" content="#d4541a" />
      </head>
      <body className="min-h-svh bg-background font-sans text-foreground antialiased">
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem={false}
          disableTransitionOnChange
        >
          <CartProvider>
            {/* Skip to content link para acessibilidade */}
            <a
              href="#main-content"
              className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 z-50 bg-[#d4541a] text-white px-4 py-2 text-sm font-medium"
            >
              Pular para o conteúdo principal
            </a>
            
            <main id="main-content">{children}</main>
          </CartProvider>
        </ThemeProvider>
        
        {/* Script para análise (opcional) */}
        {process.env.NODE_ENV === "production" && (
          <script
            defer
            data-domain="buildeasy.co.mz"
            src="https://plausible.io/js/script.js"
          />
        )}
      </body>
    </html>
  );
}