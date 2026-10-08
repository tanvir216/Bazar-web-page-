import Image from "next/image";

export default function Hero() {
  return (
       <section className="border-b-2 border-pata bg-white">
      <div className="mx-auto grid max-w-6xl items-center gap-8 px-4 py-12 md:grid-cols-2 md:py-16">
        <div>
          <h1 className="font-display text-4xl font-extrabold leading-[1.2] text-balance text-pata sm:text-5xl lg:text-6xl">
            আজকের বাজারে কোনটার কত দাম?
          </h1>
          <p className="mt-5 max-w-md text-base text-pata/80 sm:text-lg">
            চাল, ডাল, তেল, সবজি, মাছ আর মাংস — গতকালের চেয়ে কোনটা বাড়ল, কোনটা
            কমল, এক নজরে দেখুন।
          </p>
          <a href="#সব-পণ্য" className="btn btn-primary mt-7 px-7">
            সব পণ্যের দাম দেখুন
          </a>
          <p className="mt-4 text-sm text-pata/70">
            কোন বাজারে কত দাম, তা দেখতে সাইন ইন করুন।
          </p>
        </div>
        <div className="flex justify-center md:justify-end">
          <Image
            src="/bazar-hero.png"
            alt="ফলের ঝুড়ি"
            width={420}
            height={351}
            priority
            className="h-auto w-full max-w-xs sm:max-w-sm md:max-w-md"
          />
        </div>
      </div>
    </section>
  );
}
