"use client";
import Image from "next/image";
import { useBnDate } from "@/lib/useBnDate";

export default function Hero() {
  const date = useBnDate();
  return (
    <section className="rounded-3xl border border-line bg-surface p-6 sm:p-10">
      <div className="grid items-center gap-8 md:grid-cols-[1fr_auto]">
        <div className="flex flex-col items-start gap-2">
          <span className="inline-block min-h-7 rounded-full bg-leaf/10 px-3 py-1 text-sm font-medium text-leaf">
            {date || "\u00a0"}
          </span>
          <h1 className="text-3xl font-bold leading-tight sm:text-4xl">
            আজকের বাজারের দাম এক নজরে
          </h1>
          <p className="mt-1 max-w-xl text-ink/80">
            চাল, ডাল, তেল, সবজি, মাছ, মাংস, ডিম ও মসলার দাম — বাজারভিত্তিক
            বিস্তারিত, গড়, সর্বনিম্ন-সর্বাধিক এবং দামের পরিবর্তন এক জায়গায়।
          </p>
          <a href="#সব-পণ্য" className="btn btn-primary mt-3">
            সব পণ্য দেখুন
          </a>
        </div>
        <div className="flex justify-center md:justify-end">
          <Image
            src="/bazar-hero.png"
            alt="ফলের ঝুড়ি"
            width={315}
            height={263}
            priority
            className="h-auto w-full max-w-[315px]"
          />
        </div>
      </div>
    </section>
  );
}
