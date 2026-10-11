"use client";

import React, { createContext, useContext, useState, useEffect } from "react";

export type Language = "en" | "hi" | "pa" | "gu" | "te" | "ta";

export interface LanguageOption {
  code: Language;
  name: string;
  nativeName: string;
}

export const LANGUAGES: LanguageOption[] = [
  { code: "en", name: "English", nativeName: "English" },
  { code: "hi", name: "Hindi", nativeName: "हिंदी" },
  { code: "pa", name: "Punjabi", nativeName: "ਪੰਜਾਬੀ" },
  { code: "gu", name: "Gujarati", nativeName: "ગુજરાતી" },
  { code: "te", name: "Telugu", nativeName: "తెలుగు" },
  { code: "ta", name: "Tamil", nativeName: "தமிழ்" },
];

export const TRANSLATIONS: Record<Language, Record<string, string>> = {
  en: {
    // Nav
    forCollectors: "For Collectors",
    login: "Login",
    sellYourScrap: "Sell Your Scrap",
    // Hero
    turnTrash: "Turn Your Trash Into Cash.",
    heroSubtitle: "Schedule reliable scrap pickup instantly. Sell recyclables, support sustainability, and get paid effortlessly via our marketplace app.",
    startSellingScrap: "Start Selling Scrap",
    joinAsCollector: "Join as Collector",
    readyToClear: "Ready to clear out the clutter?",
    joinThousands: "Schedule an instant doorstep pickup to turn recyclable waste into cash and keep our cities clean.",
    // Sell page
    sellPageTitle: "Sell Your Scrap",
    sellPageSubtitle: "Upload photos, pick scrap types, and request a pickup in seconds.",
    step1: "Step 1 — Upload Photos",
    dragDrop: "Drag & drop photos here, or browse",
    analyzing: "Analyzing...",
    step2: "Step 2 — Select Scrap Type",
    step2Subtitle: "Items detected from photo are auto-added. You can also manually select or toggle items below.",
    indiaScrapRates: "India Scrap Rates",
    approxWeight: "Approximate Total Weight (kg)",
    defaultPerKg: "Default: 1 kg (per kg price)",
    step3: "Step 3 — Pickup Address",
    addressPlaceholder: "e.g. Flat 402, Sunshine Apartments, MG Road",
    estimatedValuation: "Estimated Scrap Valuation",
    liveBenchmarks: "Live Mandi Benchmarks",
    selectedItem: "Selected Scrap Item",
    marketRate: "Market Rate",
    combinedRate: "Combined Rate:",
    calculation: "Calculation:",
    requestPickup: "Request Pickup",
    uploadingAndRequesting: "Uploading to AWS & Requesting...",
    pickupRequested: "Pickup Requested!",
    pickupRequestedSub: "Your request is saved to AWS and sent to nearby Kabadiwalas.",
    orderId: "Order ID:",
    items: "Items:",
    estPayout: "Est. Payout:",
    address: "Address:",
    status: "Status:",
    searchingNearby: "Searching Nearby...",
    viewOnRadar: "View on Radar",
    sellMoreScrap: "Sell More Scrap",
    aiDetected: "AI Detected",
    // Scrap types
    "Cardboard": "Cardboard",
    "Plastic": "Plastic",
    "Paper / Books": "Paper / Books",
    "Metal / Iron": "Metal / Iron",
    "Electronics": "Electronics",
    "Glass": "Glass",
    "Other": "Other",
    // Hints
    hintCardboard: "Cartons, packaging boxes",
    hintPlastic: "Bottles, containers, hard plastics",
    hintPaper: "Newspaper, notebooks, magazines",
    hintGlass: "Clear bottles, glass jars",
    hintOther: "Mixed recyclable scrap",
    // Auth & Login
    loginTitle: "Welcome to ScrapHop",
    loginSubtitle: "Sign in to manage your scrap pickups and track real-time earnings.",
    signupTitle: "Create ScrapHop Account",
    signupSubtitle: "Join India's smartest recyclable scrap network.",
    signIn: "Sign In",
    signUp: "Sign Up",
    logout: "Log Out",
    fullName: "Full Name",
    emailAddress: "Email Address",
    password: "Password",
    phoneOptional: "Phone Number (Optional)",
    dontHaveAccount: "Don't have an account?",
    alreadyHaveAccount: "Already have an account?",
    creatingAccount: "Creating AWS Account...",
    loggingIn: "Logging in...",
    loginSuccess: "Signed in successfully!",
    signupSuccess: "Account created successfully in AWS!",
    accountRole: "I want to",
    sellScrapRole: "Sell Scrap (Household / Business)",
    collectScrapRole: "Collect Scrap (Kabadiwala / Recycler)",
    myAccount: "My Account",
    loggedInAs: "Logged in as",
    // Radar
    collectorRadar: "Collector Radar",
    radarSubtitle: "Live scrap requests from households in your zone.",
    liveDynamoFeed: "Live AWS DynamoDB Feed",
    scanningNearby: "Scanning for nearby scrap...",
    waitingPickup: "Waiting Pickup",
    acceptedByYou: "Accepted by You",
    onTheWay: "On the way",
    accept: "Accept",
  },
  hi: {
    // Nav
    forCollectors: "कबाड़ीवालों के लिए",
    login: "लॉगिन",
    sellYourScrap: "कबाड़ बेचें",
    // Hero
    turnTrash: "कबाड़ बेचें, नकद कमाएं।",
    heroSubtitle: "तुरंत भरोसेमंद कबाड़ पिकअप बुक करें। रिसाइकल करें, पर्यावरण बचाएं और सीधे पैसे पाएं।",
    startSellingScrap: "कबाड़ बेचना शुरू करें",
    joinAsCollector: "कबाड़ी के रूप में जुड़ें",
    readyToClear: "घर का कबाड़ साफ करने के लिए तैयार हैं?",
    joinThousands: "डोरस्टेप पिकअप शेड्यूल करें, कबाड़ से तुरंत पैसे कमाएं और शहर को स्वच्छ रखें।",
    // Sell page
    sellPageTitle: "अपना कबाड़ बेचें",
    sellPageSubtitle: "फोटो अपलोड करें, कबाड़ चुनें और कुछ ही सेकंड में पिकअप बुक करें।",
    step1: "स्टेप 1 — फोटो अपलोड करें",
    dragDrop: "यहाँ फोटो खींचकर डालें, या ब्राउज़ करें",
    analyzing: "विश्लेषण हो रहा है...",
    step2: "स्टेप 2 — कबाड़ का प्रकार चुनें",
    step2Subtitle: "फोटो से पहचाने गए आइटम अपने आप जुड़ जाते हैं। आप नीचे से खुद भी चुन सकते हैं।",
    indiaScrapRates: "भारतीय कबाड़ मंडी भाव",
    approxWeight: "अनुमानित कुल वजन (किलो)",
    defaultPerKg: "डिफ़ॉल्ट: 1 किलो (प्रति किलो मूल्य)",
    step3: "स्टेप 3 — पिकअप का पता",
    addressPlaceholder: "उदा. फ्लैट 402, सनशाइन अपार्टमेंट्स, एमजी रोड",
    estimatedValuation: "अनुमानित कबाड़ मूल्यांकन",
    liveBenchmarks: "लाइव मंडी भाव",
    selectedItem: "चुना गया कबाड़",
    marketRate: "मंडी भाव",
    combinedRate: "कुल संयुक्त दर:",
    calculation: "गणना:",
    requestPickup: "पिकअप का अनुरोध करें",
    uploadingAndRequesting: "अपलोड व पिकअप बुक हो रहा है...",
    pickupRequested: "पिकअप बुक हो गया!",
    pickupRequestedSub: "आपका अनुरोध सुरक्षित हो गया है और आस-पास के कबाड़ीवालों को भेज दिया गया है।",
    orderId: "ऑर्डर आईडी:",
    items: "सामान:",
    estPayout: "अनुमानित भुगतान:",
    address: "पता:",
    status: "स्थिति:",
    searchingNearby: "आस-पास खोज रहे हैं...",
    viewOnRadar: "रडार पर देखें",
    sellMoreScrap: "और कबाड़ बेचें",
    aiDetected: "AI द्वारा पहचाना गया",
    // Scrap types
    "Cardboard": "गत्ता / कार्टन",
    "Plastic": "प्लास्टिक",
    "Paper / Books": "रद्दी कागज / किताबें",
    "Metal / Iron": "लोहा / धातु",
    "Electronics": "इलेक्ट्रॉनिक्स",
    "Glass": "कांच की बोतलें",
    "Other": "अन्य कबाड़",
    // Hints
    hintCardboard: "पैकिंग कार्टन, गत्ते के डिब्बे",
    hintPlastic: "बोतलें, डिब्बे, प्लास्टिक सामान",
    hintPaper: "अखबार, नोटबुक, पुरानी किताबें",
    hintMetal: "सरिया, टिन, स्टील, लोहे का सामान",
    hintElectronics: "तार, पुराने गैजेट्स, उपकरण",
    hintGlass: "साफ बोतलें व कांच के जार",
    hintOther: "मिश्रित रिसाइकिल कबाड़",
    // Radar
    collectorRadar: "कलेक्टर रडार",
    radarSubtitle: "आपके इलाके के घरों से लाइव कबाड़ पिकअप अनुरोध।",
    liveDynamoFeed: "लाइव AWS डेटा फीड",
    scanningNearby: "आस-पास कबाड़ खोजा जा रहा है...",
    waitingPickup: "पिकअप प्रतीक्षारत",
    acceptedByYou: "आपके द्वारा स्वीकृत",
    onTheWay: "रास्ते में",
    accept: "स्वीकार करें",
  },
  pa: {
    // Nav
    forCollectors: "ਕਬਾੜੀਆਂ ਲਈ",
    login: "ਲਾਗਇਨ",
    sellYourScrap: "ਕਬਾੜ ਵੇਚੋ",
    // Hero
    turnTrash: "ਕਬਾੜ ਵੇਚੋ, ਨਕਦੀ ਕਮਾਓ।",
    heroSubtitle: "ਤੁਰੰਤ ਭਰੋਸੇਮੰਦ ਕਬਾੜ ਪਿਕਅੱਪ ਬੁੱਕ ਕਰੋ। ਵਾਤਾਵਰਨ ਬਚਾਓ ਅਤੇ ਆਸਾਨੀ ਨਾਲ ਪੈਸੇ ਕਮਾਓ।",
    startSellingScrap: "ਕਬਾੜ ਵੇਚਣਾ ਸ਼ੁਰੂ ਕਰੋ",
    joinAsCollector: "ਕਬਾੜੀ ਵਜੋਂ ਜੁੜੋ",
    readyToClear: "ਘਰ ਦਾ ਕਬਾੜ ਸਾਫ਼ ਕਰਨ ਲਈ ਤਿਆਰ ਹੋ?",
    joinThousands: "ਡੋਰਸਟੈਪ ਪਿਕਅੱਪ ਬੁੱਕ ਕਰੋ, ਕਬਾੜ ਤੋਂ ਤੁਰੰਤ ਪੈਸੇ ਕਮਾਓ ਅਤੇ ਸ਼ਹਿਰ ਨੂੰ ਸਾਫ਼ ਰੱਖੋ।",
    // Sell page
    sellPageTitle: "ਆਪਣਾ ਕਬਾੜ ਵੇਚੋ",
    sellPageSubtitle: "ਫੋਟੋ ਅੱਪਲੋਡ ਕਰੋ, ਕਬਾੜ ਚੁਣੋ ਅਤੇ ਸਕਿੰਟਾਂ ਵਿੱਚ ਪਿਕਅੱਪ ਬੁੱਕ ਕਰੋ।",
    step1: "ਕਦਮ 1 — ਫੋਟੋਆਂ ਅੱਪਲੋਡ ਕਰੋ",
    dragDrop: "ਇੱਥੇ ਫੋਟੋਆਂ ਖਿੱਚ ਕੇ ਸੁੱਟੋ, ਜਾਂ ਬ੍ਰਾਊਜ਼ ਕਰੋ",
    analyzing: "ਵਿਸ਼ਲੇਸ਼ਣ ਹੋ ਰਿਹਾ ਹੈ...",
    step2: "ਕਦਮ 2 — ਕਬਾੜ ਦੀ ਕਿਸਮ ਚੁਣੋ",
    step2Subtitle: "ਫੋਟੋ ਤੋਂ ਪਛਾਣੀਆਂ ਗਈਆਂ ਚੀਜ਼ਾਂ ਆਪਣੇ ਆਪ ਜੁੜ ਜਾਂਦੀਆਂ ਹਨ। ਤੁਸੀਂ ਹੇਠਾਂ ਤੋਂ ਆਪ ਵੀ ਚੁਣ ਸਕਦੇ ਹੋ।",
    indiaScrapRates: "ਭਾਰਤੀ ਕਬਾੜ ਮੰਡੀ ਭਾਅ",
    approxWeight: "ਅੰਦਾਜ਼ਨ ਕੁੱਲ ਭਾਰ (ਕਿਲੋ)",
    defaultPerKg: "ਮੂਲ: 1 ਕਿਲੋ (ਪ੍ਰਤੀ ਕਿਲੋ ਕੀਮਤ)",
    step3: "ਕਦਮ 3 — ਪਿਕਅੱਪ ਪਤਾ",
    addressPlaceholder: "ਉਦਾਹਰਣ: ਫਲੈਟ 402, ਸਨਸ਼ਾਈਨ ਅਪਾਰਟਮੈਂਟਸ, ਐਮ ਜੀ ਰੋਡ",
    estimatedValuation: "ਅੰਦਾਜ਼ਨ ਕਬਾੜ ਮੁੱਲ",
    liveBenchmarks: "ਲਾਈਵ ਮੰਡੀ ਰੇਟ",
    selectedItem: "ਚੁਣਿਆ ਗਿਆ ਕਬਾੜ",
    marketRate: "ਮੰਡੀ ਰੇਟ",
    combinedRate: "ਕੁੱਲ ਰੇਟ:",
    calculation: "ਹਿਸਾਬ:",
    requestPickup: "ਪਿਕਅੱਪ ਦੀ ਬੇਨਤੀ ਕਰੋ",
    uploadingAndRequesting: "ਅੱਪਲੋਡ ਤੇ ਬੁਕਿੰਗ ਹੋ ਰਹੀ ਹੈ...",
    pickupRequested: "ਪਿਕਅੱਪ ਬੁੱਕ ਹੋ ਗਈ!",
    pickupRequestedSub: "ਤੁਹਾਡੀ ਬੇਨਤੀ ਸੁਰੱਖਿਅਤ ਕਰ ਲਈ ਗਈ ਹੈ ਅਤੇ ਨੇੜਲੇ ਕਬਾੜੀਆਂ ਨੂੰ ਭੇਜ ਦਿੱਤੀ ਗਈ ਹੈ।",
    orderId: "ਆਰਡਰ ਆਈਡੀ:",
    items: "ਸਮਾਨ:",
    estPayout: "ਅੰਦਾਜ਼ਨ ਭੁਗਤਾਨ:",
    address: "ਪਤਾ:",
    status: "ਸਥਿਤੀ:",
    searchingNearby: "ਨੇੜੇ ਲੱਭ ਰਹੇ ਹਾਂ...",
    viewOnRadar: "ਰਡਾਰ ਤੇ ਦੇਖੋ",
    sellMoreScrap: "ਹੋਰ ਕਬਾੜ ਵੇਚੋ",
    aiDetected: "AI ਵੱਲੋਂ ਪਛਾਣਿਆ",
    // Scrap types
    "Cardboard": "ਗੱਤਾ / ਡੱਬੇ",
    "Plastic": "ਪਲਾਸਟਿਕ",
    "Paper / Books": "ਰੱਦੀ ਕਾਗਜ਼ / ਕਿਤਾਬਾਂ",
    "Metal / Iron": "ਲੋਹਾ ਤੇ ਧਾਤ",
    "Electronics": "ਇਲੈਕਟ੍ਰਾਨਿਕਸ",
    "Glass": "ਕੱਚ ਦੀਆਂ ਬੋਤਲਾਂ",
    "Other": "ਹੋਰ ਕਬਾੜ",
    // Hints
    hintCardboard: "ਪੈਕਿੰਗ ਡੱਬੇ, ਗੱਤੇ",
    hintPlastic: "ਬੋਤਲਾਂ, ਡੱਬੇ, ਸਖ਼ਤ ਪਲਾਸਟਿਕ",
    hintPaper: "ਅਖ਼ਬਾਰ, ਕਾਪੀਆਂ, ਕਿਤਾਬਾਂ",
    hintMetal: "ਲੋਹੇ ਦੇ ਸਰੀਏ, ਟੀਨ, ਸਟੀਲ",
    hintElectronics: "ਤਾਰਾਂ, ਪੁਰਾਣੇ ਯੰਤਰ, ਗੈਜੇਟਸ",
    hintGlass: "ਸਾਫ਼ ਬੋਤਲਾਂ ਤੇ ਕੱਚ ਦੇ ਜਾਰ",
    hintOther: "ਰਲਿਆ-ਮਿਲਿਆ ਕਬਾੜ",
    // Radar
    collectorRadar: "ਕਲੈਕਟਰ ਰਡਾਰ",
    radarSubtitle: "ਤੁਹਾਡੇ ਇਲਾਕੇ ਦੇ ਘਰਾਂ ਤੋਂ ਲਾਈਵ ਕਬਾੜ ਬੇਨਤੀਆਂ।",
    liveDynamoFeed: "ਲਾਈਵ AWS ਡੇਟਾ ਫੀਡ",
    scanningNearby: "ਨੇੜਲਾ ਕਬਾੜ ਸਕੈਨ ਹੋ ਰਿਹਾ ਹੈ...",
    waitingPickup: "ਪਿਕਅੱਪ ਦੀ ਉਡੀਕ",
    acceptedByYou: "ਤੁਹਾਡੇ ਵੱਲੋਂ ਸਵੀਕਾਰ ਕੀਤਾ ਗਿਆ",
    onTheWay: "ਰਸਤੇ ਵਿੱਚ",
    accept: "ਸਵੀਕਾਰ ਕਰੋ",
  },
  gu: {
    // Nav
    forCollectors: "ભંગારવાળા માટે",
    login: "લૉગિન",
    sellYourScrap: "ભંગાર વેચો",
    // Hero
    turnTrash: "ભંગારમાંથી રોકડ કમાઓ.",
    heroSubtitle: "વિશ્વાસપાત્ર ભંગાર પીકઅપ તરત જ બુક કરો. પર્યાવરણ બચાવો અને સરળતાથી પૈસા કમાઓ.",
    startSellingScrap: "ભંગાર વેચવાનું શરૂ કરો",
    joinAsCollector: "ભંગારવાળા તરીકે જોડાઓ",
    readyToClear: "ઘરનો ભંગાર સાફ કરવા તૈયાર છો?",
    joinThousands: "ડોરસ્ટેપ પીકઅપ શેડ્યૂલ કરો, ભંગારમાંથી રોકડ કમાઓ અને શહેરને સ્વચ્છ રાખો.",
    // Sell page
    sellPageTitle: "તમારો ભંગાર વેચો",
    sellPageSubtitle: "ફોટો અપલોડ કરો, ભંગાર પસંદ કરો અને સેકંડમાં પીકઅપ બુક કરો.",
    step1: "પગલું 1 — ફોટા અપલોડ કરો",
    dragDrop: "અહીં ફોટા ખેંચીને મૂકો, અથવા બ્રાઉઝ કરો",
    analyzing: "વિશ્લેષણ થઈ રહ્યું છે...",
    step2: "પગલું 2 — ભંગારનો પ્રકાર પસંદ કરો",
    step2Subtitle: "ફોટામાંથી ઓળખાયેલ વસ્તુઓ આપમેળે ઉમેરાય છે. તમે નીચેથી પણ પસંદ કરી શકો છો.",
    indiaScrapRates: "ભારતીય ભંગાર બજાર ભાવ",
    approxWeight: "અંદાજિત કુલ વજન (કિગ્રા)",
    defaultPerKg: "ડિફૉલ્ટ: 1 કિગ્રા (પ્રતિ કિગ્રા કિંમત)",
    step3: "પગલું 3 — પીકઅપ સરનામું",
    addressPlaceholder: "દા.ત. ફ્લેટ 402, સનશાઇન એપાર્ટમેન્ટ્સ, એમજી રોડ",
    estimatedValuation: "અંદાજિત ભંગાર મૂલ્યાંકન",
    liveBenchmarks: "લાઇવ માર્કેટ રેટ",
    selectedItem: "પસંદ કરેલ ભંગાર",
    marketRate: "બજાર ભાવ",
    combinedRate: "કુલ સંયુક્ત દર:",
    calculation: "ગણતરી:",
    requestPickup: "પીકઅપ વિનંતી કરો",
    uploadingAndRequesting: "અપલોડ અને બુકિંગ થઈ રહ્યું છે...",
    pickupRequested: "પીકઅપ બુક થઈ ગયું!",
    pickupRequestedSub: "તમારી વિનંતી સાચવવામાં આવી છે અને નજીકના ભંગારવાળાઓને મોકલવામાં આવી છે.",
    orderId: "ઓર્ડર આઈડી:",
    items: "વસ્તુઓ:",
    estPayout: "અંદાજિત ચુકવણી:",
    address: "સરનામું:",
    status: "સ્થિતિ:",
    searchingNearby: "નજીકમાં શોધી રહ્યા છીએ...",
    viewOnRadar: "રડાર પર જુઓ",
    sellMoreScrap: "વધુ ભંગાર વેચો",
    aiDetected: "AI દ્વારા શોધાયેલ",
    // Scrap types
    "Cardboard": "પૂઠું / કાર્ટન",
    "Plastic": "પ્લાસ્ટિક",
    "Paper / Books": "રદ્દી કાગળ / પુસ્તકો",
    "Metal / Iron": "લોખંડ અને ધાતુ",
    "Electronics": "ઇલેક્ટ્રોનિક્સ",
    "Glass": "કાચની બોટલો",
    "Other": "અન્ય ભંગાર",
    // Hints
    hintCardboard: "પેકિંગ બોક્સ, પૂઠા",
    hintPlastic: "બોટલ, કન્ટેનર, પ્લાસ્ટિક સામાન",
    hintPaper: "અખબાર, નોટબુક, જૂના પુસ્તકો",
    hintMetal: "સળિયા, પતરાં, સ્ટીલ, લોખંડ",
    hintElectronics: "વાયર, જૂના ઉપકરણો",
    hintGlass: "સાફ બોટલો અને કાચના બરણી",
    hintOther: "મિક્સ રિસાયકલ ભંગાર",
    // Radar
    collectorRadar: "કલેક્ટર રડાર",
    radarSubtitle: "તમારા વિસ્તારના ઘરોમાંથી લાઇવ ભંગાર વિનંતીઓ.",
    liveDynamoFeed: "લાઇવ AWS ડેટા ફીડ",
    scanningNearby: "નજીકના ભંગારની શોધ ચાલુ છે...",
    waitingPickup: "પીકઅપ બાકી છે",
    acceptedByYou: "તમારા દ્વારા સ્વીકારાયેલ",
    onTheWay: "રસ્તામાં",
    accept: "સ્વીકારો",
  },
  te: {
    // Nav
    forCollectors: "సేకరణదారుల కోసం",
    login: "లాగిన్",
    sellYourScrap: "స్క్రాప్ అమ్మండి",
    // Hero
    turnTrash: "మీ చెత్తను నగదుగా మార్చుకోండి.",
    heroSubtitle: "నమ్మకమైన స్క్రాప్ పికప్‌ను వెంటనే షెడ్యూల్ చేయండి. రీసైక్లింగ్ చేయండి మరియు సులభంగా డబ్బు పొందండి.",
    startSellingScrap: "స్క్రాప్ అమ్మడం ప్రారంభించండి",
    joinAsCollector: "కలెక్టర్‌గా చేరండి",
    readyToClear: "ఇంటి స్క్రాప్‌ను క్లియర్ చేయడానికి సిద్ధంగా ఉన్నారా?",
    joinThousands: "డోర్‌స్టెప్ పికప్‌ని బుక్ చేసుకోండి, స్క్రాప్ నుండి డబ్బు సంపాదించండి మరియు నగరాన్ని శుభ్రంగా ఉంచండి.",
    // Sell page
    sellPageTitle: "మీ స్క్రాప్‌ను అమ్మండి",
    sellPageSubtitle: "ఫోటోలు అప్‌లోడ్ చేయండి, స్క్రాప్ రకాలను ఎంచుకోండి మరియు క్షణాల్లో పికప్ బుక్ చేయండి.",
    step1: "దశ 1 — ఫోటోలను అప్‌లోడ్ చేయండి",
    dragDrop: "ఫోటోలను ఇక్కడ లాగి వదలండి, లేదా బ్రౌజ్ చేయండి",
    analyzing: "విశ్లేషిస్తోంది...",
    step2: "దశ 2 — స్క్రాప్ రకాన్ని ఎంచుకోండి",
    step2Subtitle: "ఫోటో నుండి గుర్తించిన వస్తువులు స్వయంచాలకంగా జోడించబడతాయి. మీరు కింద కూడా ఎంచుకోవచ్చు.",
    indiaScrapRates: "భారతీయ స్క్రాప్ మార్కెట్ ధరలు",
    approxWeight: "సుమారు మొత్తం బరువు (కిలోలు)",
    defaultPerKg: "డిఫాల్ట్: 1 కిలో (కిలో ధర)",
    step3: "దశ 3 — పికప్ చిరునామా",
    addressPlaceholder: "ఉదా. ఫ్లాట్ 402, సన్‌షైన్ అపార్ట్‌మెంట్స్, ఎంజీ రోడ్",
    estimatedValuation: "అంచనా వేసిన స్క్రాప్ విలువ",
    liveBenchmarks: "లైవ్ మార్కెట్ రేట్లు",
    selectedItem: "ఎంచుకున్న స్క్రాప్",
    marketRate: "మార్కెట్ రేటు",
    combinedRate: "మొత్తం రేటు:",
    calculation: "లెక్కింపు:",
    requestPickup: "పికప్ అభ్యర్థించండి",
    uploadingAndRequesting: "అప్‌లోడ్ మరియు బుకింగ్ అవుతోంది...",
    pickupRequested: "పికప్ బుక్ చేయబడింది!",
    pickupRequestedSub: "మీ అభ్యర్థన సేవ్ చేయబడింది మరియు సమీపంలోని కబాడీవాలాలకు పంపబడింది.",
    orderId: "ఆర్డర్ ఐడి:",
    items: "వస్తువులు:",
    estPayout: "అంచనా మొత్తం:",
    address: "చిరునామా:",
    status: "స్థితి:",
    searchingNearby: "సమీపంలో వెతుకుతోంది...",
    viewOnRadar: "రాడార్‌లో చూడండి",
    sellMoreScrap: "మరింత స్క్రాప్ అమ్మండి",
    aiDetected: "AI గుర్తించింది",
    // Scrap types
    "Cardboard": "కార్డ్‌బోర్డ్ / అట్టపెట్టెలు",
    "Plastic": "ప్లాస్టిక్",
    "Paper / Books": "కాగితం / పుస్తకాలు",
    "Metal / Iron": "లోహం / ఇనుము",
    "Electronics": "ఎలక్ట్రానిక్స్",
    "Glass": "గాజు సీసాలు",
    "Other": "ఇతర స్క్రాప్",
    // Hints
    hintCardboard: "ప్యాకింగ్ బాక్సులు, అట్టలు",
    hintPlastic: "బాటిళ్లు, కంటైనర్లు, ప్లాస్టిక్",
    hintPaper: "వార్తాపత్రికలు, నోట్‌బుక్‌లు, పుస్తకాలు",
    hintMetal: "ఇనుప రాడ్లు, టిన్లు, ఉక్కు",
    hintElectronics: "వైర్లు, పాత ఉపకరణాలు",
    hintGlass: "శుభ్రమైన గాజు సీసాలు",
    hintOther: "మిశ్రమ రీసైకిల్ స్క్రాప్",
    // Radar
    collectorRadar: "కలెక్టర్ రాడార్",
    radarSubtitle: "మీ ప్రాంతంలోని ఇళ్ల నుండి లైవ్ స్క్రాప్ అభ్యర్థనలు.",
    liveDynamoFeed: "లైవ్ AWS డేటా ఫీడ్",
    scanningNearby: "సమీప స్క్రాప్ కోసం వెతుకుతోంది...",
    waitingPickup: "పికప్ కోసం వేచి ఉంది",
    acceptedByYou: "మీరు ఆమోదించారు",
    onTheWay: "దారిలో ఉంది",
    accept: "ఆమోదించండి",
  },
  ta: {
    // Nav
    forCollectors: "சேகரிப்பாளர்களுக்காக",
    login: "உள்நுழைக",
    sellYourScrap: "பழைய இரும்பை விற்கவும்",
    // Hero
    turnTrash: "குப்பையை பணமாக மாற்றுங்கள்.",
    heroSubtitle: "நம்பகமான பழைய பொருள் சேகரிப்பை உடனடியாக பதிவு செய்யுங்கள். சுற்றுச்சூழல் காத்து எளிதாக பணம் பெறுங்கள்.",
    startSellingScrap: "பழைய பொருள் விற்க தொடங்குங்கள்",
    joinAsCollector: "சேகரிப்பாளராக இணையுங்கள்",
    readyToClear: "வீட்டு பழைய பொருட்களை அகற்ற தயாரா?",
    joinThousands: "வீட்டு வாசல் பிக்கப் பதிவு செய்யுங்கள், பழைய பொருட்களுக்கு பணம் பெறுங்கள், நகரத்தை தூய்மையாக வையுங்கள்.",
    // Sell page
    sellPageTitle: "உங்கள் பழைய பொருட்களை விற்கவும்",
    sellPageSubtitle: "புகைப்படங்களை பதிவேற்றவும், பழைய பொருள் வகைகளை தேர்வு செய்யவும், நொடிகளில் பிக்கப் பதிவு செய்யவும்.",
    step1: "படி 1 — புகைப்படங்களைப் பதிவேற்றவும்",
    dragDrop: "புகைப்படங்களை இங்கே இழுத்து விடவும், அல்லது உலாவவும்",
    analyzing: "ஆராய்கிறது...",
    step2: "படி 2 — பழைய பொருள் வகையைத் தேர்ந்தெடுக்கவும்",
    step2Subtitle: "புகைப்படத்திலிருந்து கண்டறியப்பட்ட பொருட்கள் தானாக சேர்க்கப்படும். நீங்களும் தேர்வு செய்யலாம்.",
    indiaScrapRates: "இந்திய பழைய பொருள் சந்தை விலை",
    approxWeight: "தோராயமான மொத்த எடை (கிலோ)",
    defaultPerKg: "இயல்புநிலை: 1 கிலோ (கிலோ விலை)",
    step3: "படி 3 — பிக்கப் முகவரி",
    addressPlaceholder: "எ.கா. பிளாட் 402, சன்ஷைன் அபார்ட்மெண்ட்ஸ், எம்ஜி ரோடு",
    estimatedValuation: "தோராயமான பழைய பொருள் மதிப்பு",
    liveBenchmarks: "நேரடி சந்தை விலை",
    selectedItem: "தேர்ந்தெடுக்கப்பட்ட பொருள்",
    marketRate: "சந்தை விலை",
    combinedRate: "மொத்த விலை:",
    calculation: "கணக்கீடு:",
    requestPickup: "பிக்கப் கோரிக்கை வைக்கவும்",
    uploadingAndRequesting: "பதிவேற்றி பிக்கப் பதிவு செய்யப்படுகிறது...",
    pickupRequested: "பிக்கப் பதிவு செய்யப்பட்டது!",
    pickupRequestedSub: "உங்கள் கோரிக்கை சேமிக்கப்பட்டு அருகிலுள்ள சேகரிப்பாளர்களுக்கு அனுப்பப்பட்டது.",
    orderId: "ஆர்டர் ஐடி:",
    items: "பொருட்கள்:",
    estPayout: "தோராய தொகை:",
    address: "முகவரி:",
    status: "நிலை:",
    searchingNearby: "அருகில் தேடுகிறது...",
    viewOnRadar: "ரேடாரில் பார்க்கவும்",
    sellMoreScrap: "மேலும் பொருட்களை விற்கவும்",
    aiDetected: "AI கண்டறிந்தது",
    // Scrap types
    "Cardboard": "அட்டைப்பெட்டி",
    "Plastic": "பிளாஸ்டிக்",
    "Paper / Books": "காகிதம் / புத்தகங்கள்",
    "Metal / Iron": "உலோகம் / இரும்பு",
    "Electronics": "மின்னணு சாதனங்கள்",
    "Glass": "கண்ணாடி பாட்டில்கள்",
    "Other": "பிற பொருட்கள்",
    // Hints
    hintCardboard: "பேக்கிங் பெட்டிகள், அட்டைகள்",
    hintPlastic: "பாட்டில்கள், டப்பாக்கள், பிளாஸ்டிக்",
    hintPaper: "செய்தித்தாள்கள், குறிப்பேடுகள்",
    hintMetal: "இரும்பு கம்பிகள், தகரங்கள், எஃகு",
    hintElectronics: "வயர்கள், பழைய மின்னணு சாதனங்கள்",
    hintGlass: "சுத்தமான கண்ணாடி பாட்டில்கள்",
    hintOther: "கலப்பு மறுசுழற்சி பொருட்கள்",
    // Radar
    collectorRadar: "சேகரிப்பாளர் ரேடார்",
    radarSubtitle: "உங்கள் பகுதி வீடுகளிலிருந்து நேரடி பிக்கப் கோரிக்கைகள்.",
    liveDynamoFeed: "நேரடி AWS தரவு ஃபீட்",
    scanningNearby: "அருகிலுள்ள பழைய பொருட்களைத் தேடுகிறது...",
    waitingPickup: "பிக்கப்பிற்காக காத்திருக்கிறது",
    acceptedByYou: "உங்களால் ஏற்கப்பட்டது",
    onTheWay: "வழியில் உள்ளது",
    accept: "ஏற்றுக்கொள்",
  },
};

