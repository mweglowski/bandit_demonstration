import React from "react";

const DistributionPanel = ({ data }) => {
  const { id, distribution } = data;

  return (
    <div>
      {/* PANEL NUMBER */}
      <div>{id}</div>
    </div>
  );
};

export default DistributionPanel;
