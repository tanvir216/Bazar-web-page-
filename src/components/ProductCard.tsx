import Link from "next/link";
import type { Product } from "@/lib/normalize";
import { toBn } from "@/lib/bn";
import ChangeBadge from "./ChangeBadge";

export default function ProductCard({ p }: { p: Product }) {
  // উপরের পাতলা রেখা দেখায় দাম কোন দিকে গেছে
  const bar = p.change > 0 ? "bg-rise" : p.change < 0 ? "bg-fall" : "bg-line";
  return (
    <Link
      href={`/product/${encodeURIComponent(p.slug)}`}
      className="group relative block overflow-hidden rounded-xl border border-line bg-white p-4 pt-5 transition hover:border-pata hover:shadow-[4px_4px_0_#123B28]"
    >
      <span className={`absolute inset-x-0 top-0 h-1 ${bar}`} aria-hidden />
      <div className="flex items-center gap-3">
        <span
          className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-paper text-2xl"
          aria-hidden
        >
          {p.emoji}
        </span>
        <div className="min-w-0">
          <h3 className="truncate text-lg font-semibold leading-tight text-pata">
            {p.name}
          </h3>
          <p className="text-sm text-ink/60">{p.unit}</p>
        </div>
      </div>
      <div className="mt-4 flex items-end justify-between gap-2 border-t border-dashed border-line pt-3">
        <p className="font-display text-3xl font-bold leading-none text-pata">
          {toBn(p.price)}
          <span className="ml-1 font-sans text-sm font-medium text-ink/60">
            টাকা
          </span>
        </p>
        <ChangeBadge change={p.change} />
      </div>
    </Link>
  );
}
