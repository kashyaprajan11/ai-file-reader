"use client";
import Image from "next/image";

import ReactLogo from "@/public/images/react.webp";

const array = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18];

export default function TechUsed() {
  return (
    <div className="h-[300vh]">
      <div className="sticky top-0">
        <p className="text-center text-6xl">Tech Used</p>

        <div className="mt-[40vh] flex gap-20 overflow-hidden">
          {array.map((num) => (
            <Image
              key={num}
              src={ReactLogo}
              alt="react logo"
              height={100}
              width={100}
              objectFit="contain"
              style={{ borderRadius: "10px" }}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
