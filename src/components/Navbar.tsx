"use client";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { authClient } from "@/lib/auth-client";
import { useCategories } from "@/lib/hooks";
import { bnDate } from "@/lib/bn";

export default function Navbar() {
  const pathname = usePathname();
  const router = useRouter();
  const { data: cats, loading } = useCategories();
  const { data: session, isPending } = authClient.useSession();
  const [date, setDate] = useState("");
  useEffect(() => setDate(bnDate()), []);

  const linkCls = (active: boolean) =>
    `shrink-0 rounded-full px-4 py-1.5 text-sm font-medium transition ${
      active ? "bg-leaf text-white" : "text-ink hover:bg-paper"
    }`;

  async function handleSignOut() {
    await authClient.signOut();
    toast.success("সফলভাবে সাইন আউট হয়েছে");
    router.push("/");
    router.refresh();
  }

  const user = session?.user;

  return (
    <nav className="mx-auto max-w-6xl px-4">
      <div className="flex items-center justify-between gap-3 py-3">
        <Link href="/" className="flex items-center gap-2.5">
          <Image
            src="/logo-icon.png"
            alt=""
            width={36}
            height={36}
            className="h-9 w-9"
            priority
          />
          <span className="leading-tight">
            <span className="block text-xl font-bold text-leaf">বাজার দর</span>
            <span className="block min-h-4 text-xs text-ink/60">{date}</span>
          </span>
        </Link>

        <div className="flex items-center gap-2">
          {isPending ? (
            <div className="skeleton h-9 w-24 rounded-lg" />
          ) : user ? (
            <div className="dropdown dropdown-end">
              <div
                tabIndex={0}
                role="button"
                className="btn btn-ghost btn-sm sm:btn-md gap-2"
              >
                {user.image ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={user.image}
                    alt=""
                    className="h-7 w-7 rounded-full"
                  />
                ) : (
                  <span className="flex h-7 w-7 items-center justify-center rounded-full bg-leaf text-sm text-white">
                    {user.name?.[0]?.toUpperCase() ?? "U"}
                  </span>
                )}
                <span className="hidden max-w-28 truncate sm:inline">
                  {user.name}
                </span>
              </div>
              <ul
                tabIndex={0}
                className="menu dropdown-content z-50 mt-2 w-48 rounded-box border border-line bg-white p-2 shadow"
              >
                <li>
                  <Link href="/profile">আমার প্রোফাইল</Link>
                </li>
                <li>
                  <button onClick={handleSignOut}>সাইন আউট</button>
                </li>
              </ul>
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

      <div
        className="no-scrollbar -mx-4 flex gap-1 overflow-x-auto px-4 pb-3 sm:mx-0 sm:px-0"
        aria-label="ক্যাটাগরি"
      >
        <Link href="/" className={linkCls(pathname === "/")}>
          সব পণ্য
        </Link>
        {loading
          ? Array.from({ length: 6 }).map((_, i) => (
              <div
                key={i}
                className="skeleton h-8 w-20 shrink-0 rounded-full"
              />
            ))
          : cats?.map((c) => (
              <Link
                key={c.slug}
                href={`/category/${encodeURIComponent(c.slug)}`}
                className={linkCls(
                  pathname === `/category/${encodeURIComponent(c.slug)}` ||
                    pathname === `/category/${c.slug}`,
                )}
              >
                {c.icon ? `${c.icon} ` : ""}
                {c.name}
              </Link>
            ))}
      </div>
    </nav>
  );
}
