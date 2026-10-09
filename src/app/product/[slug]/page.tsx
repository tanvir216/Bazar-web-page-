"use client";
import { use } from "react";
import Link from "next/link";
import ChangeBadge from "@/components/ChangeBadge";
import EmptyState from "@/components/EmptyState";
import ErrorState from "@/components/ErrorState";
import { useProducts } from "@/lib/hooks";
import { useApi } from "@/lib/useApi";
import { normalizeProduct, type Product } from "@/lib/normalize";
import { fmtAmt, toBn } from "@/lib/bn";

/* eslint-disable @typescript-eslint/no-explicit-any */
const unwrap = (j: any) =>
  j && typeof j === "object" && j.data && !Array.isArray(j.data) ? j.data : j;

function Stat({
  label,
  value,
  note,
  tone,
}: {
  label: string;
  value: string;
  note: string;
  tone?: string;
}) {
  return (
    <div className="rounded-2xl border border-line bg-surface px-4 py-4">
      <p className="text-xs text-ink/60">{label}</p>
      <p className={`text-2xl font-bold leading-8 ${tone ?? ""}`}>{value}</p>
      <p className="text-xs text-ink/60">{note}</p>
    </div>
  );
}

function Crumb({
  children,
  href,
}: {
  children: React.ReactNode;
  href?: string;
}) {
  return href ? (
    <Link href={href} className="hover:text-leaf hover:underline">
      {children}
    </Link>
  ) : (
    <span className="text-ink/60">{children}</span>
  );
}

