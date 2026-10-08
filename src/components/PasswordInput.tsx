"use client";
import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";

type Props = {
  value: string;
  onChange: (value: string) => void;
  autoComplete?: string;
};

export default function PasswordInput({ value, onChange, autoComplete }: Props) {
  const [show, setShow] = useState(false);
  return (
    <div className="relative">
      <input
        type={show ? "text" : "password"}
        className="input input-bordered w-full pr-11"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        autoComplete={autoComplete}
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
  );
}