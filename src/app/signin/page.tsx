"use client";
import { Suspense, useEffect, useState } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import toast from "react-hot-toast";
import { authClient } from "@/lib/auth-client";
import SocialButtons from "@/components/SocialButtons";
import PasswordInput from "@/components/PasswordInput";
import { safeCallback } from "@/lib/callback";

function SignInForm() {
  const router = useRouter();
  const params = useSearchParams();
  const callbackUrl = safeCallback(params.get("callbackUrl"));
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    if (params.get("protected"))
      toast.error("এই পেজ দেখতে আগে সাইন ইন করুন", { id: "protected" });
  }, [params]);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!email.trim() || !password)
      return toast.error("ইমেইল ও পাসওয়ার্ড দিন");
    setBusy(true);
    const { error } = await authClient.signIn.email({ email, password });
    setBusy(false);
    if (error) return toast.error(error.message || "ইমেইল বা পাসওয়ার্ড ভুল");
    toast.success("সফলভাবে সাইন ইন হয়েছে");
    router.push(callbackUrl);
    router.refresh();
  }

  return (
    <div className="mx-auto w-full max-w-md rounded-xl border border-line bg-white p-6 sm:p-8">
      <h1 className="text-2xl font-bold">সাইন ইন</h1>
      <p className="mt-1 text-sm text-ink/65">আপনার অ্যাকাউন্টে প্রবেশ করুন।</p>
      <form onSubmit={onSubmit} className="mt-6 space-y-4" noValidate>
        <label className="form-control">
          <span className="label-text mb-1">ইমেইল</span>
          <input
            type="email"
            className="input input-bordered"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            autoComplete="email"
          />
        </label>
        <label className="form-control">
          <span className="label-text mb-1">পাসওয়ার্ড</span>
          <PasswordInput
            value={password}
            onChange={setPassword}
            autoComplete="current-password"
          />
        </label>
        <button className="btn btn-primary w-full" disabled={busy}>
          {busy ? (
            <span className="loading loading-spinner loading-sm" />
          ) : (
            "সাইন ইন"
          )}
        </button>
      </form>
      <div className="divider text-sm">অথবা</div>
      <SocialButtons callbackURL={callbackUrl} />
      <p className="mt-6 text-center text-sm">
        অ্যাকাউন্ট নেই?{" "}
             <Link
          href={`/signup?callbackUrl=${encodeURIComponent(callbackUrl)}`}
          className="font-semibold text-leaf hover:underline"
        >
          সাইন আপ করুন
        </Link>
      </p>
    </div>
  );
}

export default function SignInPage() {
  return (
    <div className="px-4 py-12">
      <Suspense fallback={<div className="skeleton mx-auto h-96 max-w-md" />}>
        <SignInForm />
      </Suspense>
    </div>
  );
}
