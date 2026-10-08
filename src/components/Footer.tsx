export default function Footer() {
  return (
    <footer className="mt-20 bg-pata text-white">
      <div className="mx-auto flex max-w-6xl flex-col gap-2 px-4 py-8 text-sm md:flex-row md:items-center md:justify-between">
        <p>
          <span className="font-display text-xl font-bold text-haldi">
            বাজার দর
          </span>
          <span className="ml-2 text-white/75">
            — প্রয়োজনীয় পণ্যের দাম এক নজরে।
          </span>
        </p>
        <p className="text-white/60">
          সকল দাম সম্ভাব্য; বাজার অবস্থার ওপর নির্ভর করে পরিবর্তিত হয়।
        </p>
      </div>
    </footer>
  );
}
