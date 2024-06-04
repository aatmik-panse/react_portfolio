import React from "react";
import "./Home.css";
import Typing from "../Typing/Typing";
import { FaGithub, FaLinkedin, FaTwitter } from "react-icons/fa6";

export default function Home() {
  return (
    <div id="home">
      <aside className="left-container">
        <img
          src="https://i.imghippo.com/files/0TrNU1717267359.jpg"
          srcSet="
            https://i.imghippo.com/files/0TrNU1717267359.jpg?w=400 400w,
            https://i.imghippo.com/files/0TrNU1717267359.jpg?w=800 800w,
            https://i.imghippo.com/files/0TrNU1717267359.jpg?w=1200 1200w
          "
          sizes="(max-width: 600px) 400px, (max-width: 1200px) 800px, 1200px"
          alt="Profile of Aatmik Panse"
          className="hImg"
          fetchpriority="high"
        />
        <div id="hLogos">
          <a
            href="https://github.com/aatmik-panse"
            target="_blank"
            rel="noreferrer"
          >
            <i className="hIcon">
              <FaGithub size={50} />
            </i>
          </a>
          <a
            href="https://www.linkedin.com/in/aatmikpanse"
            target="_blank"
            rel="noreferrer"
          >
            <i className="hIcon">
              <FaLinkedin size={50} />
            </i>
          </a>
          <a href="https://twitter.com" target="_blank" rel="noreferrer">
            <i className="hIcon">
              <FaTwitter size={50} />
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

          <a href="mailto:dev.aatmik@gmail.com">
            <button className="hButton">Contact Me</button>
          </a>
        </div>
      </section>
    </div>
  );
}
