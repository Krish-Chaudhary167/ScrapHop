import Link from "next/link";
import { CATEGORY_LIST } from "@/lib/recycleGuideData";
import {
  Sparkles,
  ArrowRight,
  Clock,
  ArrowLeft,
} from "lucide-react";

export const metadata = {
  title: "ScrapHop Recycling Guide – India Waste Generation & Processes",
  description:
    "Explore how much cardboard, plastic, paper, metal, electronics, and glass India generates per hour, and how each material is recycled into high-value circular products.",
};

export default function GuideOverviewPage() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950 text-gray-900 dark:text-gray-100 transition-colors py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto space-y-10">
        {/* Back Link */}
        <div>
          <Link
            href="/"
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-gray-600 dark:text-gray-400 hover:text-emerald-600 dark:hover:text-emerald-400 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 px-3.5 py-1.5 rounded-xl transition shadow-xs"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Back to Home</span>
          </Link>
        </div>

        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold tracking-wide uppercase bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300">
            <Sparkles className="w-3.5 h-3.5" />
            <span>India Recyclable Waste Encyclopedia</span>
          </div>

          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-gray-900 dark:text-white">
            ScrapHop <span className="text-emerald-600 dark:text-emerald-400">Recycle Guide</span>
          </h1>

          <p className="text-base sm:text-lg text-gray-600 dark:text-gray-300">
            Discover hourly waste generation data in India, proper segregation guidelines, and step-by-step industrial recycling lifecycles across all primary scrap categories.
          </p>
        </div>

        {/* National Stats Snapshot Banner */}
        <div className="p-6 rounded-3xl bg-gradient-to-br from-emerald-900 to-teal-950 text-white shadow-xl">
          <div className="flex items-center justify-between mb-4 border-b border-white/10 pb-3">
            <span className="text-xs font-bold uppercase tracking-wider text-emerald-300 flex items-center gap-1.5">
              <Clock className="w-4 h-4" />
              National Overview (India Hourly Scrap Meter)
            </span>
            <span className="text-[11px] text-gray-300">
              CPCB & Industry Estimates
            </span>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="p-4 rounded-2xl bg-white/10 backdrop-blur-sm">
              <p className="text-xs text-gray-300">Total Scrap Generated</p>
              <p className="text-2xl font-black text-white mt-1">17,000+ T / hr</p>
              <p className="text-[11px] text-emerald-300 mt-0.5">Municipal & Industrial</p>
            </div>
            <div className="p-4 rounded-2xl bg-white/10 backdrop-blur-sm">
              <p className="text-xs text-gray-300">Metal Recycling Rate</p>
              <p className="text-2xl font-black text-white mt-1">80%</p>
              <p className="text-[11px] text-emerald-300 mt-0.5">Highest in India</p>
            </div>
            <div className="p-4 rounded-2xl bg-white/10 backdrop-blur-sm">
              <p className="text-xs text-gray-300">Plastic Waste Rate</p>
              <p className="text-2xl font-black text-white mt-1">3,900+ T / hr</p>
              <p className="text-[11px] text-rose-300 mt-0.5">40% unorganized</p>
            </div>
            <div className="p-4 rounded-2xl bg-white/10 backdrop-blur-sm">
              <p className="text-xs text-gray-300">Organized Pickups</p>
              <p className="text-2xl font-black text-emerald-300 mt-1">ScrapHop</p>
              <p className="text-[11px] text-gray-300 mt-0.5">Fair rates & instant UPI</p>
            </div>
          </div>
        </div>

        {/* 6 Category Cards Grid */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white">
              Select Scrap Material:
            </h2>
            <span className="text-xs text-gray-500 dark:text-gray-400">
              Click any category for in-depth waste & process data
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {CATEGORY_LIST.map((cat) => (
              <Link
                key={cat.id}
                href={`/guide/${cat.slug}`}
                className="group relative flex flex-col rounded-3xl bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 hover:border-emerald-500 dark:hover:border-emerald-500 shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden transform hover:-translate-y-1"
              >
                {/* Thematic Image */}
                <div className="relative h-44 w-full overflow-hidden bg-gray-100 dark:bg-gray-800">
                  <img
                    src={cat.heroImage}
                    alt={cat.name}
                    className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />

                  {/* Top Badge */}
                  <div className="absolute top-3 left-3 flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-black/60 backdrop-blur-md text-white text-[11px] font-bold">
                    <span>{cat.emoji}</span>
                    <span>{cat.name}</span>
                  </div>

                  {/* Price Tag */}
                  <div className="absolute top-3 right-3 px-2.5 py-1 rounded-full bg-emerald-600 text-white text-[11px] font-extrabold shadow-sm">
                    {cat.mandiRate}
                  </div>

                  {/* Subtitle & Waste Stat Overlay */}
                  <div className="absolute bottom-3 left-3 right-3 text-white">
                    <p className="text-sm font-bold">{cat.subtitle}</p>
                    <p className="text-xs text-emerald-300 font-semibold flex items-center gap-1 mt-0.5">
                      <Clock className="w-3.5 h-3.5" />
                      Waste: {cat.wastePerHourIndia.tonnesPerHour}
                    </p>
                  </div>
                </div>

                {/* Card Body */}
                <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                  <div>
                    <p className="text-xs text-gray-500 dark:text-gray-400 font-medium">
                      {cat.categoryTag}
                    </p>
                    <p className="text-xs sm:text-sm text-gray-700 dark:text-gray-300 mt-2 line-clamp-2">
                      {cat.wastePerHourIndia.impactSummary}
                    </p>
                  </div>

                  {/* Highlights */}
                  <div className="pt-3 border-t border-gray-100 dark:border-gray-800 flex items-center justify-between text-xs font-bold text-emerald-600 dark:text-emerald-400">
                    <span className="group-hover:underline">View Waste & Process Guide</span>
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>

        {/* Bottom CTA to Sell Scrap */}
        <div className="p-8 rounded-3xl bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 text-center space-y-4 shadow-sm">
          <h3 className="text-2xl font-extrabold text-gray-900 dark:text-white">
            Have Scrap at Home or Business?
          </h3>
          <p className="text-sm text-gray-600 dark:text-gray-400 max-w-xl mx-auto">
            Sell your cardboard, plastic, paper, metal, electronics, and glass directly to verified nearby collectors via ScrapHop.
          </p>
          <div className="pt-2">
            <Link
              href="/sell"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-sm shadow-md transition transform hover:-translate-y-0.5"
            >
              <span>Schedule Free Doorstep Pickup</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
