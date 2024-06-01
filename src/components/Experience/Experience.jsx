import React from "react";
import "./Experience.css";
import Card from "../Card";
import work from "/Users/aatmikpanse/dev/portfolio/react-portfolio/src/svgexport-1.svg";
import deskIllustration from "/Users/aatmikpanse/dev/portfolio/react-portfolio/src/illusCoding.png";

export default function Experience() {
  return (
    <div>
      <div className="exContainer">
        <div className="experience">
          <h1>EXPERIENCE</h1>
          <Card
            image={work}
            title="Web Developer"
            year="2021 - Present"
            subtitle="Aceternity UI"
          />
          <Card
            image={work}
            title="Android Developer"
            year="2020 - 2021"
            subtitle="Zolo"
          />
          <Card
            image={work}
            title="Intern"
            year="2019 - 2020"
            subtitle="Google"
          />
        </div>
        <div className="image-container">
          <img src={deskIllustration} alt="Desk illustration" />
        </div>
      </div>
    </div>
  );
}
