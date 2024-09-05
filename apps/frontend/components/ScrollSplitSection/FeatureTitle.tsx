"use client";

import React from "react";
import { useInView } from "framer-motion";
import classNames from "classnames";

type Props = {
  children: React.ReactNode;
};

export default function FeatureTitle({ children }: Props) {
  const ref = React.useRef<HTMLParagraphElement>(null);
  const isInView = useInView(ref, { margin: "-50% 0px -50% 0px" });

  return (
    <p
      ref={ref}
      className={classNames(
        "text-5xl py-16 transition-colors",
        isInView ? "text-white" : "text-gray-900"
      )}
    >
      {children}
    </p>
  );
}
