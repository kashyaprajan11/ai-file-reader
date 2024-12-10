"use client";
import { TextRevealByWord } from "./text-reveal";

export default function UseCases() {
  return (
    <div className="flex flex-col w-full justify-center items-center mb-10">
      <p className="text-center text-6xl mb-10">Use Cases</p>
      <TextRevealByWord text="This is one of the usecases that are going to be shown" />
    </div>
  );
}
