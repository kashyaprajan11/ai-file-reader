"use client";
import { TextRevealByPoint } from "./text-reveal";

export default function UseCases() {
  return (
    <div className="flex flex-col w-full justify-center items-center mb-10">
      <p className="text-center text-6xl mb-10">Use Cases</p>
      <TextRevealByPoint
        points={[
          "1. Helping developers quickly understand unfamiliar repositories",
          "2. Assisting in onboarding new developers",
          "3. Answering technical queries for open-source contributors",
        ]}
      />
    </div>
  );
}
