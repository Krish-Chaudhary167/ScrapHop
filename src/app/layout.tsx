import type { Metadata } from "next";
import "./globals.css";
import { AppProvider } from "@/context/AppContext";
import Navbar from "@/components/Navbar";
import OrderAcceptanceNotifier from "@/components/OrderAcceptanceNotifier";

export const metadata: Metadata = {
  title: "ScrapHop – Turn Your Trash Into Cash",
  description:
    "Upload photos of your scrap, get instant AI pricing, and connect with nearby collectors for hassle-free pickup.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="h-full">
      <body className="min-h-full flex flex-col bg-white dark:bg-gray-950 text-gray-900 dark:text-gray-100 transition-colors">
        <AppProvider>
          {/* ── Navbar with Language & Night Mode ── */}
          <Navbar />

          {/* ── Global Order Acceptance Pop-up Notifier ── */}
          <OrderAcceptanceNotifier />

          {/* Page content */}
          <main className="flex-1">{children}</main>

          {/* ── Footer ── */}
          <footer className="bg-gray-50 dark:bg-gray-900 border-t border-gray-100 dark:border-gray-800 py-8 transition-colors">
            <div className="max-w-6xl mx-auto px-6 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="flex items-center gap-2">
                <span className="text-lg">♻️</span>
                <span className="font-semibold text-gray-800 dark:text-gray-200">ScrapHop</span>
              </div>
              <p className="text-sm text-gray-400 dark:text-gray-500">
                © 2026 ScrapHop. Built for a cleaner India.
              </p>
              <div className="flex gap-6 text-sm text-gray-500 dark:text-gray-400">
                <a href="#" className="hover:text-emerald-600 dark:hover:text-emerald-400 transition">Privacy</a>
                <a href="#" className="hover:text-emerald-600 dark:hover:text-emerald-400 transition">Terms</a>
                <a href="#" className="hover:text-emerald-600 dark:hover:text-emerald-400 transition">Contact</a>
              </div>
            </div>
          </footer>
        </AppProvider>
      </body>
    </html>
  );
}
