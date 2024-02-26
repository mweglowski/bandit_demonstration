import React from "react";
import DistributionPanel from "./DistributionPanel";

const DistributionPanels = ({ data }) => {
  return (
    <div>
      {data.map((panelData) => (
        <DistributionPanel key={panelData.id} data={panelData} />
      ))}
    </div>
  );
};

export default DistributionPanels;
