"use client";
import ScrollSplitSection from "@/components/ScrollSplitSection";
import TechUsed from "@/components/TechUsed";

export default function Home() {
  return (
    <div>
      <p>Hello</p>
      <div className="h-[40vh]" />
      <ScrollSplitSection />
      <TechUsed />
      <div className="h-[80vh]" />
    </div>
  );
}
