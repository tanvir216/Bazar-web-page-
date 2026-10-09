import Link from "next/link";

export default function AuthShell({
  title,
  subtitle,
  children,
}: {
  title: string;
  subtitle: string;
  children: React.ReactNode;
}) {
  return (
    <div className="mx-auto w-full max-w-md px-4 py-10">
      <div className="space-y-1">
        <h1 className="text-2xl font-bold">{title}</h1>
        <p className="text-sm text-ink/70">{subtitle}</p>
      </div>
      <div className="mt-6 rounded-2xl border border-line bg-surface p-6">
        {children}
      </div>
      <Link
        href="/"
        className="mt-6 block text-center text-sm text-ink/60 hover:text-leaf"
      >
        ← হোম পেজে ফিরে যান
      </Link>
    </div>
  );
}
