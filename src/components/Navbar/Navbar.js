import React, { useState, useEffect } from "react";
import "./Navbar.css";
import logo from "/Users/aatmikpanse/dev/portfolio/react-portfolio/src/burger-menu-left-svgrepo-com.png";
import CloseRoundedIcon from "/Users/aatmikpanse/dev/portfolio/react-portfolio/src/components/svgviewer-png-output.png";

export default function Navbar() {
  let [sideButton, setSide] = useState(false);
  const [show, setShow] = useState(true);
  let btn = logo;
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      setShow(currentScrollY <= 100);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const sideBar = () => {
    setSide(!sideButton);
  };

  if (sideButton) {
    btn = CloseRoundedIcon;
  } else {
    btn = logo;
  }

  return show ? (
    <div className="nb">
      <h1>Aatmik Panse</h1>
      <img src={btn} alt="logo" id="nbImg" onClick={sideBar} />
    </div>
  ) : null;
}
