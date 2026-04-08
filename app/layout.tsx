import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/home/Footer";
import Providers from "@/components/Providers";

export const metadata: Metadata = {
  title: "GaonToBharat – Fresh from Farm",
  description: "Pure. Raw. Direct from Farmers.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-white">
        <Providers>
          <Navbar />
          <main>{children}</main>
          <Footer />
        </Providers>
      </body>
    </html>
  );
}
