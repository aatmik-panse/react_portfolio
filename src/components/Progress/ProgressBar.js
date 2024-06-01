import React, { useState } from "react";

export default function ProgressBar(porps) {
  let [progress, setProgress] = useState(0);
  let [width, setWidth] = useState(0);
  const updateProgress = () => {
    setProgress(progress + 1);
    setWidth(progress + "%");
  };
  return (
    <div>
      <div className="progress">
        <div className="progress-bar" style={{ width: width }}></div>
      </div>
    </div>
  );
}
