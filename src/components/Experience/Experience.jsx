import React from "react";
import "./Experience.css";
import Card from "../Card";
import { LuLaptop } from "react-icons/lu";

function workComponent() {
  return <LuLaptop size={86} />;
}

export default function Experience() {
  return (
    <div>
      <div className="exContainer">
        <div className="experience">
          <h1>EXPERIENCE</h1>
          <Card
            image={workComponent()}
            title="Web Developer"
            year="2023 - Present"
            subtitle="SST"
          />
          <Card
            image={workComponent()}
            title="Android Developer"
            year="2023 - 2024"
            subtitle="Zolo"
          />
          <Card
            image={workComponent()}
            title="Java Developer"
            year="2024 - Present"
            subtitle="Scaler"
          />
        </div>
        <div className="image-container">
          <img
            src="https://i.imghippo.com/files/IFHRr1717266832.png"
            alt="Desk illustration"
            loading="lazy"
          />
        </div>
      </div>
    </div>
  );
}
