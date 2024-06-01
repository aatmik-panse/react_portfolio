import React from "react";
import "./ProjectCard.css";
import { FaGithub, FaSwift } from "react-icons/fa6";

export default function ProjectCard({
  project,
  image = "https://i.postimg.cc/NfR2yhNs/image-equilibrium.jpg",
  description,
  time,
  url = "https://github.com/aatmik-panse",
}) {
  return (
    <div className="pc-card-container">
      <a href="/" className="pc-hero-image-container">
        <img className="pc-hero-image" src={image} alt="Project Hero Image" />
      </a>
      <main className="pc-main-content">
        <h2>
          <a href={url}>{project}</a>
        </h2>
        <p>{description}</p>
        <div className="pc-flex-row">
          <div className="pc-coin-base">
            <i alt="Github" className="pc-small-image">
              <FaGithub size={36} />
            </i>
          </div>
          <div className="pc-time-left">
            <i alt="clock" className="pc-small-image">
              <FaSwift size={36} />
            </i>
          </div>
        </div>
      </main>
    </div>
  );
}
