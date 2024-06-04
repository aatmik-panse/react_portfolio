import React from "react";
import "./ProjectCard.css";
import { FaGithub } from "react-icons/fa6";

export default function ProjectCard({
  project,
  image = "https://i.postimg.cc/NfR2yhNs/image-equilibrium.jpg",
  description,
  time,
  url = "https://github.com/aatmik-panse",
  logo,
}) {
  return (
    <div className="pc-card-container">
      <a
        href={url}
        target="_blank"
        rel="noreferrer"
        className="pc-hero-image-container"
      >
        <img
          className="pc-hero-image"
          src={image}
          alt="heroImgae"
          loading="lazy"
        />
      </a>
      <main className="pc-main-content">
        <h2>
          <a href={url} target="_blank" rel="noreferrer">
            {project}
          </a>
        </h2>
        <p>{description}</p>
        <div className="pc-flex-row">
          <div className="pc-coin-base">
            <i className="pc-small-image">
              <FaGithub size={36} />
            </i>
          </div>
          <div className="pc-time-left">
            <i className="pc-small-image">{logo}</i>
          </div>
        </div>
      </main>
    </div>
  );
}
