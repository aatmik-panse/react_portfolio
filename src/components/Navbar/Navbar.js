import React, { useState, useEffect, useRef } from "react";
import "./Navbar.css";
import { HiOutlineMenuAlt1 } from "react-icons/hi";
import { FaHome, FaInfoCircle } from "react-icons/fa";
import { GiBrain } from "react-icons/gi";
import { DiGoogleAnalytics } from "react-icons/di";
import { FaXmark } from "react-icons/fa6";

export default function Navbar() {
  const [show, setShow] = useState(true);
  const [showPopup, setShowPopup] = useState(false);
  const popupRef = useRef(null);
  const menuIconRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      setShow(currentScrollY <= 100);
      if (currentScrollY > 100) {
        setShowPopup(false);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        popupRef.current &&
        !popupRef.current.contains(event.target) &&
        menuIconRef.current &&
        !menuIconRef.current.contains(event.target)
      ) {
        setShowPopup(false);
      }
    };

    if (showPopup) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showPopup]);

  const togglePopup = () => {
    setShowPopup(!showPopup);
  };

  const closePopup = () => {
    setShowPopup(false);
  };

  const scrollToSection = (sectionId) => {
    const section = document.getElementById(sectionId);
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
    }
    closePopup();
  };

  return (
    <>
      {show && (
        <div className="nb">
          <h1>Aatmik Panse</h1>
          <i alt="logo" id="nbImg" onClick={togglePopup} ref={menuIconRef}>
            {showPopup ? <FaXmark /> : <HiOutlineMenuAlt1 />}
          </i>
        </div>
      )}
      {showPopup && (
        <div className="popup-navbar" ref={popupRef}>
          <ul>
            <li>
              <a href="#home" onClick={() => scrollToSection("home")}>
                <FaHome className="navIcons" />
                <h6>Home</h6>
              </a>
            </li>
            <li>
              <a href="#about" onClick={() => scrollToSection("about")}>
                <FaInfoCircle className="navIcons" />
                <h6>About</h6>
              </a>
            </li>
            <li>
              <a href="#education" onClick={() => scrollToSection("education")}>
                <GiBrain className="navIcons" />
                <h6>Education</h6>
              </a>
            </li>
            <li>
              <a
                href="#projects"
                className="navIcons"
                onClick={() => scrollToSection("projects")}
              >
                <DiGoogleAnalytics className="navIcons" />
                <h6>Projects</h6>
              </a>
            </li>
          </ul>
        </div>
      )}
    </>
  );
}
