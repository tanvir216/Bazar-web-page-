"use client";
import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";

export default function PasswordInput({
  label,
  ...props
}: { label: string } & Omit<
  React.InputHTMLAttributes<HTMLInputElement>,
  "type"
>) {
  const [show, setShow] = useState(false);
  return (
    <label className="block">
      <span className="mb-1 block text-sm font-medium">{label}</span>
      <div className="relative">
        <input
          {...props}
          type={show ? "text" : "password"}
          className="input input-bordered w-full pr-11"
        />
        <button
          type="button"
          onClick={() => setShow((s) => !s)}
          aria-label={show ? "পাসওয়ার্ড লুকান" : "পাসওয়ার্ড দেখুন"}
          title={show ? "পাসওয়ার্ড লুকান" : "পাসওয়ার্ড দেখুন"}
          className="absolute inset-y-0 right-0 flex w-11 items-center justify-center text-ink/60 hover:text-ink"
        >
          {show ? <EyeOff size={18} /> : <Eye size={18} />}
        </button>
      </div>
    </label>
  );
}
