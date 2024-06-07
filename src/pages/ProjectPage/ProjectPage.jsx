import React from "react";
import Masonry, { ResponsiveMasonry } from "react-responsive-masonry";
import { Link } from "react-router-dom";
import ProjectCard from "../../components/Projects/ProjectCard";
import "./ProjectPage.css";

export default function ProjectPage() {
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
    {
      project: "Explore Books",
      description: "This is an iOS app, which helps you explore books",
      time: "February 2024",
      logo: "swift",
      url: "https://github.com/aatmik-panse/zoloFrontendiOS",
    },
    {
      project: "Explore Books",
      description: "This is an iOS app, which helps you explore books",
      time: "February 2024",
      logo: "swift",
      url: "https://github.com/aatmik-panse/zoloFrontendiOS",
    },
    {
      project: "Explore Books",
      description: "This is an iOS app, which helps you explore books",
      time: "February 2024",
      logo: "swift",
      url: "https://github.com/aatmik-panse/zoloFrontendiOS",
    },
    {
      project: "Explore Books",
      description: "This is an iOS app, which helps you explore books",
      time: "February 2024",
      logo: "swift",
      url: "https://github.com/aatmik-panse/zoloFrontendiOS",
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
    <div>
      <h1>Projects</h1>
      <Link to="/">Go to Home</Link>
      <ResponsiveMasonry
        columnsCountBreakPoints={{ 350: 1, 650: 2, 800: 3, 1000: 4 }}
      >
        <Masonry spacing={2}>
          {projects.map((project, index) => (
            <ProjectCard
              key={index}
              project={project.project}
              description={project.description}
              time={project.time}
              url={project.url}
            />
          ))}
        </Masonry>
      </ResponsiveMasonry>
    </div>
  );
}
