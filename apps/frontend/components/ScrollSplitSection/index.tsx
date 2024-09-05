"use client";
import React from "react";

import FeatureTitle from "./FeatureTitle";
import FeatureCard from "./FeatureCard";
import { features } from "./sectionData";

function ScrollSplitSection() {
  return (
    <div className="flex w-full gap-20 items-start">
      <div className="w-full py-[50vh]">
        <ul>
          {features.map((feature) => (
            <li>
              <FeatureTitle>{feature.title}</FeatureTitle>
            </li>
          ))}
        </ul>
      </div>
      <div className="w-full sticky top-0 h-screen flex items-center">
        <div className="w-full aspect-square bg-gray-600 rounded-2xl">
          <FeatureCard gradient="from-[#f7f0ff] to-[#a78afe]">
            <span />
          </FeatureCard>
        </div>
      </div>
    </div>
  );
}

export default ScrollSplitSection;
