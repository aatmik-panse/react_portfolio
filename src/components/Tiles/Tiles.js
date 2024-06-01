import React from "react";
import "./Tiles.css";
import ilus from "/Users/aatmikpanse/dev/portfolio/react-portfolio/src/illusCoding.png";

export default function Tiles(props) {
  return (
    <div className="card">
      <img src={ilus} className="card-img-top" alt="..." />
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
