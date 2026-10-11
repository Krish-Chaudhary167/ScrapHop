"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { Recycle, ChevronDown, ArrowRight, Sparkles } from "lucide-react";
import { CATEGORY_LIST } from "@/lib/recycleGuideData";

export default function RecycleGuideDropdown() {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown on outside click
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Close on Escape key
  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") setIsOpen(false);
    }
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  return (
    <div className="relative" ref={dropdownRef}>
      {/* ── Main Top-Right Button ── */}
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-3 sm:px-3.5 py-1.5 rounded-xl border border-emerald-300 dark:border-emerald-700/60 bg-emerald-50/70 hover:bg-emerald-100 dark:bg-emerald-950/60 dark:hover:bg-emerald-900/60 text-emerald-800 dark:text-emerald-200 text-xs md:text-sm font-semibold transition shadow-xs cursor-pointer group"
        title="Recycling Guide & India Waste Stats"
        aria-expanded={isOpen}
      >
        <span className="flex items-center justify-center w-5 h-5 rounded-lg bg-emerald-600 text-white text-xs shadow-xs group-hover:rotate-45 transition-transform duration-300">
          <Recycle className="w-3.5 h-3.5" />
        </span>
        <span className="font-semibold tracking-tight">Recycle Guide</span>
        <span className="hidden md:inline-flex px-1.5 py-0.5 text-[10px] font-bold rounded-md bg-emerald-200 dark:bg-emerald-900 text-emerald-900 dark:text-emerald-200">
          6 Types
        </span>
        <ChevronDown
          className={`w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400 transition-transform duration-200 ${
            isOpen ? "rotate-180" : ""
          }`}
        />
      </button>

      {/* ── Dropdown Menu with the 6 Scrap Category Buttons ── */}
      {isOpen && (
        <div className="absolute right-0 mt-2 w-[320px] sm:w-[380px] bg-white dark:bg-gray-900 rounded-2xl shadow-2xl border border-gray-100 dark:border-gray-800 p-3 z-50 animate-in fade-in slide-in-from-top-2 duration-150">
          {/* Header */}
          <div className="px-2 py-1.5 mb-2 border-b border-gray-100 dark:border-gray-800 flex items-center justify-between">
            <div>
              <p className="text-xs font-bold text-gray-900 dark:text-white flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-emerald-500" />
                Recycling & Waste Insights
              </p>
              <p className="text-[11px] text-gray-500 dark:text-gray-400">
                Select scrap type for per-hour waste stats & processes
              </p>
            </div>
            <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300">
              India Data
            </span>
          </div>

          {/* Grid of the 6 Category Buttons */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5">
            {CATEGORY_LIST.map((cat) => (
              <Link
                key={cat.id}
                href={`/guide/${cat.slug}`}
                onClick={() => setIsOpen(false)}
                className="group flex items-start gap-2.5 p-2 rounded-xl border border-gray-100 dark:border-gray-800/80 hover:border-emerald-300 dark:hover:border-emerald-700 bg-gray-50/60 dark:bg-gray-800/40 hover:bg-emerald-50/50 dark:hover:bg-emerald-950/30 transition-all text-left"
              >
                <span className="text-xl p-1 rounded-lg bg-white dark:bg-gray-800 shadow-xs border border-gray-100 dark:border-gray-700/60 group-hover:scale-110 transition-transform">
                  {cat.emoji}
                </span>
                <div className="min-w-0 flex-1">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-gray-900 dark:text-white group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition">
                      {cat.name}
                    </span>
                    <span className="text-[9px] font-semibold text-gray-400 dark:text-gray-400">
                      {cat.mandiRate.split("–")[0]}
                    </span>
                  </div>
                  <p className="text-[10px] text-gray-500 dark:text-gray-400 truncate">
                    {cat.subtitle}
                  </p>
                  <p className="text-[9px] font-medium text-emerald-600 dark:text-emerald-400 mt-0.5">
                    ⚡ {cat.wastePerHourIndia.tonnesPerHour}
                  </p>
                </div>
              </Link>
            ))}
          </div>

          {/* Footer link to complete guide hub */}
          <div className="mt-2.5 pt-2 border-t border-gray-100 dark:border-gray-800 flex items-center justify-between px-2">
            <Link
              href="/guide"
              onClick={() => setIsOpen(false)}
              className="text-xs font-semibold text-emerald-600 dark:text-emerald-400 hover:text-emerald-700 dark:hover:text-emerald-300 flex items-center gap-1 group"
            >
              <span>Explore All Guides & Comparisons</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}
