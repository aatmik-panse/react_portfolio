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
              <a href="#" className="link-1">
                <AiFillHome /> Home
              </a>

              <a href="#">
                <FaBook />
                Education
              </a>

              <a href="#">
                <GiBrain />
                Skills
              </a>

              <a href="#">
                <BsInfoCircleFill />
                About
              </a>

              <a href="#">
                <BsFillEmojiSunglassesFill />
                Experience
              </a>

              <a href="#">
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
                <a href="mailto:dev.aatmik@gmail.com">dev.aatmik@gmail.com</a>
              </p>
            </div>
          </div>

          <div className="footer-right">
            <div className="footer-icons">
              <a href="#">
                <FaGithub />
              </a>
              <a href="#">
                <FaLinkedin />
              </a>
              <a href="#">
                <FaFacebook />
              </a>
              <a href="#">
                <FaTwitter />
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
