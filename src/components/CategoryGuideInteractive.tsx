"use client";

import { useState } from "react";
import Link from "next/link";
import { ScrapGuideCategory, CATEGORY_LIST } from "@/lib/recycleGuideData";
import {
  Clock,
  Sparkles,
  ArrowRight,
  Scale,
  CheckCircle2,
  XCircle,
  Lightbulb,
  Recycle,
  Factory,
  TrendingUp,
  Layers,
  ArrowLeft,
  Calculator,
  Check,
  Zap,
  Droplets,
  TreePine,
  DollarSign,
  Flame,
} from "lucide-react";

interface Props {
  data: ScrapGuideCategory;
}

export default function CategoryGuideInteractive({ data }: Props) {
  // Interactive Tab State
  const [activeTab, setActiveTab] = useState<
    "waste" | "prep" | "products" | "process" | "calculator"
  >("waste");

  // Interactive Calculator State
  const [calcWeight, setCalcWeight] = useState<number>(25);

  // Interactive Checklist State
  const [checkedItems, setCheckedItems] = useState<Record<number, boolean>>({});

  // Active Process Step State
  const [activeProcessStep, setActiveProcessStep] = useState<number>(1);

  // Toggle checklist
  const toggleChecklist = (idx: number) => {
    setCheckedItems((prev) => ({ ...prev, [idx]: !prev[idx] }));
  };

  const allChecked =
    data.howToRecycle.guidelines.length > 0 &&
    data.howToRecycle.guidelines.every((_, idx) => checkedItems[idx]);

  // Rate extraction for calculator
  const baseRate = parseInt(data.mandiRate.replace(/[^0-9]/g, "").slice(0, 2)) || 20;
  const estimatedEarnings = Math.round(calcWeight * baseRate);
  const co2Saved = (calcWeight * 1.5).toFixed(1);
  const waterSaved = Math.round(calcWeight * 18);
  const energySaved = (calcWeight * 2.2).toFixed(1);

  return (
    <div className="space-y-8">
      {/* ── Top Bar: Back Link & Category Switcher Pills ── */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <Link
            href="/"
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-gray-600 dark:text-gray-400 hover:text-emerald-600 dark:hover:text-emerald-400 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 px-3 py-1.5 rounded-xl transition shadow-xs"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Home</span>
          </Link>
          <span className="text-gray-300 dark:text-gray-700">/</span>
          <Link
            href="/guide"
            className="text-xs font-semibold text-gray-500 hover:text-emerald-600 dark:hover:text-emerald-400 transition"
          >
            All Guides
          </Link>
          <span className="text-gray-300 dark:text-gray-700">/</span>
          <span className="text-xs font-bold text-emerald-600 dark:text-emerald-400">
            {data.name}
          </span>
        </div>

        {/* Quick Material Switcher Buttons */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0 scrollbar-none">
          {CATEGORY_LIST.map((c) => {
            const isActive = c.slug === data.slug;
            return (
              <Link
                key={c.id}
                href={`/guide/${c.slug}`}
                className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold transition shrink-0 ${
                  isActive
                    ? "bg-emerald-600 text-white shadow-xs scale-105"
                    : "bg-white dark:bg-gray-900 text-gray-600 dark:text-gray-300 border border-gray-200 dark:border-gray-800 hover:border-emerald-400 hover:text-emerald-600"
                }`}
              >
                <span>{c.emoji}</span>
                <span>{c.name}</span>
              </Link>
            );
          })}
        </div>
      </div>

      {/* ── Compact Hero Banner with Image & Quick Highlights ── */}
      <div className="relative overflow-hidden rounded-3xl bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 shadow-xl">
        <div className="grid grid-cols-1 lg:grid-cols-12 items-stretch">
          {/* Left Hero Content */}
          <div className="lg:col-span-7 p-6 sm:p-8 flex flex-col justify-between space-y-6">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-black tracking-wide uppercase mb-3 bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300">
                <span className="text-base">{data.emoji}</span>
                <span>{data.categoryTag}</span>
              </div>

              <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-gray-900 dark:text-white tracking-tight flex items-center gap-3">
                <span>{data.emoji}</span>
                <span>{data.name} Guide</span>
              </h1>

              <p className="mt-2 text-sm sm:text-base text-gray-600 dark:text-gray-300 font-medium leading-relaxed">
                {data.wastePerHourIndia.impactSummary}
              </p>

              {/* 3 Compact Emoji Stat Chips */}
              <div className="grid grid-cols-3 gap-2.5 mt-5">
                <div className="p-3 rounded-2xl bg-rose-50 dark:bg-rose-950/40 border border-rose-100 dark:border-rose-900/50">
                  <p className="text-[10px] font-bold text-rose-500 uppercase flex items-center gap-1">
                    <Clock className="w-3 h-3" />
                    Hourly Waste
                  </p>
                  <p className="text-xs sm:text-sm font-black text-rose-700 dark:text-rose-300 mt-0.5">
                    {data.wastePerHourIndia.tonnesPerHour.split(" ")[0]} T/hr
                  </p>
                </div>

                <div className="p-3 rounded-2xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-100 dark:border-emerald-900/50">
                  <p className="text-[10px] font-bold text-emerald-600 uppercase flex items-center gap-1">
                    <Recycle className="w-3 h-3" />
                    Recycled
                  </p>
                  <p className="text-xs sm:text-sm font-black text-emerald-700 dark:text-emerald-300 mt-0.5">
                    {data.wastePerHourIndia.recycleRate}
                  </p>
                </div>

                <div className="p-3 rounded-2xl bg-blue-50 dark:bg-blue-950/40 border border-blue-100 dark:border-blue-900/50">
                  <p className="text-[10px] font-bold text-blue-600 uppercase flex items-center gap-1">
                    <Scale className="w-3 h-3" />
                    Mandi Price
                  </p>
                  <p className="text-xs sm:text-sm font-black text-blue-700 dark:text-blue-300 mt-0.5">
                    {data.mandiRate}
                  </p>
                </div>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="pt-4 border-t border-gray-100 dark:border-gray-800 flex flex-wrap items-center gap-3">
              <Link
                href="/sell"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold text-sm shadow-md transition transform hover:-translate-y-0.5"
              >
                <span>Sell {data.name} on ScrapHop</span>
                <ArrowRight className="w-4 h-4" />
              </Link>

              <button
                type="button"
                onClick={() => setActiveTab("calculator")}
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 text-gray-800 dark:text-gray-200 font-bold text-xs transition"
              >
                <Calculator className="w-4 h-4 text-emerald-600" />
                <span>Calculate Value</span>
              </button>
            </div>
          </div>

          {/* Right Hero Image */}
          <div className="lg:col-span-5 relative min-h-[260px] lg:min-h-[380px] bg-gray-100 dark:bg-gray-800 overflow-hidden">
            <img
              src={data.heroImage}
              alt={`${data.name} recycling in India`}
              className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
            <div className="absolute bottom-4 left-4 right-4 bg-black/60 backdrop-blur-md p-3 rounded-2xl border border-white/20 text-white text-xs">
              <p className="font-bold flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-emerald-400" />
                <span>Zero Waste Mission</span>
              </p>
              <p className="text-[11px] text-gray-300 mt-0.5">
                Every kilogram sorted properly saves landfill space across Indian cities.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* ── Interactive Navigation Tabs ── */}
      <div className="flex items-center justify-start sm:justify-center gap-2 overflow-x-auto pb-2 scrollbar-none">
        <button
          type="button"
          onClick={() => setActiveTab("waste")}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-2xl font-bold text-xs sm:text-sm transition-all shrink-0 cursor-pointer ${
            activeTab === "waste"
              ? "bg-emerald-600 text-white shadow-md scale-105"
              : "bg-white dark:bg-gray-900 text-gray-600 dark:text-gray-300 border border-gray-200 dark:border-gray-800 hover:border-emerald-400"
          }`}
        >
          <span>⏱️</span>
          <span>Hourly Waste</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveTab("prep")}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-2xl font-bold text-xs sm:text-sm transition-all shrink-0 cursor-pointer ${
            activeTab === "prep"
              ? "bg-emerald-600 text-white shadow-md scale-105"
              : "bg-white dark:bg-gray-900 text-gray-600 dark:text-gray-300 border border-gray-200 dark:border-gray-800 hover:border-emerald-400"
          }`}
        >
          <span>💡</span>
          <span>How to Prep</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveTab("products")}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-2xl font-bold text-xs sm:text-sm transition-all shrink-0 cursor-pointer ${
            activeTab === "products"
              ? "bg-emerald-600 text-white shadow-md scale-105"
              : "bg-white dark:bg-gray-900 text-gray-600 dark:text-gray-300 border border-gray-200 dark:border-gray-800 hover:border-emerald-400"
          }`}
        >
          <span>🔄</span>
          <span>What It Becomes</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveTab("process")}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-2xl font-bold text-xs sm:text-sm transition-all shrink-0 cursor-pointer ${
            activeTab === "process"
              ? "bg-emerald-600 text-white shadow-md scale-105"
              : "bg-white dark:bg-gray-900 text-gray-600 dark:text-gray-300 border border-gray-200 dark:border-gray-800 hover:border-emerald-400"
          }`}
        >
          <span>🏭</span>
          <span>5-Stage Process</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveTab("calculator")}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-2xl font-bold text-xs sm:text-sm transition-all shrink-0 cursor-pointer ${
            activeTab === "calculator"
              ? "bg-emerald-600 text-white shadow-md scale-105"
              : "bg-white dark:bg-gray-900 text-gray-600 dark:text-gray-300 border border-gray-200 dark:border-gray-800 hover:border-emerald-400"
          }`}
        >
          <span>🧮</span>
          <span>Value Calculator</span>
        </button>
      </div>

      {/* ═══════════════════════════════════════════
          TAB 1: HOURLY WASTE
         ═══════════════════════════════════════════ */}
      {activeTab === "waste" && (
        <div className="bg-white dark:bg-gray-900 rounded-3xl border border-gray-200 dark:border-gray-800 p-6 sm:p-8 space-y-6 shadow-sm animate-in fade-in duration-200">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <p className="text-xs font-black uppercase text-rose-600 dark:text-rose-400 tracking-wider">
                ⚡ Real-Time Generation Stats
              </p>
              <h2 className="text-2xl sm:text-3xl font-black text-gray-900 dark:text-white mt-1">
                India Waste Clock: {data.name}
              </h2>
            </div>
            <span className="text-[11px] font-semibold text-gray-400">
              Source: {data.wastePerHourIndia.sourceCitation.split("&")[0]}
            </span>
          </div>

          {/* 4 Interactive Visual Stat Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="p-5 rounded-2xl bg-gradient-to-br from-rose-500 to-red-600 text-white shadow-md">
              <div className="flex items-center justify-between text-rose-100 text-xs font-bold uppercase">
                <span>Every Hour</span>
                <Clock className="w-4 h-4" />
              </div>
              <p className="text-3xl font-black mt-2">
                {data.wastePerHourIndia.tonnesPerHour}
              </p>
              <p className="text-xs text-rose-100 mt-1">
                Generated every 60 minutes in India
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700">
              <div className="flex items-center justify-between text-gray-400 text-xs font-bold uppercase">
                <span>Daily Total</span>
                <TrendingUp className="w-4 h-4 text-emerald-500" />
              </div>
              <p className="text-2xl font-black text-gray-900 dark:text-white mt-2">
                {data.wastePerHourIndia.tonnesPerDay}
              </p>
              <p className="text-xs text-gray-500 mt-1">Across residential & commercial zones</p>
            </div>

            <div className="p-5 rounded-2xl bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700">
              <div className="flex items-center justify-between text-gray-400 text-xs font-bold uppercase">
                <span>Annual Dump</span>
                <Layers className="w-4 h-4 text-blue-500" />
              </div>
              <p className="text-2xl font-black text-gray-900 dark:text-white mt-2">
                {data.wastePerHourIndia.tonnesPerYear}
              </p>
              <p className="text-xs text-gray-500 mt-1">Massive nationwide volume</p>
            </div>

            <div className="p-5 rounded-2xl bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-200 dark:border-emerald-800">
              <div className="flex items-center justify-between text-emerald-800 dark:text-emerald-300 text-xs font-bold uppercase">
                <span>Recycled vs Dumped</span>
                <Recycle className="w-4 h-4 text-emerald-600" />
              </div>
              <p className="text-2xl font-black text-emerald-600 dark:text-emerald-400 mt-2">
                {data.wastePerHourIndia.recycleRate} Recycled
              </p>
              <p className="text-xs text-emerald-800 dark:text-emerald-300 mt-1">
                {data.wastePerHourIndia.landfillRate}
              </p>
            </div>
          </div>

          {/* Environmental Equivalency Callout */}
          <div className="p-4 rounded-2xl bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-800 flex items-start gap-3">
            <span className="text-2xl">🌱</span>
            <div className="text-xs sm:text-sm text-amber-900 dark:text-amber-200 leading-relaxed">
              <span className="font-bold">Eco Takeaway: </span>
              Recycling 1 tonne of {data.name.toLowerCase()} prevents thousands of kg of greenhouse gas emissions and conserves valuable natural resources. ScrapHop collects it right from your doorstep!
            </div>
          </div>
        </div>
      )}

      {/* ═══════════════════════════════════════════
          TAB 2: HOW TO PREP (INTERACTIVE CHECKLIST)
         ═══════════════════════════════════════════ */}
      {activeTab === "prep" && (
        <div className="bg-white dark:bg-gray-900 rounded-3xl border border-gray-200 dark:border-gray-800 p-6 sm:p-8 space-y-6 shadow-sm animate-in fade-in duration-200">
          <div>
            <p className="text-xs font-black uppercase text-emerald-600 dark:text-emerald-400 tracking-wider">
              ✅ Interactive Preparation Checklist
            </p>
            <h2 className="text-2xl sm:text-3xl font-black text-gray-900 dark:text-white mt-1">
              How to Prepare Your {data.name} Scrap
            </h2>
            <p className="text-sm text-gray-500 mt-1">
              Click each item below to check off preparation steps for doorstep pickup:
            </p>
          </div>

          {/* Checklist Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
            {data.howToRecycle.guidelines.map((guide, idx) => {
              const isChecked = !!checkedItems[idx];
              return (
                <div
                  key={idx}
                  onClick={() => toggleChecklist(idx)}
                  className={`p-4 rounded-2xl border transition-all cursor-pointer select-none flex items-start gap-3.5 ${
                    isChecked
                      ? "bg-emerald-50 dark:bg-emerald-950/40 border-emerald-400 dark:border-emerald-700 shadow-xs"
                      : "bg-gray-50 dark:bg-gray-800/50 border-gray-200 dark:border-gray-700 hover:border-emerald-300"
                  }`}
                >
                  <div
                    className={`w-6 h-6 rounded-lg border flex items-center justify-center shrink-0 mt-0.5 transition-colors ${
                      isChecked
                        ? "bg-emerald-600 border-emerald-600 text-white"
                        : "border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800"
                    }`}
                  >
                    {isChecked && <Check className="w-4 h-4 stroke-[3]" />}
                  </div>

                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <h3
                        className={`text-sm font-bold ${
                          isChecked
                            ? "text-emerald-900 dark:text-emerald-200"
                            : "text-gray-900 dark:text-white"
                        }`}
                      >
                        {guide.title}
                      </h3>
                      {guide.doOrDont === "dont" && (
                        <span className="text-[10px] font-bold px-1.5 py-0.5 rounded-md bg-rose-100 text-rose-700">
                          AVOID
                        </span>
                      )}
                    </div>
                    <p className="text-xs text-gray-600 dark:text-gray-300 mt-1 leading-relaxed">
                      {guide.description}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Success Banner when all items checked */}
          {allChecked && (
            <div className="p-4 rounded-2xl bg-emerald-600 text-white flex items-center justify-between gap-4 shadow-lg animate-in zoom-in-95 duration-200">
              <div className="flex items-center gap-3">
                <span className="text-2xl">🎉</span>
                <div>
                  <p className="font-extrabold text-sm">You&apos;re 100% Prepared!</p>
                  <p className="text-xs text-emerald-100">
                    Your scrap is ready for calibrated digital weighing and instant payment.
                  </p>
                </div>
              </div>
              <Link
                href="/sell"
                className="px-4 py-2 rounded-xl bg-white text-emerald-800 font-extrabold text-xs shadow-xs hover:bg-emerald-50 transition shrink-0"
              >
                Request Pickup Now
              </Link>
            </div>
          )}
        </div>
      )}

      {/* ═══════════════════════════════════════════
          TAB 3: WHAT IT BECOMES (CIRCULAR PRODUCTS)
         ═══════════════════════════════════════════ */}
      {activeTab === "products" && (
        <div className="bg-white dark:bg-gray-900 rounded-3xl border border-gray-200 dark:border-gray-800 p-6 sm:p-8 space-y-6 shadow-sm animate-in fade-in duration-200">
          <div>
            <p className="text-xs font-black uppercase text-blue-600 dark:text-blue-400 tracking-wider">
              🔄 Circular Remanufacturing
            </p>
            <h2 className="text-2xl sm:text-3xl font-black text-gray-900 dark:text-white mt-1">
              What Products Are Made from Recycled {data.name}?
            </h2>
            <p className="text-sm text-gray-500 mt-1">
              Your discarded scrap is processed into these high-value consumer and industrial goods:
            </p>
          </div>

          {/* Visual Cards Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {data.recycledProducts.map((prod, idx) => (
              <div
                key={idx}
                className="p-5 rounded-2xl bg-gray-50 dark:bg-gray-800/50 border border-gray-200 dark:border-gray-700 hover:border-emerald-400 hover:shadow-md transition-all group"
              >
                <div className="w-12 h-12 rounded-2xl bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 shadow-xs flex items-center justify-center text-2xl group-hover:scale-110 transition-transform mb-3">
                  {idx === 0
                    ? "📦"
                    : idx === 1
                    ? "👕"
                    : idx === 2
                    ? "🛣️"
                    : idx === 3
                    ? "🪑"
                    : "🌱"}
                </div>
                <h3 className="text-base font-extrabold text-gray-900 dark:text-white">
                  {prod.title}
                </h3>
                <p className="text-xs font-bold text-emerald-600 dark:text-emerald-400 mt-0.5">
                  {prod.subtitle}
                </p>
                <p className="text-xs text-gray-600 dark:text-gray-300 mt-2 leading-relaxed">
                  {prod.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ═══════════════════════════════════════════
          TAB 4: 5-STAGE PROCESS (INTERACTIVE TIMELINE)
         ═══════════════════════════════════════════ */}
      {activeTab === "process" && (
        <div className="bg-white dark:bg-gray-900 rounded-3xl border border-gray-200 dark:border-gray-800 p-6 sm:p-8 space-y-6 shadow-sm animate-in fade-in duration-200">
          <div>
            <p className="text-xs font-black uppercase text-purple-600 dark:text-purple-400 tracking-wider">
              🏭 Industrial Journey
            </p>
            <h2 className="text-2xl sm:text-3xl font-black text-gray-900 dark:text-white mt-1">
              The 5-Stage Recycling Process
            </h2>
            <p className="text-sm text-gray-500 mt-1">
              Click each step to inspect the factory lifecycle:
            </p>
          </div>

          {/* Interactive Step Switcher Pills */}
          <div className="grid grid-cols-5 gap-2">
            {data.recyclingProcess.map((step) => {
              const isCurrent = activeProcessStep === step.step;
              return (
                <button
                  key={step.step}
                  type="button"
                  onClick={() => setActiveProcessStep(step.step)}
                  className={`p-3 rounded-2xl text-center border transition-all cursor-pointer ${
                    isCurrent
                      ? "bg-purple-600 border-purple-600 text-white shadow-md scale-105"
                      : "bg-gray-50 dark:bg-gray-800 border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300 hover:border-purple-400"
                  }`}
                >
                  <p className="text-xs font-black">0{step.step}</p>
                  <p className="text-[10px] font-bold truncate mt-0.5 hidden sm:block">
                    {step.stageName}
                  </p>
                </button>
              );
            })}
          </div>

          {/* Active Step Detailed Card */}
          {(() => {
            const current =
              data.recyclingProcess.find((s) => s.step === activeProcessStep) ||
              data.recyclingProcess[0];
            return (
              <div className="p-6 rounded-3xl bg-purple-50/60 dark:bg-purple-950/30 border border-purple-200 dark:border-purple-800 space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <span className="w-10 h-10 rounded-xl bg-purple-600 text-white font-black flex items-center justify-center text-sm shadow-xs">
                      0{current.step}
                    </span>
                    <div>
                      <h3 className="text-lg font-black text-gray-900 dark:text-white">
                        {current.title}
                      </h3>
                      <p className="text-xs font-bold text-purple-600 dark:text-purple-400">
                        Stage: {current.stageName}
                      </p>
                    </div>
                  </div>
                  <span className="text-2xl">⚙️</span>
                </div>

                <p className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed">
                  {current.description}
                </p>

                <div className="p-3 rounded-2xl bg-white dark:bg-gray-900 border border-purple-100 dark:border-purple-900 text-xs text-gray-600 dark:text-gray-300">
                  <span className="font-bold text-purple-700 dark:text-purple-300">
                    🔬 Technical Process:{" "}
                  </span>
                  {current.detail}
                </div>
              </div>
            );
          })()}
        </div>
      )}

      {/* ═══════════════════════════════════════════
          TAB 5: VALUE & ECO CALCULATOR (INTERACTIVE)
         ═══════════════════════════════════════════ */}
      {activeTab === "calculator" && (
        <div className="bg-white dark:bg-gray-900 rounded-3xl border border-gray-200 dark:border-gray-800 p-6 sm:p-8 space-y-6 shadow-sm animate-in fade-in duration-200">
          <div>
            <p className="text-xs font-black uppercase text-emerald-600 dark:text-emerald-400 tracking-wider">
              🧮 Interactive Scrap Estimator
            </p>
            <h2 className="text-2xl sm:text-3xl font-black text-gray-900 dark:text-white mt-1">
              Calculate Your {data.name} Value & Eco Impact
            </h2>
            <p className="text-sm text-gray-500 mt-1">
              Select or slide your estimated scrap weight to see expected earnings and environmental savings:
            </p>
          </div>

          {/* Quick Preset Buttons */}
          <div className="flex items-center gap-2 flex-wrap">
            <span className="text-xs font-bold text-gray-500 mr-2">Presets:</span>
            {[5, 15, 25, 50, 100].map((w) => (
              <button
                key={w}
                type="button"
                onClick={() => setCalcWeight(w)}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold cursor-pointer transition ${
                  calcWeight === w
                    ? "bg-emerald-600 text-white shadow-xs"
                    : "bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200"
                }`}
              >
                {w} kg
              </button>
            ))}
          </div>

          {/* Range Slider */}
          <div className="p-5 rounded-2xl bg-gray-50 dark:bg-gray-800/60 border border-gray-200 dark:border-gray-700 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-gray-500">Selected Scrap Weight</span>
              <span className="text-xl font-black text-emerald-600 dark:text-emerald-400">
                {calcWeight} kg
              </span>
            </div>
            <input
              type="range"
              min="1"
              max="150"
              value={calcWeight}
              onChange={(e) => setCalcWeight(Number(e.target.value))}
              className="w-full accent-emerald-600 cursor-pointer"
            />
            <div className="flex justify-between text-[10px] text-gray-400 font-bold">
              <span>1 kg</span>
              <span>75 kg</span>
              <span>150 kg</span>
            </div>
          </div>

          {/* Live Outcome Cards */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="p-4 rounded-2xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800 text-center">
              <p className="text-[10px] font-bold uppercase text-emerald-700 dark:text-emerald-400">
                💰 Est. Payout
              </p>
              <p className="text-2xl font-black text-emerald-800 dark:text-emerald-300 mt-1">
                ₹{estimatedEarnings}
              </p>
              <p className="text-[10px] text-emerald-600 mt-0.5">Instant UPI payment</p>
            </div>

            <div className="p-4 rounded-2xl bg-blue-50 dark:bg-blue-950/40 border border-blue-200 dark:border-blue-800 text-center">
              <p className="text-[10px] font-bold uppercase text-blue-700 dark:text-blue-400">
                💧 Water Saved
              </p>
              <p className="text-2xl font-black text-blue-800 dark:text-blue-300 mt-1">
                {waterSaved} L
              </p>
              <p className="text-[10px] text-blue-600 mt-0.5">Clean water spared</p>
            </div>

            <div className="p-4 rounded-2xl bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-800 text-center">
              <p className="text-[10px] font-bold uppercase text-amber-700 dark:text-amber-400">
                ⚡ Energy Saved
              </p>
              <p className="text-2xl font-black text-amber-800 dark:text-amber-300 mt-1">
                {energySaved} kWh
              </p>
              <p className="text-[10px] text-amber-600 mt-0.5">Electricity conserved</p>
            </div>

            <div className="p-4 rounded-2xl bg-purple-50 dark:bg-purple-950/40 border border-purple-200 dark:border-purple-800 text-center">
              <p className="text-[10px] font-bold uppercase text-purple-700 dark:text-purple-400">
                🌱 CO2 Prevented
              </p>
              <p className="text-2xl font-black text-purple-800 dark:text-purple-300 mt-1">
                {co2Saved} kg
              </p>
              <p className="text-[10px] text-purple-600 mt-0.5">Emissions reduced</p>
            </div>
          </div>

          {/* Action button */}
          <div className="pt-2 text-center">
            <Link
              href="/sell"
              className="inline-flex items-center gap-2 px-8 py-3.5 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold text-sm shadow-md transition transform hover:-translate-y-0.5"
            >
              <span>Schedule Pickup for {calcWeight} kg {data.name}</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      )}

      {/* ── Bottom Other Material Links ── */}
      <div className="p-6 rounded-3xl bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 shadow-sm space-y-4">
        <h3 className="text-base font-black text-gray-900 dark:text-white">
          Explore Other Scrap Guides:
        </h3>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
          {CATEGORY_LIST.filter((c) => c.slug !== data.slug).map((cat) => (
            <Link
              key={cat.id}
              href={`/guide/${cat.slug}`}
              className="p-3 rounded-2xl border border-gray-100 dark:border-gray-800 hover:border-emerald-400 bg-gray-50 dark:bg-gray-800/40 hover:bg-emerald-50/40 dark:hover:bg-emerald-950/20 transition text-center group"
            >
              <div className="text-2xl mb-1 group-hover:scale-110 transition-transform">
                {cat.emoji}
              </div>
              <div className="text-xs font-bold text-gray-900 dark:text-white">
                {cat.name}
              </div>
              <div className="text-[10px] text-gray-500 dark:text-gray-400 truncate">
                {cat.subtitle}
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
