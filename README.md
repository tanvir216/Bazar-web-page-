<div align="center">

<img src="public/logo-icon.png" width="56" alt="BazarDor logo" />

# 🛒 বাজার দর (BazarDor)

**প্রয়োজনীয় পণ্যের দাম এক নজরে।**
A Bangla market-price tracker for everyday essentials — rice, lentils, oil, vegetables, fish and meat.

</div>

## Description

BazarDor shows today's prices of daily necessities with Bengali numerals, a live scrolling price ticker, and clear ▲/▼ change badges. Browse by category, sort by price, and sign in to open a product's market-by-market price breakdown.

## Technologies used

- **Next.js 15** (App Router) + **TypeScript**
- **Tailwind CSS** + **DaisyUI**
- **Better Auth** (email/password, Google, GitHub) with **MongoDB** adapter
- **react-hot-toast** for notifications
- **lucide-react** icons
- Deployed on **Vercel**

## Key features

1. **Live price ticker** – an infinitely scrolling strip with emoji, name, price and ▲/▼ percentage.
2. **Risers & fallers** – top 6 price increases and decreases on the home page, plus the full product grid.
3. **Category pages with sorting** – skeleton loading, empty/404 state, and a sort control that compares real numeric values (Bengali numerals handled).
4. **Protected product details** – min / max / average price and a bazar-by-bazar price breakdown, available after login.
5. **Full authentication** – sign in / sign up, Google & GitHub login, profile page and name update, with toast feedback everywhere.
6. Fully responsive from mobile to desktop; friendly 404 page for unknown routes.

## Getting started

```bash
npm install
cp .env.example .env.local   # fill in the values
npm run dev
```

Open http://localhost:3000.

### Environment variables

| Name | Purpose |
| --- | --- |
| `MONGODB_URI` | MongoDB connection string (Atlas) |
| `BETTER_AUTH_SECRET` | Random secret (`openssl rand -base64 32`) |
| `BETTER_AUTH_URL` / `NEXT_PUBLIC_APP_URL` | Site URL |
| `GOOGLE_CLIENT_ID` / `GOOGLE_CLIENT_SECRET` | Google OAuth |
| `GITHUB_CLIENT_ID` / `GITHUB_CLIENT_SECRET` | GitHub OAuth |

OAuth callback URLs: `<SITE_URL>/api/auth/callback/google` and `<SITE_URL>/api/auth/callback/github`.

### Deploy on Vercel

Add the environment variables above in the Vercel project settings (set `BETTER_AUTH_URL` to your Vercel URL) and deploy. Dynamic routes (`/category/[slug]`, `/product/[slug]`) are server-rendered, so reloading any page works.

## Data

Prices come from the BazarDor API (`/products`, `/categories`) with an automatic fallback to the alternative base URL.
