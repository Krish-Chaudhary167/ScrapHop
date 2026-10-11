# ♻️ ScrapHop — On-Demand Doorstep Recyclable Scrap Marketplace

> **Environmental Hacks 2026 — Waste & Energy Track**  
> *Transforming urban domestic waste management through AI computer vision and decentralized circular routing on AWS.*

[![Live Demo](https://img.shields.io/badge/Live_Demo-AWS_Amplify-FF9900?style=for-the-badge&logo=amazon-aws)](https://main.do5dhcqqvd8wf.amplifyapp.com)  
**🚀 Live Deployed URL:** **[https://main.do5dhcqqvd8wf.amplifyapp.com](https://main.do5dhcqqvd8wf.amplifyapp.com)**

---

## 🌍 The Problem
- **170,000 Tonnes / Day:** India's urban centers generate unprecedented volumes of municipal solid waste every 24 hours.
- **3,000+ Open Legacy Dumpsites:** Megacities struggle with towering landfills (e.g., Ghazipur, Deonar, Bhalswa) that emit hazardous methane and leach toxic chemicals into groundwater.
- **Informal Recyclers (Kabadiwalas):** Over 80% of India's dry recyclables are collected by the informal recycling sector, yet they lack digital routing, transparent price benchmarks, and fair market access.

---

## 💡 The Solution: ScrapHop
**ScrapHop** bridges households with local verified recyclers through an on-demand, Rapido-style platform:
1. **Snap & Detect:** Users photograph their scrap pile (cardboard, plastics, metals, paper, electronics).
2. **AWS Rekognition AI:** Classifies recyclable materials in real-time with zero server latency.
3. **Mandi Pricing Engine:** Generates transparent, fair per-kg valuations based on Indian recycling market benchmarks.
4. **Hyperlocal Radar Dispatch:** Alerts nearby collectors in real-time, enabling doorstep pickup within 15–30 minutes.
5. **Privacy Shield:** Household addresses and phone numbers remain masked until a collector accepts the pickup.

---

## 🏗️ Architecture Built on AWS

```
               ┌────────────────────────────────────────────────────────┐
               │                    Next.js Frontend                    │
               │        (Household Sell Portal / Collector Radar)       │
               └──────────────────────────┬─────────────────────────────┘
                                          │
                  ┌───────────────────────┼───────────────────────┐
                  ▼                       ▼                       ▼
       ┌──────────────────────┐┌──────────────────────┐┌──────────────────────┐
       │   AWS Rekognition    ││        AWS S3        ││     AWS DynamoDB     │
       │   Computer Vision    ││    Bucket Storage    ││   NoSQL Database     │
       │                      ││                      ││                      │
       │ • Classifies plastic ││ • Secure scrap photo ││ • ScrapHop-Orders    │
       │ • Cardboard, metals  ││   uploads            ││ • ScrapHop-Users     │
       │ • Paper & appliances ││ • Presigned delivery ││ • Real-time status   │
       └──────────────────────┘└──────────────────────┘└──────────────────────┘
```

### AWS Cloud Services Utilized:
- **AWS Rekognition:** Serverless Computer Vision deep learning for automated scrap classification.
- **Amazon S3 (`scraphop-upload-krzz`):** High-durability object storage for scrap verification photos.
- **Amazon DynamoDB (`ScrapHop-Orders`, `ScrapHop-Users`):** Sub-10ms latency NoSQL datastore managing live pickup requests, status lifecycles, and user profiles.
- **AWS Amplify Hosting:** Global edge deployment for high availability.

---

## 🛠️ Tech Stack

- **Framework:** Next.js 16 (App Router, Turbopack, React 19)
- **Styling:** Tailwind CSS with Dark/Light theme support
- **Cloud & AI:** AWS SDK v3 (`@aws-sdk/client-rekognition`, `@aws-sdk/client-s3`, `@aws-sdk/client-dynamodb`)
- **Icons & Motion:** Lucide React, Framer Motion
- **Languages:** English, Hindi, Punjabi, Gujarati, Telugu, Tamil

---

## 🚀 Getting Started Locally

### Prerequisites
- Node.js 18+ or 20+
- AWS Account with S3, DynamoDB, and Rekognition IAM credentials

### Installation
```bash
# Clone the repository
git clone https://github.com/Krish-Chaudhary167/ScrapHop.git
cd ScrapHop

# Install dependencies
npm install

# Configure environment variables (.env.local)
AWS_REGION=ap-south-1
AWS_ACCESS_KEY_ID=your_access_key
AWS_SECRET_ACCESS_KEY=your_secret_key
S3_BUCKET_NAME=your_s3_bucket
DYNAMODB_TABLE_NAME=ScrapHop-Orders
DYNAMODB_USERS_TABLE_NAME=ScrapHop-Users

# Run the development server
npm run dev
```

Visit `http://localhost:3000` to run the app locally.

---

## 👥 Team
- **Krish Chaudhary** — Cloud Architecture, AWS Integration & Backend
- **Tejveer Singh** — Frontend UX & Computer Vision Research

---

## 📜 License
MIT License. Built for the **Environmental Hacks 2026** Hackathon.
