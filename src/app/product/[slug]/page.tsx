"use client";
import { use } from "react";
import Link from "next/link";
import ChangeBadge from "@/components/ChangeBadge";
import EmptyState from "@/components/EmptyState";
import ErrorState from "@/components/ErrorState";
import { useProducts } from "@/lib/hooks";
import { formatPrice, toBn } from "@/lib/bn";

function Stat({
  label,
  value,
  tone,
}: {
  label: string;
  value: string;
  tone?: string;
}) {
  return (
    <div className="rounded-xl border border-line bg-white p-4">
      <p className="text-sm text-ink/60">{label}</p>
      <p className={`mt-1 text-xl font-bold sm:text-2xl ${tone ?? ""}`}>
        {value}
      </p>
    </div>
  );
}

export default function ProductPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const slug = decodeURIComponent(use(params).slug);
  const { data, loading, error, retry } = useProducts();

  if (loading) {
    return (
      <div
        className="mx-auto max-w-6xl space-y-4 px-4 py-10"
        role="status"
        aria-label="লোড হচ্ছে…"
      >
        <div className="skeleton h-40 w-full rounded-xl" />
        <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
          {[0, 1, 2, 3].map((i) => (
            <div key={i} className="skeleton h-24 rounded-xl" />
          ))}
        </div>
        <div className="skeleton h-64 w-full rounded-xl" />
      </div>
    );
  }
  if (error)
    return (
      <div className="px-4 py-16">
        <ErrorState retry={retry} />
      </div>
    );

  const p = data?.find((x) => x.slug === slug || x.id === slug);
  if (!p)
    return (
      <EmptyState
        title="পণ্যটি খুঁজে পাওয়া যায়নি"
        message="এই নামে কোনো পণ্য নেই।"
      />
    );

  const maxMarket = Math.max(...p.markets.map((m) => m.price), 1);
  const cheapest = p.markets.length
    ? Math.min(...p.markets.map((m) => m.price))
    : null;

  return (
    <div className="mx-auto max-w-6xl px-4 py-10">
      <Link
        href={p.category ? `/category/${encodeURIComponent(p.category)}` : "/"}
        className="text-sm text-leaf hover:underline"
      >
        ← {p.categoryLabel || "সব পণ্য"}
      </Link>

      <section className="mt-4 rounded-xl border border-line bg-white p-5 sm:p-6">
        <div className="flex flex-wrap items-start gap-4">
          <span
            className="flex h-20 w-20 items-center justify-center rounded-xl bg-paper text-5xl"
            aria-hidden
          >
            {p.emoji}
          </span>
          <div className="min-w-0 flex-1">
            <h1 className="text-3xl font-bold">{p.name}</h1>
            {p.description && (
              <p className="mt-1 text-ink/70">{p.description}</p>
            )}
            <div className="mt-3 flex flex-wrap items-center gap-2">
              {p.tags.map((t) => (
                <span key={t} className="badge badge-outline">
                  {t}
                </span>
              ))}
              {p.unit && <span className="badge badge-neutral">{p.unit}</span>}
            </div>
          </div>
          <div className="text-right">
            <p className="text-sm text-ink/60">আজকের দাম</p>
            <p className="text-3xl font-bold">{formatPrice(p.price)}</p>
            <div className="mt-1">
              <ChangeBadge change={p.change} />
            </div>
          </div>
        </div>
      </section>

      <section className="mt-6 grid grid-cols-2 gap-4 md:grid-cols-4">
        <Stat label="সর্বনিম্ন দাম" value={formatPrice(p.min)} tone="text-up" />
        <Stat
          label="সর্বোচ্চ দাম"
          value={formatPrice(p.max)}
          tone="text-down"
        />
        <Stat label="গড় দাম" value={formatPrice(p.avg)} />
        <Stat label="আজকের দাম" value={formatPrice(p.price)} />
      </section>

      <section className="mt-8">
        <h2 className="text-xl font-bold">বাজারভিত্তিক আজকের দাম</h2>
        {p.markets.length === 0 ? (
          <p className="mt-3 text-ink/60">
            এই পণ্যের বাজারভিত্তিক দামের তথ্য এখনো নেই।
          </p>
        ) : (
          <ul className="mt-4 divide-y divide-line rounded-xl border border-line bg-white">
            {p.markets.map((m) => (
              <li
                key={m.name}
                className="flex flex-wrap items-center gap-x-4 gap-y-2 p-4"
              >
                <span className="w-full font-medium sm:w-56">
                  {m.name}
                  {m.division && (
                    <span className="ml-2 text-xs font-normal text-ink/55">
                      {m.division}
                    </span>
                  )}
                  {m.price === cheapest && (
                    <span className="badge badge-success badge-sm ml-2 text-white">
                      সবচেয়ে কম
                    </span>
                  )}
                </span>
                <span
                  className="h-2 min-w-24 flex-1 rounded-full bg-paper"
                  aria-hidden
                >
                  <span
                    className="block h-2 rounded-full bg-leaf"
                    style={{ width: `${(m.price / maxMarket) * 100}%` }}
                  />
                </span>
                <span className="w-44 text-right font-bold">
                  {m.min !== undefined && m.max !== undefined
                    ? `${toBn(m.min)} – ${toBn(m.max)} টাকা`
                    : formatPrice(m.price)}
                </span>
              </li>
            ))}
          </ul>
        )}
      </section>
    </div>
  );
}
