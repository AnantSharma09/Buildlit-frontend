"use client";

import { motion, useAnimation } from "framer-motion";
import { useEffect, useRef } from "react";
import { useInView } from "react-intersection-observer";

const sectionData = [
  {
    title: "The Problem",
    text: `Building something great starts with the right team — but finding one is tough.
           Too many ideas never see the light of day because there's no one to build with, no support system to rely on, and no place that brings everything together.
           AI is powerful, but most tools leave you building alone.
           What if your team, your tools, and your momentum all lived in the same space — always on, always ready?`,
  },
  {
    title: "Our Solution",
    text: `Buildlit brings everything together: people, ideas, and AI — in one powerful platform. Whether you're looking for teammates, planning your roadmap, or building your next big thing, Buildlit keeps your team connected and your vision on track. Plan. Build. Ship. All in one place.`,
  },
  {
    title: "What You Can Do",
    text: `- Find your team — instantly connect with like-minded builders
- Launch and manage projects — from idea to execution
- Use AI to build faster — code, brainstorm, or plan with AI support
- Collaborate in real-time — chat, share tasks, and stay aligned
- Join buildathons — hosted by startups and partners
- Create your own co-working space — customizable and always active
- Compete in contests — climb the leaderboard and get noticed by the community
- Promote your startup or profile — Get discovered by the right people: collaborators, investors, or early supporters.`,
  },
];

const SlideInSection = ({ title, text }: { title: string; text: string }) => {
  const ref = useRef<Element | null>(null);
  const { ref: inViewRef, inView } = useInView({ threshold: 0.5 });
  const controls = useAnimation();

  const setRefs = (el: HTMLElement | null) => {
    ref.current = el;
    inViewRef(el);
  };

  useEffect(() => {
    if (inView) controls.start("visible");
  }, [inView, controls]);

  return (
    <motion.section
      ref={setRefs}
      className="w-screen h-screen flex items-center justify-center px-6 text-center bg-gradient-to-b from-black via-neutral-900 to-black text-white"
      initial="hidden"
      animate={controls}
      variants={{
        hidden: { opacity: 0, x: 100 },
        visible: {
          opacity: 1,
          x: 0,
          transition: { duration: 0.8, ease: "easeOut" },
        },
      }}
    >
      <div className="max-w-3xl space-y-6">
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold">{title}</h2>
        {title === "What You Can Do" ? (
          <ul className="text-left text-gray-300 list-disc list-inside space-y-1 text-sm sm:text-base md:text-lg">
            {text.split("\n").map((item, idx) => (
              <li key={idx}>{item.replace("- ", "")}</li>
            ))}
          </ul>
        ) : (
          <p className="text-gray-400 text-base sm:text-lg md:text-xl leading-relaxed">
            {text}
          </p>
        )}
      </div>
    </motion.section>
  );
};

export default function LandingSections() {
  return (
    <div className="flex w-full h-screen overflow-x-auto snap-x snap-mandatory scroll-smooth">
      {sectionData.map((section, idx) => (
        <div key={idx} className="snap-center flex-shrink-0 w-screen h-screen">
          <SlideInSection title={section.title} text={section.text} />
        </div>
      ))}
    </div>
  );
}
