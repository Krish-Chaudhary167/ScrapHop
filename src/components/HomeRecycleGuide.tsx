"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useApp } from "@/context/AppContext";
import { CATEGORY_LIST, ScrapGuideCategory } from "@/lib/recycleGuideData";
import {
  Clock,
  Sparkles,
  ArrowRight,
  Scale,
  CheckCircle2,
  Recycle,
  Factory,
  ChevronRight,
  TrendingUp,
} from "lucide-react";

export default function HomeRecycleGuide() {
  const { user } = useApp();
  const router = useRouter();
  const [activeSlug, setActiveSlug] = useState<string>("plastic");
  const activeCategory: ScrapGuideCategory =
    CATEGORY_LIST.find((c) => c.slug === activeSlug) || CATEGORY_LIST[1];

  const handleSellClick = (e: React.MouseEvent) => {
    const isLogged = user || (typeof window !== "undefined" && localStorage.getItem("scraphop_user"));
    if (!isLogged) {
      e.preventDefault();
      router.push("/login");
    }
  };

  return (
    <section id="recycle-guide" className="py-20 bg-gray-50 dark:bg-gray-900/60 transition-colors">
      <div className="max-w-6xl mx-auto px-6 space-y-10">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300">
            <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
            <span>Interactive Eco Hub</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-gray-900 dark:text-white tracking-tight">
            Recycle <span className="text-emerald-600 dark:text-emerald-400">Guide</span>
          </h2>

          <p className="text-base text-gray-600 dark:text-gray-400">
            Click any scrap material below to see how much India wastes per hour, how to recycle it, and what it turns into!
          </p>
        </div>

        {/* ── 6 Category Buttons ── */}
        <div className="flex items-center justify-center gap-2 sm:gap-3 flex-wrap">
          {CATEGORY_LIST.map((cat) => {
            const isSelected = cat.slug === activeSlug;
            return (
              <button
                key={cat.id}
                type="button"
                onClick={() => setActiveSlug(cat.slug)}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-2xl font-bold text-xs sm:text-sm transition-all duration-200 cursor-pointer shadow-xs ${
                  isSelected
                    ? "bg-emerald-600 text-white shadow-md scale-105 ring-2 ring-emerald-500/50"
                    : "bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-200 border border-gray-200 dark:border-gray-700 hover:border-emerald-400 hover:text-emerald-600 dark:hover:text-emerald-400"
                }`}
              >
                <span className="text-lg">{cat.emoji}</span>
                <span>{cat.name}</span>
                {isSelected && (
                  <span className="w-2 h-2 rounded-full bg-white animate-pulse" />
                )}
              </button>
            );
          })}
        </div>

        {/* ── Interactive Showcase Card ── */}
        <div className="bg-white dark:bg-gray-800/90 rounded-3xl border border-gray-200 dark:border-gray-700 shadow-xl overflow-hidden transition-all duration-300">
          <div className="grid grid-cols-1 lg:grid-cols-12 items-stretch">
            {/* Left: Thematic Photo with Stat Badges */}
            <div className="lg:col-span-5 relative min-h-[280px] lg:min-h-[420px] bg-gray-100 dark:bg-gray-900 overflow-hidden">
              <img
                src={activeCategory.heroImage}
                alt={activeCategory.name}
                className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />

              {/* Top Badges */}
              <div className="absolute top-4 left-4 flex items-center gap-2">
                <span className="px-3 py-1 rounded-full bg-black/60 backdrop-blur-md text-white font-extrabold text-xs flex items-center gap-1.5">
                  <span>{activeCategory.emoji}</span>
                  <span>{activeCategory.name}</span>
                </span>
                <span className="px-3 py-1 rounded-full bg-emerald-600 text-white font-black text-xs shadow-xs">
                  {activeCategory.mandiRate}
                </span>
              </div>

              {/* Bottom Quick Metric Overlay */}
              <div className="absolute bottom-4 left-4 right-4 bg-white/95 dark:bg-gray-900/95 backdrop-blur-md p-4 rounded-2xl border border-white/20 shadow-lg text-xs space-y-1">
                <div className="flex items-center justify-between text-gray-500 dark:text-gray-400 text-[11px] font-bold uppercase">
                  <span>India Hourly Waste</span>
                  <Clock className="w-3.5 h-3.5 text-rose-500" />
                </div>
                <p className="text-xl font-black text-rose-600 dark:text-rose-400">
                  ⚡ {activeCategory.wastePerHourIndia.tonnesPerHour}
                </p>
                <p className="text-[11px] text-gray-600 dark:text-gray-300">
                  {activeCategory.wastePerHourIndia.recycleRate} recycled · {activeCategory.wastePerHourIndia.landfillRate} dumped
                </p>
              </div>
            </div>

            {/* Right: Key Info, Transformed Products & Actions */}
            <div className="lg:col-span-7 p-6 sm:p-8 flex flex-col justify-between space-y-6">
              <div className="space-y-5">
                {/* Title & Tag */}
                <div>
                  <div className="flex items-center gap-2 text-xs font-bold text-emerald-600 dark:text-emerald-400 uppercase tracking-wider mb-1">
                    <Recycle className="w-4 h-4" />
                    <span>{activeCategory.categoryTag}</span>
                  </div>
                  <h3 className="text-2xl sm:text-3xl font-black text-gray-900 dark:text-white">
                    {activeCategory.emoji} {activeCategory.name} Waste & Recycling
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-gray-300 mt-2 leading-relaxed">
                    {activeCategory.wastePerHourIndia.impactSummary}
                  </p>
                </div>

                {/* 3 Quick Facts Grid */}
                <div className="grid grid-cols-3 gap-2.5">
                  <div className="p-3 rounded-2xl bg-gray-50 dark:bg-gray-900/50 border border-gray-100 dark:border-gray-700/60 text-center">
                    <p className="text-[10px] uppercase font-bold text-gray-400">Daily Dump</p>
                    <p className="text-xs sm:text-sm font-black text-gray-900 dark:text-white mt-0.5">
                      {activeCategory.wastePerHourIndia.tonnesPerDay.split(" ")[0]} T
                    </p>
                  </div>
                  <div className="p-3 rounded-2xl bg-gray-50 dark:bg-gray-900/50 border border-gray-100 dark:border-gray-700/60 text-center">
                    <p className="text-[10px] uppercase font-bold text-gray-400">Recycle Rate</p>
                    <p className="text-xs sm:text-sm font-black text-emerald-600 dark:text-emerald-400 mt-0.5">
                      {activeCategory.wastePerHourIndia.recycleRate}
                    </p>
                  </div>
                  <div className="p-3 rounded-2xl bg-gray-50 dark:bg-gray-900/50 border border-gray-100 dark:border-gray-700/60 text-center">
                    <p className="text-[10px] uppercase font-bold text-gray-400">Scrap Rate</p>
                    <p className="text-xs sm:text-sm font-black text-emerald-600 dark:text-emerald-400 mt-0.5">
                      {activeCategory.mandiRate.split(" ")[0]}
                    </p>
                  </div>
                </div>

                {/* What it turns into (Top 3 items) */}
                <div>
                  <p className="text-xs font-bold uppercase tracking-wider text-gray-400 mb-2 flex items-center gap-1.5">
                    <Factory className="w-3.5 h-3.5 text-blue-500" />
                    <span>Transforms Into:</span>
                  </p>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                    {activeCategory.recycledProducts.slice(0, 3).map((prod, i) => (
                      <div
                        key={i}
                        className="p-2.5 rounded-xl bg-gray-50 dark:bg-gray-900/40 border border-gray-100 dark:border-gray-800 flex items-center gap-2"
                      >
                        <span className="text-base">✨</span>
                        <div className="min-w-0 flex-1">
                          <p className="text-xs font-bold text-gray-900 dark:text-white truncate">
                            {prod.title}
                          </p>
                          <p className="text-[10px] text-gray-500 dark:text-gray-400 truncate">
                            {prod.subtitle}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Quick Do's & Don'ts */}
                <div className="p-3 rounded-2xl bg-emerald-50/70 dark:bg-emerald-950/30 border border-emerald-100 dark:border-emerald-800/60 flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />
                  <div className="text-xs text-emerald-900 dark:text-emerald-200 leading-snug">
                    <span className="font-bold">Quick Recycling Tip: </span>
                    {activeCategory.howToRecycle.guidelines[0]?.title} — {activeCategory.howToRecycle.guidelines[0]?.description}
                  </div>
                </div>
              </div>

              {/* Bottom Buttons */}
              <div className="pt-4 border-t border-gray-100 dark:border-gray-700/60 flex flex-col sm:flex-row items-center gap-3">
                <Link
                  href={`/guide/${activeCategory.slug}`}
                  className="w-full sm:w-auto flex-1 inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold text-sm shadow-md transition transform hover:-translate-y-0.5"
                >
                  <span>Explore Full {activeCategory.name} Guide</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>

                <Link
                  href={user ? "/sell" : "/login"}
                  onClick={handleSellClick}
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 text-gray-800 dark:text-gray-100 font-bold text-sm transition"
                >
                  <span>Sell {activeCategory.name} Scrap</span>
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* View All Guides Link */}
        <div className="text-center pt-2">
          <Link
            href="/guide"
            className="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-600 dark:text-emerald-400 hover:underline"
          >
            <span>View All 6 Scrap Guides & National Comparison Hub</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>
    </section>
  );
}
