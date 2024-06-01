import React from "react";
import Marquee from "react-fast-marquee";
import SkillsCard from "./SkillsCard";
import "./Skills.css";

const data = [
  {
    imgURL:
      "https://dev-portfolio-template.netlify.app/static/media/javascript.e9360603.svg",
    Skill: "JavaScript",
  },
  {
    imgURL:
      "https://dev-portfolio-template.netlify.app/static/media/react.2b6a0717.svg",
    Skill: "React",
  },
  {
    imgURL: "https://www.vectorlogo.zone/logos/java/java-icon.svg",
    Skill: "Java",
  },
  {
    imgURL:
      "https://cdn.iconscout.com/icon/free/png-512/free-kotlin-2038873-1720086.png?f=webp&w=1000",
    Skill: "Kotlin",
  },
  {
    imgURL:
      "https://dev-portfolio-template.netlify.app/static/media/css.43b6f4bd.svg",
    Skill: "CSS",
  },

  {
    imgURL:
      "https://s3.dualstack.us-east-2.amazonaws.com/pythondotorg-assets/media/files/python-logo-only.svg",
    Skill: "Python",
  },
  {
    imgURL:
      "https://dev-portfolio-template.netlify.app/static/media/html.6a342d61.svg",
    Skill: "HTML",
  },
  {
    imgURL: "https://www.vectorlogo.zone/logos/springio/springio-icon.svg",
    Skill: "Spring Boot",
  },
  {
    imgURL:
      "https://cdn.iconscout.com/icon/free/png-512/free-swift-282412.png?f=webp&w=1000",
    Skill: "Swift",
  },
];

export default function Skills() {
  return (
    <div className="skills-container">
      <h1 className="skills-title"> SKILLS </h1>
      <Marquee
        gradient={false}
        speed={80}
        pauseOnHover={true}
        pauseOnClick={true}
        play={true}
        direction="right"
      >
        {data.map((item, index) => (
          <SkillsCard key={index} data={item} />
        ))}
      </Marquee>
    </div>
  );
}
