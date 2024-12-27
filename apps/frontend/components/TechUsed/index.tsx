"use client";

import * as React from "react";

import { IconCloud } from "../IconCloud";

const array = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18];

export default function TechUsed() {
  const targetRef = React.useRef();

  return (
    <div>
      <div>
        <p className="text-center text-6xl mb-10">Tech Used</p>
        <IconCloud
          iconSlugs={[
            "react",
            "typescript",
            "javascript",
            "nextdotjs",
            "nodejs",
            "tailwindcss",
            "serverless",
            "postgresql",
            "git",
            "github",
            "vercel",
            "amazonaws",
            "redux",
            "webpack",
            "babel",
            "awslambda",
            "express",
          ]}
        />
      </div>
    </div>
  );
}
