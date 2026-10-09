const BN_DIGITS = "০১২৩৪৫৬৭৮৯";

/** Parse numbers written with Bengali or English digits ("১,৮৫০ টাকা" -> 1850). */
export function num(v: unknown): number {
  if (typeof v === "number") return v;
  if (typeof v !== "string") return NaN;
  const s = v
    .replace(/[০-৯]/g, (d) => String(BN_DIGITS.indexOf(d)))
    .replace(/,/g, "")
    .replace(/[^\d.\-]/g, "");
  return s === "" ? NaN : parseFloat(s);
}

const fmt = (min: number, max: number) =>
  new Intl.NumberFormat("bn-BD", {
    minimumFractionDigits: min,
    maximumFractionDigits: max,
  });

export const toBn = (n: number, max = 2) => fmt(0, max).format(n);
export const formatPrice = (n: number) => `${toBn(n)} টাকা`;
export const formatPct = (n: number) => fmt(1, 1).format(Math.abs(n));

export function bnDate(d = new Date()) {
  return new Intl.DateTimeFormat("bn-BD", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(d);
}

export const formatPriceUnit = (n: number, unitShort: string) =>
  `${toBn(n)} টাকা${unitShort ? `/${unitShort}` : ""}`;

export const fmtAmt = (n: number) =>
  Number.isInteger(n) ? fmt(0, 0).format(n) : fmt(2, 2).format(n);
