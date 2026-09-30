import type { Metadata } from "next";
import { Cormorant_Garamond, Manrope } from "next/font/google";
import "./globals.css";
import { AppProvider } from "@/context/AppContext";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { MobileBottomNav } from "@/components/layout/MobileBottomNav";
import { CartDrawer } from "@/components/cart/CartDrawer";
import { SearchModal } from "@/components/search/SearchModal";

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  variable: "--font-cormorant",
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

const manrope = Manrope({
  subsets: ["latin"],
  variable: "--font-manrope",
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "ÉLANE — Haute Beauté & Grooming Atelier | Malta",
  description:
    "Luxury European hair architecture, balayage, dermal therapies, and bespoke men's grooming in Sliema, Malta. In-salon & home service appointments.",
  keywords: [
    "Malta salon",
    "Sliema hair salon",
    "Luxury balayage Malta",
    "Men's grooming Malta",
    "Bridal makeup Malta",
    "Home salon service Malta",
    "ÉLANE Atelier",
  ],
  authors: [{ name: "ÉLANE Atelier Team" }],
  openGraph: {
    title: "ÉLANE — Haute Beauté & Grooming Atelier | Malta",
    description:
      "Craftsmanship, individuality, and European luxury. Book signature balayage, precision haircutting, and aesthetic therapies in Sliema or at your residence.",
    locale: "en_MT",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${cormorant.variable} ${manrope.variable}`}>
      <body className="min-h-screen flex flex-col bg-[#FAF7F2] text-charcoal font-sans antialiased selection:bg-sand selection:text-charcoal pb-16 lg:pb-0">
        <AppProvider>
          <Navbar />
          <main className="flex-1">{children}</main>
          <Footer />
          <MobileBottomNav />
          <CartDrawer />
          <SearchModal />
        </AppProvider>
      </body>
    </html>
  );
}
