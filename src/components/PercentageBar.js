import React, { useState, useEffect } from "react";

const PercentageBar = ({ data, width }) => {
  const { areaPercentage: percentage, numbers } = data;
  const [color, setColor] = useState("");

  useEffect(() => {
    const green = 50;
    const blue = 90;

    const initialColor = `rgb(0, ${Math.round(
      Math.random() * 90 + green
    )}, ${Math.round(Math.random() * 50 + blue)})`;

    setColor(initialColor);
  }, []);

  return (
    <div
      style={{ width, backgroundColor: color }}
      className="rounded-md text-slate-300 flex"
    >
      <p className="mx-auto">{percentage}%</p>
    </div>
  );
};

export default PercentageBar;
