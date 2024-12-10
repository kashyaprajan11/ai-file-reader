"use client";
import { RadialHoverCard } from "./card-hover-radial";

export default function Features() {
  const cardData = [
    {
      id: 0,
      title: "hello",
      description: "This is the description",
      image: "Some random image link",
      link: "Where should it take us",
    },
    {
      id: 1,
      title: "hello",
      description: "This is the description",
      image: "Some random image link",
      link: "Where should it take us",
    },
    {
      id: 2,
      title: "hello",
      description: "This is the description",
      image: "Some random image link",
      link: "Where should it take us",
    },
  ];
  return (
    <div className="flex flex-col w-full justify-center items-center mb-10">
      <p className="text-center text-6xl mb-10">Features</p>
      <RadialHoverCard cardData={cardData} />
    </div>
  );
}
