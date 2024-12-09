"use client";

import classNames from "classnames";
import Image from "next/image";

import { useFeatureStore } from "./store";

import FirstStep from "@/public/images/fistStep.webp";
import SecondStep from "@/public/images/secondStep.webp";
import ThirdStep from "@/public/images/thirdStep.webp";
import FourthStep from "@/public/images/fourthStep.webp";
import FifthStep from "@/public/images/fifthStep.webp";

type FeatureCardProps = {
  gradient: string;
  children: React.ReactNode;
} & CardProps;

type CardProps = {
  id: number;
};

function FeatureCard({ children, gradient, id }: FeatureCardProps) {
  const isInView = useFeatureStore((state) => state.inViewFeature);

  return (
    <div className="rounded-2xl">
      <div
        className={classNames(
          "absolute z-10 h-full w-full rounded-[inherit] bg-gradient-to-br opacity-0 transition-opacity",
          gradient,
          isInView === id ? "opacity-100" : "opacity-0"
        )}
      >
        {children}
      </div>
      {/* Todo: Create a moving border for the component */}
      {/* <motion.div
        className="absolute z-0 inset-0 rounded-2xl bg-gradient-to-br from-[#fff000] to-[#00ff00]"
        initial={{ transform: "rotate(0deg)", opacity: 0 }}
        animate={{ transform: "rotate(360deg)", opacity: 0 }}
        transition={{
          duration: 10,
          repeat: Infinity,
          repeatType: "loop",
          ease: "linear",
        }}
      ></motion.div> */}
    </div>
  );
}

export function RepositoryParse({ id }: CardProps) {
  return (
    <FeatureCard id={id} gradient="from-[#f7f0ff] to-[#a78afe]">
      <Image src={FirstStep} alt="" fill className="rounded-[inherit]" />
    </FeatureCard>
  );
}

export function ReadmeLLM({ id }: CardProps) {
  return (
    <FeatureCard id={id} gradient="from-[#f5fbff] to-[#addeff]">
      <Image src={SecondStep} alt="" fill className="rounded-[inherit]" />
    </FeatureCard>
  );
}

export function EmbeddingsGenerate({ id }: CardProps) {
  return (
    <FeatureCard id={id} gradient="from-[#f5fff7] to-[#adf8ff]">
      <Image src={ThirdStep} alt="" fill className="rounded-[inherit]" />
    </FeatureCard>
  );
}

export function UserQuestions({ id }: CardProps) {
  return (
    <FeatureCard id={id} gradient="from-[#f7fff5] to-[#adffd8]">
      <Image src={FourthStep} alt="" fill className="rounded-[inherit]" />
    </FeatureCard>
  );
}

export function GetAnswer({ id }: CardProps) {
  return (
    <FeatureCard id={id} gradient="from-[#fff7f5] to-[#ffd8ad]">
      <Image src={FifthStep} alt="" fill className="rounded-[inherit]" />
    </FeatureCard>
  );
}
