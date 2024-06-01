import React from "react";
import "./Card.css";

export default function Card({ image, year, title, subtitle }) {
  return (
    <div>
      <div className="card-item">
        <div className="card-icon">{image}</div>
        <div className="card-content">
          <h2>{year}</h2>
          <h3>{title}</h3>
          <p>{subtitle}</p>
        </div>
      </div>
    </div>
  );
}
