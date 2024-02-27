import React from "react";

const PercentageBar = ({ data, width }) => {
  const { areaPercentage: percentage, numbers, color } = data;

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
