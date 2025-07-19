// components/Hero.tsx
"use client";

import Image from "next/image";
import Link from "next/link";

export default function Hero() {
  return (
    <section className="min-h-screen bg-[#fdfcf9] flex flex-col items-center justify-center text-center px-4 text-gray-900 relative">
      {/* Logo */}
      <div className="absolute top-6 left-6">
        <Link href="/" className="flex items-center gap-2">
          <Image
            src="/logo.png"
            alt="Logo"
            width={36}
            height={36}
            className="rounded-full object-cover"
          />
          <span className="text-xl font-bold">Buildlit</span>
        </Link>
      </div>

      {/* Nav */}
      <nav className="absolute top-6 left-0 right-0 flex justify-center gap-6">
        <a
          href="#horizontal-scroll"
          className="bg-white px-4 py-2 rounded-full shadow"
        >
          Our Vision
        </a>
        <a
          href="#email-subscribe"
          className="bg-white px-4 py-2 rounded-full shadow"
        >
          Subscribe
        </a>
      </nav>
      {/* Tagline */}
      <div className="mt-24">
        <p className="text-sm text-gray-600 mb-2">
          A new way to build{" "}
          <span className="underline text-blue-600">Buildlit</span>
        </p>
        <h1 className="text-5xl md:text-6xl font-serif font-medium leading-tight text-gray-900">
          Ideas are <span className="italic">cheap</span> Teams are{" "}
          <span className="italic">rare</span> We fix that.
        </h1>
      </div>
    </section>
  );
}
