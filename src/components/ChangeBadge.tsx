import { formatPct } from "@/lib/bn";

export default function ChangeBadge({ change }: { change: number }) {
  const rounded = Math.round(change * 10) / 10;
  // কালো-সাদায়: দাম বাড়লে ভরাট কালো ব্যাজ, কমলে ফাঁপা (শুধু বর্ডার), অপরিবর্তিত হলে ধূসর
  const cls =
    rounded > 0
      ? "border border-pata bg-pata text-white"
      : rounded < 0
        ? "border border-pata bg-white text-pata"
        : "border border-transparent bg-ink/5 text-ink/55";
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
