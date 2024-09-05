"use client";
import classNames from "classnames";

type FeatureCardProps = {
  gradient: string;
  children: React.ReactNode;
};

export default function FeatureCard({ children, gradient }: FeatureCardProps) {
  return (
    <div
      className={classNames(
        "h-full w-full rounded-2xl bg-gradient-to-br",
        gradient
      )}
    >
      {children}
    </div>
  );
}

export function RepositoryParse() {
  return (
    <FeatureCard gradient="from-[#f7f0ff] to-[#a78afe]">
      This is first step
    </FeatureCard>
  );
}

export function ReadmeLLM() {
  return (
    <FeatureCard gradient="from-[] to-[]">This is second step</FeatureCard>
  );
}

export function EmbeddingsGenerate() {
  return (
    <FeatureCard gradient="from-[] to-[]">This is second step</FeatureCard>
  );
}

export function UserQuestions() {
  return (
    <FeatureCard gradient="from-[] to-[]">This is second step</FeatureCard>
  );
}

export function GetAnswer() {
  return (
    <FeatureCard gradient="from-[] to-[]">This is second step</FeatureCard>
  );
}
