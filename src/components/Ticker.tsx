"use client";
import { useProducts } from "@/lib/hooks";
import { formatPct, formatPriceUnit } from "@/lib/bn";

export default function Ticker() {
  const { data } = useProducts();
  if (!data?.length) {
    return <div className="h-9 border-b border-line bg-surface" aria-hidden />;
  }
  const items = data.slice(0, 30);
  const row = (suffix: string) =>
    items.map((p) => {
      const c = Math.round(p.change * 10) / 10;
      const color = c > 0 ? "text-rise" : c < 0 ? "text-fall" : "text-ink/60";
      const arrow = c > 0 ? "▲" : c < 0 ? "▼" : "—";
      return (
        <span
          key={p.id + suffix}
          className="inline-flex h-9 items-center gap-1.5 px-4 text-sm"
        >
          <span aria-hidden>{p.emoji}</span>
          <span>{p.name}</span>
          <span className="text-ink/70">
            {formatPriceUnit(p.price, p.unitShort)}
          </span>
          <span className={`font-medium ${color}`}>
            {arrow} {formatPct(c)}%
          </span>
        </span>
      );
    });
  return (
    <div
      className="marquee overflow-hidden border-b border-line bg-surface"
      aria-label="আজকের দামের তালিকা"
    >
      <div className="marquee-track flex whitespace-nowrap">
        {row("a")}
        {row("b")}
      </div>
    </div>
  );
}
