"use client";

import { useState, useEffect } from "react";
import { Truck, CheckCircle, X } from "lucide-react";
import { usePathname } from "next/navigation";
import { useApp } from "@/context/AppContext";

function playChime() {
  try {
    const AudioCtx = window.AudioContext || (window as any).webkitAudioContext;
    if (!AudioCtx) return;
    const ctx = new AudioCtx();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = "sine";
    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.frequency.setValueAtTime(587.33, ctx.currentTime);
    osc.frequency.setValueAtTime(880, ctx.currentTime + 0.12);
    gain.gain.setValueAtTime(0.25, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.45);
    osc.start(ctx.currentTime);
    osc.stop(ctx.currentTime + 0.45);
  } catch (e) {
    // Ignore audio restriction
  }
}

export default function OrderAcceptanceNotifier() {
  const pathname = usePathname();
  const { user } = useApp();
  const [activeNotification, setActiveNotification] = useState<any>(null);

  // If the user is on the Collector Radar or logged in as a COLLECTOR, NEVER show this popup
  const isCollectorView = user?.role === "COLLECTOR" || pathname.startsWith("/radar");

  useEffect(() => {
    // Skip completely for collectors
    if (isCollectorView) {
      setActiveNotification(null);
      return;
    }

    // Check if there is an active order in localStorage for a customer/seller
    const checkActiveOrder = async () => {
      try {
        const raw = localStorage.getItem("scraphop_last_order");
        if (!raw) return;
        const localOrder = JSON.parse(raw);
        if (!localOrder?.orderID) return;

        // If user already dismissed this specific accepted order modal, skip
        const dismissed = localStorage.getItem("scraphop_dismissed_acceptance");
        if (dismissed === localOrder.orderID) return;

        const res = await fetch(`/api/orders?orderID=${localOrder.orderID}`);
        if (!res.ok) return;
        const data = await res.json();
        if (data.success && data.order) {
          if (data.order.status === "ACCEPTED") {
            // Update local storage copy
            localStorage.setItem("scraphop_last_order", JSON.stringify(data.order));

            // Only show to customers when on other browsing pages (not on /sell or /radar)
            if (pathname !== "/sell" && !pathname.startsWith("/radar")) {
              setActiveNotification(data.order);
              playChime();
            }
          }
        }
      } catch (err) {
        // Silently catch background poll error
      }
    };

    checkActiveOrder();
    const interval = setInterval(checkActiveOrder, 4000);
    return () => clearInterval(interval);
  }, [pathname, isCollectorView]);

  const dismiss = () => {
    if (activeNotification?.orderID) {
      try {
        localStorage.setItem("scraphop_dismissed_acceptance", activeNotification.orderID);
      } catch (e) {}
    }
    setActiveNotification(null);
  };

  // Do not render anything if user is on collector side or notification is null
  if (isCollectorView || !activeNotification) return null;

  return (
    <div className="fixed bottom-6 right-6 z-50 max-w-sm w-full bg-white dark:bg-gray-900 border border-emerald-300 dark:border-emerald-700 shadow-2xl rounded-2xl p-4 animate-in slide-in-from-bottom-5 duration-300">
      <div className="flex items-start gap-3">
        <div className="w-10 h-10 rounded-full bg-emerald-100 dark:bg-emerald-950 flex items-center justify-center flex-shrink-0">
          <Truck className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between gap-2">
            <span className="text-[11px] font-bold text-emerald-600 dark:text-emerald-400 uppercase tracking-wider">
              Pickup Accepted!
            </span>
            <button
              onClick={dismiss}
              className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 transition"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
          <h4 className="text-sm font-bold text-gray-900 dark:text-white mt-0.5">
            {activeNotification.collectorName || "A Collector"} accepted your request
          </h4>
          <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
            Order <span className="font-mono font-semibold">{activeNotification.orderID}</span> is confirmed and the collector is on the way.
          </p>
          <div className="mt-3 flex items-center gap-2">
            <a
              href="/sell"
              className="inline-flex items-center gap-1 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-semibold px-3 py-1.5 rounded-lg transition shadow-xs"
            >
              <CheckCircle className="w-3.5 h-3.5" />
              View Order
            </a>
            <button
              onClick={dismiss}
              className="text-xs text-gray-500 hover:text-gray-700 dark:text-gray-400 font-medium px-2 py-1.5"
            >
              Dismiss
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
