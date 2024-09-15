"use client";
import classNames from "classnames";

import { useFeatureStore } from "./store";

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
    <div
      className={classNames(
        "absolute h-full w-full rounded-2xl bg-gradient-to-br opacity-0 transition-opacity",
        gradient,
        isInView === id ? "opacity-100" : "opacity-0"
      )}
    >
      {children}
    </div>
  );
}

export function RepositoryParse({ id }: CardProps) {
  return (
    <FeatureCard id={id} gradient="from-[#f7f0ff] to-[#a78afe]">
      This is first step
    </FeatureCard>
  );
}

export function ReadmeLLM({ id }: CardProps) {
  return (
    <FeatureCard id={id} gradient="from-[#f5fbff] to-[#addeff]">
      This is second step
    </FeatureCard>
  );
}

export function EmbeddingsGenerate({ id }: CardProps) {
  return (
    <FeatureCard id={id} gradient="from-[#f5fff7] to-[#adf8ff]">
      This is second step
    </FeatureCard>
  );
}

export function UserQuestions({ id }: CardProps) {
  return (
    <FeatureCard id={id} gradient="from-[#f7fff5] to-[#adffd8]">
      This is second step
    </FeatureCard>
  );
}

export function GetAnswer({ id }: CardProps) {
  return (
    <FeatureCard id={id} gradient="from-[#fff7f5] to-[#ffd8ad]">
      This is second step
    </FeatureCard>
  );
}
