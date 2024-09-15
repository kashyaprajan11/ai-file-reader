"use client";

import React from "react";
import { useInView } from "framer-motion";
import classNames from "classnames";

import { useFeatureStore } from "./store";

type Props = {
  children: React.ReactNode;
  id: number;
};

export default function FeatureTitle({ children, id }: Props) {
  const ref = React.useRef<HTMLParagraphElement>(null);
  const isInView = useInView(ref, { margin: "-50% 0px -50% 0px" });

  const setInViewFeature = useFeatureStore((state) => state.setInViewFeature);
  const inViewFeature = useFeatureStore((state) => state.inViewFeature);

  console.log(inViewFeature);

  React.useEffect(() => {
    if (isInView) setInViewFeature(id);
    if (!isInView && inViewFeature === id) setInViewFeature(null);
  }, [isInView, id, setInViewFeature, inViewFeature]);

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
