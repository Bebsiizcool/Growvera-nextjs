import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";
import { CartProvider } from "../components/context/CartContext";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import CartDrawer from "../components/CartDrawer";
import CheckoutModal from "../components/CheckoutModal";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const playfair = Playfair_Display({ subsets: ["latin"], variable: "--font-playfair" });

export const metadata = {
  title: "Growvera | Premium Botanical Hair Oil & Face Gel",
  description: "Elevate your daily routine with Growvera's signature botanical Hair Oil and Face Gel. Experience premium natural ingredients for stronger roots, calmer skin, and a luxurious finish.",
  openGraph: {
    title: "Growvera | Premium Botanical Hair Oil & Face Gel",
    description: "Elevate your daily routine with Growvera's signature botanical Hair Oil and Face Gel. Experience premium natural ingredients for stronger roots, calmer skin, and a luxurious finish.",
    siteName: "Growvera",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Growvera - Premium Botanical Hair Oil & Face Gel",
      },
    ],
    locale: "en_PK",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Growvera | Premium Botanical Hair Oil & Face Gel",
    description: "Elevate your daily routine with Growvera's signature botanical Hair Oil and Face Gel. Experience premium natural ingredients for stronger roots, calmer skin, and a luxurious finish.",
    images: ["/og-image.png"],
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${inter.variable} ${playfair.variable}`}>
        <CartProvider>
          <div className="ambient-orbs" aria-hidden="true">
            <div className="orb orb--green"></div>
            <div className="orb orb--gold"></div>
            <div className="orb orb--emerald"></div>
          </div>
          <div className="grain-overlay" aria-hidden="true"></div>

          <Navbar />
          <main>{children}</main>
          <Footer />

          <CartDrawer />
          <CheckoutModal />
        </CartProvider>
      </body>
    </html>
  );
}
