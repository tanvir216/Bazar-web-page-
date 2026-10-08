"use client";
import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { authClient } from "@/lib/auth-client";
import SocialButtons from "@/components/SocialButtons";
import PasswordInput from "@/components/PasswordInput";

export default function SignUpPage() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [busy, setBusy] = useState(false);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!name.trim()) return toast.error("আপনার নাম লিখুন");
    if (!/^\S+@\S+\.\S+$/.test(email)) return toast.error("সঠিক ইমেইল দিন");
    if (password.length < 8)
      return toast.error("পাসওয়ার্ড কমপক্ষে ৮ অক্ষরের হতে হবে");
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
    <div className="px-4 py-12">
      <div className="mx-auto w-full max-w-md rounded-xl border border-line bg-white p-6 sm:p-8">
        <h1 className="text-2xl font-bold">সাইন আপ</h1>
        <p className="mt-1 text-sm text-ink/65">নতুন অ্যাকাউন্ট খুলুন।</p>
        <form onSubmit={onSubmit} className="mt-6 space-y-4" noValidate>
          <label className="form-control">
            <span className="label-text mb-1">নাম</span>
            <input
              className="input input-bordered"
              value={name}
              onChange={(e) => setName(e.target.value)}
              autoComplete="name"
            />
          </label>
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
              autoComplete="new-password"
            />{" "}
          </label>
          <button className="btn btn-primary w-full" disabled={busy}>
            {busy ? (
              <span className="loading loading-spinner loading-sm" />
            ) : (
              "রেজিস্টার করুন"
            )}
          </button>
        </form>
        <div className="divider text-sm">অথবা</div>
        <SocialButtons callbackURL="/" />
        <p className="mt-6 text-center text-sm">
          আগে থেকেই অ্যাকাউন্ট আছে?{" "}
          <Link
            href="/signin"
            className="font-semibold text-leaf hover:underline"
          >
            সাইন ইন করুন
          </Link>
        </p>
      </div>
    </div>
  );
}
