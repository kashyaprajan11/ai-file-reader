"use client";
import React from "react";
import {
  motion,
  useMotionValue,
  useMotionTemplate,
  MotionValue,
} from "framer-motion";

type CardDataProps = {
  id: number;
  title: string;
  description?: string;
  image: string;
  link: string;
};

export const RadialHoverCard = ({
  cardData,
}: {
  cardData: CardDataProps[];
}) => {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const handleMouseMove = (event: React.MouseEvent<HTMLDivElement>) => {
    const cardElements = Array.from(
      event.currentTarget.getElementsByClassName("card")
    );

    for (let card of cardElements) {
      const rect = card.getBoundingClientRect();
      const x = event.clientX - rect.left;
      const y = event.clientY - rect.top;

      mouseX.set(x);
      mouseY.set(y);

      console.log(x);
    }
  };

  return (
    <div
      onMouseMove={handleMouseMove}
      className="flex gap-4 flex-wrap max-w-[1040px] w-[calc(100% - 20px)]"
    >
      {cardData.map((card) => (
        <HoverCard key={card.id} mouseX={mouseX} mouseY={mouseY} />
      ))}
    </div>
  );
};

const HoverCard = ({
  mouseX,
  mouseY,
}: {
  mouseX: MotionValue<number>;
  mouseY: MotionValue<number>;
}) => {
  const backgroundImage = useMotionTemplate`
    radial-gradient(
      800px circle at ${mouseX}px ${mouseY}px, 
      rgba(255,255,255,0.08), 
      transparent 40%
    )
  `;

  const borderBackgroundImage = useMotionTemplate`
    radial-gradient(
      600px circle at ${mouseX}px ${mouseY}px, 
      rgba(255,255,255,0.4), 
      transparent 40%
    )
  `;

  return (
    <motion.div
      className="card group relative cursor-pointer h-[290px] w-[330px] rounded-xl bg-[rgba(255,255,255,0.1)] z-[1] transition-all ease-in-out duration-200 hover:shadow-[0_1px_1px_1px_rgba(255,255,255,0.2)]"
      style={
        {
          "--mouse-gradient": backgroundImage,
          "--border-gradient": borderBackgroundImage,
        } as React.CSSProperties
      }
    >
      {/* Card Radial Gradient (better use before psuedo class) */}
      {/* First child */}
      <div
        className="absolute inset-0 h-full w-full opacity-0 hover:opacity-100 transition-opacity duration-300 rounded-[inherit] z-[3]"
        style={{
          backgroundImage: "var(--mouse-gradient)",
        }}
      />
      {/* Card Border (better use after psuedo class)*/}
      {/* 2nd child */}
      <div
        className="absolute top-0 left-0 w-full h-full opacity-0 transition-all ease-in-out duration-300 rounded-[inherit] z-[1] group-hover:opacity-100"
        style={{
          backgroundImage: "var(--border-gradient)",
        }}
      />
      {/* Card content */}
      <div className="relative h-[calc(100%-2px)] w-[calc(100%-2px)] rounded-[inherit] m-[1px] bg-[rgb(23,23,23)] z-[2]" />
    </motion.div>
  );
};
