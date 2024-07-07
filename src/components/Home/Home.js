import React from "react";
import "./Home.css";
import Typing from "../Typing/Typing";
import { FaGithub, FaLinkedin, FaTwitter } from "react-icons/fa6";
import dp from "../../assets/dp.webp";
export default function Home() {
  return (
    <div id="home">
      <aside className="left-container">
        <img
          src={dp}
          alt="Profile of Aatmik Panse"
          className="hImg"
          fetchpriority="high"
        />
        <div id="hLogos">
          <a
            href="https://github.com/aatmik-panse"
            target="_blank"
            rel="noreferrer"
            aria-label="Github"
          >
            <i className="hIcon">
              <FaGithub className="hIcon" />
            </i>
          </a>
          <a
            href="https://www.linkedin.com/in/aatmikpanse"
            target="_blank"
            rel="noreferrer"
            aria-label="Linkedin"
          >
            <i className="hIcon">
              <FaLinkedin className="hIcon" />
            </i>
          </a>
          <a
            href="https://twitter.com/panseaatmik"
            target="_blank"
            rel="noreferrer"
            aria-label="Twitter"
          >
            <i>
              <FaTwitter className="hIcon" />
            </i>
          </a>
        </div>
      </aside>
      <section className="right-container">
        <div className="rightPara">
          <h1 className="hName">Aatmik Panse</h1>
          <Typing
            text={[
              "Full Stack Developer",
              "Web Developer",
              "React Developer",
              "Swift Developer",
              "Android Developer",
            ]}
            speed={120}
            eraseSpeed={80}
            eraseDelay={3000}
            loop={true}
          />
          <p className="hDesc">
            Hi! I'm Aatmik Panse. I'm currently pursuing my B.Tech in Computer
            Science from SST. I love to code and build stuff. I'm a quick
            learner and I'm always looking for new opportunities to learn and
            grow.
          </p>

          <a href="mailto:dev.aatmik@gmail.com" aria-label="Contact Me">
            <button className="hButton">Contact Me</button>
          </a>
        </div>
      </section>
    </div>
  );
}
