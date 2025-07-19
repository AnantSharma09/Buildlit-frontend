"use client";

import { motion, useAnimation } from "framer-motion";
import { useEffect, useRef } from "react";
import { useInView } from "react-intersection-observer";

const sectionData = [
  {
    title: "The Problem",
    text: `Finding the right team to build with is hard. Ideas die because there's no one to build with, no one to support them, and no central place to manage it all. AI exists — but no tool helps you actually build.`,
  },
  {
    title: "Our Solution",
    text: `Buildlit brings everything together — people, ideas, and AI — so you can team up, stay aligned, and build faster. One place for everything: finding teammates, planning tasks, chatting, and building with AI support.`,
  },
  {
    title: "What You Can Do",
    text: `- Find your team
- Launch projects
- Use AI to build faster
- Collaborate in real-time
- Join buildathons hosted by startups
- Create customizable co-working space
- Participate in contests hosted by BUILDLIT and get on top of the leaderboard`,
  },
];

const SlideInSection = ({ title, text }: { title: string; text: string }) => {
  // Use Element to align with useInView callback
  const ref = useRef<Element | null>(null);
  const { ref: inViewRef, inView } = useInView({ threshold: 0.6 });
  const controls = useAnimation();

  // Merge refs with matching signature: Element | null
  const setRefs = (el: HTMLElement | null) => {
    ref.current = el;
    inViewRef(el);
  };

  useEffect(() => {
    if (inView) {
      controls.start("visible");
    }
  }, [inView, controls]);

  return (
    <motion.section
      ref={setRefs}
      className="w-screen flex-shrink-0 h-screen flex items-center justify-center px-6 text-center bg-black text-white"
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
      <div className="max-w-xl space-y-4">
        <h2 className="text-4xl font-bold">{title}</h2>
        {title === "What You Can Do" ? (
          <ul className="text-left text-gray-300 list-disc list-inside space-y-1">
            {text.split("\n").map((item, idx) => (
              <li key={idx}>{item.replace("- ", "")}</li>
            ))}
          </ul>
        ) : (
          <p className="text-gray-400">{text}</p>
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
