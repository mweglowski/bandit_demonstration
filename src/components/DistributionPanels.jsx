import React from "react";
import DistributionPanel from "./DistributionPanel";

const DistributionPanels = ({ data, onRandomizeButtonClick }) => {
  const buttonClickHandler = () => {
    onRandomizeButtonClick();
  };

  return (
    <div>
      <div className="flex flex-col gap-4">
        {data.map((panelData) => (
          <DistributionPanel key={panelData.id} data={panelData} />
        ))}
      </div>

      <div className="mt-2 flex">
        <button
          className="bg-black border-2 px-4 py-1 font-bold flex ml-auto rounded-md text-slate-400 border-slate-400 hover:border-slate-300 hover:text-slate-300 duration-300"
          onClick={buttonClickHandler}
        >
          Randomize
        </button>
      </div>
    </div>
  );
};

export default DistributionPanels;
