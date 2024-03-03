import React from "react";
import BanditButton from "./BanditButton";
import { useBanditContext } from "../context/BanditContext";

const BanditButtons = ({ onBanditButtonClick, data }) => {
  const { banditsData, banditButtonClickHandler } = useBanditContext();

  return (
    <div className="w-100% flex justify-center">
      {banditsData.map((banditButtonData) => (
        <BanditButton
          data={banditButtonData}
          key={banditButtonData.id}
          onButtonClick={banditButtonClickHandler}
        />
      ))}
    </div>
  );
};

export default BanditButtons;
