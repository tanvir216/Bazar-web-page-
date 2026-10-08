"use client";
import Link from "next/link";
import Hero from "@/components/Hero";
import ChangeBadge from "@/components/ChangeBadge";
import ProductCard from "@/components/ProductCard";
import { GridSkeleton } from "@/components/Skeletons";
import ErrorState from "@/components/ErrorState";
import { useProducts } from "@/lib/hooks";
import { toBn } from "@/lib/bn";
import type { Product } from "@/lib/normalize";

function Movers({
  title,
  subtitle,
  items,
  tone,
}: {
  title: string;
  subtitle: string;
  items: Product[];
  tone: "rise" | "fall";
}) {
  if (!items.length) return null;
  const bar = tone === "rise" ? "bg-rise" : "bg-fall";
  return (
    <section>
      <div className="flex items-stretch gap-3">
        <span className={`w-1.5 rounded-full ${bar}`} aria-hidden />
        <div>
          <h2 className="font-display text-2xl font-bold text-pata">{title}</h2>
          <p className="text-sm text-ink/65">{subtitle}</p>
        </div>
      </div>
      <ul className="mt-4 divide-y divide-dashed divide-line overflow-hidden rounded-xl border border-line bg-white">
        {items.map((p) => (
          <li key={p.id}>
            <Link
              href={`/product/${encodeURIComponent(p.slug)}`}
              className="flex items-center gap-3 px-4 py-3 transition hover:bg-paper"
            >
              <span
                className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-paper text-xl"
                aria-hidden
              >
                {p.emoji}
              </span>
              <span className="min-w-0 flex-1">
                <span className="block truncate font-semibold text-pata">
                  {p.name}
                </span>
                <span className="block text-xs text-ink/55">{p.unit}</span>
              </span>
              <span className="font-display text-xl font-bold text-pata">
                {toBn(p.price)}
                <span className="ml-0.5 font-sans text-xs font-medium text-ink/55">
                  টাকা
                </span>
              </span>
              <ChangeBadge change={p.change} />
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}

export default function Home() {
  const { data, loading, error, retry } = useProducts();
  const risers = (data ?? [])
    .filter((p) => p.change > 0)
    .sort((a, b) => b.change - a.change)
    .slice(0, 6);
  const fallers = (data ?? [])
    .filter((p) => p.change < 0)
    .sort((a, b) => a.change - b.change)
    .slice(0, 6);

  return (
    <>
      <Hero />
      <div className="mx-auto max-w-6xl px-4">
        {loading && (
          <div className="pt-12">
            <GridSkeleton count={8} />
          </div>
        )}
        {error && !loading && (
          <div className="pt-12">
            <ErrorState retry={retry} />
          </div>
        )}
        {data && (
          <>
            <div className="grid gap-8 pt-12 md:grid-cols-2">
              <Movers
                tone="rise"
                title="আজ দাম বেড়েছে ▲"
                subtitle="গতকালের চেয়ে সবচেয়ে বেশি বেড়েছে যেগুলোর"
                items={risers}
              />
              <Movers
                tone="fall"
                title="আজ দাম কমেছে ▼"
                subtitle="গতকালের চেয়ে সবচেয়ে বেশি কমেছে যেগুলোর"
                items={fallers}
              />
            </div>

            <section id="সব-পণ্য" className="scroll-mt-40 pt-14">
              <div className="flex items-baseline justify-between gap-3 border-b-2 border-pata pb-2">
                <h2 className="font-display text-3xl font-bold text-pata">
                  সব পণ্য
                </h2>
                <p className="text-sm text-ink/65">
                  সব ক্যাটাগরির পণ্যের আজকের দাম
                </p>
              </div>
              <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                {data.map((p) => (
                  <ProductCard key={p.id} p={p} />
                ))}
              </div>
            </section>
          </>
        )}
      </div>
    </>
  );
}
