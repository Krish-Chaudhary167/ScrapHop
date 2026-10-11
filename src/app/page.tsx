"use client";

import {
  Camera,
  IndianRupee,
  MapPin,
  Truck,
  Package,
  Smartphone,
  ArrowRight,
  CheckCircle,
  Recycle,
} from "lucide-react";
import HomeRecycleGuide from "@/components/HomeRecycleGuide";
import { useApp } from "@/context/AppContext";
import { useRouter } from "next/navigation";

export default function Home() {
  const { t, user } = useApp();
  const router = useRouter();

  const handleSellClick = (e: React.MouseEvent) => {
    const isLogged = user || (typeof window !== "undefined" && localStorage.getItem("scraphop_user"));
    if (!isLogged) {
      e.preventDefault();
      router.push("/login");
    }
  };

  return (
    <>
      {/* ═══════════════════════════════════════════
          HERO SECTION
         ═══════════════════════════════════════════ */}
      <section className="bg-white dark:bg-gray-950 transition-colors">
        <div className="max-w-6xl mx-auto px-6 py-16 md:py-24 flex flex-col-reverse md:flex-row items-center gap-12">
          {/* Left: copy */}
          <div className="flex-1 text-center md:text-left">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-gray-900 dark:text-white leading-tight tracking-tight">
              {user?.role === "COLLECTOR" ? "Live Scrap Pickups in Your Zone." : t("turnTrash")}
            </h1>
            <p className="mt-6 text-lg text-gray-500 dark:text-gray-400 max-w-lg leading-relaxed">
              {user?.role === "COLLECTOR"
                ? "View nearby pickup requests, accept scrap batches, and grow your recycling route with ScrapHop."
                : t("heroSubtitle")}
            </p>
            {user?.role === "COLLECTOR" ? (
              <a
                href="/radar"
                className="mt-8 inline-flex items-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-base py-3.5 px-8 rounded-lg transition shadow-sm"
              >
                <Truck className="w-5 h-5" />
                {t("collectorRadar")}
                <ArrowRight className="w-4 h-4" />
              </a>
            ) : (
              <a
                href={user ? "/sell" : "/login"}
                onClick={handleSellClick}
                className="mt-8 inline-flex items-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-base py-3.5 px-8 rounded-lg transition shadow-sm"
              >
                {t("startSellingScrap")}
                <ArrowRight className="w-4 h-4" />
              </a>
            )}
          </div>

          {/* Right: illustration */}
          <div className="flex-1 flex justify-center">
            <div className="relative w-80 h-80 md:w-96 md:h-96">
              {/* Phone shape */}
              <div className="absolute top-4 left-1/2 -translate-x-1/2 w-44 h-72 bg-white rounded-3xl border-2 border-gray-200 shadow-xl overflow-hidden z-10">
                {/* Phone screen content */}
                <div className="bg-emerald-600 h-16 flex items-center justify-center">
                  <span className="text-white text-sm font-bold">ScrapHop</span>
                </div>
                <div className="p-3 space-y-2.5">
                  <div className="bg-emerald-50 rounded-lg p-2.5 flex items-center gap-2">
                    <Camera className="w-4 h-4 text-emerald-600" />
                    <span className="text-xs font-medium text-emerald-700">
                      Upload Photos
                    </span>
                  </div>
                  <div className="bg-amber-50 rounded-lg p-2.5 flex items-center gap-2">
                    <IndianRupee className="w-4 h-4 text-amber-600" />
                    <span className="text-xs font-medium text-amber-700">
                      Get Price: ₹350
                    </span>
                  </div>
                  <div className="bg-emerald-50 rounded-lg p-2.5 flex items-center gap-2">
                    <Truck className="w-4 h-4 text-emerald-600" />
                    <span className="text-xs font-medium text-emerald-700">
                      Schedule Pickup
                    </span>
                  </div>
                  <button className="w-full bg-emerald-600 text-white text-xs font-bold py-2.5 rounded-lg">
                    Request Pickup
                  </button>
                </div>
              </div>

              {/* Decorative elements around the phone */}
              {/* Truck icon - bottom right */}
              <div className="absolute bottom-8 right-2 w-16 h-16 bg-emerald-100 rounded-2xl flex items-center justify-center shadow-md z-20">
                <Truck className="w-8 h-8 text-emerald-600" />
              </div>
              {/* Recycle icon - top left */}
              <div className="absolute top-8 left-2 w-14 h-14 bg-emerald-100 rounded-2xl flex items-center justify-center shadow-md z-20">
                <Recycle className="w-7 h-7 text-emerald-600" />
              </div>
              {/* Package icon - bottom left */}
              <div className="absolute bottom-16 left-6 w-12 h-12 bg-amber-100 rounded-xl flex items-center justify-center shadow-md z-20">
                <Package className="w-6 h-6 text-amber-600" />
              </div>
              {/* Location pin - top right */}
              <div className="absolute top-16 right-4 w-12 h-12 bg-red-100 rounded-xl flex items-center justify-center shadow-md z-20">
                <MapPin className="w-6 h-6 text-red-500" />
              </div>

              {/* Background circle */}
              <div className="absolute inset-6 rounded-full bg-emerald-50 -z-0" />
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════
          FEATURES SECTION
         ═══════════════════════════════════════════ */}
      <section id="features" className="bg-gray-50 py-20">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid gap-8 md:grid-cols-3">
            {/* Card 1: Photo Upload */}
            <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100 card-hover text-center">
              <div className="w-14 h-14 mx-auto mb-5 bg-emerald-50 rounded-xl flex items-center justify-center">
                <Camera className="w-7 h-7 text-emerald-600" />
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-2">
                Photo Upload
              </h3>
              <p className="text-sm text-gray-500 leading-relaxed">
                Snap photos of your scrap items for quick assessment and
                listing.
              </p>
            </div>

            {/* Card 2: AI Pricing */}
            <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100 card-hover text-center">
              <div className="w-14 h-14 mx-auto mb-5 bg-emerald-50 rounded-xl flex items-center justify-center">
                <IndianRupee className="w-7 h-7 text-emerald-600" />
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-2">
                AI Pricing
              </h3>
              <p className="text-sm text-gray-500 leading-relaxed">
                Get instant, fair market valuations for your recyclables
                using our AI-driven pricing engine.
              </p>
            </div>

            {/* Card 3: Nearby Collector */}
            <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100 card-hover text-center">
              <div className="w-14 h-14 mx-auto mb-5 bg-emerald-50 rounded-xl flex items-center justify-center">
                <MapPin className="w-7 h-7 text-emerald-600" />
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-2">
                Nearby Collector
              </h3>
              <p className="text-sm text-gray-500 leading-relaxed">
                Connect with verified local collectors for efficient and
                timely pickups at your convenience.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════
          RECYCLE GUIDE (INTERACTIVE CATEGORIES)
         ═══════════════════════════════════════════ */}
      <HomeRecycleGuide />

      {/* ═══════════════════════════════════════════
          CTA BANNER
         ═══════════════════════════════════════════ */}
      <section className="bg-emerald-600 py-16">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white mb-4">
            {t("readyToClear")}
          </h2>
          <p className="text-emerald-100 text-lg mb-8 max-w-xl mx-auto">
            {t("joinThousands")}
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            {user?.role === "COLLECTOR" ? (
              <a
                href="/radar"
                className="inline-flex items-center gap-2 bg-white text-emerald-700 font-semibold py-3.5 px-8 rounded-lg hover:bg-emerald-50 transition shadow-sm"
              >
                <Truck className="w-4 h-4" />
                {t("collectorRadar")}
              </a>
            ) : (
              <>
                <a
                  href={user ? "/sell" : "/login"}
                  onClick={handleSellClick}
                  className="inline-flex items-center gap-2 bg-white text-emerald-700 font-semibold py-3.5 px-8 rounded-lg hover:bg-emerald-50 transition"
                >
                  <Smartphone className="w-4 h-4" />
                  {t("sellYourScrap")}
                </a>
                {user?.role !== "SELLER" && (
                  <a
                    href="/login"
                    className="inline-flex items-center gap-2 bg-emerald-700 text-white font-semibold py-3.5 px-8 rounded-lg hover:bg-emerald-800 transition border border-emerald-500"
                  >
                    <Truck className="w-4 h-4" />
                    {t("joinAsCollector")}
                  </a>
                )}
              </>
            )}
          </div>
        </div>
      </section>
    </>
  );
}
