import type { Metadata } from "next";
import { Newsreader, Manrope } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/home/Footer";
import Providers from "@/components/Providers";

const newsreader = Newsreader({ 
  subsets: ["latin"], 
  variable: "--font-display",
  display: 'swap',
});

const manrope = Manrope({ 
  subsets: ["latin"], 
  variable: "--font-body",
  display: 'swap',
});

export const viewport = {
  width: "device-width",
  initialScale: 1,
};

export const metadata: Metadata = {
  title: "GaonToBharat – Fresh from Farm to Your Table",
  description: "Pure. Raw. Direct from Farmers. Bringing the soul of the Indian village back to your modern kitchen table.",
  keywords: ["organic food", "farm fresh", "indian agriculture", "direct from farmers", "healthy eating", "traditional indian food"],
  authors: [{ name: "GaonToBharat Team" }],
  icons: {
    icon: "/favicon.ico",
  },

  openGraph: {
    title: "GaonToBharat – Fresh from Farm",
    description: "Pure. Raw. Direct from Farmers.",
    url: "https://gaontobharat.com",
    siteName: "GaonToBharat",
    locale: "en_IN",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "GaonToBharat – Fresh from Farm",
    description: "Pure. Raw. Direct from Farmers.",
  },
};


export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${newsreader.variable} ${manrope.variable}`} suppressHydrationWarning>
      <head>
        <link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap" rel="stylesheet" />
      </head>
      <body className="min-h-screen bg-background text-foreground bg-surface font-body font-[family-name:var(--font-body)]" suppressHydrationWarning>
        <Providers>
          <Navbar />
          <main>{children}</main>
          <Footer />
        </Providers>
      </body>
    </html>
  );
}
