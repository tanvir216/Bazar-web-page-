"use client";
import Hero from "@/components/Hero";
import ProductCard from "@/components/ProductCard";
import { GridSkeleton } from "@/components/Skeletons";
import ErrorState from "@/components/ErrorState";
import { useProducts } from "@/lib/hooks";
import { toBn } from "@/lib/bn";
import type { Product } from "@/lib/normalize";

const gridCls = "grid gap-4 sm:grid-cols-2 lg:grid-cols-3";

function Movers({
  arrow,
  tone,
  title,
  items,
}: {
  arrow: string;
  tone: string;
  title: string;
  items: Product[];
}) {
  if (!items.length) return null;
  return (
    <section className="space-y-3">
      <h2 className="flex items-center gap-2 text-xl font-bold">
        <span className={`text-base ${tone}`} aria-hidden>
          {arrow}
        </span>
        {title}
      </h2>
      <div className={gridCls}>
        {items.map((p) => (
          <ProductCard key={p.id} p={p} />
        ))}
      </div>
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
    <div className="mx-auto max-w-6xl space-y-10 px-4 py-6">
      <Hero />
      {loading && <GridSkeleton count={6} />}
      {error && !loading && <ErrorState retry={retry} />}
      {data && (
        <>
          <Movers
            arrow="▲"
            tone="text-rise"
            title="আজ দাম বেড়েছে"
            items={risers}
          />
          <Movers
            arrow="▼"
            tone="text-fall"
            title="আজ দাম কমেছে"
            items={fallers}
          />
          <section id="সব-পণ্য" className="scroll-mt-6 space-y-3">
            <h2 className="text-xl font-bold">সব পণ্য</h2>
            <p className="text-sm text-ink/70">
              মোট {toBn(data.length)}টি পণ্য দেখানো হচ্ছে
            </p>
            <div className={gridCls}>
              {data.map((p) => (
                <ProductCard key={p.id} p={p} />
              ))}
            </div>
          </section>
        </>
      )}
    </div>
  );
}