export interface UserProfile {
  email: string;
  name: string;
  phone?: string;
  role: "SELLER" | "COLLECTOR";
}

interface AppContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  theme: "light" | "dark";
  toggleTheme: () => void;
  user: UserProfile | null;
  loginUser: (user: UserProfile) => void;
  logoutUser: () => void;
  t: (key: string) => string;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export function AppProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguageState] = useState<Language>("en");
  const [theme, setThemeState] = useState<"light" | "dark">("light");
  const [user, setUser] = useState<UserProfile | null>(null);

  // Load from localStorage on mount
  useEffect(() => {
    try {
      const savedUser = localStorage.getItem("scraphop_user");
      if (savedUser) {
        setUser(JSON.parse(savedUser));
      }

      const savedLang = localStorage.getItem("scraphop_lang") as Language;
      if (savedLang && TRANSLATIONS[savedLang]) {
        setLanguageState(savedLang);
      }

      const applyThemeToDOM = (t: "light" | "dark") => {
        if (t === "dark") {
          document.documentElement.classList.add("dark");
          document.body?.classList.add("dark");
          document.documentElement.setAttribute("data-theme", "dark");
        } else {
          document.documentElement.classList.remove("dark");
          document.body?.classList.remove("dark");
          document.documentElement.setAttribute("data-theme", "light");
        }
      };

      const savedTheme = localStorage.getItem("scraphop_theme") as "light" | "dark";
      if (savedTheme) {
        setThemeState(savedTheme);
        applyThemeToDOM(savedTheme);
      } else if (window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches) {
        setThemeState("dark");
        applyThemeToDOM("dark");
      }
    } catch (e) {
      // ignore SSR or storage errors
    }
  }, []);

  const loginUser = (userProfile: UserProfile) => {
    setUser(userProfile);
    try {
      localStorage.setItem("scraphop_user", JSON.stringify(userProfile));
    } catch (e) {}
  };

  const logoutUser = () => {
    setUser(null);
    try {
      localStorage.removeItem("scraphop_user");
    } catch (e) {}
  };

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    try {
      localStorage.setItem("scraphop_lang", lang);
    } catch (e) {}
  };

  const toggleTheme = () => {
    const nextTheme = theme === "light" ? "dark" : "light";
    setThemeState(nextTheme);
    try {
      localStorage.setItem("scraphop_theme", nextTheme);
    } catch (e) {}

    if (nextTheme === "dark") {
      document.documentElement.classList.add("dark");
      document.body?.classList.add("dark");
      document.documentElement.setAttribute("data-theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      document.body?.classList.remove("dark");
      document.documentElement.setAttribute("data-theme", "light");
    }
  };

  const t = (key: string): string => {
    const langDict = TRANSLATIONS[language] || TRANSLATIONS.en;
    return langDict[key] || TRANSLATIONS.en[key] || key;
  };

  return (
    <AppContext.Provider
      value={{
        language,
        setLanguage,
        theme,
        toggleTheme,
        user,
        loginUser,
        logoutUser,
        t,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error("useApp must be used within an AppProvider");
  }
  return context;
}
