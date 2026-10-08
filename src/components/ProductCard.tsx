import Link from "next/link";
import type { Product } from "@/lib/normalize";
import { formatPrice } from "@/lib/bn";
import ChangeBadge from "./ChangeBadge";

export default function ProductCard({ p }: { p: Product }) {
  return (
    <Link
      href={`/product/${encodeURIComponent(p.slug)}`}
      className="group block rounded-xl border border-line bg-white p-4 transition hover:border-leaf hover:shadow-md"
    >
      <div className="flex items-start gap-3">
        <span
          className="flex h-14 w-14 shrink-0 items-center justify-center rounded-lg bg-paper text-3xl"
          aria-hidden
        >
          {p.emoji}
        </span>
        <div className="min-w-0">
          <h3 className="truncate text-lg font-semibold group-hover:text-leaf">
            {p.name}
          </h3>
          <p className="text-sm text-ink/60">{p.unit}</p>
        </div>
      </div>
      <div className="mt-4 flex items-end justify-between gap-2 border-t border-dashed border-line pt-3">
        <div>
          <p className="text-xs text-ink/55">আজকের দাম</p>
          <p className="text-xl font-bold">{formatPrice(p.price)}</p>
        </div>
        <ChangeBadge change={p.change} />
      </div>
    </Link>
  );
}
