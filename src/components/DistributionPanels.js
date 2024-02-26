import React from "react";
import DistributionPanel from "./DistributionPanel";

const DistributionPanels = ({ data }) => {
  return (
    <div className="flex flex-col gap-4">
      {data.map((panelData) => (
        <DistributionPanel key={panelData.id} data={panelData} />
      ))}
    </div>
  );
};

export default DistributionPanels;
