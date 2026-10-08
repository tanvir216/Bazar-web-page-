"use client";
import Link from "next/link";
import { useProducts } from "@/lib/hooks";
import { toBn } from "@/lib/bn";
import ChangeBadge from "./ChangeBadge";

export default function Hero() {
  const { data, loading } = useProducts();
  // সবচেয়ে বেশি নড়াচড়া করা ৫টা পণ্য
  const rows = [...(data ?? [])].sort((a, b) => Math.abs(b.change) - Math.abs(a.change)).slice(0, 5);

  return (
    <section className="bg-haldi">
      <div className="mx-auto grid max-w-6xl items-center gap-10 px-4 py-12 md:grid-cols-[1.05fr_0.95fr] md:py-16">
        <div>
          <h1 className="font-display text-4xl font-extrabold leading-[1.2] text-balance text-pata sm:text-5xl lg:text-6xl">
            আজকের বাজারে কোনটার কত দাম?
          </h1>
          <p className="mt-5 max-w-md text-base text-pata/80 sm:text-lg">
            চাল, ডাল, তেল, সবজি, মাছ আর মাংস — গতকালের চেয়ে কোনটা বাড়ল, কোনটা কমল, এক নজরে দেখুন।
          </p>
          <a href="#সব-পণ্য" className="btn btn-primary mt-7 px-7">
            সব পণ্যের দাম দেখুন
          </a>
          <p className="mt-4 text-sm text-pata/70">কোন বাজারে কত দাম, তা দেখতে সাইন ইন করুন।</p>
        </div>

        <div className="rounded-2xl border-2 border-pata bg-white shadow-[6px_6px_0_#123B28]">
          <div className="flex items-baseline justify-between gap-3 border-b-2 border-dashed border-pata/25 px-5 py-3.5">
            <h2 className="font-display text-xl font-bold text-pata">আজকের ফর্দ</h2>
            <span className="text-sm text-ink/60">সবচেয়ে বেশি নড়েছে</span>
          </div>
          <ul>
            {loading || !rows.length
              ? Array.from({ length: 5 }).map((_, i) => (
                  <li key={i} className="flex items-center gap-3 border-b border-dashed border-line px-5 py-3 last:border-0">
                    <div className="skeleton h-10 w-10 rounded-full" />
                    <div className="skeleton h-5 w-1/3" />
                    <div className="skeleton ml-auto h-6 w-20" />
                  </li>
                ))
              : rows.map((p, i) => (
                  <li key={p.id} className="row-in border-b border-dashed border-line last:border-0" style={{ animationDelay: `${i * 80}ms` }}>
                    <Link
                      href={`/product/${encodeURIComponent(p.slug)}`}
                      className="flex items-center gap-3 px-5 py-3 transition hover:bg-paper"
                    >
                      <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-paper text-xl" aria-hidden>
                        {p.emoji}
                      </span>
                      <span className="min-w-0 flex-1">
                        <span className="block truncate font-semibold text-pata">{p.name}</span>
                        <span className="block text-xs text-ink/55">{p.unit}</span>
                      </span>
                      <span className="font-display text-xl font-bold text-pata">
                        {toBn(p.price)}
                        <span className="ml-0.5 font-sans text-xs font-medium text-ink/55">টাকা</span>
                      </span>
                      <ChangeBadge change={p.change} />
                    </Link>
                  </li>
                ))}
          </ul>
        </div>
      </div>
    </section>
  );
}