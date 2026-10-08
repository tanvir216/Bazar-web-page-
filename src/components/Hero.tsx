import Image from "next/image";

export default function Hero() {
  return (
    <section className="border-b border-line bg-white">
      <div className="mx-auto grid max-w-6xl items-center gap-8 px-4 py-10 md:grid-cols-2 md:py-14">
        <div>
          <p className="text-sm font-semibold text-leaf">
            প্রতিদিনের বাজার, এক জায়গায়
          </p>
          <h1 className="mt-2 text-3xl font-bold leading-tight sm:text-4xl lg:text-5xl">
            আজকের বাজার দর জানুন, বুঝে কিনুন
          </h1>
          <p className="mt-4 max-w-lg text-base text-ink/70 sm:text-lg">
            চাল, ডাল, তেল, সবজি, মাছ ও মাংসের দাম কোথায় বাড়ছে আর কোথায় কমছে —
            দেখুন এক নজরে।
          </p>
          <a href="#সব-পণ্য" className="btn btn-primary mt-6">
            সব পণ্যের দাম দেখুন
          </a>
        </div>
        <div className="flex justify-center md:justify-end">
          <Image
            src="/bazar-hero.png"
            alt="ফলের ঝুড়ি"
            width={420}
            height={340}
            priority
            className="h-auto w-full max-w-sm md:max-w-md"
          />
        </div>
      </div>
    </section>
  );
}
