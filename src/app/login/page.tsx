"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  Lock,
  Mail,
  User,
  Phone,
  ArrowRight,
  Loader2,
  CheckCircle,
  AlertCircle,
  Recycle,
  ShieldCheck,
  Truck,
} from "lucide-react";
import { useApp } from "@/context/AppContext";

export default function LoginPage() {
  const router = useRouter();
  const { t, user, loginUser, logoutUser } = useApp();

  const [mode, setMode] = useState<"login" | "signup">("login");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [role, setRole] = useState<"SELLER" | "COLLECTOR">("SELLER");

  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [successMsg, setSuccessMsg] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg("");
    setSuccessMsg("");

    if (!email || !password) {
      setErrorMsg("Please enter email and password");
      return;
    }

    if (mode === "signup") {
      if (!name.trim()) {
        setErrorMsg("Please enter your full name");
        return;
      }
      if (!phone.trim()) {
        setErrorMsg("Phone number is compulsory for registration");
        return;
      }
    }

    setIsLoading(true);

    try {
      const res = await fetch("/api/auth", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          action: mode,
          email,
          password,
          name,
          phone,
          role,
        }),
      });

      const data = await res.json();

      if (!res.ok || !data.success) {
        throw new Error(data.message || "Authentication failed");
      }

      setSuccessMsg(
        mode === "login"
          ? "Logged in successfully to AWS DynamoDB!"
          : "Account created and saved in AWS DynamoDB!"
      );

      // Store in AppContext & localStorage
      loginUser(data.user);

      // Redirect after a brief moment
      setTimeout(() => {
        if (data.user.role === "COLLECTOR") {
          router.push("/radar");
        } else {
          router.push("/sell");
        }
      }, 1000);
    } catch (err: any) {
      setErrorMsg(err.message || "Something went wrong. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  // If user is already logged in, show their profile view
  if (user) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-950 py-16 px-4 flex items-center justify-center transition-colors">
        <div className="max-w-md w-full bg-white dark:bg-gray-900 rounded-3xl p-8 border border-gray-100 dark:border-gray-800 shadow-xl text-center">
          <div className="w-16 h-16 bg-emerald-100 dark:bg-emerald-950/60 rounded-full flex items-center justify-center mx-auto mb-4">
            <CheckCircle className="w-8 h-8 text-emerald-600 dark:text-emerald-400" />
          </div>

          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-1">
            {t("myAccount")}
          </h2>
          <p className="text-sm text-gray-500 dark:text-gray-400 mb-6">
            {t("loggedInAs")} <span className="font-semibold text-emerald-600 dark:text-emerald-400">{user.email}</span>
          </p>

          <div className="bg-gray-50 dark:bg-gray-800/70 rounded-2xl p-4 text-left space-y-2 mb-6 text-sm border border-gray-100 dark:border-gray-800">
            <div className="flex justify-between">
              <span className="text-gray-400">{t("fullName")}:</span>
              <span className="font-semibold text-gray-800 dark:text-gray-200">{user.name}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-400">{t("emailAddress")}:</span>
              <span className="font-semibold text-gray-800 dark:text-gray-200">{user.email}</span>
            </div>
            {user.phone && (
              <div className="flex justify-between">
                <span className="text-gray-400">Phone:</span>
                <span className="font-semibold text-gray-800 dark:text-gray-200">{user.phone}</span>
              </div>
            )}
            <div className="flex justify-between">
              <span className="text-gray-400">Account Role:</span>
              <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-bold bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300">
                {user.role}
              </span>
            </div>
          </div>

          <div className="flex flex-col gap-3">
            <button
              onClick={() => router.push(user.role === "COLLECTOR" ? "/radar" : "/sell")}
              className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-semibold py-3 rounded-xl transition text-sm flex items-center justify-center gap-2"
            >
              <span>{user.role === "COLLECTOR" ? t("viewOnRadar") : t("sellYourScrap")}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
            <button
              onClick={logoutUser}
              className="w-full border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800 text-gray-700 dark:text-gray-300 font-semibold py-3 rounded-xl transition text-sm"
            >
              {t("logout")}
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950 py-12 px-4 sm:px-6 lg:px-8 flex items-center justify-center transition-colors">
      <div className="max-w-md w-full bg-white dark:bg-gray-900 rounded-3xl p-8 border border-gray-100 dark:border-gray-800 shadow-xl transition-all">
        {/* Brand Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-12 h-12 rounded-2xl bg-emerald-100 dark:bg-emerald-950/70 text-emerald-600 dark:text-emerald-400 mb-3">
            <Recycle className="w-6 h-6" />
          </div>
          <h1 className="text-2xl font-extrabold text-gray-900 dark:text-white">
            {mode === "login" ? t("loginTitle") : t("signupTitle")}
          </h1>
          <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
            {mode === "login" ? t("loginSubtitle") : t("signupSubtitle")}
          </p>

          {/* Mode Switch Tabs */}
          <div className="flex bg-gray-100 dark:bg-gray-800 p-1 rounded-xl mt-6 border border-gray-200 dark:border-gray-700">
            <button
              type="button"
              onClick={() => {
                setMode("login");
                setErrorMsg("");
                setSuccessMsg("");
              }}
              className={`flex-1 py-2 text-xs font-bold rounded-lg transition ${
                mode === "login"
                  ? "bg-white dark:bg-gray-700 text-emerald-600 dark:text-white shadow-xs"
                  : "text-gray-500 dark:text-gray-400 hover:text-gray-800"
              }`}
            >
              {t("signIn")}
            </button>
            <button
              type="button"
              onClick={() => {
                setMode("signup");
                setErrorMsg("");
                setSuccessMsg("");
              }}
              className={`flex-1 py-2 text-xs font-bold rounded-lg transition ${
                mode === "signup"
                  ? "bg-white dark:bg-gray-700 text-emerald-600 dark:text-white shadow-xs"
                  : "text-gray-500 dark:text-gray-400 hover:text-gray-800"
              }`}
            >
              {t("signUp")}
            </button>
          </div>
        </div>

        {/* Notifications */}
        {errorMsg && (
          <div className="mb-5 p-3 rounded-xl bg-red-50 dark:bg-red-950/40 border border-red-200 dark:border-red-900 text-red-600 dark:text-red-400 text-xs flex items-center gap-2">
            <AlertCircle className="w-4 h-4 flex-shrink-0" />
            <span>{errorMsg}</span>
          </div>
        )}

        {successMsg && (
          <div className="mb-5 p-3 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800 text-emerald-700 dark:text-emerald-300 text-xs flex items-center gap-2">
            <CheckCircle className="w-4 h-4 flex-shrink-0" />
            <span>{successMsg}</span>
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          {mode === "signup" && (
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-gray-700 dark:text-gray-300 mb-1.5">
                {t("fullName")}
              </label>
              <div className="relative">
                <User className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  required
                  placeholder="e.g. Ramesh Kumar"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-sm text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
                />
              </div>
            </div>
          )}

          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-gray-700 dark:text-gray-300 mb-1.5">
              {t("emailAddress")}
            </label>
            <div className="relative">
              <Mail className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="email"
                required
                placeholder="name@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-sm text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-gray-700 dark:text-gray-300 mb-1.5">
              {t("password")}
            </label>
            <div className="relative">
              <Lock className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="password"
                required
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-sm text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
              />
            </div>
          </div>

          {mode === "signup" && (
            <>
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-gray-700 dark:text-gray-300 mb-1.5">
                  Phone Number
                </label>
                <div className="relative">
                  <Phone className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="tel"
                    required
                    placeholder="+91 98765 43210"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-sm text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  />
                </div>
              </div>

              {/* Role Selection */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-gray-700 dark:text-gray-300 mb-2">
                  Account Type
                </label>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    type="button"
                    onClick={() => setRole("SELLER")}
                    className={`p-3 rounded-xl border text-left flex flex-col gap-1 transition ${
                      role === "SELLER"
                        ? "border-emerald-600 bg-emerald-50/70 dark:bg-emerald-950/40 text-emerald-900 dark:text-emerald-200 ring-1 ring-emerald-600"
                        : "border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300"
                    }`}
                  >
                    <span className="text-xs font-bold flex items-center gap-1.5">
                      <Recycle className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
                      Scrap Seller
                    </span>
                    <span className="text-[10px] text-gray-400">Households / Shops</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setRole("COLLECTOR")}
                    className={`p-3 rounded-xl border text-left flex flex-col gap-1 transition ${
                      role === "COLLECTOR"
                        ? "border-emerald-600 bg-emerald-50/70 dark:bg-emerald-950/40 text-emerald-900 dark:text-emerald-200 ring-1 ring-emerald-600"
                        : "border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300"
                    }`}
                  >
                    <span className="text-xs font-bold flex items-center gap-1.5">
                      <Truck className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
                      Collector
                    </span>
                    <span className="text-[10px] text-gray-400">Kabadiwala / Driver</span>
                  </button>
                </div>
              </div>
            </>
          )}

          <button
            type="submit"
            disabled={isLoading}
            className="w-full mt-4 flex items-center justify-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-3.5 rounded-xl transition shadow-sm text-sm disabled:opacity-70"
          >
            {isLoading ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                <span>{mode === "login" ? t("loggingIn") : t("creatingAccount")}</span>
              </>
            ) : (
              <>
                <span>{mode === "login" ? t("signIn") : t("signUp")}</span>
                <ArrowRight className="w-4 h-4" />
              </>
            )}
          </button>
        </form>

        {/* AWS DynamoDB secure banner */}
        <div className="mt-6 pt-5 border-t border-gray-100 dark:border-gray-800 flex items-center justify-center gap-1.5 text-[11px] text-gray-400 dark:text-gray-500">
          <ShieldCheck className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
          <span>Secured via AWS DynamoDB (Table: ScrapHop-Users)</span>
        </div>
      </div>
    </div>
  );
}
