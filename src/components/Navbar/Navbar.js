import React from "react";
import "./Navbar.css";
import logo from "/Users/aatmikpanse/dev/portfolio/react-portfolio/src/burger-menu-left-svgrepo-com.png";

export default function Navbar() {
  return (
    <div className="nb">
      <h1>Aatmik Panse</h1>
      <img src={logo} alt="logo" id="nbImg" />
    </div>
  );
}
