import React from "react";
import "../../App.css";
import Home from "../../components/Home/Home";
import Navbar from "../../components/Navbar/Navbar";
import About from "../../components/About/About";
import Skills from "../../components/Skills/Skills";
import Footer from "../../components/Footer/index";
import Education from "../../components/Education/Education";
import Projects from "../../components/Projects/index";
import Experience from "../../components/Experience/index";

export default function HomePage() {
  return (
    <div>
      <div className="App">
        <Navbar />
        <div id="home">
          <Home />
        </div>
        <div id="about">
          <About />
        </div>
        <div id="education">
          <Education />
        </div>
        <div id="skills">
          <Skills />
        </div>
        <div id="experience">
          <Experience />
        </div>
        <div id="projects">
          <Projects />
        </div>
        <div>
          <Footer />
        </div>
      </div>
    </div>
  );
}
