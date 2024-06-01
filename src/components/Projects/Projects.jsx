import React from "react";
import Masonry, { ResponsiveMasonry } from "react-responsive-masonry";
import ProjectCard from "./ProjectCard";
import "./Projects.css";

export default function Projects() {
  const projects = [
    {
      project: "Project 1",
      description: "This is the description to the project 1",
      time: "5 Days Ago",
    },
    {
      project: "Project 2",
      description: "This is the description to the project 2",
      time: "10 Days Ago",
    },
    {
      project: "Project 3",
      description: "This is the description to the project 3",
      time: "15 Days Ago",
    },
    {
      project: "Project 4",
      description: "This is the description to the project 4",
      time: "20 Days Ago",
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
              />
            ))}
          </Masonry>
        </ResponsiveMasonry>
      </div>
    </div>
  );
}
