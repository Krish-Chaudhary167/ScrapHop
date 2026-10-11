"use client";

import { useState, useRef, useEffect } from "react";
import { Globe, Moon, Sun, ChevronDown, Check } from "lucide-react";
import { useApp, LANGUAGES, Language } from "@/context/AppContext";

export default function HeaderControls() {
  const { language, setLanguage, theme, toggleTheme } = useApp();
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

  const currentLang = LANGUAGES.find((l) => l.code === language) || LANGUAGES[0];

  return (
    <div className="flex items-center gap-2">
      {/* ── Language Dropdown ── */}
      <div className="relative" ref={dropdownRef}>
        <button
          type="button"
          onClick={() => setIsOpen(!isOpen)}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-200 text-xs font-semibold hover:border-emerald-500 hover:text-emerald-600 dark:hover:text-emerald-400 transition shadow-xs"
          title="Select Language"
        >
          <Globe className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
          <span>{currentLang.nativeName}</span>
          <ChevronDown
            className={`w-3.5 h-3.5 transition-transform duration-200 text-gray-400 ${
              isOpen ? "rotate-180" : ""
            }`}
          />
        </button>

        {isOpen && (
          <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-800 rounded-2xl shadow-xl border border-gray-100 dark:border-gray-700 py-1.5 z-50 animate-in fade-in slide-in-from-top-2 duration-150">
            <div className="px-3 py-1.5 text-[10px] font-bold uppercase tracking-wider text-gray-400 dark:text-gray-400 border-b border-gray-100 dark:border-gray-700">
              Select Language
            </div>
            {LANGUAGES.map((lang) => {
              const isSelected = lang.code === language;
              return (
                <button
                  key={lang.code}
                  type="button"
                  onClick={() => {
                    setLanguage(lang.code);
                    setIsOpen(false);
                  }}
                  className={`w-full flex items-center justify-between px-3.5 py-2 text-xs font-medium transition ${
                    isSelected
                      ? "bg-emerald-50 dark:bg-emerald-950/50 text-emerald-700 dark:text-emerald-400 font-semibold"
                      : "text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-700/60"
                  }`}
                >
                  <div className="flex flex-col text-left">
                    <span>{lang.nativeName}</span>
                    <span className="text-[10px] text-gray-400 dark:text-gray-500">
                      {lang.name}
                    </span>
                  </div>
                  {isSelected && <Check className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />}
                </button>
              );
            })}
          </div>
        )}
      </div>

      {/* ── Night Mode Toggle ── */}
      <button
        type="button"
        onClick={toggleTheme}
        className="p-2 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-200 hover:border-amber-400 hover:text-amber-500 dark:hover:text-amber-400 transition shadow-xs"
        title={theme === "dark" ? "Switch to Light Mode" : "Switch to Night Mode"}
        aria-label="Toggle Night Mode"
      >
        {theme === "dark" ? (
          <Sun className="w-4 h-4 text-amber-400 animate-spin-once" />
        ) : (
          <Moon className="w-4 h-4 text-gray-600 hover:text-amber-500 transition" />
        )}
      </button>
    </div>
  );
}
