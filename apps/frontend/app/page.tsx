"use client";
import ScrollSplitSection from "@/components/ScrollSplitSection";
import TechUsed from "@/components/TechUsed";
import { WavyBackground } from "@/components/wavy-background";

export default function Home() {
  return (
    <div>
      <WavyBackground>
        <p className="max-w-5xl text-2xl md:text-6xl text-center leading-snug drop-shadow-md">
          <span className="font-bold">Decode Repositories, Instantly:</span>{" "}
          Your AI-Powered Guide to Understanding Any{" "}
          <span className="font-bold">README</span>
        </p>
      </WavyBackground>
      <ScrollSplitSection />
      <TechUsed />
    </div>
  );
}
