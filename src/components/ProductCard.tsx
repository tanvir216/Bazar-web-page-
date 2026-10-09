import Link from "next/link";
import type { Product } from "@/lib/normalize";
import { formatPrice } from "@/lib/bn";
import ChangeBadge from "./ChangeBadge";

export default function ProductCard({ p }: { p: Product }) {
  return (
    <Link
      href={`/product/${encodeURIComponent(p.slug)}`}
      className="block rounded-2xl border border-line bg-surface p-4 transition-colors hover:border-leaf"
    >
      <div className="flex items-center gap-3">
        <span
          className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-paper text-2xl"
          aria-hidden
        >
          {p.emoji}
        </span>
        <div className="min-w-0">
          <h3 className="truncate text-base font-semibold leading-6">
            {p.name}
          </h3>
          <p className="text-xs text-ink/60">{p.unit}</p>
        </div>
      </div>
      <div className="mt-3 flex items-center justify-between gap-2">
        <div>
          <p className="text-xs text-ink/70">আজকের দাম</p>
          <p className="text-xl font-bold leading-7">{formatPrice(p.price)}</p>
        </div>
        <ChangeBadge change={p.change} />
      </div>
    </Link>
  );
}
