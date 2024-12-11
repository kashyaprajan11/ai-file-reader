"use client";

import Image from "next/image";
import React from "react";
import Link from "next/link";

import { CardContainer, CardBody, CardItem } from "./3d-card";
import GithubIcon from "@/public/images/github.webp";
import LinkedinIcon from "@/public/images/linkedin.webp";
import MailIcon from "@/public/images/mail.webp";

const cards = [
  {
    id: 0,
    title: "Github",
    image: GithubIcon,
    alt: "github image",
    link: "https://github.com/kashyaprajan11/ai-file-reader",
  },
  {
    id: 1,
    title: "Linkedin",
    image: LinkedinIcon,
    alt: "linkedin image",
    link: "https://www.linkedin.com/in/kashyap-rajan/",
  },
  {
    id: 2,
    title: "Mail Me",
    image: MailIcon,
    alt: "mail image",
    link: "",
  },
];

export default function GetInTouch() {
  const handleContactEmailClick = () => {
    const subject = "Getting in touch";
    const body = "Hi there! I'm";
    const mailtoLink = `mailto:rkashyap251@gmail.com?subject=${encodeURIComponent(
      subject
    )}&body=${encodeURIComponent(body)}`;

    window.location.href = mailtoLink;
  };

  return (
    <div className="flex flex-col w-full justify-center items-center mb-10 mt-10">
      <p className="text-center text-6xl mb-10">Get in Touch</p>
      <div className="flex flex-wrap gap-10">
        {cards.map(({ id, title, image, link, alt }) => (
          <CardContainer key={id} className="inter-var">
            <CardBody className="bg-gray-50 relative group/card  dark:hover:shadow-2xl dark:hover:shadow-emerald-500/[0.1] dark:bg-black dark:border-white/[0.2] border-black/[0.1] w-auto sm:w-[25rem] h-auto rounded-xl p-6 border  ">
              <CardItem translateZ="100" className="w-full mt-4">
                <Image
                  src={image}
                  height="1000"
                  width="1000"
                  className="h-60 w-full object-cover rounded-xl group-hover/card:shadow-xl"
                  alt="thumbnail"
                />
              </CardItem>
              <div className="mt-10">
                <CardItem
                  translateZ={20}
                  as={Link}
                  href={link}
                  target="__blank"
                  className="px-4 py-2 rounded-xl text-xl text-center font-normal dark:text-white"
                  onClick={link === "" ? handleContactEmailClick : null}
                >
                  {title} →
                </CardItem>
              </div>
            </CardBody>
          </CardContainer>
        ))}
      </div>
    </div>
  );
}
