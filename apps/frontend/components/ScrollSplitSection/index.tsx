"use client";
import React from "react";

import FeatureTitle from "./FeatureTitle";
import { features } from "./sectionData";

function ScrollSplitSection() {
  return (
    <div>
      <p className="text-center text-6xl"> How it works? </p>
      <div className="max-w-7xl mx-auto flex w-full gap-20 items-start px-[2.5em]">
        <div className="w-full py-[50vh]">
          <ul>
            {features.map((feature) => (
              <li>
                <FeatureTitle id={feature.id}>{feature.title}</FeatureTitle>
              </li>
            ))}
          </ul>
        </div>
        <div className="w-full sticky top-0 h-screen flex items-center">
          <div className="relative w-full aspect-square bg-gray-600 rounded-2xl">
            {features.map((feature) => (
              <feature.card key={feature.id} id={feature.id} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default ScrollSplitSection;
