"use client";
import Hero from "@/components/Hero";
import ProductCard from "@/components/ProductCard";
import { GridSkeleton } from "@/components/Skeletons";
import ErrorState from "@/components/ErrorState";
import { useProducts } from "@/lib/hooks";
import type { Product } from "@/lib/normalize";

const gridCls = "grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4";

function Section({ id, title, subtitle, items }: { id?: string; title: string; subtitle?: string; items: Product[] }) {
  if (!items.length) return null;
  return (
    <section id={id} className="scroll-mt-40 pt-10">
      <h2 className="text-2xl font-bold">{title}</h2>
      {subtitle && <p className="mt-1 text-ink/65">{subtitle}</p>}
      <div className={`${gridCls} mt-5`}>
        {items.map((p) => (
          <ProductCard key={p.id} p={p} />
        ))}
      </div>
    </section>
  );
}

export default function Home() {
  const { data, loading, error, retry } = useProducts();
  const risers = (data ?? []).filter((p) => p.change > 0).sort((a, b) => b.change - a.change).slice(0, 6);
  const fallers = (data ?? []).filter((p) => p.change < 0).sort((a, b) => a.change - b.change).slice(0, 6);

  return (
    <>
      <Hero />
      <div className="mx-auto max-w-6xl px-4">
        {loading && (
          <div className="pt-10">
            <GridSkeleton count={8} />
          </div>
        )}
        {error && !loading && (
          <div className="pt-10">
            <ErrorState retry={retry} />
          </div>
        )}
        {data && (
          <>
            <Section title="আজ দাম বেড়েছে ▲" subtitle="গত দিনের তুলনায় সবচেয়ে বেশি বেড়েছে যেসব পণ্যের দাম" items={risers} />
            <Section title="আজ দাম কমেছে ▼" subtitle="গত দিনের তুলনায় সবচেয়ে বেশি কমেছে যেসব পণ্যের দাম" items={fallers} />
            <Section id="সব-পণ্য" title="সব পণ্য" subtitle="সব ক্যাটাগরির পণ্যের আজকের দাম" items={data} />
          </>
        )}
      </div>
    </>
  );
}
