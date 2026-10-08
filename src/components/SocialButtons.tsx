"use client";
import toast from "react-hot-toast";
import { authClient } from "@/lib/auth-client";

export default function SocialButtons({ callbackURL = "/" }: { callbackURL?: string }) {
  async function go(provider: "google" | "github") {
    const { error } = await authClient.signIn.social({ provider, callbackURL });
    if (error) toast.error(error.message || "সোশ্যাল লগইন ব্যর্থ হয়েছে");
  }
  return (
    <div className="grid gap-2">
      <button type="button" onClick={() => go("google")} className="btn btn-outline">Google দিয়ে চালিয়ে যান</button>
      <button type="button" onClick={() => go("github")} className="btn btn-outline">GitHub দিয়ে চালিয়ে যান</button>
    </div>
  );
}
