"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { authClient } from "@/lib/auth-client";
import AuthShell from "@/components/AuthShell";
import Field from "@/components/Field";

export default function UpdateProfilePage() {
  const router = useRouter();
  const { data } = authClient.useSession();
  const [name, setName] = useState("");
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    if (data?.user?.name) setName(data.user.name);
  }, [data?.user?.name]);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!name.trim()) return toast.error("নাম খালি রাখা যাবে না");
    setBusy(true);
    const { error } = await authClient.updateUser({ name: name.trim() });
    setBusy(false);
    if (error) return toast.error(error.message || "আপডেট করা যায়নি");
    toast.success("তথ্য আপডেট হয়েছে");
    router.push("/profile");
    router.refresh();
  }

  return (
    <AuthShell title="তথ্য আপডেট" subtitle="আপনার নাম বদলে সেভ করুন।">
      <form onSubmit={onSubmit} className="space-y-4" noValidate>
        <Field
          label="নাম"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="যেমন: রহিম উদ্দিন"
        />
        <button className="btn btn-primary w-full" disabled={busy}>
          {busy ? (
            <span className="loading loading-spinner loading-sm" />
          ) : (
            "তথ্য আপডেট করুন"
          )}
        </button>
      </form>
    </AuthShell>
  );
}
