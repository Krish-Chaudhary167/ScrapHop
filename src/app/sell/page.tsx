"use client";

import { useState, useEffect, useRef, ChangeEvent, DragEvent } from "react";
import {
  Camera,
  IndianRupee,
  Upload,
  X,
  Sparkles,
  MapPin,
  ArrowRight,
  Package,
  CheckCircle,
  Loader2,
  Scale,
  Calculator,
  Truck,
  Bell,
  Clock,
  User,
  Phone,
} from "lucide-react";
import { useApp } from "@/context/AppContext";
import { useRouter } from "next/navigation";

function playSuccessChime() {
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
    gain.gain.setValueAtTime(0.2, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.45);
    osc.start(ctx.currentTime);
    osc.stop(ctx.currentTime + 0.45);
  } catch (e) {
    // AudioContext blocked or unsupported
  }
}

export interface ScrapTypeItem {
  name: string;
  ratePerKg: number;
  unit: string;
  hintKey: string;
}

// Current average Indian scrap market benchmark rates (₹ / kg)
export const SCRAP_DATA: ScrapTypeItem[] = [
  { name: "Cardboard", ratePerKg: 5, unit: "kg", hintKey: "hintCardboard" },
  { name: "Plastic", ratePerKg: 8, unit: "kg", hintKey: "hintPlastic" },
  { name: "Paper / Books", ratePerKg: 12, unit: "kg", hintKey: "hintPaper" },
  { name: "Metal / Iron", ratePerKg: 28, unit: "kg", hintKey: "hintMetal" },
  { name: "Electronics", ratePerKg: 35, unit: "kg", hintKey: "hintElectronics" },
  { name: "Glass", ratePerKg: 2, unit: "kg", hintKey: "hintGlass" },
  { name: "Other", ratePerKg: 5, unit: "kg", hintKey: "hintOther" },
];

