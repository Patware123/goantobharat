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

export const metadata: Metadata = {
  title: "GaonToBharat – Fresh from Farm",
  description: "Pure. Raw. Direct from Farmers.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${newsreader.variable} ${manrope.variable}`}>
      <body className="min-h-screen bg-background text-foreground bg-surface font-body font-[family-name:var(--font-body)]">
        <Providers>
          <Navbar />
          <main>{children}</main>
          <Footer />
        </Providers>
      </body>
    </html>
  );
}
