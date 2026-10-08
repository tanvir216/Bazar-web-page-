import { num } from "./bn";

export type Market = { name: string; price: number };
export type Product = {
  id: string;
  slug: string;
  name: string;
  emoji: string;
  unit: string;
  price: number;
  change: number;
  category: string;
  categoryLabel: string;
  tags: string[];
  description: string;
  markets: Market[];
  min: number;
  max: number;
  avg: number;
};
export type Category = { slug: string; name: string; icon: string };

/* eslint-disable @typescript-eslint/no-explicit-any */
const get = (o: any, keys: string[]) => {
  for (const k of keys) {
    if (o && o[k] !== undefined && o[k] !== null && o[k] !== "") return o[k];
  }
  return undefined;
};

export function toArray(j: any, extra: string[] = []): any[] {
  if (Array.isArray(j)) return j;
  if (!j || typeof j !== "object") return [];
  for (const k of [...extra, "data", "products", "items", "categories", "results"]) {
    if (Array.isArray(j[k])) return j[k];
    if (j[k] && typeof j[k] === "object") {
      const inner = toArray(j[k], extra);
      if (inner.length) return inner;
    }
  }
  const any = Object.values(j).find((v) => Array.isArray(v));
  return (any as any[]) ?? [];
}

function changeOf(raw: any, price: number): number {
  const v = get(raw, [
    "changePercent", "change_percent", "percentChange", "percent_change",
    "changePct", "pct", "percent", "change", "priceChange",
  ]);
  if (v === undefined) {
    const prev = num(get(raw, ["previousPrice", "prevPrice", "yesterdayPrice", "previous_price", "yesterday_price"]));
    if (prev > 0 && price > 0) return Math.round(((price - prev) / prev) * 1000) / 10;
    return 0;
  }
  if (typeof v === "string") {
    const n = Math.abs(num(v));
    if (isNaN(n)) return 0;
    return /▼|-|−|কমেছে|down|fall/i.test(v) ? -n : n;
  }
  const n = num(v);
  return isNaN(n) ? 0 : n;
}

function extractMarkets(raw: any): Market[] {
  const keys = ["markets", "bazars", "bazaars", "marketPrices", "market_prices", "prices", "bazar_prices", "bazarPrices", "locations"];
  for (const k of keys) {
    const v = raw?.[k];
    if (Array.isArray(v) && v.length && typeof v[0] === "object") {
      const out = v
        .map((m: any) => ({
          name: String(get(m, ["market", "bazar", "bazaar", "name", "area", "location", "place", "title"]) ?? ""),
          price: num(get(m, ["price", "todayPrice", "value", "amount", "avg"])),
        }))
        .filter((m: Market) => m.name && !isNaN(m.price));
      if (out.length) return out;
    }
    if (v && typeof v === "object" && !Array.isArray(v)) {
      const out = Object.entries(v)
        .map(([name, p]) => ({ name, price: num(typeof p === "object" ? get(p, ["price", "value"]) : p) }))
        .filter((m) => !isNaN(m.price));
      if (out.length) return out;
    }
  }
  return [];
}

export function normalizeProduct(raw: any, i = 0): Product {
  const price = num(get(raw, ["price", "currentPrice", "todayPrice", "current_price", "today_price", "avgPrice", "avg_price"]));
  const markets = extractMarkets(raw);
  const mPrices = markets.map((m) => m.price);

  const catRaw = get(raw, ["category", "categorySlug", "category_slug"]);
  const category = typeof catRaw === "object" && catRaw ? String(catRaw.slug ?? catRaw.id ?? "") : String(catRaw ?? "");
  const categoryLabel =
    typeof catRaw === "object" && catRaw ? String(catRaw.name ?? catRaw.title ?? category) : String(get(raw, ["categoryName", "category_name", "categoryBn"]) ?? category);

  let unit = String(get(raw, ["unit", "unitLabel", "unit_label", "per"]) ?? "");
  if (unit && !/^প্রতি/.test(unit)) unit = `প্রতি ${unit}`;

  const p = isNaN(price) ? (mPrices.length ? mPrices.reduce((a, b) => a + b, 0) / mPrices.length : 0) : price;
  const tagsRaw = get(raw, ["tags", "categories"]);
  const tags: string[] = Array.isArray(tagsRaw)
    ? tagsRaw.map((t: any) => (typeof t === "string" ? t : String(t?.name ?? t?.slug ?? "")))
    : categoryLabel ? [categoryLabel] : [];

  const min = num(get(raw, ["minPrice", "min_price", "min", "lowest"]));
  const max = num(get(raw, ["maxPrice", "max_price", "max", "highest"]));
  const avg = num(get(raw, ["avgPrice", "avg_price", "averagePrice", "average_price", "avg", "average"]));

  const id = String(get(raw, ["id", "_id"]) ?? i + 1);
  return {
    id,
    slug: String(get(raw, ["slug"]) ?? id),
    name: String(get(raw, ["name", "nameBn", "name_bn", "title", "bnName"]) ?? "পণ্য"),
    emoji: String(get(raw, ["emoji", "icon", "image"]) ?? "🛒"),
    unit,
    price: p,
    change: changeOf(raw, p),
    category,
    categoryLabel,
    tags: tags.filter(Boolean),
    description: String(get(raw, ["description", "summary", "subtitle", "desc"]) ?? ""),
    markets,
    min: !isNaN(min) ? min : mPrices.length ? Math.min(...mPrices) : p,
    max: !isNaN(max) ? max : mPrices.length ? Math.max(...mPrices) : p,
    avg: !isNaN(avg) ? avg : mPrices.length ? mPrices.reduce((a, b) => a + b, 0) / mPrices.length : p,
  };
}

export const normalizeProducts = (j: any): Product[] => toArray(j).map(normalizeProduct);

export function normalizeCategories(j: any): Category[] {
  return toArray(j, ["categories"]).map((c: any) => {
    if (typeof c === "string") return { slug: c, name: c, icon: "" };
    return {
      slug: String(get(c, ["slug", "id", "key"]) ?? ""),
      name: String(get(c, ["name", "nameBn", "name_bn", "title", "label"]) ?? get(c, ["slug"]) ?? ""),
      icon: String(get(c, ["emoji", "icon"]) ?? ""),
    };
  }).filter((c) => c.slug);
}
