import React from "react";
import BanditButton from "./BanditButton";

const BanditButtons = ({ onBanditButtonClick, data }) => {
  return (
    <div className="w-100% flex justify-center">
      {data.map((banditButtonData) => (
        <BanditButton
          data={banditButtonData}
          key={banditButtonData.id}
          onButtonClick={onBanditButtonClick}
        />
      ))}
    </div>
  );
};

export default BanditButtons;
