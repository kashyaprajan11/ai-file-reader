"use client";

import * as React from "react";
import { IconCloud } from "../IconCloud";

const slugs = [
  "typescript",
  "javascript",
  "react",
  "html5",
  "css3",
  "nodedotjs",
  "express",
  "nextdotjs",
  "amazonaws",
  "serverless",
  "postgresql",
  "nginx",
  "vercel",
  "git",
  "github",
  "visualstudiocode",
  "babel",
  "tailwindcss",
  "figma",
];

export default function TechUsed() {
  const images = slugs.map(
    (slug) => `https://cdn.simpleicons.org/${slug}/${slug}`
  );

  return (
    <div>
      <div className="flex flex-col justify-center items-center">
        <p className="text-center text-6xl mb-10">Tech Used</p>
        <IconCloud images={images} />
      </div>
    </div>
  );
}
