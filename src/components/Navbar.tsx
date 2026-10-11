"use client";

import HeaderControls from "./HeaderControls";
import { useApp } from "@/context/AppContext";

export default function Navbar() {
  const { t, user } = useApp();

  return (
    <header className="sticky top-0 z-50 bg-white dark:bg-gray-900 border-b border-gray-100 dark:border-gray-800 transition-colors">
      <nav className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
        {/* Logo */}
        <a href="/" className="flex items-center gap-2">
          <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
            <circle cx="14" cy="14" r="14" fill="#10B981" />
            <path
              d="M14 6C10.13 6 7 9.13 7 13s3.13 7 7 7 7-3.13 7-7-3.13-7-7-7zm0 2c.74 0 1.44.17 2.08.46l-1.45 1.45A2.98 2.98 0 0014 9.5a3 3 0 00-3 3c0 .2.02.4.06.59l-1.45 1.45A4.94 4.94 0 019 13c0-2.76 2.24-5 5-5zm0 10c-.74 0-1.44-.17-2.08-.46l1.45-1.45c.19.04.39.06.59.06a3 3 0 003-3.09l1.45-1.45c.29.64.46 1.34.46 2.08A5.02 5.02 0 0114 18z"
              fill="white"
            />
          </svg>
          <span className="text-xl font-bold text-gray-900 dark:text-white">
            ScrapHop
          </span>
        </a>

        {/* Right side controls & links */}
        <div className="flex items-center gap-3 sm:gap-5">

          {user ? (
            <a
              href="/login"
              className="bg-emerald-50 dark:bg-emerald-950/70 border border-emerald-200 dark:border-emerald-800 text-emerald-800 dark:text-emerald-300 text-xs md:text-sm font-semibold px-3 py-1.5 rounded-xl transition flex items-center gap-1.5"
              title={user.email}
            >
              <span className="w-2 h-2 rounded-full bg-emerald-500" />
              <span className="max-w-[100px] truncate">{user.name || user.email.split("@")[0]}</span>
            </a>
          ) : (
            <a
              href="/login"
              className="bg-emerald-600 hover:bg-emerald-700 text-white text-xs md:text-sm font-semibold px-4 py-2 rounded-xl transition shadow-xs"
            >
              {t("login")}
            </a>
          )}

          {/* Language Dropdown & Night Mode Toggle */}
          <HeaderControls />
        </div>
      </nav>
    </header>
  );
}
