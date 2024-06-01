import React, { useState, useEffect } from "react";
import "./Navbar.css";
import { HiOutlineMenuAlt1 } from "react-icons/hi";

export default function Navbar(icon) {
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
      <i alt="logo" id="nbImg">
        <HiOutlineMenuAlt1 size={50} />
      </i>
    </div>
  ) : null;
}
