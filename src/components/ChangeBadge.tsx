import { formatPct } from "@/lib/bn";

export default function ChangeBadge({ change }: { change: number }) {
  const rounded = Math.round(change * 10) / 10;
  const cls =
    rounded > 0
      ? "bg-green-100 text-up"
      : rounded < 0
        ? "bg-red-100 text-down"
        : "bg-gray-100 text-gray-500";
  const label =
    rounded > 0
      ? `▲ ${formatPct(rounded)}%`
      : rounded < 0
        ? `▼ ${formatPct(rounded)}%`
        : `— ${formatPct(0)}%`;
  return (
    <span
      className={`inline-block rounded-full px-2.5 py-0.5 text-sm font-semibold whitespace-nowrap ${cls}`}
    >
      {label}
    </span>
  );
}