export default function SellPage() {
  const { t, user } = useApp();
  const router = useRouter();
  const [files, setFiles] = useState<File[]>([]);
  const [previews, setPreviews] = useState<string[]>([]);
  const [selectedTypes, setSelectedTypes] = useState<string[]>([]);
  const [aiDetectedTypes, setAiDetectedTypes] = useState<string[]>([]);
  const [isDetecting, setIsDetecting] = useState(false);
  const [detectionNotice, setDetectionNotice] = useState<string>("");
  const [estimatedWeight, setEstimatedWeight] = useState<number>(1);
  const [address, setAddress] = useState("");
  const [sellerName, setSellerName] = useState(user?.name || "");
  const [sellerPhone, setSellerPhone] = useState(user?.phone || "");
  const [isDragActive, setIsDragActive] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [confirmedOrder, setConfirmedOrder] = useState<any>(null);
  const [showAcceptedModal, setShowAcceptedModal] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  // Redirect to login page if user is not logged in
  useEffect(() => {
    try {
      const stored = localStorage.getItem("scraphop_user");
      if (!user && !stored) {
        router.push("/login");
      }
    } catch (e) {}
  }, [user, router]);

  // Sync user profile into contact fields if available
  useEffect(() => {
    if (user?.name && !sellerName) setSellerName(user.name);
    if (user?.phone && !sellerPhone) setSellerPhone(user.phone);
  }, [user]);

  // Generate preview URLs when files change
  useEffect(() => {
    const urls = files.map((f) => URL.createObjectURL(f));
    setPreviews(urls);
    return () => urls.forEach((u) => URL.revokeObjectURL(u));
  }, [files]);

  // Real-time polling to check if a collector accepts the order
  useEffect(() => {
    if (!confirmedOrder?.orderID) return;
    if (confirmedOrder.status === "ACCEPTED") return;

    const interval = setInterval(async () => {
      try {
        const res = await fetch(`/api/orders?orderID=${confirmedOrder.orderID}`);
        if (res.ok) {
          const data = await res.json();
          if (data.success && data.order) {
            if (data.order.status === "ACCEPTED") {
              setConfirmedOrder(data.order);
              setShowAcceptedModal(true);
              playSuccessChime();
              try {
                localStorage.setItem("scraphop_last_order", JSON.stringify(data.order));
              } catch (e) {}
            }
          }
        }
      } catch (err) {
        console.error("Order poll error:", err);
      }
    }, 3000);

    return () => clearInterval(interval);
  }, [confirmedOrder]);

  // Run YOLO AI model prediction on newly uploaded files
  const runDetection = async (filesToDetect: File[]) => {
    if (filesToDetect.length === 0) return;
    try {
      setIsDetecting(true);
      setDetectionNotice("Analyzing...");
      const detected = new Set<string>();

      for (const file of filesToDetect) {
        const formData = new FormData();
        formData.append("file", file);

        const res = await fetch("/api/detect", {
          method: "POST",
          body: formData,
        });

        if (res.ok) {
          const data = await res.json();
          if (data.success && Array.isArray(data.detectedTypes)) {
            data.detectedTypes.forEach((t: string) => detected.add(t));
          }
        }
      }

      if (detected.size > 0) {
        const detectedArr = Array.from(detected);
        setAiDetectedTypes((prev) => Array.from(new Set([...prev, ...detectedArr])));
        setSelectedTypes((prev) => Array.from(new Set([...prev, ...detectedArr])));
        setDetectionNotice(`AI model detected: ${detectedArr.join(", ")} (added to selection)`);
      } else {
        setDetectionNotice("No clear scrap category detected. You can select manually below.");
      }
    } catch (err) {
      console.error("AI Detection error:", err);
      setDetectionNotice("AI model could not process photo. You can select manually below.");
    } finally {
      setIsDetecting(false);
    }
  };

  const addFiles = (incoming: FileList | null) => {
    if (!incoming) return;
    const incomingList = Array.from(incoming);
    setFiles((prev) => [...prev, ...incomingList]);
    runDetection(incomingList);
  };

  const removeFile = (index: number) => {
    setFiles((prev) => prev.filter((_, i) => i !== index));
  };

  const toggleType = (t: string) => {
    setSelectedTypes((prev) =>
      prev.includes(t) ? prev.filter((x) => x !== t) : [...prev, t]
    );
  };

  const handleDrop = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragActive(false);
    addFiles(e.dataTransfer.files);
  };

  // Indian scrap price calculation based on selected scrap categories
  const selectedItemsData = SCRAP_DATA.filter((item) =>
    selectedTypes.includes(item.name)
  );

  // Sum of scrap rates (e.g., Cardboard ₹5 + Plastic ₹8 = ₹13/kg)
  const combinedRatePerKg = selectedItemsData.reduce(
    (acc, curr) => acc + curr.ratePerKg,
    0
  );

  // Estimated total payout = combined rate * estimated weight (minimum 1 kg)
  const effectiveWeight = Math.max(1, Number(estimatedWeight) || 1);
  const estimatedPrice = combinedRatePerKg > 0 ? combinedRatePerKg * effectiveWeight : 0;

  // Real submission to AWS S3 and DynamoDB
  const requestPickup = async () => {
    const finalName = sellerName.trim() || user?.name || "Customer";
    const finalPhone = sellerPhone.trim() || user?.phone || "";

    if (!address.trim()) {
      alert("Please enter your pickup address!");
      return;
    }

    if (!finalPhone) {
      alert("Please enter your phone number (compulsory) so the collector can contact you!");
      return;
    }

    try {
      setIsLoading(true);

      // 1. Upload photos to AWS S3
      const uploadedKeys: string[] = [];
      const uploadedUrls: string[] = [];

      for (const file of files) {
        const formData = new FormData();
        formData.append("file", file);

        const uploadRes = await fetch("/api/upload", {
          method: "POST",
          body: formData,
        });

        if (uploadRes.ok) {
          const uploadData = await uploadRes.json();
          uploadedKeys.push(uploadData.key);
          uploadedUrls.push(uploadData.url);
        }
      }

      // 2. Save pickup order to AWS DynamoDB
      const orderRes = await fetch("/api/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          customerAddress: address.trim(),
          scrapTypes: selectedTypes,
          estimatedPrice,
          estimatedWeight: effectiveWeight,
          imageKeys: uploadedKeys,
          imageUrls: uploadedUrls,
          sellerName: finalName,
          sellerEmail: user?.email || null,
          sellerPhone: finalPhone,
        }),
      });

      const orderData = await orderRes.json();

      if (orderData.success) {
        setConfirmedOrder(orderData.order);
        try {
          localStorage.setItem("scraphop_last_order", JSON.stringify(orderData.order));
        } catch (e) {}
      } else {
        alert("Failed to submit order: " + (orderData.error || "Unknown error"));
      }
    } catch (err: any) {
      console.error(err);
      alert("Error submitting pickup: " + err.message);
    } finally {
      setIsLoading(false);
    }
  };

  // If order was placed successfully, show confirmation screen
  if (confirmedOrder) {
    const isAccepted = confirmedOrder.status === "ACCEPTED";
    const orderAgeMs = Date.now() - new Date(confirmedOrder.createdAt || 0).getTime();
    const isExpired = !isAccepted && (orderAgeMs > 24 * 3600 * 1000);

    return (
      <div className="bg-gray-50 dark:bg-gray-950 min-h-screen py-16 px-4 flex items-center justify-center transition-colors">
        {/* ── Pop-Up Modal when Collector Accepts ── */}
        {showAcceptedModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
            <div className="bg-white dark:bg-gray-900 rounded-3xl max-w-sm w-full p-6 shadow-2xl border border-emerald-200 dark:border-emerald-800 text-center animate-in fade-in zoom-in-95 duration-200">
              <div className="w-16 h-16 bg-emerald-100 dark:bg-emerald-950/80 rounded-full flex items-center justify-center mx-auto mb-4">
                <Truck className="w-8 h-8 text-emerald-600 dark:text-emerald-400" />
              </div>
              <span className="text-[11px] font-bold uppercase tracking-wider text-emerald-600 dark:text-emerald-400">
                Pickup Accepted!
              </span>
              <h3 className="text-xl font-extrabold text-gray-900 dark:text-white mt-1 mb-2">
                {confirmedOrder.collectorName || "A Collector"} has accepted!
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-300 mb-5">
                Great news! <strong>{confirmedOrder.collectorName || "The collector"}</strong> has accepted your scrap pickup request and is now heading to your location.
              </p>

              <div className="bg-gray-50 dark:bg-gray-800/80 rounded-2xl p-3.5 text-xs text-left mb-5 space-y-1.5 border border-gray-100 dark:border-gray-800">
                <div className="flex justify-between">
                  <span className="text-gray-400">Collector:</span>
                  <span className="font-bold text-gray-800 dark:text-gray-200">
                    {confirmedOrder.collectorName || "Verified Recycler"}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Order ID:</span>
                  <span className="font-mono font-bold text-gray-800 dark:text-gray-200">
                    {confirmedOrder.orderID}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Estimated Payout:</span>
                  <span className="font-bold text-emerald-600 dark:text-emerald-400">
                    ₹{confirmedOrder.estimatedPrice}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Status:</span>
                  <span className="font-semibold text-emerald-600 dark:text-emerald-400">
                    On The Way 🚚
                  </span>
                </div>
              </div>

              <button
                onClick={() => setShowAcceptedModal(false)}
                className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-3 rounded-xl transition shadow-sm text-sm"
              >
                Awesome, Got It!
              </button>
            </div>
          </div>
        )}

        <div className="max-w-md w-full bg-white dark:bg-gray-900 rounded-3xl p-8 shadow-sm border border-gray-100 dark:border-gray-800 text-center transition-colors">
          <div className={`w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 ${
            isAccepted ? "bg-emerald-100 dark:bg-emerald-950/60" : "bg-amber-100 dark:bg-amber-950/60"
          }`}>
            {isAccepted ? (
              <CheckCircle className="w-9 h-9 text-emerald-600 dark:text-emerald-400" />
            ) : (
              <Package className="w-9 h-9 text-amber-600 dark:text-amber-400" />
            )}
          </div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-1">
            {isAccepted ? "Pickup Confirmed & Accepted!" : isExpired ? "Pickup Request Expired" : t("pickupRequested")}
          </h1>
          <p className="text-sm text-gray-500 dark:text-gray-400 mb-6">
            {isAccepted
              ? `Collector "${confirmedOrder.collectorName}" has accepted your request and is heading to your location!`
              : isExpired
              ? "This request reached the 24-hour validity limit without being collected."
              : t("pickupRequestedSub")}
          </p>

          {/* Real-time Status Card */}
          {isAccepted ? (
            <div className="p-4 bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800 rounded-2xl mb-6 text-left">
              <div className="flex items-center gap-2 text-emerald-800 dark:text-emerald-300 font-bold text-sm mb-1">
                <Truck className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                <span>Accepted by {confirmedOrder.collectorName}</span>
              </div>
              <p className="text-xs text-emerald-700 dark:text-emerald-400">
                The collector is on the way to your pickup address. Please keep your scrap ready!
              </p>
            </div>
          ) : isExpired ? (
            <div className="p-4 bg-gray-100 dark:bg-gray-800/80 border border-gray-200 dark:border-gray-700 rounded-2xl mb-6 text-left">
              <div className="flex items-center gap-2 text-gray-700 dark:text-gray-300 font-bold text-xs mb-1">
                <Clock className="w-4 h-4 text-gray-500" />
                <span>Request Window Expired (24 Hours)</span>
              </div>
              <p className="text-[11px] text-gray-500 dark:text-gray-400">
                This request was not accepted within the 24-hour limit. You can submit a fresh pickup request below!
              </p>
            </div>
          ) : (
            <div className="p-4 bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-800 rounded-2xl mb-6 text-left">
              <div className="flex items-center gap-2 text-amber-800 dark:text-amber-300 font-semibold text-xs mb-1">
                <span className="w-2.5 h-2.5 rounded-full bg-amber-500 animate-ping" />
                <span>Searching for nearby scrap collectors...</span>
              </div>
              <p className="text-[11px] text-amber-700/80 dark:text-amber-400/80">
                Live alert sent. A pop-up will notify you as soon as a collector accepts!
              </p>
            </div>
          )}

          <div className="bg-gray-50 dark:bg-gray-800/80 rounded-2xl p-4 text-left space-y-2 mb-6 text-sm">
            <div className="flex justify-between">
              <span className="text-gray-400 dark:text-gray-400">{t("orderId")}</span>
              <span className="font-mono font-bold text-gray-800 dark:text-gray-200">
                {confirmedOrder.orderID}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-400 dark:text-gray-400">{t("items")}</span>
              <span className="text-gray-800 dark:text-gray-200 font-medium truncate max-w-[200px]">
                {confirmedOrder.scrapTypes?.map((st: string) => t(st)).join(", ") || "—"}
              </span>
            </div>
            {confirmedOrder.estimatedWeight && (
              <div className="flex justify-between">
                <span className="text-gray-400 dark:text-gray-400">{t("approxWeight")}:</span>
                <span className="text-gray-800 dark:text-gray-200 font-medium">
                  {confirmedOrder.estimatedWeight} kg
                </span>
              </div>
            )}
            <div className="flex justify-between">
              <span className="text-gray-400 dark:text-gray-400">{t("estPayout")}</span>
              <span className="font-bold text-emerald-600 dark:text-emerald-400">
                ₹{confirmedOrder.estimatedPrice}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-400 dark:text-gray-400">{t("address")}</span>
              <span className="text-gray-800 dark:text-gray-200 font-medium truncate max-w-[200px]">
                {confirmedOrder.customerAddress}
              </span>
            </div>
            {isAccepted && confirmedOrder.collectorName && (
              <div className="flex justify-between">
                <span className="text-gray-400 dark:text-gray-400">Collector:</span>
                <span className="font-bold text-emerald-600 dark:text-emerald-400">
                  {confirmedOrder.collectorName}
                </span>
              </div>
            )}
            <div className="flex justify-between items-center">
              <span className="text-gray-400 dark:text-gray-400">{t("status")}</span>
              {isAccepted ? (
                <span className="inline-flex items-center gap-1 text-xs font-semibold px-2 py-0.5 rounded-full bg-emerald-100 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-400">
                  <CheckCircle className="w-3 h-3" />
                  Accepted — On The Way
                </span>
              ) : isExpired ? (
                <span className="inline-flex items-center gap-1 text-xs font-semibold px-2 py-0.5 rounded-full bg-gray-200 dark:bg-gray-800 text-gray-700 dark:text-gray-300">
                  <Clock className="w-3 h-3 text-gray-500" />
                  Expired
                </span>
              ) : (
                <span className="inline-flex items-center gap-1 text-xs font-semibold px-2 py-0.5 rounded-full bg-amber-100 dark:bg-amber-950/60 text-amber-700 dark:text-amber-400">
                  <span className="w-1.5 h-1.5 rounded-full bg-amber-500 animate-pulse" />
                  {t("searchingNearby")}
                </span>
              )}
            </div>
          </div>

          <div className="flex flex-col gap-3">
            <button
              onClick={() => {
                setConfirmedOrder(null);
                setFiles([]);
                setAddress("");
                setSelectedTypes([]);
                setAiDetectedTypes([]);
                setDetectionNotice("");
                setEstimatedWeight(1);
                setShowAcceptedModal(false);
              }}
              className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-semibold py-3.5 rounded-xl transition text-sm shadow-sm"
            >
              Sell More Scrap
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gray-50 dark:bg-gray-950 min-h-screen py-10 px-4 sm:px-6 lg:px-8 transition-colors">
      <div className="max-w-xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-extrabold text-gray-900 dark:text-white">
            {t("sellPageTitle")}
          </h1>
          <p className="text-gray-500 dark:text-gray-400 mt-2">
            {t("sellPageSubtitle")}
          </p>
        </div>

        {/* ── Step 1: Upload Area ── */}
        <div className="bg-white dark:bg-gray-900 rounded-2xl p-6 shadow-sm border border-gray-100 dark:border-gray-800 mb-6 transition-colors">
          <h2 className="text-sm font-bold text-gray-900 dark:text-white uppercase tracking-wide mb-4 flex items-center gap-2">
            <Camera className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
            {t("step1")}
          </h2>

          <div
            className={`rounded-xl border-2 border-dashed p-8 text-center transition cursor-pointer ${
              isDragActive
                ? "border-emerald-500 bg-emerald-50 dark:bg-emerald-950/30"
                : "border-gray-200 dark:border-gray-700 hover:border-emerald-300 hover:bg-gray-50 dark:hover:bg-gray-800/50"
            }`}
            onDrop={handleDrop}
            onDragOver={(e) => {
              e.preventDefault();
              setIsDragActive(true);
            }}
            onDragLeave={() => setIsDragActive(false)}
            onClick={() => inputRef.current?.click()}
          >
            <input
              ref={inputRef}
              type="file"
              accept="image/*"
              multiple
              className="hidden"
              onChange={(e: ChangeEvent<HTMLInputElement>) =>
                addFiles(e.target.files)
              }
            />
            <Upload className="w-10 h-10 text-gray-300 dark:text-gray-600 mx-auto mb-3" />
            <p className="font-medium text-gray-600 dark:text-gray-300 text-sm">
              {t("dragDrop")}
            </p>
          </div>

          {/* Previews */}
          {previews.length > 0 && (
            <div className="grid grid-cols-4 gap-2 mt-4">
              {previews.map((src, i) => (
                <div
                  key={i}
                  className="relative group rounded-lg overflow-hidden border border-gray-100 dark:border-gray-800"
                >
                  <img
                    src={src}
                    alt={`preview ${i + 1}`}
                    className="w-full h-20 object-cover"
                  />
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      removeFile(i);
                    }}
                    className="absolute top-1 right-1 bg-white/80 dark:bg-gray-900/80 rounded-full p-0.5 opacity-0 group-hover:opacity-100 transition"
                  >
                    <X className="w-3.5 h-3.5 text-gray-600 dark:text-gray-300" />
                  </button>
                </div>
              ))}
            </div>
          )}

          {/* AI Detection Loading & Status */}
          {isDetecting && (
            <div className="mt-4 flex items-center justify-center gap-2 p-3 bg-emerald-50 dark:bg-emerald-950/40 text-emerald-800 dark:text-emerald-300 rounded-xl text-xs font-semibold border border-emerald-200 dark:border-emerald-800">
              <Loader2 className="w-4 h-4 animate-spin text-emerald-600 dark:text-emerald-400" />
              {t("analyzing")}
            </div>
          )}

          {!isDetecting && detectionNotice && (
            <div className="mt-4 flex items-center gap-2 p-3 bg-emerald-50/70 dark:bg-emerald-950/30 text-emerald-800 dark:text-emerald-300 rounded-xl text-xs border border-emerald-200 dark:border-emerald-800">
              <Sparkles className="w-4 h-4 text-emerald-600 dark:text-emerald-400 flex-shrink-0" />
              <span>{detectionNotice}</span>
            </div>
          )}
        </div>

        {/* ── Step 2: Scrap Types ── */}
        <div className="bg-white dark:bg-gray-900 rounded-2xl p-6 shadow-sm border border-gray-100 dark:border-gray-800 mb-6 transition-colors">
          <div className="flex items-center justify-between mb-2">
            <h2 className="text-sm font-bold text-gray-900 dark:text-white uppercase tracking-wide flex items-center gap-2">
              <Package className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
              {t("step2")}
            </h2>
            <span className="text-xs font-semibold text-emerald-700 dark:text-emerald-300 bg-emerald-50 dark:bg-emerald-950/60 px-2 py-0.5 rounded-md border border-emerald-100 dark:border-emerald-800">
              {t("indiaScrapRates")}
            </span>
          </div>
          <p className="text-xs text-gray-500 dark:text-gray-400 mb-4">
            {t("step2Subtitle")}
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
            {SCRAP_DATA.map((item) => {
              const isSelected = selectedTypes.includes(item.name);
              const isAiDetected = aiDetectedTypes.includes(item.name);

              return (
                <button
                  key={item.name}
                  type="button"
                  onClick={() => toggleType(item.name)}
                  className={`flex items-center justify-between p-3 rounded-xl border text-left transition-all ${
                    isSelected
                      ? "border-emerald-600 bg-emerald-50/80 dark:bg-emerald-950/40 text-emerald-950 dark:text-emerald-200 shadow-xs ring-1 ring-emerald-600"
                      : "border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 hover:border-emerald-200 hover:bg-gray-50 dark:hover:bg-gray-700/60 text-gray-700 dark:text-gray-200"
                  }`}
                >
                  <div className="min-w-0 pr-2">
                    <div className="flex items-center gap-1.5 flex-wrap">
                      <span className="text-sm font-semibold text-gray-900 dark:text-white">
                        {t(item.name)}
                      </span>
                      {isAiDetected && (
                        <span className="text-[10px] font-bold bg-amber-100 dark:bg-amber-950 text-amber-800 dark:text-amber-300 px-1.5 py-0.2 rounded">
                          {t("aiDetected")}
                        </span>
                      )}
                    </div>
                    <span className="text-[11px] text-gray-400 dark:text-gray-500 block truncate">
                      {t(item.hintKey)}
                    </span>
                  </div>

                  <div className="flex items-center gap-2 flex-shrink-0">
                    <span
                      className={`text-xs font-bold px-2.5 py-1 rounded-lg ${
                        isSelected
                          ? "bg-emerald-600 text-white"
                          : "bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-200"
                      }`}
                    >
                      ₹{item.ratePerKg}/{item.unit}
                    </span>
                  </div>
                </button>
              );
            })}
          </div>

          {/* ── Optional Weight Estimator ── */}
          <div className="mt-5 pt-4 border-t border-gray-100 dark:border-gray-800">
            <div className="flex items-center justify-between mb-2">
              <label className="text-xs font-bold text-gray-700 dark:text-gray-300 uppercase tracking-wide flex items-center gap-1.5">
                <Scale className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
                {t("approxWeight")}
              </label>
              <span className="text-xs text-gray-400 dark:text-gray-500">
                {t("defaultPerKg")}
              </span>
            </div>

            <div className="flex items-center gap-2">
              <div className="relative flex-1">
                <input
                  type="number"
                  min="1"
                  max="1000"
                  step="1"
                  value={estimatedWeight}
                  onChange={(e) =>
                    setEstimatedWeight(Math.max(1, Number(e.target.value) || 1))
                  }
                  className="w-full pl-3 pr-10 py-2 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-sm font-medium text-gray-800 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                  placeholder="Enter approx weight"
                />
                <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs font-semibold text-gray-400">
                  kg
                </span>
              </div>

              {/* Quick weight buttons */}
              <div className="flex gap-1">
                {[1, 5, 10, 20].map((wt) => (
                  <button
                    key={wt}
                    type="button"
                    onClick={() => setEstimatedWeight(wt)}
                    className={`px-2.5 py-2 text-xs font-semibold rounded-xl border transition ${
                      estimatedWeight === wt
                        ? "bg-emerald-600 text-white border-emerald-600"
                        : "bg-gray-50 dark:bg-gray-800 text-gray-600 dark:text-gray-300 border-gray-200 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-700"
                    }`}
                  >
                    {wt}kg
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* ── Step 3: Address & Contact Details ── */}
        <div className="bg-white dark:bg-gray-900 rounded-2xl p-6 shadow-sm border border-gray-100 dark:border-gray-800 mb-6 transition-colors">
          <h2 className="text-sm font-bold text-gray-900 dark:text-white uppercase tracking-wide mb-4 flex items-center gap-2">
            <MapPin className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
            {t("step3")}
          </h2>

          <div className="space-y-3.5">
            <div>
              <label className="block text-xs font-semibold text-gray-700 dark:text-gray-300 mb-1.5">
                Pickup Address
              </label>
              <input
                type="text"
                placeholder={t("addressPlaceholder")}
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent text-gray-700 dark:text-gray-100 placeholder:text-gray-400 text-sm"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
              <div>
                <label className="block text-xs font-semibold text-gray-700 dark:text-gray-300 mb-1.5">
                  Your Name
                </label>
                <div className="relative">
                  <User className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    placeholder="e.g. Rahul Sharma"
                    value={sellerName}
                    onChange={(e) => setSellerName(e.target.value)}
                    className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-emerald-500 text-gray-700 dark:text-gray-100 placeholder:text-gray-400 text-sm"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-700 dark:text-gray-300 mb-1.5">
                  Phone Number
                </label>
                <div className="relative">
                  <Phone className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="tel"
                    placeholder="+91 98765 43210"
                    value={sellerPhone}
                    onChange={(e) => setSellerPhone(e.target.value)}
                    className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-emerald-500 text-gray-700 dark:text-gray-100 placeholder:text-gray-400 text-sm"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ── Price Card ── */}
        <div className="bg-white dark:bg-gray-900 rounded-2xl p-6 shadow-sm border border-gray-100 dark:border-gray-800 mb-6 transition-colors">
          <div className="flex items-center justify-between mb-2">
            <span className="flex items-center gap-2 text-sm font-bold text-gray-900 dark:text-white uppercase tracking-wide">
              <Calculator className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
              {t("estimatedValuation")}
            </span>
            <span className="text-xs text-emerald-700 dark:text-emerald-300 bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-200 dark:border-emerald-800 px-2 py-0.5 rounded-full font-semibold">
              {t("liveBenchmarks")}
            </span>
          </div>

          <div className="mt-3 flex items-baseline gap-2">
            {estimatedPrice > 0 ? (
              <>
                <span className="flex items-center text-4xl font-extrabold text-emerald-600 dark:text-emerald-400">
                  <IndianRupee className="w-8 h-8" />
                  {estimatedPrice}
                </span>
                <span className="text-sm text-gray-500 dark:text-gray-400 font-medium">
                  {effectiveWeight > 1 ? `(for ~${effectiveWeight} kg)` : "/ kg base rate"}
                </span>
              </>
            ) : (
              <span className="text-3xl font-bold text-gray-300 dark:text-gray-600">—</span>
            )}
          </div>

          {/* Pricing Math & Breakdown */}
          {selectedItemsData.length > 0 ? (
            <div className="mt-4 bg-gray-50 dark:bg-gray-800/60 rounded-xl p-3.5 border border-gray-100 dark:border-gray-800 space-y-2 text-xs">
              <div className="font-semibold text-gray-700 dark:text-gray-300 flex justify-between pb-1 border-b border-gray-200 dark:border-gray-700">
                <span>{t("selectedItem")}</span>
                <span>{t("marketRate")}</span>
              </div>
              {selectedItemsData.map((item) => (
                <div key={item.name} className="flex justify-between text-gray-600 dark:text-gray-300">
                  <span>{t(item.name)}</span>
                  <span className="font-medium text-gray-800 dark:text-gray-100">
                    ₹{item.ratePerKg} / {item.unit}
                  </span>
                </div>
              ))}

              <div className="pt-2 border-t border-gray-200 dark:border-gray-700 space-y-1">
                <div className="flex justify-between font-bold text-gray-800 dark:text-gray-100">
                  <span>{t("combinedRate")}</span>
                  <span className="text-emerald-600 dark:text-emerald-400">₹{combinedRatePerKg} / kg</span>
                </div>
                {effectiveWeight > 1 && (
                  <div className="flex justify-between text-gray-500 dark:text-gray-400">
                    <span>{t("calculation")}</span>
                    <span>
                      ₹{combinedRatePerKg}/kg × {effectiveWeight} kg = ₹{estimatedPrice}
                    </span>
                  </div>
                )}
              </div>
            </div>
          ) : (
            <p className="text-xs text-gray-400 dark:text-gray-500 mt-2">
              Select scrap categories above to view live per-kg price and total payout calculation.
            </p>
          )}

          <p className="text-[11px] text-gray-400 dark:text-gray-500 mt-3">
            *Final payout is weighed on a certified digital scale by the Kabadiwala upon arrival.
          </p>
        </div>

        {/* ── Submit ── */}
        <button
          onClick={requestPickup}
          disabled={isLoading || (!address.trim() && files.length === 0)}
          className="w-full flex items-center justify-center gap-2 bg-emerald-600 hover:bg-emerald-700 disabled:bg-gray-200 dark:disabled:bg-gray-800 disabled:text-gray-400 dark:disabled:text-gray-600 text-white font-semibold py-4 rounded-2xl transition text-base shadow-sm"
        >
          {isLoading ? (
            <>
              <Loader2 className="w-5 h-5 animate-spin" />
              {t("uploadingAndRequesting")}
            </>
          ) : (
            <>
              {t("requestPickup")}
              <ArrowRight className="w-5 h-5" />
            </>
          )}
        </button>
      </div>
    </div>
  );
}
