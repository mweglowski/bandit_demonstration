import React from "react";

const BanditButton = ({ onButtonClick, data }) => {
  const buttonClickHandler = () => {
    onButtonClick(data.id);
  };

  return (
    <div
      className="rounded-full  border-2 border-emerald-800 h-[6em] w-[6em] shadow-md shadow-emerald-800"
      onClick={buttonClickHandler}
    />
  );
};

export default BanditButton;
