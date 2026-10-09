"use client";

export default function ErrorState({ retry }: { retry: () => void }) {
  return (
    <div className="mx-auto max-w-md rounded-xl border border-line bg-surface p-8 text-center">
      <p className="text-lg font-semibold">দাম লোড করা যায়নি</p>
      <p className="mt-1 text-sm text-ink/70">
        ইন্টারনেট সংযোগ দেখে আবার চেষ্টা করুন।
      </p>
      <button onClick={retry} className="btn btn-primary btn-sm sm:btn-md mt-4">
        আবার চেষ্টা করুন
      </button>
    </div>
  );
}
