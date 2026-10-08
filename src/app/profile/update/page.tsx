"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { authClient } from "@/lib/auth-client";

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
    <div className="mx-auto max-w-md px-4 py-12">
      <div className="rounded-xl border border-line bg-white p-6 sm:p-8">
        <h1 className="text-2xl font-bold">তথ্য আপডেট</h1>
        <form onSubmit={onSubmit} className="mt-6 space-y-4" noValidate>
          <label className="form-control">
            <span className="label-text mb-1">নাম</span>
            <input className="input input-bordered" value={name} onChange={(e) => setName(e.target.value)} />
          </label>
          <button className="btn btn-primary w-full" disabled={busy}>
            {busy ? <span className="loading loading-spinner loading-sm" /> : "তথ্য আপডেট করুন"}
          </button>
        </form>
      </div>
    </div>
  );
}
