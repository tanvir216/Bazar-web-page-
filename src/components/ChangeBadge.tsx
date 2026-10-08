import { formatPct } from "@/lib/bn";

export default function ChangeBadge({ change }: { change: number }) {
  const rounded = Math.round(change * 10) / 10;
  // দাম বাড়লে লাল, কমলে সবুজ, অপরিবর্তিত হলে ধূসর
  const cls =
    rounded > 0
      ? "bg-rise/10 text-rise"
      : rounded < 0
        ? "bg-fall/10 text-fall"
        : "bg-ink/5 text-ink/55";
  const label =
    rounded > 0
      ? `▲ ${formatPct(rounded)}%`
      : rounded < 0
        ? `▼ ${formatPct(rounded)}%`
        : `— ${formatPct(0)}%`;
  return (
    <span
      className={`inline-block rounded-md px-2 py-0.5 text-sm font-bold whitespace-nowrap ${cls}`}
    >
      {label}
    </span>
  );
}
