"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Truck,
  CheckCircle,
  MapPin,
  IndianRupee,
  Package,
  Navigation,
  RefreshCw,
  ShieldAlert,
  ArrowRight,
  X,
  RotateCcw,
  User,
  Phone,
  Scale,
  ExternalLink,
  ChevronRight,
  Eye,
  Check,
  Copy,
  MessageCircle,
  Lock,
  Unlock,
  ShieldCheck,
  CheckCheck,
} from "lucide-react";
import { useApp } from "@/context/AppContext";

interface Order {
  orderID: string;
  customerAddress: string;
  estimatedPrice: number;
  estimatedWeight?: number;
  scrapTypes: string[];
  imageUrls?: string[];
  status: string;
  createdAt?: string;
  collectorName?: string;
  collectorPhone?: string;
  collectorEmail?: string;
  sellerName?: string;
  sellerPhone?: string;
  sellerEmail?: string;
  isPrivacyLocked?: boolean;
}

export default function RadarPage() {
  const { t, user } = useApp();
  const [orders, setOrders] = useState<Order[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [declinedOrders, setDeclinedOrders] = useState<string[]>([]);
  const [completedOrders, setCompletedOrders] = useState<string[]>([]);
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [copiedPhone, setCopiedPhone] = useState(false);
  const [previewImage, setPreviewImage] = useState<string | null>(null);

  // Identity helpers for the currently logged-in collector
  const currentCollectorName = (user?.name || "").trim().toLowerCase();
  const currentCollectorEmail = (user?.email || "").trim().toLowerCase();
  const currentEmailPrefix = currentCollectorEmail ? currentCollectorEmail.split("@")[0] : "";

  // Check if a given order was accepted by THIS specific collector
  const isOrderAcceptedByMe = (order: Order) => {
    if (order.status !== "ACCEPTED") return false;
    const orderCollector = (order.collectorName || "").trim().toLowerCase();
    const orderEmail = (order.collectorEmail || "").trim().toLowerCase();

    return (
      (currentCollectorName && orderCollector === currentCollectorName) ||
      (currentCollectorEmail && orderEmail === currentCollectorEmail) ||
      (currentEmailPrefix && orderCollector === currentEmailPrefix)
    );
  };

  // Fetch live orders from AWS DynamoDB
  const fetchOrders = async () => {
    try {
      const res = await fetch("/api/orders");
      const data = await res.json();
      if (data.success && Array.isArray(data.orders)) {
        setOrders(data.orders);
      }
    } catch (err) {
      console.error("Failed to fetch orders:", err);
    } finally {
      setIsLoading(false);
    }
  };

  // Poll AWS DynamoDB every 4 seconds for real-time pickup alerts
  useEffect(() => {
    fetchOrders();
    const interval = setInterval(fetchOrders, 4000);
    return () => clearInterval(interval);
  }, []);

  // Fetch full unmasked order details when an order is accepted
  const fetchFullOrderDetails = async (orderID: string) => {
    try {
      const res = await fetch(`/api/orders?orderID=${orderID}`);
      const data = await res.json();
      if (data.success && data.order) {
        return data.order;
      }
    } catch (e) {}
    return null;
  };

  // Accept pickup order in AWS DynamoDB & lock ownership to this collector
  const acceptOrder = async (orderID: string) => {
    try {
      const collectorDisplayName =
        user?.name || (user?.email ? user.email.split("@")[0] : "Verified Collector");
      const res = await fetch("/api/orders", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          orderID,
          status: "ACCEPTED",
          collectorName: collectorDisplayName,
          collectorEmail: user?.email || "",
          collectorPhone: user?.phone || "",
        }),
      });

      const data = await res.json();
      if (data.success) {
        // Fetch full unmasked address and phone from server
        const fullOrder = await fetchFullOrderDetails(orderID);
        if (fullOrder && selectedOrder?.orderID === orderID) {
          setSelectedOrder({ ...fullOrder, isPrivacyLocked: false });
        }
        fetchOrders();
      }
    } catch (err) {
      console.error("Error accepting order:", err);
    }
  };

  // Complete job and archive in DynamoDB
  const completeOrder = async (orderID: string) => {
    try {
      const res = await fetch("/api/orders", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          orderID,
          status: "COMPLETED",
        }),
      });

      const data = await res.json();
      if (data.success) {
        setCompletedOrders((prev) => [...prev, orderID]);
        if (selectedOrder && selectedOrder.orderID === orderID) {
          setSelectedOrder(null);
        }
        fetchOrders();
      }
    } catch (err) {
      console.error("Error completing order:", err);
    }
  };

  // Decline pickup order (removes it from this collector's radar view)
  const declineOrder = (orderID: string) => {
    setDeclinedOrders((prev) => Array.from(new Set([...prev, orderID])));
    if (selectedOrder && selectedOrder.orderID === orderID) {
      setSelectedOrder(null);
    }
  };

  const handleCopyPhone = (phoneNum: string) => {
    try {
      navigator.clipboard.writeText(phoneNum);
      setCopiedPhone(true);
      setTimeout(() => setCopiedPhone(false), 2000);
    } catch (e) {}
  };

  const resetAllDeclined = () => {
    setDeclinedOrders([]);
  };

  // If logged in as SELLER, restrict access
  if (user && user.role === "SELLER") {
    return (
      <div className="bg-gray-50 dark:bg-gray-950 min-h-screen py-16 px-4 flex items-center justify-center transition-colors">
        <div className="max-w-md w-full bg-white dark:bg-gray-900 rounded-3xl p-8 border border-gray-100 dark:border-gray-800 shadow-xl text-center">
          <div className="w-16 h-16 bg-amber-100 dark:bg-amber-950/60 rounded-full flex items-center justify-center mx-auto mb-4">
            <ShieldAlert className="w-8 h-8 text-amber-600 dark:text-amber-400" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
            Collector Radar is for Collectors Only
          </h2>
          <p className="text-sm text-gray-500 dark:text-gray-400 mb-6">
            You are currently logged in as a <strong>Scrap Seller</strong> ({user.name || user.email}). The Radar feed is reserved for registered collectors.
          </p>
          <a
            href="/sell"
            className="w-full inline-flex items-center justify-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold py-3.5 rounded-xl transition text-sm shadow-sm"
          >
            <span>Go to Sell Scrap</span>
            <ArrowRight className="w-4 h-4" />
          </a>
        </div>
      </div>
    );
  }

  // ── STRICT RADAR FILTER ──
  // 1. Never show COMPLETED orders
  // 2. Never show orders declined by this collector
  // 3. Show orders waiting for pickup (SEARCHING_NEARBY)
  // 4. If ACCEPTED: ONLY show if accepted by THIS logged-in collector!
  //    (If accepted by someone else, HIDE IT COMPLETELY!)
  const activeOrders = orders.filter((o) => {
    if (completedOrders.includes(o.orderID) || o.status === "COMPLETED") return false;
    if (declinedOrders.includes(o.orderID)) return false;

    // Available for any collector to pick up
    if (o.status === "SEARCHING_NEARBY") return true;

    // Accepted: ONLY show to the collector who accepted it
    if (o.status === "ACCEPTED") {
      return isOrderAcceptedByMe(o);
    }

    return false;
  });

  return (
    <div className="bg-gray-50 dark:bg-gray-950 min-h-screen py-10 px-4 sm:px-6 lg:px-8 transition-colors">
      <div className="max-w-xl mx-auto">
        {/* Header */}
        <div className="text-center mb-6">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800 mb-3">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
            {t("liveDynamoFeed")}
          </div>
          <h1 className="text-3xl font-extrabold text-gray-900 dark:text-white">
            {t("collectorRadar")}
          </h1>
          <p className="text-gray-500 dark:text-gray-400 mt-1 text-sm">
            {t("radarSubtitle")}
          </p>
        </div>



        {/* ── Radar Sonar Pulse ── */}
        <div className="relative flex items-center justify-center h-32 mb-8">
          <div className="absolute w-28 h-28 rounded-full border-2 border-emerald-300 dark:border-emerald-700 animate-radar-ping" />
          <div className="absolute w-20 h-20 rounded-full border-2 border-emerald-400 dark:border-emerald-600 animate-radar-ping-delayed" />
          <div className="relative z-10 w-14 h-14 rounded-full bg-emerald-600 flex items-center justify-center shadow-lg shadow-emerald-200 dark:shadow-none">
            <Truck className="w-7 h-7 text-white" />
          </div>
          <p className="absolute bottom-0 text-xs font-semibold text-emerald-600 dark:text-emerald-400 flex items-center gap-1">
            <RefreshCw className="w-3 h-3 animate-spin" />
            {t("scanningNearby")}
          </p>
        </div>

        {/* ── Live Orders List ── */}
        <div className="space-y-4">
          <AnimatePresence>
            {activeOrders.map((order) => {
              const isAccepted = isOrderAcceptedByMe(order);

              return (
                <motion.div
                  key={order.orderID}
                  layout
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, x: -100, scale: 0.95 }}
                  transition={{ duration: 0.2 }}
                  onClick={() => setSelectedOrder(order)}
                  className={`bg-white dark:bg-gray-900 rounded-2xl p-5 border transition-all cursor-pointer group hover:shadow-lg hover:border-emerald-500/70 ${
                    isAccepted
                      ? "border-emerald-300 dark:border-emerald-800 bg-emerald-50/30 dark:bg-emerald-950/20"
                      : "border-gray-200 dark:border-gray-800"
                  }`}
                >
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1 min-w-0">
                      {/* Order ID & Tag */}
                      <div className="flex items-center gap-2 mb-2 flex-wrap">
                        <span className="font-mono text-xs font-bold text-gray-400">
                          {order.orderID}
                        </span>
                        {isAccepted ? (
                          <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-100 dark:bg-emerald-950/70 text-emerald-800 dark:text-emerald-300">
                            {t("acceptedByYou")}
                          </span>
                        ) : (
                          <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-amber-100 dark:bg-amber-950/70 text-amber-800 dark:text-amber-300">
                            {t("waitingPickup")}
                          </span>
                        )}
                      </div>

                      {/* Locality (Masked if not accepted) */}
                      <div className="flex items-center gap-2 mb-2">
                        <MapPin className="w-4 h-4 text-emerald-600 dark:text-emerald-400 flex-shrink-0" />
                        <span className="text-sm font-semibold text-gray-800 dark:text-gray-200 truncate">
                          {order.customerAddress}
                        </span>
                      </div>

                      {/* Scrap Types */}
                      <div className="flex flex-wrap gap-1.5 mb-2">
                        {order.scrapTypes?.map((tName, idx) => (
                          <span
                            key={idx}
                            className="text-[11px] bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300 px-2 py-0.5 rounded-md font-medium"
                          >
                            {t(tName)}
                          </span>
                        ))}
                      </div>

                      {/* Photos thumbnail preview if available */}
                      {order.imageUrls && order.imageUrls.length > 0 && (
                        <div className="flex gap-1.5 mt-2">
                          {order.imageUrls.map((url, i) => (
                            <img
                              key={i}
                              src={url}
                              alt="scrap"
                              className="w-12 h-12 object-cover rounded-lg border border-gray-200 dark:border-gray-700"
                            />
                          ))}
                        </div>
                      )}
                    </div>

                    {/* Price & Action */}
                    <div className="flex flex-col items-end justify-between self-stretch flex-shrink-0">
                      <div className="text-right">
                        <span className="flex items-center text-xl font-extrabold text-emerald-600 dark:text-emerald-400 justify-end">
                          <IndianRupee className="w-5 h-5" />
                          {order.estimatedPrice}
                        </span>
                        {order.estimatedWeight && (
                          <span className="text-[10px] text-gray-400 block font-medium">
                            ~{order.estimatedWeight} kg
                          </span>
                        )}
                      </div>

                      {isAccepted ? (
                        <div className="flex flex-col items-end gap-1.5">
                          <span className="inline-flex items-center gap-1 text-emerald-700 dark:text-emerald-300 text-xs font-bold bg-emerald-100 dark:bg-emerald-950/70 px-2.5 py-1 rounded-lg">
                            <CheckCircle className="w-3.5 h-3.5" />
                            {t("onTheWay")}
                          </span>
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              completeOrder(order.orderID);
                            }}
                            className="flex items-center gap-1 bg-emerald-600 hover:bg-emerald-700 text-white text-[11px] font-semibold px-2.5 py-1 rounded-lg transition"
                          >
                            <CheckCheck className="w-3.5 h-3.5" />
                            <span>Mark Paid</span>
                          </button>
                        </div>
                      ) : (
                        <div className="flex items-center gap-2">
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              declineOrder(order.orderID);
                            }}
                            className="flex items-center gap-1 bg-white dark:bg-gray-800 hover:bg-rose-50 dark:hover:bg-rose-950/40 border border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-300 hover:text-rose-600 text-xs font-semibold px-2.5 py-1.5 rounded-xl transition"
                            title="Decline request"
                          >
                            <X className="w-3.5 h-3.5" />
                          </button>
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              acceptOrder(order.orderID);
                            }}
                            className="flex items-center gap-1 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold px-3 py-1.5 rounded-xl transition shadow-sm"
                          >
                            <CheckCircle className="w-4 h-4" />
                            <span>{t("accept")}</span>
                          </button>
                        </div>
                      )}
                    </div>
                  </div>


                </motion.div>
              );
            })}
          </AnimatePresence>

          {/* Show declined counter / reset option */}
          {declinedOrders.length > 0 && (
            <div className="flex items-center justify-between text-xs text-gray-500 dark:text-gray-400 bg-gray-100/80 dark:bg-gray-800/60 px-4 py-2.5 rounded-xl border border-gray-200/60 dark:border-gray-700/60">
              <span>{declinedOrders.length} request(s) declined</span>
              <button
                onClick={resetAllDeclined}
                className="inline-flex items-center gap-1 text-emerald-600 hover:text-emerald-700 font-semibold"
              >
                <RotateCcw className="w-3 h-3" />
                <span>Show Declined</span>
              </button>
            </div>
          )}

          {/* Empty state */}
          {!isLoading && activeOrders.length === 0 && (
            <div className="text-center py-16 text-gray-400 bg-white dark:bg-gray-900 rounded-2xl border border-gray-100 dark:border-gray-800">
              <Truck className="w-12 h-12 mx-auto mb-3 opacity-30 text-emerald-600" />
              <p className="font-semibold text-gray-700 dark:text-gray-200">No Pending Requests</p>
              <p className="text-xs text-gray-400 mt-1">
                Completed jobs are archived. New scrap pickup requests will alert here.
              </p>
            </div>
          )}
        </div>
      </div>

      {/* ── Detailed Pop-up Modal with Privacy Shield ── */}
      <AnimatePresence>
        {selectedOrder && (
          <div
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs"
            onClick={() => setSelectedOrder(null)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.92, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.92, y: 20 }}
              transition={{ type: "spring", duration: 0.3 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-white dark:bg-gray-900 rounded-3xl max-w-lg w-full p-6 sm:p-7 shadow-2xl border border-gray-100 dark:border-gray-800 max-h-[92vh] overflow-y-auto space-y-5"
            >
              {/* Modal Top Bar */}
              <div className="flex items-start justify-between pb-3 border-b border-gray-100 dark:border-gray-800">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="font-mono text-xs font-bold px-2 py-0.5 rounded bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300">
                      {selectedOrder.orderID}
                    </span>
                    {isOrderAcceptedByMe(selectedOrder) ? (
                      <span className="text-xs font-bold px-2 py-0.5 rounded-full bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300">
                        {t("acceptedByYou")}
                      </span>
                    ) : (
                      <span className="text-xs font-bold px-2 py-0.5 rounded-full bg-amber-100 dark:bg-amber-950 text-amber-800 dark:text-amber-300">
                        {t("waitingPickup")}
                      </span>
                    )}
                  </div>
                  <h2 className="text-lg font-extrabold text-gray-900 dark:text-white">
                    Pickup Request Details
                  </h2>
                </div>
                <button
                  onClick={() => setSelectedOrder(null)}
                  className="p-1.5 rounded-full text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800 transition"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* 1. Customer Contact & Location (Protected) */}
              <div className="bg-gray-50 dark:bg-gray-800/60 rounded-2xl p-4 border border-gray-100 dark:border-gray-800 space-y-3.5">
                <div className="flex items-center justify-between text-xs font-bold uppercase tracking-wider text-emerald-700 dark:text-emerald-400">
                  <div className="flex items-center gap-1.5">
                    <User className="w-4 h-4" />
                    <span>Customer & Location</span>
                  </div>
                  {!isOrderAcceptedByMe(selectedOrder) && (
                    <span className="inline-flex items-center gap-1 text-[10px] text-amber-700 dark:text-amber-400 bg-amber-100 dark:bg-amber-950 px-2 py-0.5 rounded-full">
                      <Lock className="w-3 h-3" />
                      Masked for privacy
                    </span>
                  )}
                </div>

                {/* Name */}
                <div className="flex items-center justify-between">
                  <span className="text-xs text-gray-500 dark:text-gray-400 font-medium">Customer:</span>
                  <span className="text-sm font-bold text-gray-900 dark:text-white">
                    {selectedOrder.sellerName || "Verified Household"}
                  </span>
                </div>

                {/* Phone Number */}
                <div className="flex items-center justify-between gap-2">
                  <span className="text-xs text-gray-500 dark:text-gray-400 font-medium">Phone:</span>
                  {isOrderAcceptedByMe(selectedOrder) ? (
                    selectedOrder.sellerPhone ? (
                      <div className="flex items-center gap-1.5">
                        <a
                          href={`tel:${selectedOrder.sellerPhone}`}
                          className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs"
                        >
                          <Phone className="w-3.5 h-3.5" />
                          <span>{selectedOrder.sellerPhone}</span>
                        </a>
                        <button
                          onClick={() => handleCopyPhone(selectedOrder.sellerPhone!)}
                          className="p-1.5 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-600"
                        >
                          {copiedPhone ? <Check className="w-3.5 h-3.5 text-emerald-500" /> : <Copy className="w-3.5 h-3.5" />}
                        </button>
                        <a
                          href={`https://wa.me/${selectedOrder.sellerPhone.replace(/[^0-9]/g, "")}`}
                          target="_blank"
                          rel="noreferrer"
                          className="p-1.5 rounded-lg bg-emerald-100 text-emerald-700"
                        >
                          <MessageCircle className="w-3.5 h-3.5" />
                        </a>
                      </div>
                    ) : (
                      <span className="text-xs text-gray-400 italic">Not provided</span>
                    )
                  ) : (
                    <span className="text-xs font-mono text-gray-400 bg-gray-200 dark:bg-gray-700 px-2 py-0.5 rounded flex items-center gap-1">
                      <Lock className="w-3 h-3" />
                      {selectedOrder.sellerPhone || "Hidden until accepted"}
                    </span>
                  )}
                </div>

                {/* Address */}
                <div className="pt-2 border-t border-gray-200/60 dark:border-gray-700/60">
                  <span className="text-xs text-gray-500 dark:text-gray-400 font-medium block mb-1">
                    Pickup Location:
                  </span>
                  <div className="flex items-start gap-2">
                    <MapPin className="w-4 h-4 text-emerald-600 dark:text-emerald-400 flex-shrink-0 mt-0.5" />
                    <div className="flex-1 text-sm font-semibold text-gray-800 dark:text-gray-200">
                      {selectedOrder.customerAddress}
                    </div>
                  </div>

                  {isOrderAcceptedByMe(selectedOrder) ? (
                    <a
                      href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(selectedOrder.customerAddress)}`}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-1 text-[11px] font-semibold text-emerald-600 dark:text-emerald-400 hover:underline mt-1.5"
                    >
                      <Navigation className="w-3 h-3" />
                      <span>Navigate via Google Maps</span>
                      <ExternalLink className="w-3 h-3 ml-0.5" />
                    </a>
                  ) : (
                    <p className="text-[11px] text-amber-700 dark:text-amber-400 mt-1 flex items-center gap-1">
                      <Lock className="w-3 h-3" />
                      Exact door navigation unlocks when you tap Accept.
                    </p>
                  )}
                </div>
              </div>

              {/* 2. Scrap Items & Quantity */}
              <div className="bg-gray-50 dark:bg-gray-800/60 rounded-2xl p-4 border border-gray-100 dark:border-gray-800 space-y-3.5">
                <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-emerald-700 dark:text-emerald-400">
                  <Package className="w-4 h-4" />
                  <span>Scrap Materials & Valuation</span>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div className="bg-white dark:bg-gray-900 rounded-xl p-3 border border-gray-200/70 dark:border-gray-700/70">
                    <span className="text-[11px] text-gray-400 uppercase font-semibold flex items-center gap-1 mb-1">
                      <Scale className="w-3.5 h-3.5 text-emerald-600" />
                      Total Weight
                    </span>
                    <span className="text-xl font-extrabold text-gray-900 dark:text-white">
                      ~{selectedOrder.estimatedWeight || 1} <span className="text-sm font-semibold text-emerald-600">kg</span>
                    </span>
                  </div>

                  <div className="bg-white dark:bg-gray-900 rounded-xl p-3 border border-gray-200/70 dark:border-gray-700/70">
                    <span className="text-[11px] text-gray-400 uppercase font-semibold flex items-center gap-1 mb-1">
                      <IndianRupee className="w-3.5 h-3.5 text-emerald-600" />
                      Est. Payout
                    </span>
                    <span className="text-xl font-extrabold text-emerald-600 dark:text-emerald-400">
                      ₹{selectedOrder.estimatedPrice}
                    </span>
                  </div>
                </div>

                <div>
                  <span className="text-xs text-gray-500 dark:text-gray-400 font-medium block mb-1.5">
                    Items to Collect:
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    {selectedOrder.scrapTypes?.map((typeName, idx) => (
                      <span
                        key={idx}
                        className="inline-flex items-center gap-1 bg-white dark:bg-gray-900 border border-emerald-200 dark:border-emerald-800 text-gray-800 dark:text-gray-200 text-xs px-2.5 py-1 rounded-lg font-semibold"
                      >
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                        {t(typeName)}
                      </span>
                    ))}
                  </div>
                </div>

                {selectedOrder.imageUrls && selectedOrder.imageUrls.length > 0 && (
                  <div>
                    <span className="text-xs text-gray-500 dark:text-gray-400 font-medium block mb-1.5">
                      Scrap Photos:
                    </span>
                    <div className="grid grid-cols-3 gap-2">
                      {selectedOrder.imageUrls.map((url, i) => (
                        <button
                          key={i}
                          type="button"
                          onClick={() => setPreviewImage(url)}
                          className="relative group rounded-xl overflow-hidden border border-gray-200 dark:border-gray-700 aspect-square"
                        >
                          <img
                            src={url}
                            alt="Scrap item"
                            className="w-full h-full object-cover group-hover:scale-105 transition"
                          />
                          <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition flex items-center justify-center">
                            <Eye className="w-4 h-4 text-white" />
                          </div>
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Modal Actions */}
              <div className="pt-2 flex items-center gap-3">
                {isOrderAcceptedByMe(selectedOrder) ? (
                  <div className="w-full flex flex-col sm:flex-row gap-2">
                    <button
                      type="button"
                      onClick={() => completeOrder(selectedOrder.orderID)}
                      className="flex-1 flex items-center justify-center gap-1.5 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-sm transition shadow-sm"
                    >
                      <CheckCheck className="w-4 h-4" />
                      <span>Mark as Picked Up & Paid</span>
                    </button>
                    {selectedOrder.sellerPhone && (
                      <a
                        href={`tel:${selectedOrder.sellerPhone}`}
                        className="flex items-center justify-center gap-1.5 py-3 px-6 rounded-xl bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 text-gray-800 dark:text-gray-200 font-semibold text-sm transition"
                      >
                        <Phone className="w-4 h-4" />
                        <span>Call Customer</span>
                      </a>
                    )}
                  </div>
                ) : (
                  <>
                    <button
                      type="button"
                      onClick={() => declineOrder(selectedOrder.orderID)}
                      className="flex-1 flex items-center justify-center gap-1.5 py-3 rounded-xl border border-gray-200 dark:border-gray-700 hover:bg-rose-50 text-gray-700 text-sm font-semibold transition"
                    >
                      <X className="w-4 h-4" />
                      <span>Decline</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => acceptOrder(selectedOrder.orderID)}
                      className="flex-1 flex items-center justify-center gap-1.5 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-sm font-bold transition shadow-sm"
                    >
                      <Unlock className="w-4 h-4" />
                      <span>Accept & Unlock Details</span>
                    </button>
                  </>
                )}
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Full Image Preview Zoom Modal */}
      <AnimatePresence>
        {previewImage && (
          <div
            className="fixed inset-0 z-60 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
            onClick={() => setPreviewImage(null)}
          >
            <div className="relative max-w-2xl w-full bg-white dark:bg-gray-900 rounded-2xl overflow-hidden p-2">
              <button
                onClick={() => setPreviewImage(null)}
                className="absolute top-4 right-4 z-10 p-2 rounded-full bg-black/60 text-white hover:bg-black transition"
              >
                <X className="w-5 h-5" />
              </button>
              <img
                src={previewImage}
                alt="Scrap Preview Full"
                className="w-full max-h-[80vh] object-contain rounded-xl"
              />
            </div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
