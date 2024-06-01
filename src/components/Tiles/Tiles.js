import React from "react";
import "./Tiles.css";

export default function Tiles(props) {
  return (
    <div className="card">
      <img
        src="https://i.ibb.co/whb4WWy/Web-development-programmer-engineering-and-coding-website-on-augmented-reality-interface-screens-on.png"
        className="card-img-top"
        alt="..."
      />
      <div className="card-body">
        <h5 className="card-title">{props.title}</h5>
        <p className="card-text">{props.text}</p>
        <a href="#" className="btn">
          {props.button}
        </a>
      </div>
    </div>
  );
}
