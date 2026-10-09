"use client";
import { use, useMemo, useState } from "react";
import ProductCard from "@/components/ProductCard";
import { GridSkeleton } from "@/components/Skeletons";
import EmptyState from "@/components/EmptyState";
import ErrorState from "@/components/ErrorState";
import SortSelect, { SortKey } from "@/components/SortSelect";
import { useCategories, useProducts } from "@/lib/hooks";
import { toBn } from "@/lib/bn";

export default function CategoryPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const slug = decodeURIComponent(use(params).slug);
  const { data, loading, error, retry } = useProducts(slug);
  const { data: cats } = useCategories();
  const [sort, setSort] = useState<SortKey>("default");

  const cat = cats?.find((c) => c.slug === slug);
  const items = useMemo(() => {
    const list = [...(data ?? [])].filter(
      (p) => !p.category || p.category === slug,
    );
    // Prices are numbers (Bengali digits already converted), so this sorts by value, not by text.
    if (sort === "asc") list.sort((a, b) => a.price - b.price);
    if (sort === "desc") list.sort((a, b) => b.price - a.price);
    return list;
  }, [data, sort, slug]);

  const title = cat?.name || data?.[0]?.categoryLabel || slug;
  const icon = cat?.icon || data?.[0]?.emoji || "";

  if (!loading && !error && (!data || items.length === 0)) {
    return (
      <EmptyState
        title="এই ক্যাটাগরিতে কোনো পণ্য নেই"
        message="ক্যাটাগরিটি ভুল হতে পারে অথবা এখানে এখনো পণ্য যোগ হয়নি।"
      />
    );
  }

  return (
    <div className="mx-auto max-w-6xl space-y-6 px-4 py-6">
      <div className="rounded-2xl border border-line bg-surface p-5">
        <div className="flex items-center gap-3">
          {icon && (
            <span className="text-4xl" aria-hidden>
              {icon}
            </span>
          )}
          <div>
            <h1 className="text-2xl font-bold leading-8">
              {loading && !cat ? (
                <span className="skeleton inline-block h-7 w-32" />
              ) : (
                title
              )}
            </h1>
            <p className="text-sm text-ink/70">
              {loading
                ? "লোড হচ্ছে…"
                : `${toBn(items.length)}টি পণ্যের আজকের দাম ও পরিবর্তন`}
            </p>
          </div>
        </div>
      </div>

      <div className="space-y-4">
        <div className="flex justify-end rounded-2xl border border-line bg-surface p-4">
          <SortSelect value={sort} onChange={setSort} />
        </div>
        {!loading && !error && (
          <p className="text-sm text-ink/70">
            মোট {toBn(items.length)}টি পণ্য দেখানো হচ্ছে
          </p>
        )}
        {loading ? (
          <GridSkeleton count={6} />
        ) : error ? (
          <ErrorState retry={retry} />
        ) : (
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {items.map((p) => (
              <ProductCard key={p.id} p={p} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
