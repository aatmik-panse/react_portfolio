import React from "react";
import "./Education.css";
import graduationCap from "/Users/aatmikpanse/dev/portfolio/react-portfolio/src/graduation-cap.png";
import deskIllustration from "/Users/aatmikpanse/dev/portfolio/react-portfolio/src/desk-illustration.png";
import Card from "../Card";

export default function Education() {
  return (
    <div>
      <div className="edContainer">
        <div className="education">
          <h1>Education</h1>
          <Card
            image={graduationCap}
            year="2023 - 2027"
            title="Computer Science"
            subtitle="Scaler School of Technology"
          />
          <Card
            image={graduationCap}
            year="2023 - 2026"
            title="B.Sc Computer Science"
            subtitle="BITS Pilani"
          />
          <Card
            image={graduationCap}
            year="2026-2027"
            title="M.Sc Computer Science"
            subtitle="Woolf University"
          />
        </div>
        <div className="image-container">
          <img src={deskIllustration} alt="Desk illustration" />
        </div>
      </div>
    </div>
  );
}
