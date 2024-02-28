import React from "react";
import PercentageBars from "./PercentageBars";

const DistributionPanel = ({ data }) => {
  return (
    <div className="bg-slate-900 text-slate-500 rounded-md">
      {/* PANEL NUMBER */}
      <div className="bg-slate-800 w-fit px-2 rounded-md mb-2">{data.id + 1}</div>

      {/* PERCENTAGE BARS */}
      <PercentageBars data={data} />
    </div>
  );
};

export default DistributionPanel;
