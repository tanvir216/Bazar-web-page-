"use client";
import { Suspense, useEffect, useState } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import toast from "react-hot-toast";
import { authClient } from "@/lib/auth-client";
import SocialButtons from "@/components/SocialButtons";
import AuthShell from "@/components/AuthShell";
import Field from "@/components/Field";
import PasswordInput from "@/components/PasswordInput";
import OrDivider from "@/components/OrDivider";

function SignInForm() {
  const router = useRouter();
  const params = useSearchParams();
  const callbackUrl = params.get("callbackUrl") || "/";
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
    <AuthShell
      title="সাইন ইন"
      subtitle="বিস্তারিত দাম, বাজার তুলনা ও প্রোফাইল দেখতে অ্যাকাউন্টে ঢুকুন।"
    >
      <form onSubmit={onSubmit} className="space-y-4" noValidate>
        <Field
          label="ইমেইল"
          type="email"
          placeholder="you@example.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          autoComplete="email"
        />
        <PasswordInput
          label="পাসওয়ার্ড"
          placeholder="কমপক্ষে ৮ অক্ষর"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          autoComplete="current-password"
        />
        <button className="btn btn-primary w-full" disabled={busy}>
          {busy ? (
            <span className="loading loading-spinner loading-sm" />
          ) : (
            "সাইন ইন"
          )}
        </button>
      </form>
      <OrDivider />
      <SocialButtons callbackURL={callbackUrl} />
      <p className="mt-4 text-sm text-ink/70">
        অ্যাকাউন্ট নেই?{" "}
        <Link
          href="/signup"
          className="font-semibold text-leaf hover:underline"
        >
          সাইন আপ করুন
        </Link>
      </p>
    </AuthShell>
  );
}

export default function SignInPage() {
  return (
    <Suspense
      fallback={<div className="skeleton mx-auto my-10 h-96 max-w-md" />}
    >
      <SignInForm />
    </Suspense>
  );
}
