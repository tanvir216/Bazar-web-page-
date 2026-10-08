"use client";
import { useProducts } from "@/lib/hooks";
import { formatPct, formatPrice } from "@/lib/bn";

export default function Ticker() {
  const { data } = useProducts();
  if (!data?.length) {
    return <div className="h-9 border-t border-line bg-ink" aria-hidden />;
  }
  const items = data.slice(0, 30);
  const row = (suffix: string) =>
    items.map((p) => {
      const c = Math.round(p.change * 10) / 10;
      const color = c > 0 ? "text-green-400" : c < 0 ? "text-red-400" : "text-gray-400";
      const arrow = c > 0 ? "▲" : c < 0 ? "▼" : "—";
      return (
        <span key={p.id + suffix} className="inline-flex items-center gap-1.5 px-5 text-sm text-white">
          <span aria-hidden>{p.emoji}</span>
          <span className="font-medium">{p.name}</span>
          <span className="text-white/80">
            {formatPrice(p.price)}
            {p.unit ? `/${p.unit.replace("প্রতি ", "")}` : ""}
          </span>
          <span className={`font-semibold ${color}`}>
            {arrow} {formatPct(c)}%
          </span>
        </span>
      );
    });
  return (
    <div className="marquee overflow-hidden border-t border-line bg-ink py-1.5" aria-label="আজকের দামের তালিকা">
      <div className="marquee-track flex whitespace-nowrap">
        {row("a")}
        {row("b")}
      </div>
    </div>
  );
}
