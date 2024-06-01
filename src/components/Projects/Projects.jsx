import React from "react";
import Masonry, { ResponsiveMasonry } from "react-responsive-masonry";
import ProjectCard from "./ProjectCard";
import { FaSwift, FaAndroid, FaJava, FaReact } from "react-icons/fa6";
import "./Projects.css";

function getLogo(logo) {
  switch (logo) {
    case "swift":
      return <FaSwift size={36} />;
    case "android":
      return <FaAndroid size={36} />;
    case "java":
      return <FaJava size={36} />;
    case "react":
      return <FaReact size={36} />;
    default:
      return null;
  }
}
export default function Projects() {
  const projects = [
    {
      project: "Bookey (Zolo)",
      description: "This is a book borrowing app made for Zolo",
      time: "April 2024",
      logo: "android",
      url: "https://github.com/sst-product-team/zolo-booky-frontend",
    },
    {
      project: "Stockey Backend",
      description: "Stockey is a stock market backend for trading stocks",
      time: "May 2024",
      logo: "java",
    },
    {
      project: "React Portfolio",
      description:
        "This is my portfolio made using React . In which you are currently in 🌚 ",
      time: "June 2024",
      logo: "react",
      url: "https://github.com/aatmik-panse/react_portfolio",
    },
    {
      project: "Explore Books",
      description: "This is an iOS app, which helps you explore books",
      time: "February 2024",
      logo: "swift",
      url: "https://github.com/aatmik-panse/zoloFrontendiOS",
    },
  ];
  return (
    <div className="projectParent">
      <h1>Projects</h1>
      <div className="misc">
        <ResponsiveMasonry
          columnsCountBreakPoints={{ 350: 1, 480: 2, 750: 3, 900: 4 }}
        >
          <Masonry spacing={2}>
            {projects.map((project, index) => (
              <ProjectCard
                key={index}
                project={project.project}
                description={project.description}
                time={project.time}
                logo={getLogo(project.logo)}
                url={project.url}
              />
            ))}
          </Masonry>
        </ResponsiveMasonry>
      </div>
    </div>
  );
}
