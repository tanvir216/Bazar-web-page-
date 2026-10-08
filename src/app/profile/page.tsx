"use client";
import Link from "next/link";
import { authClient } from "@/lib/auth-client";

export default function ProfilePage() {
  const { data, isPending } = authClient.useSession();
  const user = data?.user;

  return (
    <div className="mx-auto max-w-xl px-4 py-12">
      <h1 className="text-2xl font-bold">আমার প্রোফাইল</h1>
      <div className="mt-6 rounded-xl border border-line bg-white p-6">
        {isPending ? (
          <div className="space-y-3" role="status" aria-label="লোড হচ্ছে…">
            <div className="skeleton h-16 w-16 rounded-full" />
            <div className="skeleton h-6 w-1/2" />
            <div className="skeleton h-5 w-2/3" />
          </div>
        ) : user ? (
          <>
            <div className="flex items-center gap-4">
              {user.image ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={user.image} alt="" className="h-16 w-16 rounded-full" />
              ) : (
                <span className="flex h-16 w-16 items-center justify-center rounded-full bg-leaf text-2xl text-white">
                  {user.name?.[0]?.toUpperCase() ?? "U"}
                </span>
              )}
              <div className="min-w-0">
                <p className="truncate text-xl font-semibold">{user.name}</p>
                <p className="truncate text-ink/65">{user.email}</p>
              </div>
            </div>
            <Link href="/profile/update" className="btn btn-primary mt-6">তথ্য আপডেট করুন</Link>
          </>
        ) : (
          <p>প্রোফাইল দেখতে সাইন ইন করুন।</p>
        )}
      </div>
    </div>
  );
}
