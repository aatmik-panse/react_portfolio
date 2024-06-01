import React from "react";
import "./ProjectCard.css";

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
            <img
              src="https://cdn.iconscout.com/icon/free/png-512/free-github-159-721954.png"
              alt="Github"
              className="pc-small-image"
            />
          </div>
          <div className="pc-time-left">
            <img
              src="https://i.postimg.cc/prpyV4mH/clock-selection-no-bg.png"
              alt="clock"
              className="pc-small-image"
            />
            <p>{time}</p>
          </div>
        </div>
      </main>
    </div>
  );
}
