"use client";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { authClient } from "@/lib/auth-client";
import { useCategories } from "@/lib/hooks";
import { useBnDate } from "@/lib/useBnDate";

export default function Navbar() {
  const pathname = usePathname();
  const router = useRouter();
  const { data: cats, loading } = useCategories();
  const { data: session, isPending } = authClient.useSession();
  const date = useBnDate();
  const user = session?.user;

  async function handleSignOut() {
    await authClient.signOut();
    toast.success("সফলভাবে সাইন আউট হয়েছে");
    router.push("/");
    router.refresh();
  }

  const chip = (active: boolean) =>
    `inline-flex h-8 shrink-0 items-center gap-1.5 rounded-lg border px-3.5 text-sm font-medium transition-colors ${
      active
        ? "border-[#047C37] bg-leaf-strong text-leaf-soft"
        : "border-transparent hover:border-[#CCD0CC] hover:bg-[#DADEDA]"
    }`;

  return (
    <nav className="sticky top-0 z-50 border-b border-line bg-surface">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-3 px-4 py-3">
        <Link href="/" className="flex items-center gap-2">
          <span
            className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-leaf text-lg"
            aria-hidden
          >
            🛒
          </span>
          <span className="leading-tight">
            <span className="block text-xl font-bold tracking-tight">
              বাজার দর
            </span>
            <span className="block min-h-4 text-xs text-ink/70">{date}</span>
          </span>
        </Link>

        <div className="flex items-center gap-2">
          {isPending ? (
            <div className="skeleton h-10 w-24 rounded-lg" />
          ) : user ? (
            <div className="dropdown dropdown-end">
              <div
                tabIndex={0}
                role="button"
                className="btn btn-ghost btn-sm sm:btn-md gap-2 px-2 sm:px-4"
              >
                {user.image ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={user.image}
                    alt=""
                    className="h-8 w-8 rounded-[10px] sm:h-9 sm:w-9"
                  />
                ) : (
                  <span className="flex h-8 w-8 items-center justify-center rounded-[10px] bg-leaf text-sm text-leaf-soft sm:h-9 sm:w-9">
                    {user.name?.[0]?.toUpperCase() ?? "U"}
                  </span>
                )}
                <span className="hidden max-w-28 truncate sm:inline">
                  {user.name}
                </span>
                <span className="text-xs" aria-hidden>
                  ▾
                </span>
              </div>
              <div
                tabIndex={0}
                className="dropdown-content z-50 mt-2 w-64 rounded-2xl border border-line bg-surface p-2 shadow-sm"
              >
                <div className="px-3 py-2">
                  <p className="truncate text-sm font-medium">{user.name}</p>
                  <p className="truncate text-xs text-ink/60">{user.email}</p>
                </div>
                <Link
                  href="/profile"
                  className="block rounded-lg px-3 py-1.5 text-sm hover:bg-paper"
                >
                  আমার প্রোফাইল
                </Link>
                <button
                  onClick={handleSignOut}
                  className="block w-full rounded-lg px-3 py-1.5 text-left text-sm text-rise hover:bg-paper"
                >
                  সাইন আউট
                </button>
              </div>
            </div>
          ) : (
            <>
              <Link href="/signin" className="btn btn-ghost btn-sm sm:btn-md">
                সাইন ইন
              </Link>
              <Link href="/signup" className="btn btn-primary btn-sm sm:btn-md">
                সাইন আপ
              </Link>
            </>
          )}
        </div>
      </div>

      <div className="border-t border-paper">
        <div
          className="no-scrollbar mx-auto flex max-w-6xl gap-1 overflow-x-auto px-4 py-2"
          aria-label="ক্যাটাগরি"
        >
          {loading
            ? Array.from({ length: 8 }).map((_, i) => (
                <div
                  key={i}
                  className="skeleton h-8 w-20 shrink-0 rounded-lg"
                />
              ))
            : cats?.map((c) => {
                const href = `/category/${encodeURIComponent(c.slug)}`;
                const active =
                  pathname === href || pathname === `/category/${c.slug}`;
                return (
                  <Link
                    key={c.slug}
                    href={href}
                    className={chip(active)}
                    aria-current={active ? "page" : undefined}
                  >
                    {c.icon && <span aria-hidden>{c.icon}</span>}
                    {c.name}
                  </Link>
                );
              })}
        </div>
      </div>
    </nav>
  );
}
