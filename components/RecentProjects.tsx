"use client";

import React, { useState } from "react";
import { FaLocationArrow } from "react-icons/fa6";
import { projects } from "@/data";
import { PinContainer } from "./ui/Pin";

interface Project {
  id: number;
  title: string;
  des: string;
  img: string;
  iconLists: string[];
  link: string;
}

const RecentProjects: React.FC = () => {
  const [expandedDescriptions, setExpandedDescriptions] = useState<{ [key: number]: boolean }>(
    projects.reduce((acc, project) => {
      acc[project.id] = false;
      return acc;
    }, {} as { [key: number]: boolean })
  );

  const toggleDescription = (id: number) => {
    setExpandedDescriptions((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  return (
    <div className="py-20" id="projects">
      <h1 className="heading">
        A small selection of{" "}
        <span className="text-purple">recent projects</span>
      </h1>
      <div className="flex flex-wrap items-center justify-center p-4 gap-16 mt-10">
        {projects.map(({ id, title, des, img, iconLists, link }: Project) => (
          <div
            className={`lg:min-h-[32.5rem] h-[25rem] flex items-center justify-center sm:w-96 w-[80vw] transition-all duration-300 ${
              expandedDescriptions[id] ? 'lg:mb-16' : ''
            }`}
            key={id}
          >
            <PinContainer title={link} href={link}>
              <div className="relative flex items-center justify-center sm:w-96 w-[80vw] overflow-hidden h-[20vh] lg:h-[30vh] mb-10">
                <div
                  className="relative w-full h-full overflow-hidden lg:rounded-3xl"
                  style={{ backgroundColor: "#13162D" }}
                >
                  {/* <img src="/bg.png" alt="background" /> */}
                </div>
                <img
                  src={img}
                  alt="cover"
                  className="z-10 absolute bottom-0"
                />
              </div>

              <h1 className="font-bold lg:text-2xl md:text-xl text-base line-clamp-1">
                {title}
              </h1>

              <p
                className={`lg:text-xl lg:font-normal font-light text-sm ${
                  expandedDescriptions[id] ? "" : "line-clamp-2"
                }`}
                style={{
                  color: "#BEC1DD",
                  margin: "1vh 0",
                }}
              >
                {des}
              </p>

              <button
                onClick={() => toggleDescription(id)}
                className="text-purple mt-1 mb-3 text-sm lg:text-base"
              >
                {expandedDescriptions[id] ? "Show less" : "Show more"}
              </button>

              <div className="flex items-center justify-between mt-7 mb-3">
                <div className="flex items-center">
                  {iconLists.map((icon, index) => (
                    <div
                      key={index}
                      className="border border-white/[.2] rounded-full bg-black lg:w-10 lg:h-10 w-8 h-8 flex justify-center items-center"
                      style={{
                        transform: `translateX(-${5 * index + 2}px)`,
                      }}
                    >
                      <img src={icon} alt={`icon-${index}`} className="p-2" />
                    </div>
                  ))}
                </div>

                <a
                  href={link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex justify-center items-center"
                >
                  <p className="flex lg:text-xl md:text-xs text-sm text-purple">
                    Check Live Site
                  </p>
                  <FaLocationArrow className="ml-3" color="#CBACF9" />
                </a>
              </div>
            </PinContainer>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RecentProjects;
