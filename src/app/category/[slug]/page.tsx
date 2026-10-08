"use client";
import { use, useMemo, useState } from "react";
import ProductCard from "@/components/ProductCard";
import { GridSkeleton } from "@/components/Skeletons";
import EmptyState from "@/components/EmptyState";
import ErrorState from "@/components/ErrorState";
import SortSelect, { SortKey } from "@/components/SortSelect";
import { useCategories, useProducts } from "@/lib/hooks";

export default function CategoryPage({ params }: { params: Promise<{ slug: string }> }) {
  const slug = decodeURIComponent(use(params).slug);
  const { data, loading, error, retry } = useProducts(slug);
  const { data: cats } = useCategories();
  const [sort, setSort] = useState<SortKey>("default");

  const cat = cats?.find((c) => c.slug === slug);
  const items = useMemo(() => {
    // Keep only products that really belong to the category (API filter may be loose)
    const list = [...(data ?? [])].filter((p) => !p.category || p.category === slug);
    // Prices are parsed to numbers first, so Bengali numerals sort numerically, not as text.
    if (sort === "asc") list.sort((a, b) => a.price - b.price);
    if (sort === "desc") list.sort((a, b) => b.price - a.price);
    return list;
  }, [data, sort, slug]);

  const title = cat?.name || data?.[0]?.categoryLabel || slug;
  const icon = cat?.icon || "";

  if (!loading && !error && (!data || items.length === 0)) {
    return (
      <EmptyState
        title="এই ক্যাটাগরিতে কোনো পণ্য নেই"
        message="ক্যাটাগরিটি ভুল হতে পারে অথবা এখানে এখনো পণ্য যোগ হয়নি।"
      />
    );
  }

  return (
    <div className="mx-auto max-w-6xl px-4 py-10">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <h1 className="flex items-center gap-3 text-3xl font-bold">
          {icon && <span aria-hidden>{icon}</span>}
          {loading && !cat ? <span className="skeleton h-9 w-40" /> : title}
        </h1>
        <SortSelect value={sort} onChange={setSort} />
      </div>
      <div className="mt-6">
        {loading ? (
          <GridSkeleton count={8} />
        ) : error ? (
          <ErrorState retry={retry} />
        ) : (
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {items.map((p) => (
              <ProductCard key={p.id} p={p} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
