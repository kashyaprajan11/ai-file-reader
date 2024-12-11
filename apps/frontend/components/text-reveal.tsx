"use client";

import { FC, ReactNode, useRef } from "react";
import { motion, MotionValue, useScroll, useTransform } from "framer-motion";

import { cn } from "@/utils/utilities";

interface TextRevealByPointProps {
  points: string[];
  className?: string;
}

export const TextRevealByPoint: FC<TextRevealByPointProps> = ({
  points,
  className,
}) => {
  const targetRef = useRef<HTMLDivElement | null>(null);

  const { scrollYProgress } = useScroll({
    target: targetRef,
  });

  return (
    <div ref={targetRef} className={cn("relative z-0 h-[200vh]", className)}>
      <div
        className={
          "sticky top-0 mx-auto flex max-w-4xl items-center bg-transparent px-[1rem] py-[5rem]"
        }
      >
        <div
          ref={targetRef}
          className={
            "flex flex-col p-5 text-2xl font-bold text-black/20 dark:text-white/20 md:p-8 md:text-3xl lg:p-10 lg:text-4xl xl:text-5xl"
          }
        >
          {points.map((point, i) => {
            const words = point.split(" ");
            const start = i / points.length;
            const end = start + 1 / points.length;

            return (
              <div key={i} className="flex items-center my-5">
                {/* <span className="mr-4 text-black/30 dark:text-white/30">
                  {i + 1}.
                </span> */}
                <p className="flex flex-wrap">
                  {words.map((word, wordIndex) => {
                    const wordStart =
                      start + (wordIndex / words.length) * (1 / points.length);
                    const wordEnd =
                      wordStart + (1 / words.length) * (1 / points.length);

                    return (
                      <Word
                        key={wordIndex}
                        progress={scrollYProgress}
                        range={[wordStart, wordEnd]}
                      >
                        {word}
                      </Word>
                    );
                  })}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

interface WordProps {
  children: string;
  progress: MotionValue<number>;
  range: [number, number];
}

const Word: FC<WordProps> = ({ children, progress, range }) => {
  const opacity = useTransform(progress, range, [0, 1]);
  return (
    <span className="xl:lg-3 relative mx-1 lg:mx-2.5">
      <span className={"absolute opacity-30"}>{children}</span>
      <motion.span
        style={{ opacity: opacity }}
        className={"text-black dark:text-white"}
      >
        {children}
      </motion.span>
    </span>
  );
};
