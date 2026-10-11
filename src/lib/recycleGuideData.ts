export interface RecycledProduct {
  title: string;
  subtitle: string;
  description: string;
  icon: string;
}

export interface ProcessStep {
  step: number;
  title: string;
  stageName: string;
  description: string;
  detail: string;
}

export interface ScrapGuideCategory {
  id: string;
  slug: string;
  name: string;
  subtitle: string;
  categoryTag: string;
  emoji: string;
  iconName: string;
  heroImage: string;
  themeColor: {
    bg: string;
    border: string;
    text: string;
    badge: string;
    gradient: string;
    lightBg: string;
  };
  mandiRate: string;
  wastePerHourIndia: {
    tonnesPerHour: string;
    tonnesPerDay: string;
    tonnesPerYear: string;
    recycleRate: string;
    landfillRate: string;
    impactSummary: string;
    sourceCitation: string;
  };
  howToRecycle: {
    title: string;
    summary: string;
    guidelines: Array<{
      title: string;
      description: string;
      doOrDont: "do" | "dont" | "tip";
    }>;
  };
  recycledProducts: RecycledProduct[];
  recyclingProcess: ProcessStep[];
  ecoBenefits: Array<{
    stat: string;
    label: string;
  }>;
}

export const RECYCLE_CATEGORIES: Record<string, ScrapGuideCategory> = {
  cardboard: {
    id: "cardboard",
    slug: "cardboard",
    name: "Cardboard",
    subtitle: "Boxes & Packaging",
    categoryTag: "Corrugated & Packaging Paper",
    emoji: "📦",
    iconName: "Package",
    heroImage: "https://images.unsplash.com/photo-1513672494107-cd9d848a383e?auto=format&fit=crop&w=1200&q=80",
    themeColor: {
      bg: "bg-amber-500",
      border: "border-amber-200 dark:border-amber-800",
      text: "text-amber-700 dark:text-amber-400",
      badge: "bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-300",
      gradient: "from-amber-500 to-orange-600",
      lightBg: "bg-amber-50 dark:bg-amber-950/40",
    },
    mandiRate: "₹9 – ₹14 / kg",
    wastePerHourIndia: {
      tonnesPerHour: "1,850+ Tonnes / Hour",
      tonnesPerDay: "44,400+ Tonnes / Day",
      tonnesPerYear: "16.2+ Million Tonnes / Year",
      recycleRate: "65%",
      landfillRate: "35% (dumped or incinerated)",
      impactSummary: "India generates over 1,850 tonnes of discarded cardboard and packaging waste every hour, driven largely by rapid e-commerce expansion and retail shipping.",
      sourceCitation: "Indian Paper Manufacturers Association (IPMA) & CPCB Municipal Solid Waste Estimates",
    },
    howToRecycle: {
      title: "How to Properly Recycle Cardboard",
      summary: "Keeping cardboard clean, dry, and flattened is essential to preserve fiber strength during paper pulping.",
      guidelines: [
        {
          title: "Flatten All Boxes",
          description: "Cut packing tape along the seams and break boxes down completely flat to minimize storage volume and ease transport.",
          doOrDont: "do",
        },
        {
          title: "Remove Plastic Tape & Bubble Wrap",
          description: "Peel off synthetic parcel tape, shipping labels, and plastic cushioning, as they can clog industrial pulping machinery.",
          doOrDont: "do",
        },
        {
          title: "Avoid Food Grease & Oil Stains",
          description: "Heavily greased cardboard, like used pizza boxes, cannot be chemically recycled and should be composted or disposed of separately.",
          doOrDont: "dont",
        },
        {
          title: "Keep 100% Dry",
          description: "Moisture breaks down cellulose wood fibers prematurely and leads to mold growth, drastically diminishing fiber value.",
          doOrDont: "tip",
        },
      ],
    },
    recycledProducts: [
      {
        title: "New Shipping Boxes",
        subtitle: "Corrugated Delivery Cartons",
        description: "Recycled pulp is remanufactured into durable fluted packaging boxes used across retail and logistics.",
        icon: "Box",
      },
      {
        title: "Egg Trays & Produce Cartons",
        subtitle: "Molded Fiber Packaging",
        description: "Industrial molded pulp technology transforms low-grade cardboard into 100% biodegradable fruit and egg trays.",
        icon: "Layers",
      },
      {
        title: "Paper Bags & Heavy Sacks",
        subtitle: "Commercial Kraft Paper",
        description: "Refined cellulose fibers are converted into high-strength brown kraft paper shopping bags and grain sacks.",
        icon: "ShoppingBag",
      },
      {
        title: "Eco Building Insulation",
        subtitle: "Thermal & Acoustic Wallboards",
        description: "Treated with eco-friendly fire retardants, recycled cardboard is made into acoustic panels and drywall filler.",
        icon: "Home",
      },
      {
        title: "Biodegradable Plant Pots",
        subtitle: "Nursery Seedling Containers",
        description: "Compostable nursery planters that decompose naturally when transplanted directly into garden soil.",
        icon: "Sprout",
      },
    ],
    recyclingProcess: [
      {
        step: 1,
        title: "Doorstep Collection & ScrapHop Pickup",
        stageName: "Collection & Classification",
        description: "ScrapHop verified collectors pick up cardboard from residences and commercial hubs, separating corrugated board from thin chipboard.",
        detail: "Sorting: Fluted corrugated packaging is kept separate from wax-coated food boxes.",
      },
      {
        step: 2,
        title: "Hydraulic Baling & Compression",
        stageName: "Compaction",
        description: "Loose cardboard is compressed under high hydraulic pressure into dense 500 kg bales for shipment to paper mills.",
        detail: "Compaction cuts transport emissions by more than 70%.",
      },
      {
        step: 3,
        title: "Pulping & Fiber Agitation",
        stageName: "Pulping",
        description: "Bales are immersed in heated water vats with organic enzymes, dissolving the paper sheets into a dense cellulose slurry.",
        detail: "Wood fibers separate without losing structural tensile integrity.",
      },
      {
        step: 4,
        title: "Centrifugal Screening & De-Inking",
        stageName: "Purification",
        description: "Centrifugal scrubbers remove staples, leftover tape, and adhesives, while air-bubble flotation strips away printing ink.",
        detail: "Only pure, cleansed pulp slurry remains for sheet rolling.",
      },
      {
        step: 5,
        title: "Drying, Rolling & New Manufacturing",
        stageName: "Final Production",
        description: "The refined pulp is pressed through heated steam cylinders to produce massive kraft paper rolls, ready for box fabrication.",
        detail: "Cardboard fibers can be recycled effectively up to 7 consecutive times.",
      },
    ],
    ecoBenefits: [
      { stat: "17 Mature Trees", label: "Saved for every single tonne of recycled cardboard" },
      { stat: "7,000 Gallons", label: "Of clean water saved compared to virgin paper milling" },
      { stat: "4,000 kWh", label: "Of electricity conserved, enough to power a home for 6 months" },
      { stat: "3 Cubic Yards", label: "Of precious municipal landfill volume spared" },
    ],
  },

  plastic: {
    id: "plastic",
    slug: "plastic",
    name: "Plastic",
    subtitle: "Bottles, Containers & Hard Plastics",
    categoryTag: "PET, HDPE, LDPE & Polymers",
    emoji: "🧴",
    iconName: "Milk",
    heroImage: "https://images.unsplash.com/photo-1595278069441-2cf29f8005a4?auto=format&fit=crop&w=1200&q=80",
    themeColor: {
      bg: "bg-blue-500",
      border: "border-blue-200 dark:border-blue-800",
      text: "text-blue-700 dark:text-blue-400",
      badge: "bg-blue-100 text-blue-800 dark:bg-blue-950 dark:text-blue-300",
      gradient: "from-blue-500 to-cyan-600",
      lightBg: "bg-blue-50 dark:bg-blue-950/40",
    },
    mandiRate: "₹18 – ₹32 / kg",
    wastePerHourIndia: {
      tonnesPerHour: "3,900+ Tonnes / Hour",
      tonnesPerDay: "93,600+ Tonnes / Day",
      tonnesPerYear: "34+ Million Tonnes / Year",
      recycleRate: "60%",
      landfillRate: "40% (drains, oceans & open dumps)",
      impactSummary: "India generates nearly 3,900 tonnes of plastic waste every hour, creating severe environmental challenges across urban drains, coastlines, and landfills.",
      sourceCitation: "Central Pollution Control Board (CPCB) Plastic Waste Management Report",
    },
    howToRecycle: {
      title: "How to Properly Recycle Plastic",
      summary: "Successful plastic recycling relies on rigorous sorting by resin type and removing food contaminants.",
      guidelines: [
        {
          title: "Rinse & Drain All Residue",
          description: "Rinse beverage containers, shampoo bottles, and condiment tubs with water to prevent bacterial growth and odor.",
          doOrDont: "do",
        },
        {
          title: "Keep Caps Securely Attached",
          description: "Bottle caps (HDPE) should be screwed back onto bottles so they don't slip through sorting screen grates.",
          doOrDont: "do",
        },
        {
          title: "Do Not Mix Single-Use Plastic Wrappers",
          description: "Avoid mixing dirty metallized snack wrappers (MLP) with rigid plastic bottles, as they melt at different temperatures.",
          doOrDont: "dont",
        },
        {
          title: "Check Resin Identification Codes (1 to 7)",
          description: "Type 1 (PET) and Type 2 (HDPE) command the highest scrap prices and have the most developed recycling infrastructure.",
          doOrDont: "tip",
        },
      ],
    },
    recycledProducts: [
      {
        title: "Polyester T-Shirts & Sportswear",
        subtitle: "Recycled Apparel Fibers",
        description: "PET bottles are shredded and spun into high-performance polyester yarn used by international sportswear brands.",
        icon: "Shirt",
      },
      {
        title: "Plastic Lumber & Park Benches",
        subtitle: "Weatherproof Outdoor Furniture",
        description: "Heavy-duty HDPE plastics are molded into rot-proof, splinter-free benches, fencing, and decking boards.",
        icon: "Armchair",
      },
      {
        title: "Eco-Roads & Asphalt Additive",
        subtitle: "Polymer-Modified Bitumen",
        description: "Shredded plastic waste is mixed with bitumen at 160°C to construct pothole-resistant, durable highways across India.",
        icon: "Navigation",
      },
      {
        title: "New Bottles & Detergent Cans",
        subtitle: "Circular Packaging",
        description: "Food-grade rPET pellets are remolded into brand-new consumer beverage bottles and household cleaner jugs.",
        icon: "Cylinder",
      },
      {
        title: "Agricultural Drainage Pipes",
        subtitle: "Irrigation & Cable Conduits",
        description: "Recycled HDPE and PVC are extruded into durable underground drainage conduits and electrical casing pipes.",
        icon: "Wrench",
      },
    ],
    recyclingProcess: [
      {
        step: 1,
        title: "Resin Classification & Optical Sorting",
        stageName: "Sorting",
        description: "High-speed infrared sensors and trained sorters segregate plastics into PET, HDPE, PP, and color categories.",
        detail: "Mismatched polymers ruin the melt batch, making strict segregation essential.",
      },
      {
        step: 2,
        title: "Rotary Industrial Shredding",
        stageName: "Granulation",
        description: "Industrial rotary blades chop rigid plastics into uniform thumbnail-sized flakes, reducing bulk volume by 80%.",
        detail: "Flake consistency ensures even melting downstream.",
      },
      {
        step: 3,
        title: "Sink-Float Wash Plant",
        stageName: "Decontamination",
        description: "Flakes undergo friction washing in hot water and detergent. Heavy PET sinks, while lighter PP caps float to the top.",
        detail: "Label adhesives and oil residues are completely stripped away.",
      },
      {
        step: 4,
        title: "Extrusion & Pelletizing",
        stageName: "Extrusion",
        description: "Decontaminated flakes are melted at 260°C in an extruder, filtered, and cut into uniform plastic granules (pellets).",
        detail: "These uniform pellets serve as raw feedstock for plastics manufacturers.",
      },
      {
        step: 5,
        title: "Blow & Injection Molding",
        stageName: "Remanufacturing",
        description: "Pellets are injected into high-precision molds to create brand-new bottles, automotive parts, and fabrics.",
        detail: "Plastic can be remanufactured into durable goods up to 10 times.",
      },
    ],
    ecoBenefits: [
      { stat: "2,000 Gallons", label: "Of crude oil saved for every tonne of plastic recycled" },
      { stat: "5.7 MWh", label: "Of energy conserved, powering two households for an entire year" },
      { stat: "1.5 Tonnes", label: "Of carbon dioxide emissions prevented from entering the atmosphere" },
      { stat: "100+ Years", label: "Of landfill persistence eliminated per recycled batch" },
    ],
  },

  paper: {
    id: "paper",
    slug: "paper",
    name: "Paper",
    subtitle: "Newspapers, Books & Office Sheets",
    categoryTag: "Office Paper, Books & Newspapers",
    emoji: "📰",
    iconName: "FileText",
    heroImage: "https://images.unsplash.com/photo-1598414160330-a9da11bcb52d?auto=format&fit=crop&w=1200&q=80",
    themeColor: {
      bg: "bg-emerald-500",
      border: "border-emerald-200 dark:border-emerald-800",
      text: "text-emerald-700 dark:text-emerald-400",
      badge: "bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300",
      gradient: "from-emerald-500 to-teal-600",
      lightBg: "bg-emerald-50 dark:bg-emerald-950/40",
    },
    mandiRate: "₹12 – ₹18 / kg",
    wastePerHourIndia: {
      tonnesPerHour: "2,500+ Tonnes / Hour",
      tonnesPerDay: "60,000+ Tonnes / Day",
      tonnesPerYear: "21.9+ Million Tonnes / Year",
      recycleRate: "42%",
      landfillRate: "58% (burned, destroyed, or dumped)",
      impactSummary: "India produces more than 2,500 tonnes of discarded paper, old newspapers, and discarded notebooks every hour across institutions, offices, and homes.",
      sourceCitation: "Centre for Science and Environment (CSE) & Indian Paper Industry Reports",
    },
    howToRecycle: {
      title: "How to Properly Recycle Paper",
      summary: "Preserving fiber integrity and keeping paper dry ensures high-value recycling outcomes.",
      guidelines: [
        {
          title: "Separate White Office Paper",
          description: "High-grade printer paper and ruled notebooks fetch up to 40% higher rates than mixed newspapers. Bundle them separately.",
          doOrDont: "do",
        },
        {
          title: "Remove Plastic Spiral Bindings & Covers",
          description: "Detach plastic wire spirals, metal clips, and laminated covers before passing books to recyclers.",
          doOrDont: "do",
        },
        {
          title: "Keep Away from Moisture & Liquids",
          description: "Wet paper quickly degrades into decomposing sludge and is rejected by automated recycling mills.",
          doOrDont: "dont",
        },
        {
          title: "Bundle Neatly with Twine",
          description: "Stack papers in 10-15 kg tied bundles to simplify weighing and transport on ScrapHop pickup day.",
          doOrDont: "tip",
        },
      ],
    },
    recycledProducts: [
      {
        title: "Recycled Notebooks & Registers",
        subtitle: "Educational Stationery",
        description: "De-inked white paper pulp is converted into school notebooks, writing pads, and office record registers.",
        icon: "BookOpen",
      },
      {
        title: "Fresh Newsprint Paper",
        subtitle: "Daily Newspaper Rolls",
        description: "Old newspapers are de-inked and remilled into newsprint stock for national daily print circulations.",
        icon: "Newspaper",
      },
      {
        title: "Paper Napkins & Facial Tissues",
        subtitle: "Sanitary Paper Products",
        description: "High-heat sterilized paper pulp is transformed into soft, hygienic tissue rolls and dining napkins.",
        icon: "Scroll",
      },
      {
        title: "Solid Paper Cores & Tubes",
        subtitle: "Industrial Spools",
        description: "Heavy compressed recycled paper plies form the rigid cores used in fabric bolts and aluminum foil rolls.",
        icon: "Disc",
      },
      {
        title: "Handmade Paper & Eco Stationery",
        subtitle: "Artisanal Gift Materials",
        description: "Blended with cotton rag fibers to produce luxury textured gift bags, journals, and wedding invitations.",
        icon: "Gift",
      },
    ],
    recyclingProcess: [
      {
        step: 1,
        title: "Collection & Raddi Grading",
        stageName: "Grading",
        description: "ScrapHop collectors categorize paper into white ledger, newsprint, magazine gloss, and kraft packaging.",
        detail: "White printer paper holds the highest market valuation due to long cellulose fibers.",
      },
      {
        step: 2,
        title: "Hydrapulper Maceration",
        stageName: "Pulping",
        description: "Paper is churned in high-velocity water vats with surfactant agents to disintegrate sheets back into individual fibers.",
        detail: "Cellulose chains separate without suffering irreversible breakage.",
      },
      {
        step: 3,
        title: "Flotation De-Inking",
        stageName: "De-Inking",
        description: "Micro-air bubbles pass through the slurry. Hydrophobic ink particles attach to bubbles and float to the surface as froth.",
        detail: "The ink froth is skimmed off, restoring the natural brightness of the pulp.",
      },
      {
        step: 4,
        title: "Oxygen & Peroxide Bleaching",
        stageName: "Refining",
        description: "Chlorine-free hydrogen peroxide whitens the fibers sustainably without releasing hazardous dioxins.",
        detail: "Fine mesh screens remove leftover staple fragments and binding adhesives.",
      },
      {
        step: 5,
        title: "Pressing, Dewatering & Rolling",
        stageName: "Finished Paper",
        description: "The wet pulp mat travels over giant steam-heated drying rollers that remove 95% of water, spooling into paper rolls.",
        detail: "Each paper fiber can be recycled up to 7 times before becoming too short.",
      },
    ],
    ecoBenefits: [
      { stat: "24 Forest Trees", label: "Preserved for each tonne of recycled high-grade paper" },
      { stat: "26,000 Litres", label: "Of clean water saved compared to wood-pulp processing" },
      { stat: "4,100 kWh", label: "Of electricity conserved versus virgin tree logging" },
      { stat: "1.0 Tonne", label: "Of carbon dioxide emissions avoided per recycled batch" },
    ],
  },

  metal: {
    id: "metal",
    slug: "metal",
    name: "Metal",
    subtitle: "Steel, Iron, Copper & Aluminum",
    categoryTag: "Ferrous & Non-Ferrous Scrap",
    emoji: "🔩",
    iconName: "Wrench",
    heroImage: "https://images.unsplash.com/photo-1561503412-852800622772?auto=format&fit=crop&w=1200&q=80",
    themeColor: {
      bg: "bg-slate-600",
      border: "border-slate-300 dark:border-slate-700",
      text: "text-slate-700 dark:text-slate-300",
      badge: "bg-slate-100 text-slate-800 dark:bg-slate-800 dark:text-slate-200",
      gradient: "from-slate-600 to-zinc-800",
      lightBg: "bg-slate-50 dark:bg-slate-900/50",
    },
    mandiRate: "₹28 – ₹450 / kg",
    wastePerHourIndia: {
      tonnesPerHour: "4,200+ Tonnes / Hour",
      tonnesPerDay: "100,800+ Tonnes / Day",
      tonnesPerYear: "36.7+ Million Tonnes / Year",
      recycleRate: "80%",
      landfillRate: "20% (corrosion loss or dumped)",
      impactSummary: "India discards over 4,200 tonnes of industrial and consumer metal scrap every hour. Metals are 100% infinitely recyclable without any loss of metallurgical strength.",
      sourceCitation: "Ministry of Steel & Material Recycling Association of India (MRAI)",
    },
    howToRecycle: {
      title: "How to Properly Recycle Metal",
      summary: "Classifying scrap into Ferrous (magnetic steel/iron) and Non-Ferrous (copper, brass, aluminum) maximizes earnings.",
      guidelines: [
        {
          title: "Perform the Magnet Test",
          description: "If a magnet sticks, it is ferrous steel or iron. If it does not stick, you have valuable non-ferrous metal like brass, copper, or aluminum.",
          doOrDont: "do",
        },
        {
          title: "Separate Copper & Brass",
          description: "Copper (₹400-500/kg) and Brass (₹300/kg) are worth 15 times more than iron. Always keep them sorted separately.",
          doOrDont: "do",
        },
        {
          title: "Crush Aluminum Beverage Cans",
          description: "Stomp cans flat before storing to optimize container space and simplify weighing during pickup.",
          doOrDont: "do",
        },
        {
          title: "Handle Rusted Edges with Heavy Gloves",
          description: "Wear thick gloves when moving sharp iron sheets to prevent cuts and tetanus risks.",
          doOrDont: "tip",
        },
      ],
    },
    recycledProducts: [
      {
        title: "TMT Rebars for Construction",
        subtitle: "Reinforced Structural Steel",
        description: "Scrap steel melted in electric arc furnaces is recast into high-strength TMT rebars used in bridges and buildings.",
        icon: "ShieldAlert",
      },
      {
        title: "Automobile Frames & Panels",
        subtitle: "Vehicular Components",
        description: "Auto manufacturers use recycled sheet steel and aluminum alloys to build vehicle doors, chassis, and engine blocks.",
        icon: "Car",
      },
      {
        title: "New Aluminum Beverage Cans",
        subtitle: "Closed-Loop Packaging",
        description: "A recycled aluminum can is melted, rolled, and back on retail supermarket shelves as a new can in just 60 days.",
        icon: "Wine",
      },
      {
        title: "Hand Tools & Hardware",
        subtitle: "Hammers, Wrenches & Fasteners",
        description: "Recycled tool steel is forged into industrial wrenches, bolts, nails, and agricultural implements.",
        icon: "Hammer",
      },
      {
        title: "Electrical Wiring & Conductors",
        subtitle: "99.9% Pure Copper Conductors",
        description: "Scrap copper wire is electro-refined into pure cathodes, forming electrical transmission lines and power transformers.",
        icon: "Zap",
      },
    ],
    recyclingProcess: [
      {
        step: 1,
        title: "Magnetic & Eddy Current Separation",
        stageName: "Separation",
        description: "Industrial electromagnets separate ferrous iron, while Eddy Current separators repel non-magnetic aluminum cans into separate bins.",
        detail: "Optical and X-ray scanners isolate brass and copper with surgical precision.",
      },
      {
        step: 2,
        title: "Heavy Hydraulic Shearing & Shredding",
        stageName: "Size Reduction",
        description: "Massive hydraulic shears slice car bodies and structural beams into compact palm-sized metal fragments.",
        detail: "Uniform fragment size cuts furnace melting times by 50%.",
      },
      {
        step: 3,
        title: "Electric Arc Furnace Smelting (1,600°C)",
        stageName: "Smelting",
        description: "Shredded scrap is dropped into electric furnaces heated to 1,600°C. Lime flux is added to bind surface impurities into slag.",
        detail: "Recycling scrap steel requires 75% less energy than refining virgin iron ore.",
      },
      {
        step: 4,
        title: "Metallurgical Alloying & Purification",
        stageName: "Refining",
        description: "Carbon, manganese, and chromium are added to achieve exact metallurgical grades for stainless or structural steel.",
        detail: "Optical spectrometers verify chemical composition within seconds.",
      },
      {
        step: 5,
        title: "Continuous Casting & Rolling",
        stageName: "Casting",
        description: "Molten metal flows into continuous casting machines to form solid billets, slabs, and coils for manufacturing.",
        detail: "Metals can be recycled infinitely without any degradation in structural quality.",
      },
    ],
    ecoBenefits: [
      { stat: "95% Less Energy", label: "Required to recycle aluminum compared to mining virgin bauxite ore" },
      { stat: "1.5 Tonnes", label: "Of iron ore mining prevented per tonne of recycled steel" },
      { stat: "75% Lower CO2", label: "Emissions produced using electric scrap smelting" },
      { stat: "Infinite Life", label: "Metals never degrade and can be melted down endlessly" },
    ],
  },

  electronics: {
    id: "electronics",
    slug: "electronics",
    name: "Electronics",
    subtitle: "Phones, Laptops & Appliances",
    categoryTag: "E-Waste & High-Tech Components",
    emoji: "💻",
    iconName: "Laptop",
    heroImage: "https://images.unsplash.com/photo-1717667745934-53091623e8ee?auto=format&fit=crop&w=1200&q=80",
    themeColor: {
      bg: "bg-purple-600",
      border: "border-purple-200 dark:border-purple-800",
      text: "text-purple-700 dark:text-purple-400",
      badge: "bg-purple-100 text-purple-800 dark:bg-purple-950 dark:text-purple-300",
      gradient: "from-purple-600 to-indigo-700",
      lightBg: "bg-purple-50 dark:bg-purple-950/40",
    },
    mandiRate: "₹35 – ₹800 / kg",
    wastePerHourIndia: {
      tonnesPerHour: "370+ Tonnes / Hour",
      tonnesPerDay: "8,800+ Tonnes / Day",
      tonnesPerYear: "3.2+ Million Tonnes / Year",
      recycleRate: "22% (Formal Sector)",
      landfillRate: "78% (informal burning or scrap dumps)",
      impactSummary: "India ranks as the world's 3rd largest e-waste producer, generating over 370 tonnes of electronic scrap every hour, containing toxic heavy metals and valuable precious elements.",
      sourceCitation: "Global E-waste Monitor (UN) & CPCB E-Waste Management Framework",
    },
    howToRecycle: {
      title: "How to Safely Recycle E-Waste",
      summary: "Electronics contain hazardous lead, mercury, and cadmium, demanding certified handling rather than informal burning.",
      guidelines: [
        {
          title: "Factory Reset & Wipe All Personal Data",
          description: "Sign out of personal accounts and perform a complete factory wipe before handing over phones, tablets, or laptops.",
          doOrDont: "do",
        },
        {
          title: "Never Smash CRT Monitors or Fluorescent Tubes",
          description: "Breaking old screens releases toxic mercury vapor and lead dust that pose severe health hazards.",
          doOrDont: "dont",
        },
        {
          title: "Segregate Swollen Lithium Batteries",
          description: "Keep punctured or swollen lithium-ion batteries separated in an insulated container to avoid fire risks.",
          doOrDont: "do",
        },
        {
          title: "Hand Over Only to Certified Pickups (ScrapHop)",
          description: "ScrapHop routes electronic waste exclusively to government-authorized R2 certified recyclers with clean hydrometallurgical facilities.",
          doOrDont: "tip",
        },
      ],
    },
    recycledProducts: [
      {
        title: "Pure Gold, Silver & Copper",
        subtitle: "Recovered Precious Metals",
        description: "1 tonne of smartphone circuit boards yields up to 300 grams of pure 24K gold—over 100 times richer than standard gold ore.",
        icon: "Coins",
      },
      {
        title: "Recycled Polymer Housings",
        subtitle: "Durable ABS & Polycarbonate",
        description: "Appliance casings are shredded and blended to mold brand-new keyboards, monitor bezels, and power tool housings.",
        icon: "Monitor",
      },
      {
        title: "Lithium & Cobalt for EV Batteries",
        subtitle: "Battery Cell Precursors",
        description: "Recovered battery active materials are refined into battery-grade precursors for electric cars and scooters.",
        icon: "BatteryCharging",
      },
      {
        title: "Rare Earth Magnets for Turbines",
        subtitle: "Neodymium & Dysprosium",
        description: "Permanent magnets extracted from hard drives are reprocessed for use in green wind turbines and electric motors.",
        icon: "Compass",
      },
      {
        title: "Aluminum Unibodies",
        subtitle: "Aerospace Grade Enclosures",
        description: "Melted premium laptop frames produce aerospace-grade aluminum billets for sleek consumer devices.",
        icon: "Cpu",
      },
    ],
    recyclingProcess: [
      {
        step: 1,
        title: "Manual De-Manufacturing & Battery Extraction",
        stageName: "Dismantling",
        description: "Trained technicians dismantle devices with precision tools, safely isolating batteries, circuit boards, screens, and copper coils.",
        detail: "Lithium-ion cells are secured first to eliminate combustion hazards.",
      },
      {
        step: 2,
        title: "Low-Speed High-Torque Shredding",
        stageName: "Shredding",
        description: "Circuit boards and metal components enter industrial shredders under negative air pressure, reducing them to 10 mm grains.",
        detail: "Dust filtration scrubbers capture all hazardous particulates.",
      },
      {
        step: 3,
        title: "Electrostatic & Density Separation",
        stageName: "Classification",
        description: "Vibrating air-tables and high-voltage electrostatic drums separate non-metallic plastics from the concentrated metal powder.",
        detail: "99% of metallics are cleanly isolated without chemical burning.",
      },
      {
        step: 4,
        title: "Green Hydrometallurgical Leaching",
        stageName: "Precious Metal Refining",
        description: "Eco-friendly aqueous solutions selectively dissolve Gold, Silver, and Palladium from the powder without smoke or acid fumes.",
        detail: "Electrowinning cells plate out 99.99% pure precious metal ingots.",
      },
      {
        step: 5,
        title: "Closed-Loop Supply Chain Integration",
        stageName: "Reintegration",
        description: "Purified metals and engineering plastics are delivered directly to semiconductor foundries and EV manufacturers.",
        detail: "Urban mining uses 80% less energy than digging raw underground ore.",
      },
    ],
    ecoBenefits: [
      { stat: "300x Richer", label: "More gold found in 1 tonne of circuit boards than in 1 tonne of mined gold ore" },
      { stat: "Zero Toxic Runoff", label: "Prevents toxic lead and cadmium from contaminating municipal groundwater" },
      { stat: "80% Less Energy", label: "Used to recover lithium and copper compared to primary underground mining" },
      { stat: "Govt Certified", label: "100% of ScrapHop e-waste collections handled through authorized R2 recyclers" },
    ],
  },

  glass: {
    id: "glass",
    slug: "glass",
    name: "Glass",
    subtitle: "Bottles, Jars & Culinary Glassware",
    categoryTag: "Container & Beverage Glass",
    emoji: "🍾",
    iconName: "Wine",
    heroImage: "https://images.unsplash.com/photo-1654718421032-8aee5603b51f?auto=format&fit=crop&w=1200&q=80",
    themeColor: {
      bg: "bg-cyan-600",
      border: "border-cyan-200 dark:border-cyan-800",
      text: "text-cyan-700 dark:text-cyan-400",
      badge: "bg-cyan-100 text-cyan-800 dark:bg-cyan-950 dark:text-cyan-300",
      gradient: "from-cyan-500 to-teal-700",
      lightBg: "bg-cyan-50 dark:bg-cyan-950/40",
    },
    mandiRate: "₹2.5 – ₹6 / kg",
    wastePerHourIndia: {
      tonnesPerHour: "750+ Tonnes / Hour",
      tonnesPerDay: "18,000+ Tonnes / Day",
      tonnesPerYear: "6.5+ Million Tonnes / Year",
      recycleRate: "45%",
      landfillRate: "55% (takes 1,000,000 years to decompose)",
      impactSummary: "India throws away over 750 tonnes of glass bottles and jars every hour. While glass takes a million years to decompose in landfills, it can be recycled endlessly without any loss of clarity or quality.",
      sourceCitation: "All India Glass Manufacturers' Federation (AIGMF) & CPCB Municipal Solid Waste Data",
    },
    howToRecycle: {
      title: "How to Properly Recycle Glass",
      summary: "Separating whole bottles from broken shards and sorting by color ensures high recycling efficiency.",
      guidelines: [
        {
          title: "Keep Bottles Intact",
          description: "Intact, unbroken glass bottles fetch up to 3 times more scrap value because beverage bottlers can sterilize and refill them directly.",
          doOrDont: "do",
        },
        {
          title: "Sort by Color (Flint, Amber, Green)",
          description: "Keep clear (flint), brown (amber), and green glass in separate containers so color batches don't contaminate furnace melts.",
          doOrDont: "do",
        },
        {
          title: "Never Mix Mirrors or Window Panes",
          description: "Window glass, car windshields, and Pyrex ceramics contain specialized heat-resistant additives that cannot melt in standard bottle kilns.",
          doOrDont: "dont",
        },
        {
          title: "Wrap Broken Glass in Cardboard",
          description: "Place broken shards inside a taped cardboard box before pickup to prevent injuries to collection workers.",
          doOrDont: "tip",
        },
      ],
    },
    recycledProducts: [
      {
        title: "New Bottles & Food Jars",
        subtitle: "100% Circular Food Containers",
        description: "Recycled cullet is melted at 1,400°C to blow new jam jars, olive oil bottles, and pharmaceutical vials.",
        icon: "Wine",
      },
      {
        title: "Fiberglass Thermal Insulation",
        subtitle: "Energy-Efficient Building Insulation",
        description: "Recycled glass is spun into thermal glass-wool batting used inside HVAC ducts and building walls.",
        icon: "Shield",
      },
      {
        title: "Glasphalt Road Aggregate",
        subtitle: "Reflective Road Pavement",
        description: "Finely ground cullet replaces natural gravel in asphalt mixes, producing highly reflective, skid-resistant road surfaces.",
        icon: "Navigation",
      },
      {
        title: "Terrazzo Flooring & Countertops",
        subtitle: "Architectural Decor Tiles",
        description: "Polished colored glass chips are cast into concrete and epoxy resins to create luxury designer floors and countertops.",
        icon: "Sparkles",
      },
      {
        title: "Water Filtration Media",
        subtitle: "Pool & Industrial Filters",
        description: "Sterilized crushed glass replaces silica sand in municipal water filtration beds, filtering particles down to 5 microns.",
        icon: "Droplets",
      },
    ],
    recyclingProcess: [
      {
        step: 1,
        title: "Collection, Bottle Washing & Sterilization",
        stageName: "Intact Refilling",
        description: "Whole bottles pass through commercial bottle washers with high-temperature caustic baths for reuse up to 15 times.",
        detail: "Broken or chipped bottles are routed to the crushing stream.",
      },
      {
        step: 2,
        title: "High-Speed Optical Color Sorting",
        stageName: "Color Segregation",
        description: "Optical color sensors scan crushed glass and use compressed air jets to separate clear, amber, and green fragments in milliseconds.",
        detail: "A single stray green piece can ruin an entire batch of clear flint glass.",
      },
      {
        step: 3,
        title: "Cullet Crushing & Decontamination",
        stageName: "Cullet Preparation",
        description: "Magnets extract bottle caps, while vacuum cyclones pull out labels and corks, leaving clean crushed glass known as 'Cullet'.",
        detail: "Cullet melts at a significantly lower temperature than raw silica sand.",
      },
      {
        step: 4,
        title: "Smelting with Silica Sand & Soda Ash",
        stageName: "Smelting",
        description: "Cullet is fed into the furnace with fresh sand and melted at 1,400°C. Every 10% cullet added cuts energy demand by 3%.",
        detail: "Lower melting heat drastically curtails furnace carbon emissions.",
      },
      {
        step: 5,
        title: "Blow Molding into Brand New Glassware",
        stageName: "Forming",
        description: "Glowing molten glass gobs are fed into individual molds, blown with compressed air, and slowly cooled in an annealing lehr.",
        detail: "Glass can be melted down and remanufactured endlessly with zero loss in clarity.",
      },
    ],
    ecoBenefits: [
      { stat: "1,000,000 Years", label: "Required for glass to decompose in landfills if not recycled" },
      { stat: "1.2 Tonnes", label: "Of virgin raw materials (silica sand, soda ash, limestone) saved per tonne of cullet" },
      { stat: "30% Less Energy", label: "Consumed when melting recycled cullet versus raw sand minerals" },
      { stat: "100% Infinite", label: "Glass never degrades in quality, no matter how many times it is recycled" },
    ],
  },
};

export const CATEGORY_LIST = Object.values(RECYCLE_CATEGORIES);
