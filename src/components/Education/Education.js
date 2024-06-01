import React from "react";
import "./Education.css";
import deskIllustration from "/Users/aatmikpanse/dev/portfolio/react-portfolio/src/desk-illustration.png";
import Card from "../Card";
import { FaGraduationCap } from "react-icons/fa";

function graduationComponent() {
  return <FaGraduationCap size={86} />;
}
export default function Education() {
  const education = [
    {
      year: "2023 - 2027",
      title: "Computer Science",
      subtitle: "Scaler School of Technology",
    },
    {
      year: "2023 - 2026",
      title: "B.Sc Computer Science",
      subtitle: "BITS Pilani",
    },
    {
      year: "2026-2027",
      title: "M.Sc Computer Science",
      subtitle: "Woolf University",
    },
  ];

  return (
    <div>
      <div className="edContainer">
        <div className="education">
          <h1>Education</h1>
          {education.map((edu, index) => (
            <Card
              key={index}
              year={edu.year}
              title={edu.title}
              subtitle={edu.subtitle}
              image={graduationComponent()}
            />
          ))}
        </div>
        <div className="image-container">
          <img src={deskIllustration} alt="Desk illustration" />
        </div>
      </div>
    </div>
  );
}
