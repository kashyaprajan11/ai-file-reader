"use client";
import ScrollSplitSection from "@/components/ScrollSplitSection";
import TechUsed from "@/components/TechUsed";

export default function Home() {
  return (
    <div>
      <div className="max-w-6xl mx-auto my-8">
        <p className="text-4xl text-center">
          Hi! Work in progress (Scroll for current components)
        </p>
        <div className="my-16">
          <p className="my-8 text-3xl">
            Q. What this app does? Whats the idea??
          </p>
          <p className="text-3xl">
            Ans. This app parses readme file of github repostories and creates
            embeddings on sections. You can ask questions regarding the
            repositories you have parsed and hopefully get answers thorough Ai{" "}
          </p>
        </div>
        <div className="my-16">
          <p className="my-4 text-3xl">
            Q. What's the status and when will you complete this?
          </p>
          <p className="text-3xl">
            Ans. The backend is ready. Need to deploy it. I've finalised azure.
            I'm still working of the frontend as well. Figuring something design
            wise is far time consuming that coding it. But yeah pretty sure I'll
            complete it soon.
          </p>
        </div>

        <div className="my-16">
          <p className="my-4 text-3xl">Q. How can i check the code for this?</p>
          <p className="text-3xl flex gap-10">
            Ans.{" "}
            <a
              className="text-bold underline italic"
              href="https://github.com/kashyaprajan11/ai-file-reader"
            >
              Github
            </a>
            <a
              className="text-bold underline italic"
              href="https://docs.google.com/document/d/1AA-r0sGdKuysBV3yU01GKl8hXt44wMVfgH0VwqVgT9E/edit?usp=sharing"
            >
              My Resume
            </a>
          </p>
        </div>
      </div>

      <div className="h-[40vh]" />
      <ScrollSplitSection />
      <TechUsed />
      <div className="h-[80vh]" />
    </div>
  );
}
