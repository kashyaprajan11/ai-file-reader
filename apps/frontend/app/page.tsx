"use client";
import ScrollSplitSection from "@/components/ScrollSplitSection";
import TechUsed from "@/components/TechUsed";
import { WavyBackground } from "@/components/wavy-background";
import { HeroVideoDialog } from "@/components/hero-video-dialog";
import Features from "@/components/features";
import UseCases from "@/components/use-cases";
import GetInTouch from "@/components/get-in-touch";
import Footer from "@/components/footer";

export default function Home() {
  return (
    <div className="flex flex-col gap-5">
      <WavyBackground>
        <p className="max-w-5xl text-2xl md:text-6xl text-center leading-snug drop-shadow-md">
          <span className="font-bold">Decode Repositories, Instantly:</span>{" "}
          Your AI-Powered Guide to Understanding Any{" "}
          <span className="font-bold">README</span>
        </p>
      </WavyBackground>
      <div className="max-w-6xl mx-auto mb-[6rem]">
        <HeroVideoDialog
          className="block"
          animationStyle="from-center"
          videoSrc="https://www.youtube.com/embed/bhfvGec0-8k?si=BMI3AvK5BfDIUqde"
          thumbnailSrc="https://ai-file-reader-frontend.vercel.app/images/ai-file-reader-demo-thumbnail.webp"
          thumbnailAlt="Hero Video"
        />
      </div>

      {/* <Features /> */}
      <UseCases />
      <TechUsed />
      <GetInTouch />
      <Footer />
    </div>
  );
}
