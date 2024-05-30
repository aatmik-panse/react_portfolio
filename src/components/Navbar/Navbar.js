import React, { useState, useEffect } from "react";
import "./Navbar.css";
import logo from "/Users/aatmikpanse/dev/portfolio/react-portfolio/src/burger-menu-left-svgrepo-com.png";

export default function Navbar() {
  const [show, setShow] = useState(true);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      setShow(currentScrollY <= 100);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return show ? (
    <div className="nb">
      <h1>Aatmik Panse</h1>
      <img src={logo} alt="logo" id="nbImg" />
    </div>
  ) : null;
}
