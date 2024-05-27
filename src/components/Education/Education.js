import React from "react";
import "./Education.css";
import graduationCap from "/Users/aatmikpanse/dev/portfolio/react-portfolio/src/graduation-cap.png";
import deskIllustration from "/Users/aatmikpanse/dev/portfolio/react-portfolio/src/desk-illustration.png";

export default function Education() {
  return (
    <div>
      <div className="container">
        <div className="education">
          <h1>Education</h1>
          <div className="education-item">
            <div className="education-icon">
              <img src={graduationCap} alt="Graduation Icon" />
            </div>
            <div className="education-content">
              <h2>2023-2026</h2>
              <h3>BSc</h3>
              <p>BITS</p>
            </div>
          </div>
          <div className="education-item">
            <div className="education-icon">
              <img src={graduationCap} alt="Graduation Icon" />
            </div>
            <div className="education-content">
              <h2>2023-2027</h2>
              <h3>Bachelor of Technology</h3>
              <p>SST</p>
            </div>
          </div>
          <div className="education-item">
            <div className="education-icon">
              <img src={graduationCap} alt="Graduation Icon" />
            </div>
            <div className="education-content">
              <h2>2026-2027</h2>
              <h3>Master of Technology</h3>
              <p>Woolf University</p>
            </div>
          </div>
        </div>
        <div className="image-container">
          <img src={deskIllustration} alt="Desk illustration" />
        </div>
      </div>
    </div>
  );
}
