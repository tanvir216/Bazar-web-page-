"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { authClient } from "@/lib/auth-client";

export default function ProfilePage() {
  const router = useRouter();
  const { data, isPending } = authClient.useSession();
  const user = data?.user;

  async function handleSignOut() {
    await authClient.signOut();
    toast.success("সফলভাবে সাইন আউট হয়েছে");
    router.push("/");
    router.refresh();
  }

  return (
    <div className="mx-auto max-w-3xl space-y-6 px-4 py-10">
      <div>
        <h1 className="text-2xl font-bold">আমার প্রোফাইল</h1>
        <p className="text-sm text-ink/70">
          আপনার অ্যাকাউন্টের তথ্য এখানে দেখুন।
        </p>
      </div>

      {isPending || !user ? (
        <div className="space-y-3" role="status" aria-label="লোড হচ্ছে…">
          <div className="skeleton h-28 w-full rounded-2xl" />
          <div className="skeleton h-48 w-full rounded-2xl" />
        </div>
      ) : (
        <>
          <div className="flex flex-wrap items-center gap-4 rounded-2xl border border-line bg-surface p-6">
            {user.image ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={user.image}
                alt=""
                className="h-20 w-20 rounded-2xl object-cover"
              />
            ) : (
              <span className="flex h-20 w-20 items-center justify-center rounded-2xl bg-leaf text-3xl text-leaf-soft">
                {user.name?.[0]?.toUpperCase() ?? "U"}
              </span>
            )}
            <div className="min-w-0 flex-1">
              <p className="truncate text-lg font-bold">{user.name}</p>
              <p className="truncate text-ink/70">{user.email}</p>
            </div>
            <button
              onClick={handleSignOut}
              className="btn btn-outline border-rise text-rise hover:border-rise hover:bg-rise hover:text-white"
            >
              ↩ সাইন আউট
            </button>
          </div>

          <div className="space-y-3 rounded-2xl border border-line bg-surface p-6">
            <h2 className="text-xl font-bold">তথ্য</h2>
            <dl className="grid gap-3 sm:grid-cols-2">
              <div>
                <dt className="text-xs text-ink/60">নাম</dt>
                <dd className="font-medium">{user.name}</dd>
              </div>
              <div>
                <dt className="text-xs text-ink/60">ইমেইল</dt>
                <dd className="font-medium">{user.email}</dd>
              </div>
            </dl>
            <Link
              href="/profile/update"
              className="btn btn-primary w-full sm:w-auto"
            >
              তথ্য আপডেট করুন
            </Link>
          </div>
        </>
      )}
    </div>
  );
}