export default function ProductPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const slug = decodeURIComponent(use(params).slug);
  const list = useProducts();
  const base = list.data?.find((x) => x.slug === slug || x.id === slug);
  // The list may not carry the market rows, so ask for the single product too.
  const one = useApi<Product | false>(
    base ? `/products/${base.id}` : null,
    (j) => (j ? normalizeProduct(unwrap(j)) : false),
  );

  if (list.loading || (base && one.data === null && !one.error)) {
    return (
      <div
        className="mx-auto max-w-6xl space-y-4 px-4 py-6"
        role="status"
        aria-label="লোড হচ্ছে…"
      >
        <div className="skeleton h-5 w-48" />
        <div className="skeleton h-40 w-full rounded-2xl" />
        <div className="grid gap-3 sm:grid-cols-3">
          {[0, 1, 2].map((i) => (
            <div key={i} className="skeleton h-28 rounded-2xl" />
          ))}
        </div>
        <div className="skeleton h-64 w-full rounded-2xl" />
      </div>
    );
  }
  if (list.error)
    return (
      <div className="px-4 py-16">
        <ErrorState retry={list.retry} />
      </div>
    );
  if (!base)
    return (
      <EmptyState
        title="পণ্যটি খুঁজে পাওয়া যায়নি"
        message="এই নামে কোনো পণ্য নেই।"
      />
    );

  const d = one.data || null;
  const p: Product = d
    ? {
        ...base,
        markets: d.markets.length ? d.markets : base.markets,
        yesterday: Number.isFinite(d.yesterday) ? d.yesterday : base.yesterday,
        description: d.description || base.description,
      }
    : base;

  const rows = p.markets.map((m) => {
    const lo = m.min ?? m.price;
    const hi = m.max ?? m.price;
    return { ...m, lo, hi, avg: (lo + hi) / 2 };
  });
  const lowest = rows.length
    ? rows.reduce((a, b) => (b.lo < a.lo ? b : a))
    : null;
  const highest = rows.length
    ? rows.reduce((a, b) => (b.hi > a.hi ? b : a))
    : null;
  const minV = lowest ? lowest.lo : p.min;
  const maxV = highest ? highest.hi : p.max;
  const avgV = rows.length
    ? rows.reduce((s, r) => s + r.avg, 0) / rows.length
    : p.avg;
  const cheapestAvg = rows.length ? Math.min(...rows.map((r) => r.avg)) : null;

  const diff = Number.isFinite(p.yesterday) ? p.price - p.yesterday : NaN;
  const diffText =
    !Number.isFinite(diff) || Math.abs(diff) < 0.005
      ? "গতকালের তুলনায় দাম অপরিবর্তিত"
      : `গতকালের তুলনায় আজ দাম ${diff > 0 ? "বেড়েছে" : "কমেছে"} · ${fmtAmt(Math.abs(diff))} টাকা`;
  const catHref = p.category
    ? `/category/${encodeURIComponent(p.category)}`
    : "/";

  return (
    <div className="mx-auto max-w-6xl space-y-6 px-4 py-6">
      <nav
        aria-label="breadcrumb"
        className="flex flex-wrap items-center gap-2 text-sm"
      >
        <Crumb href="/">হোম</Crumb>
        <span aria-hidden className="text-ink/40">
          ›
        </span>
        <Crumb href={catHref}>{p.categoryLabel || "পণ্য"}</Crumb>
        <span aria-hidden className="text-ink/40">
          ›
        </span>
        <Crumb>{p.name}</Crumb>
      </nav>

      <section className="flex flex-wrap items-center gap-4 rounded-2xl border border-line bg-surface p-5">
        <span
          className="flex h-20 w-20 shrink-0 items-center justify-center rounded-2xl bg-paper text-4xl"
          aria-hidden
        >
          {p.emoji}
        </span>
        <div className="min-w-0 flex-1 basis-60">
          <h1 className="text-3xl font-bold leading-9">{p.name}</h1>
          <p className="mt-1 text-sm text-ink/70">
            {p.unit}
            {p.categoryLabel && (
              <>
                {" "}
                ·{" "}
                <Link
                  href={catHref}
                  className="hover:text-leaf hover:underline"
                >
                  {p.categoryLabel}
                </Link>
              </>
            )}
          </p>
          <p className="mt-1 text-sm">{diffText}</p>
          {p.description && (
            <p className="mt-1 text-sm text-ink/70">{p.description}</p>
          )}
        </div>
        <div className="flex min-w-[7.5rem] flex-col items-center gap-0.5 rounded-2xl bg-paper px-5 py-4 text-center">
          <p className="text-sm text-ink/70">আজকের দাম</p>
          <p className="text-3xl font-bold leading-9">{fmtAmt(p.price)}</p>
          <p className="text-sm text-ink/70">
            টাকা{p.unitShort ? ` / ${p.unitShort}` : ""}
          </p>
          <div className="mt-1">
            <ChangeBadge change={p.change} />
          </div>
        </div>
      </section>

      <section className="space-y-6 rounded-2xl border border-line bg-surface p-5">
        <div className="space-y-3">
          <h2 className="text-xl font-bold">দামের সারসংক্ষেপ</h2>
          <div className="grid gap-3 sm:grid-cols-3">
            <Stat
              label="সর্বনিম্ন দাম"
              value={`${fmtAmt(minV)} টাকা`}
              tone="text-fall"
              note={
                lowest
                  ? `সবচেয়ে কম দামের বাজার: ${lowest.name}`
                  : "সবচেয়ে কম দামের বাজার"
              }
            />
            <Stat
              label="সর্বাধিক দাম"
              value={`${fmtAmt(maxV)} টাকা`}
              tone="text-rise"
              note={
                highest
                  ? `সবচেয়ে বেশি দামের বাজার: ${highest.name}`
                  : "সবচেয়ে বেশি দামের বাজার"
              }
            />
            <Stat
              label="গড় দাম"
              value={`${fmtAmt(avgV)} টাকা`}
              note={`প্রতি ${p.unitShort || "একক"}-এর হিসাবে`}
            />
          </div>
        </div>

        <div className="space-y-3">
          <h2 className="text-xl font-bold">বাজারভিত্তিক আজকের দাম</h2>
          {rows.length === 0 ? (
            <p className="text-ink/60">
              এই পণ্যের বাজারভিত্তিক দামের তথ্য এখনো নেই।
            </p>
          ) : (
            <div className="overflow-x-auto rounded-2xl border border-line">
              <table className="w-full min-w-[34rem] text-sm">
                <thead>
                  <tr className="border-b border-line bg-paper text-left text-ink/70">
                    <th className="px-4 py-3 font-medium">বাজার</th>
                    <th className="px-4 py-3 font-medium">বিভাগ</th>
                    <th className="px-4 py-3 text-right font-medium">
                      সর্বনিম্ন
                    </th>
                    <th className="px-4 py-3 text-right font-medium">
                      সর্বাধিক
                    </th>
                    <th className="px-4 py-3 text-right font-medium">গড়</th>
                  </tr>
                </thead>
                <tbody>
                  {rows.map((r) => (
                    <tr
                      key={r.name}
                      className={`border-b border-line last:border-b-0 ${r.avg === cheapestAvg ? "bg-leaf-soft" : ""}`}
                    >
                      <td className="px-4 py-3 font-medium">{r.name}</td>
                      <td className="px-4 py-3 text-ink/70">
                        {r.division ?? "—"}
                      </td>
                      <td className="px-4 py-3 text-right">
                        {fmtAmt(r.lo)} টাকা
                      </td>
                      <td className="px-4 py-3 text-right">
                        {fmtAmt(r.hi)} টাকা
                      </td>
                      <td className="px-4 py-3 text-right font-medium">
                        {fmtAmt(r.avg)} টাকা
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
          {rows.length > 0 && (
            <p className="text-xs text-ink/60">
              {toBn(rows.length)}টি বাজারের তথ্য দেখানো হচ্ছে। সবুজ সারিতে গড়ে
              সবচেয়ে কম দামের বাজার।
            </p>
          )}
        </div>
      </section>

      <Link
        href={catHref}
        className="btn btn-outline border-line hover:border-[#CCD0CC] hover:bg-[#DADEDA] hover:text-ink"
      >
        ← সব {p.categoryLabel || "পণ্য"}
      </Link>
    </div>
  );
}
