import React from "react";
import dp from "/Users/aatmikpanse/dev/portfolio/react-portfolio/src/dp.jpeg";
import "./Home.css";

export default function Home() {
  return (
    <div id="home">
      <aside className="left-container">
        <img src={dp} alt="Profile" className="hImg" />
        <div id="hLogos">
          <a href="https://github.com/aatmik-panse">
            <img
              src="https://img.icons8.com/ios-glyphs/500/000000/github.png"
              alt="GitHub"
              className="hIcon"
            />
          </a>
          <a href="https://www.linkedin.com/in/aatmikpanse">
            <img
              src="https://img.icons8.com/ios-glyphs/500/000000/linkedin.png"
              alt="LinkedIn"
              className="hIcon"
            />
          </a>
          <a href="https://twitter.com">
            <img
              src="https://img.icons8.com/ios-glyphs/500/000000/twitter.png"
              alt="Twitter"
              className="hIcon"
            />
          </a>
        </div>
      </aside>
      <section className="right-container">
        <div className="rightPara">
          <h1 className="hName">Aatmik Panse</h1>
          <h2 className="hTitle">Full Stack Developer</h2>
          <p className="hDesc">
            Hi! I'm Aatmik Panse, a full stack developer. I'm currently pursuing
            my B.Tech in Computer Science from SST. I love to code and build
            stuff. I'm a quick learner and I'm always looking for new
            opportunities to learn and grow.
          </p>
          <button className="hButton">Contact Me</button>
        </div>
      </section>
    </div>
  );
}
