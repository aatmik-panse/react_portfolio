import React from "react";
import "./About.css";
import codeImg from "../../assets/codeImg.webp";
export default function About() {
  return (
    <div>
      <div className="container">
        <div className="who-i-am">
          <h1>Who I am</h1>
          <p>
            Hi! I'm Aatmik Panse, a Computer Science student with a keen
            interest in software development and technology. Studying at Scaler
            School of Technology, I'm passionate about learning and applying
            coding concepts to solve real-world problems. I'm eager to
            contribute my skills and knowledge to create innovative solutions.
          </p>
        </div>
        <div className="image-container">
          <img src={codeImg} alt="Person illustration" loading="lazy" />
        </div>
      </div>
    </div>
  );
}
