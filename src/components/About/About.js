import React from "react";
import "./About.css";
import personIllustration from "/Users/aatmikpanse/dev/portfolio/react-portfolio/src/illusCoding.png";

export default function About() {
  return (
    <div>
      <div className="container">
        <div className="who-i-am">
          <h1>Who I am</h1>
          <p>
            My name's Aatmik. I'm a Full Stack developer based in India. I'm
            passionate about coding and I love to learn new things. Lorem ipsum
            dolor sit amet consectetur, adipisicing elit. Quo sunt neque unde
            enim repellat accusamus nihil, aliquid ex maiores, dolores error
            itaque beatae. Est unde laboriosam, voluptates cum officiis soluta?
          </p>
        </div>
        <div className="image-container">
          <img src={personIllustration} alt="Person illustration" />
        </div>
      </div>
    </div>
  );
}
