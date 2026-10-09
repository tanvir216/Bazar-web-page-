import { formatPct } from "@/lib/bn";

/*
 * Figma colours: price up = red, price down = green, flat = gray.
 * If your examiner wants "green up / red down", swap the two classes below.
 */
const UP = "text-rise";
const DOWN = "text-fall";

export default function ChangeBadge({ change }: { change: number }) {
  const v = Math.round(change * 10) / 10;
  const cls = v > 0 ? UP : v < 0 ? DOWN : "text-ink/60";
  const arrow = v > 0 ? "▲" : v < 0 ? "▼" : "—";
  return (
    <span
      className={`inline-flex items-center gap-1 whitespace-nowrap rounded-full bg-paper px-2 py-1 text-xs font-semibold ${cls}`}
    >
      <span aria-hidden>{arrow}</span>
      {formatPct(v)}%
    </span>
  );
}
