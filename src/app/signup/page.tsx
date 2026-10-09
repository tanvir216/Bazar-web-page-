"use client";
import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { authClient } from "@/lib/auth-client";
import SocialButtons from "@/components/SocialButtons";
import AuthShell from "@/components/AuthShell";
import Field from "@/components/Field";
import OrDivider from "@/components/OrDivider";

export default function SignUpPage() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [busy, setBusy] = useState(false);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!name.trim()) return toast.error("আপনার নাম লিখুন");
    if (!/^\S+@\S+\.\S+$/.test(email)) return toast.error("সঠিক ইমেইল দিন");
    if (password.length < 8)
      return toast.error("পাসওয়ার্ড কমপক্ষে ৮ অক্ষরের হতে হবে");
    if (password !== confirm) return toast.error("দুটি পাসওয়ার্ড মেলেনি");
    setBusy(true);
    const { error } = await authClient.signUp.email({
      name: name.trim(),
      email,
      password,
    });
    setBusy(false);
    if (error)
      return toast.error(error.message || "রেজিস্ট্রেশন ব্যর্থ হয়েছে");
    toast.success("রেজিস্ট্রেশন সফল! এবার সাইন ইন করুন");
    router.push("/signin");
  }

  return (
    <AuthShell
      title="অ্যাকাউন্ট তৈরি করুন"
      subtitle="বিনা খরচে সাইন আপ করে সব বিস্তারিত দাম দেখুন।"
    >
      <form onSubmit={onSubmit} className="space-y-4" noValidate>
        <Field
          label="নাম"
          placeholder="যেমন: রহিম উদ্দিন"
          value={name}
          onChange={(e) => setName(e.target.value)}
          autoComplete="name"
        />
        <Field
          label="ইমেইল"
          type="email"
          placeholder="you@example.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          autoComplete="email"
        />
        <Field
          label="পাসওয়ার্ড"
          type="password"
          placeholder="কমপক্ষে ৮ অক্ষর"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          autoComplete="new-password"
        />
        <Field
          label="পাসওয়ার্ড নিশ্চিত করুন"
          type="password"
          placeholder="আবার লিখুন"
          value={confirm}
          onChange={(e) => setConfirm(e.target.value)}
          autoComplete="new-password"
        />
        <button className="btn btn-primary w-full" disabled={busy}>
          {busy ? (
            <span className="loading loading-spinner loading-sm" />
          ) : (
            "অ্যাকাউন্ট তৈরি করুন"
          )}
        </button>
      </form>
      <OrDivider />
      <SocialButtons callbackURL="/" />
      <p className="mt-4 text-sm text-ink/70">
        অ্যাকাউন্ট আছে?{" "}
        <Link
          href="/signin"
          className="font-semibold text-leaf hover:underline"
        >
          সাইন ইন করুন
        </Link>
      </p>
    </AuthShell>
  );
}
