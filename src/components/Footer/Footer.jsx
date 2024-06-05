import React from "react";
import "./Footer.css";
import { FaEnvelope } from "react-icons/fa";
import {
  FaMapLocationDot,
  FaBook,
  FaGithub,
  FaLinkedin,
  FaFacebook,
  FaTwitter,
} from "react-icons/fa6";
import { AiFillHome } from "react-icons/ai";
import { GiBrain } from "react-icons/gi";
import { BsInfoCircleFill, BsFillEmojiSunglassesFill } from "react-icons/bs";
import { DiGoogleAnalytics } from "react-icons/di";

export default function Footer() {
  return (
    <div>
      <footer className="footer-distributed">
        <div className="footer-container">
          <div className="footer-left">
            <h3>Aatmik</h3>

            <p className="footer-links">
              <a href="#home" className="link-1" aria-label="Home">
                <AiFillHome /> Home
              </a>

              <a href="#education" aria-label="Education">
                <FaBook />
                Education
              </a>

              <a href="#skills" aria-label="Skills">
                <GiBrain />
                Skills
              </a>

              <a href="#about" aria-label="About">
                <BsInfoCircleFill />
                About
              </a>

              <a href="#experience" aria-label="Experience">
                <BsFillEmojiSunglassesFill />
                Experience
              </a>

              <a href="#projects" aria-label="Projects">
                <DiGoogleAnalytics />
                Projects
              </a>
            </p>

            <p className="footer-name">By Aatmik © 2024</p>
          </div>

          <div className="footer-center">
            <div>
              <i>
                <FaMapLocationDot />
              </i>
              <p>Bengaluru, Karnataka</p>
            </div>
            <div>
              <i>
                <FaEnvelope />
              </i>
              <p>
                <a href="mailto:dev.aatmik@gmail.com" aria-label="Email">
                  dev.aatmik@gmail.com
                </a>
              </p>
            </div>
          </div>

          <div className="footer-right">
            <div className="footer-icons">
              <a
                href="https://github.com/aatmik-panse"
                target="_blank"
                rel="noreferrer"
                aria-label="Github"
              >
                <FaGithub />
              </a>
              <a
                href="https://www.linkedin.com/in/aatmikpanse"
                target="_blank"
                rel="noreferrer"
                aria-label="Linkedin"
              >
                <FaLinkedin />
              </a>
              <a
                href="https://www.facebook.com/"
                target="_blank"
                rel="noreferrer"
                aria-label="Facebook"
              >
                <FaFacebook />
              </a>
              <a
                href="https://twitter.com/"
                target="_blank"
                rel="noreferrer"
                aria-label="Twitter"
              >
                <FaTwitter />
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
