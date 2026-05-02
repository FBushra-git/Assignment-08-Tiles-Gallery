// src/app/layout.jsx — Root layout, wraps every page
import { Toaster } from "react-hot-toast";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import "./globals.css";

export const metadata = {
  title: "Tiles Gallery — Discover Your Perfect Aesthetic",
  description: "A curated gallery of premium tiles — ceramic, marble, terracotta, mosaic and more.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" data-theme="tileslight">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,600;0,700;1,400&family=DM+Sans:wght@300;400;500;600&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="bg-clay-50 text-clay-900 antialiased">
        {/* Global toast notifications */}
        <Toaster
          position="top-right"
          toastOptions={{
            style: { fontFamily: "'DM Sans',sans-serif", fontSize: "14px" },
            success: { iconTheme: { primary: "#b97035", secondary: "#fff" } },
          }}
        />
        <Navbar />
        <main className="min-h-screen">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
