"use client";

import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import Hero from "@/components/Hero";
import LandingSections from "@/components/landingSections";
import EmailForm from "@/components/emailForm"; // ← your form component
import { Twitter, Github, Mail } from "lucide-react";

const SlideUpOnScroll = ({ children }: { children: React.ReactNode }) => {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.2 });
  return (
    <motion.div
      ref={ref}
      initial={{ y: 100, opacity: 0 }}
      animate={inView ? { y: 0, opacity: 1 } : {}}
      transition={{ duration: 1, ease: "easeOut" }}
    >
      {children}
    </motion.div>
  );
};

export default function Home() {
  return (
    <main className="overflow-x-hidden bg-[#fdfcf9]">
      {/* 🔵 Hero Section */}
      <Hero />

      {/* 🧩 Horizontal Scrollable Sections */}
      <section
        id="horizontal-scroll"
        className="w-screen overflow-x-auto overflow-y-hidden snap-x snap-mandatory flex scroll-smooth"
      >
        <LandingSections />
      </section>

      {/* 📬 Animated Email Subscription Section */}
      <SlideUpOnScroll>
        <section
          id="email-subscribe"
          className="min-h-[60vh] bg-[#f0f0f0] flex flex-col items-center justify-center text-center px-6 py-24 text-gray-900 border-b border-gray-300"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            We’re building something amazing.
          </h2>
          <p className="text-lg text-gray-700 mb-6 max-w-xl">
            And it’s launching soon. Want early access? Be the first to know
            when we go live.
          </p>

          {/* ← Render your EmailForm component here */}
          <EmailForm />
        </section>
      </SlideUpOnScroll>

      {/* 🔗 Footer */}
      <footer className="bg-[#1a1a1a] py-6 text-gray-300 text-sm mt-0">
        <div className="flex justify-center gap-8 mb-2">
          <a
            href="https://x.com/Buildliit"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-white transition flex items-center gap-1"
          >
            <Twitter size={18} /> X
          </a>
          <a
            href="https://github.com/AnantSharma09"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-white transition flex items-center gap-1"
          >
            <Github size={18} /> GitHub
          </a>
          <a
            href="mailto:buildlit77@gmail.com"
            className="hover:text-white transition flex items-center gap-1"
          >
            <Mail size={18} /> Email
          </a>
        </div>
        <p className="text-center text-xs text-gray-500">
          © 2025 BUILDLIT. All rights reserved.
        </p>
      </footer>
    </main>
  );
}
